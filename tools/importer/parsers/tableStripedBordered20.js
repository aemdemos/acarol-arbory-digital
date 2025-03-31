/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the title from the header
  const titleElement = element.querySelector('h2.single-post-title.entry-title');

  // Handle empty or missing data
  if (!titleElement) {
    console.warn('No title found in the provided element');
    return;
  }

  const title = document.createElement('h2');
  title.textContent = titleElement.textContent.trim(); // Extract dynamic content

  // Create the header row for the table
  const headerRow = ['Block Title'];

  // Create content rows based on the extracted content
  const contentRows = [
    [title],
  ];

  // Build table structure
  const table = WebImporter.DOMUtils.createTable([headerRow, ...contentRows], document);

  // Replace the original element with the new table block
  element.replaceWith(table);
}
