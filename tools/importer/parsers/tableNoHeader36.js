/* global WebImporter */
export default function parse(element, { document }) {
  // Initialize header row based on example
  const headerRow = ['Table (no header)'];

  // Initialize an array to store the rows of the table
  const rows = [];

  // Parse the heading element
  const headingElement = element.querySelector('h3.elementor-heading-title');
  if (headingElement) {
    rows.push([headingElement.textContent.trim()]);
  }

  // Parse the paragraph element
  const paragraphElement = element.querySelector('div.elementor-widget-text-editor p');
  if (paragraphElement) {
    rows.push([paragraphElement.textContent.trim()]);
  }

  // Parse the secondary heading
  const secondaryHeadingElement = element.querySelector('div.elementor-widget-heading div.elementor-heading-title');
  if (secondaryHeadingElement) {
    rows.push([secondaryHeadingElement.textContent.trim()]);
  }

  // Parse the button
  const buttonElement = element.querySelector('a.elementor-button');
  if (buttonElement) {
    const buttonText = buttonElement.querySelector('span.elementor-button-text');
    if (buttonText) {
      rows.push([buttonText.textContent.trim()]);
    }
  }

  // Combine the header row and content rows
  const tableContent = [headerRow, ...rows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableContent, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
