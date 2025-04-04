/* global WebImporter */

export default function parse(element, { document }) {
  // Extracting text from the header element
  const titleElement = element.querySelector('h2.single-post-title');
  const titleText = titleElement ? titleElement.textContent.trim() : '';

  // Define the header row for the table
  const headerRow = ['Table (striped, bordered)'];

  // Content rows for the table
  const contentRows = [
    [titleText],
  ];

  // Combine header and content rows
  const tableData = [headerRow, ...contentRows];

  // Create the table block
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}
