export default function parse(element, context) {
  const { document } = context;

  // Create and match header row exactly
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Hero';
  const headerRow = [headerCell];

  // Extract heading
  const titleElement = element.querySelector('h2');
  const title = titleElement ? document.createElement('h2') : null;
  if (title && titleElement.textContent) {
    title.textContent = titleElement.textContent.trim();
  }

  // Extract paragraph
  const paragraphElement = element.querySelector('p');
  const paragraph = paragraphElement ? document.createElement('p') : null;
  if (paragraph && paragraphElement.textContent) {
    paragraph.textContent = paragraphElement.textContent.trim();
  }

  // Extract button with link
  const buttonElement = element.querySelector('a.elementor-button');
  let button = null;
  if (buttonElement) {
    button = document.createElement('div');
    const link = document.createElement('a');
    link.href = buttonElement.href;
    link.textContent = buttonElement.textContent.trim();
    button.appendChild(link);
  }

  // Combine heading, paragraph, and button into a single cohesive content cell
  const contentCellElements = [];
  if (title) contentCellElements.push(title);
  if (paragraph) contentCellElements.push(paragraph);
  if (button) contentCellElements.push(button);
  const contentRow = [contentCellElements];

  // Combine extracted content into cells
  const cells = [
    headerRow, // Header row
    contentRow // Content row
  ];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with the new block table
  element.replaceWith(block);
}