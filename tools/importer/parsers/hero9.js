/* global WebImporter */

export default function parse(element, { document }) {
  const headerRow = ['Hero'];

  // Extract content from the first column
  const headingTitleElement = element.querySelector('.elementor-heading-title');
  const headingText = headingTitleElement ? headingTitleElement.textContent.trim() : '';

  const paragraphElement = element.querySelector('.elementor-widget-text-editor p');
  const paragraphText = paragraphElement ? paragraphElement.textContent.trim() : '';

  const listElement = element.querySelector('.elementor-widget-text-editor ul');
  const listItems = listElement ? Array.from(listElement.querySelectorAll('li')).map((li) => li.textContent.trim()) : [];

  const buttonElement = element.querySelector('.elementor-widget-button a');
  const buttonText = buttonElement ? buttonElement.textContent.trim() : '';
  const buttonLink = buttonElement ? buttonElement.getAttribute('href') : '';

  const buttonHtml = buttonText && buttonLink ? document.createElement('a') : null;
  if (buttonHtml) {
    buttonHtml.setAttribute('href', buttonLink);
    buttonHtml.textContent = buttonText;
  }

  // Combine extracted elements into a single column
  const secondRowContent = [];

  if (headingText) {
    const headingElement = document.createElement('h1');
    headingElement.textContent = headingText;
    secondRowContent.push(headingElement);
  }

  if (paragraphText) {
    const paragraphElement = document.createElement('p');
    paragraphElement.textContent = paragraphText;
    secondRowContent.push(paragraphElement);
  }

  if (listItems.length) {
    const ulElement = document.createElement('ul');
    listItems.forEach((item) => {
      const liElement = document.createElement('li');
      liElement.textContent = item;
      ulElement.appendChild(liElement);
    });
    secondRowContent.push(ulElement);
  }

  if (buttonHtml) {
    secondRowContent.push(buttonHtml);
  }

  const cells = [
    headerRow,
    [secondRowContent],
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}
