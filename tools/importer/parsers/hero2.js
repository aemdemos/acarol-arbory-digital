/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // Header row
  const headerRow = ['Hero'];
  cells.push(headerRow);

  // Content row
  const contentItems = [];

  // Extract background image if available
  const imageElement = element.querySelector('img');
  if (imageElement && imageElement.src) {
    const image = document.createElement('img');
    image.src = imageElement.src;
    contentItems.push(image);
  }

  // Extract title (mandatory)
  const titleElement = element.querySelector('h2');
  if (titleElement && titleElement.textContent.trim() !== '') {
    const title = document.createElement('h1');
    title.textContent = titleElement.textContent;
    contentItems.push(title);
  }

  // Extract Call-to-Action (optional)
  const buttonElement = element.querySelector('a');
  if (buttonElement && buttonElement.href && buttonElement.textContent.trim() !== '') {
    const button = document.createElement('a');
    button.href = buttonElement.href;
    button.textContent = buttonElement.textContent;
    contentItems.push(button);
  }

  // Validate that contentItems is not empty before pushing
  if (contentItems.length > 0) {
    cells.push([contentItems]);
  } else {
    cells.push(['Content missing']); // Edge case handling for missing content
  }

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
