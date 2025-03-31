/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Hero'];

  // Extract the content from the element
  const heading = element.querySelector('.elementor-heading-title');
  const description = element.querySelector('.elementor-widget-text-editor p');
  const buttons = Array.from(element.querySelectorAll('.elementor-button-wrapper a')).map((button) => {
    const buttonText = button.querySelector('.elementor-button-text')?.textContent.trim() || '';
    const buttonLink = button.getAttribute('href') || '';
    const link = document.createElement('a');
    link.href = buttonLink;
    link.textContent = buttonText;
    return link;
  });

  // Create content cell combining all the elements
  const contentCell = [];

  // Add heading
  if (heading) {
    const headingElement = document.createElement('h1');
    headingElement.textContent = heading.textContent.trim();
    contentCell.push(headingElement);
  }

  // Add description
  if (description) {
    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = description.textContent.trim();
    contentCell.push(descriptionElement);
  }

  // Add buttons
  if (buttons.length > 0) {
    contentCell.push(...buttons);
  }

  // Create the table
  const cells = [
    headerRow,
    [contentCell]
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
