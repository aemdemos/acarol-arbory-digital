/* global WebImporter */
export default function parse(element, { document }) {
  // Extract relevant content from the input element
  const cards = [];

  // Add the block header
  const headerRow = ['Cards (no images)'];
  cards.push(headerRow);

  // Process each column in the given HTML element
  const columns = element.querySelectorAll('.elementor-top-column');
  columns.forEach((column) => {
    // Find the heading inside the column
    const headingEl = column.querySelector('h2');
    const heading = headingEl ? document.createElement('strong') : null;
    if (heading) {
      heading.textContent = headingEl.textContent.trim();
    }

    // Find the text editor content inside the column
    const textEditorEl = column.querySelector('.elementor-widget-text-editor');
    const textEl = textEditorEl ? document.createElement('div') : null;
    if (textEl) {
      textEl.innerHTML = textEditorEl.innerHTML.trim();
    }

    // Merge heading and text content into a single row value
    const rowContent = document.createElement('div');
    if (heading) rowContent.appendChild(heading);
    if (textEl) rowContent.appendChild(textEl);

    // Add the row to cards
    cards.push([rowContent]);
  });

  // Create the block table using WebImporter.DOMUtils.createTable()
  const blockTable = WebImporter.DOMUtils.createTable(cards, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}
