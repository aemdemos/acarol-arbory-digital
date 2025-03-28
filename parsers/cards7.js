export default function parse(element, { document }) {
  const cards = [];

  const columns = element.querySelectorAll('.elementor-column');

  // Header row
  const headerRow = ['Cards'];
  cards.push(headerRow);

  columns.forEach((column) => {
    const iconWrapper = column.querySelector('.elementor-icon-box-icon a');
    const heading = column.querySelector('.elementor-heading-title');
    const description = column.querySelector('.elementor-widget-text-editor p');
    const buttonWrapper = column.querySelector('.elementor-button-wrapper a');

    const imageOrIcon = iconWrapper?.cloneNode(true);
    const textContent = document.createElement('div');

    if (heading) {
      const headingElement = document.createElement('h2');
      headingElement.textContent = heading.textContent;
      textContent.appendChild(headingElement);
    }

    if (description) {
      const descriptionElement = document.createElement('p');
      descriptionElement.textContent = description.textContent;
      textContent.appendChild(descriptionElement);
    }

    if (buttonWrapper) {
      const buttonElement = document.createElement('a');
      buttonElement.href = buttonWrapper.href;
      buttonElement.textContent = buttonWrapper.textContent;
      textContent.appendChild(buttonElement);
    }

    cards.push([imageOrIcon, textContent]);
  });

  const block = WebImporter.DOMUtils.createTable(cards, document);
  element.replaceWith(block);
}
