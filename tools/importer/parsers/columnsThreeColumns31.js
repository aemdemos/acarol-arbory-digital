/* global WebImporter */
export default function parse(element, { document }) {
  // Extract relevant text content from each column
  const columnContents = [];
  const columns = element.querySelectorAll('.elementor-column');

  columns.forEach((col) => {
    const textElement = col.querySelector('.elementor-widget-text-editor');
    if (textElement) {
      // Strip unnecessary structural attributes and classes
      const formattedContent = document.createElement('div');
      formattedContent.innerHTML = textElement.querySelector('p').innerHTML.trim();
      columnContents.push(formattedContent);
    }
  });

  // Create cells for the table
  const headerRow = ['Columns'];
  const contentRow = columnContents.map((content) => {
    const container = document.createElement('div');
    container.innerHTML = content.innerHTML; // Simplified content
    return container;
  });

  const cells = [headerRow, contentRow];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}