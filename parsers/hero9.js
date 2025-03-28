export default function parse(element, { document }) {
  // Create the header row with exact matching text
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Hero';
  const headerRow = [headerCell];

  // Extract title
  const title = element.querySelector('.elementor-heading-title');
  const titleElement = document.createElement('h1');
  titleElement.textContent = title ? title.textContent : '';

  // Extract description
  const description = element.querySelector('.elementor-widget-container p');
  const descriptionElement = document.createElement('p');
  descriptionElement.textContent = description ? description.textContent : '';

  // Extract optional list
  const list = element.querySelector('.elementor-widget-container ul');
  const listElement = document.createElement('ul');
  if (list) {
    listElement.innerHTML = list.innerHTML;
  }

  // Extract optional button
  const button = element.querySelector('.elementor-button');
  const buttonElement = document.createElement('a');
  if (button) {
    buttonElement.href = button.getAttribute('href');
    const buttonText = button.querySelector('.elementor-button-text');
    buttonElement.textContent = buttonText ? buttonText.textContent : '';
  }

  // Combine all content into a single cell in the second row
  const secondRowContent = document.createElement('div');
  if (titleElement.textContent) secondRowContent.appendChild(titleElement);
  if (descriptionElement.textContent) secondRowContent.appendChild(descriptionElement);
  if (listElement.innerHTML) secondRowContent.appendChild(listElement);
  if (buttonElement.textContent) secondRowContent.appendChild(buttonElement);

  const cells = [headerRow, [secondRowContent]];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
