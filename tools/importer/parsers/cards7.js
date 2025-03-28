export default function parse(element, { document }) {
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Cards';

  const rows = Array.from(element.querySelectorAll('.elementor-column')).map((column) => {
    const iconElement = column.querySelector('.elementor-icon-box-icon a i');
    const textHeading = column.querySelector('.elementor-widget-heading h2');
    const description = column.querySelector('.elementor-widget-text-editor p');
    const ctaLink = column.querySelector('.elementor-widget-button a');

    const iconWrapper = document.createElement('div');
    if (iconElement) {
      const iconClone = iconElement.cloneNode(true);
      iconWrapper.appendChild(iconClone);
    }

    const textContentWrapper = document.createElement('div');
    if (textHeading) {
      const headingElement = document.createElement('h2');
      headingElement.textContent = textHeading.textContent.trim();
      textContentWrapper.appendChild(headingElement);
    }
    if (description) {
      const paragraphElement = document.createElement('p');
      paragraphElement.textContent = description.textContent.trim();
      textContentWrapper.appendChild(paragraphElement);
    }
    if (ctaLink) {
      const linkElement = document.createElement('a');
      linkElement.href = ctaLink.href;
      linkElement.textContent = ctaLink.textContent.trim();
      textContentWrapper.appendChild(linkElement);
    }

    return [iconWrapper, textContentWrapper];
  });

  const table = WebImporter.DOMUtils.createTable([headerRow, ...rows], document);
  element.replaceWith(table);
}