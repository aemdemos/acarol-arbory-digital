export default function parse(element, { document }) {
  // Extract key elements
  const titleElement = element.querySelector('.elementor-heading-title');
  const descriptionElement = element.querySelector('.elementor-widget-text-editor p');
  const buttonElement = element.querySelector('.elementor-button-link');

  // Create new structured elements dynamically
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Hero'; // Header should match example exactly

  const headerRow = [headerCell];

  const contentRow = [];

  if (titleElement) {
    const heading = document.createElement('h2');
    heading.textContent = titleElement.textContent.trim();
    contentRow.push(heading);
  }

  if (descriptionElement) {
    const paragraph = document.createElement('p');
    paragraph.textContent = descriptionElement.textContent.trim();
    contentRow.push(paragraph);
  }

  if (buttonElement) {
    const link = document.createElement('a');
    link.href = buttonElement.href;
    link.textContent = buttonElement.textContent.trim();
    contentRow.push(link);
  }

  // Edge case handling for empty rows
  if (contentRow.length === 0) {
    console.warn('Content row is empty, no valid elements found');
  }

  // Create the block table
  const cells = [headerRow, contentRow];
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  if (blockTable) {
    element.replaceWith(blockTable);
  } else {
    console.error('Failed to create block table');
  }
}