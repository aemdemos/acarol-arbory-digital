/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the heading
  const heading = element.querySelector('h1.elementor-heading-title');

  const headingElement = document.createElement('h1');
  headingElement.textContent = heading ? heading.textContent.trim() : '';

  // Extract the paragraph
  const paragraph = element.querySelector('div.elementor-widget-text-editor p');

  const paragraphElement = document.createElement('p');
  paragraphElement.textContent = paragraph ? paragraph.textContent.trim() : '';

  // Extract the buttons
  const buttons = [...element.querySelectorAll('a.elementor-button')];
  const buttonElements = buttons.map((button) => {
    const buttonElement = document.createElement('a');
    buttonElement.href = button.href;
    buttonElement.textContent = button.querySelector('.elementor-button-text')?.textContent.trim() || '';
    return buttonElement;
  });

  // Combine all extracted elements into a single cell for the content row
  const contentCell = document.createElement('div');
  contentCell.appendChild(headingElement);
  contentCell.appendChild(paragraphElement);
  buttonElements.forEach((buttonElement) => contentCell.appendChild(buttonElement));

  // Define the table structure
  const cells = [
    ['Hero'],
    [contentCell],
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
