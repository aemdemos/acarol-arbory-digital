/* global WebImporter */
export default function parse(element, { document }) {
  // Step 1: Extract relevant content from the input element
  const titleElement = element.querySelector('h1.elementor-heading-title');
  const backgroundOverlay = element.querySelector('.elementor-background-overlay');

  // Extract title text
  const title = titleElement ? titleElement.textContent.trim() : '';

  // Extract background image URL, if present
  const backgroundImage = backgroundOverlay && backgroundOverlay.style.backgroundImage
    ? backgroundOverlay.style.backgroundImage.match(/url\("(.*?)"\)/)?.[1]
    : '';

  // Step 2: Organize extracted content into the table structure
  /*
   * The table has:
   * - Header row: ['Hero']
   * - Content row: Contains the background image (if available) and title text.
   */
  const headerRow = ['Hero'];

  const contentRow = [];

  // Include the title as an HTML element in the content row
  if (title) {
    const heading = document.createElement('h1');
    heading.textContent = title;
    contentRow.push(heading);
  }

  // Include the background image as an HTML img element, if available
  if (backgroundImage) {
    const img = document.createElement('img');
    img.setAttribute('src', backgroundImage);
    contentRow.push(img);
  }

  const tableData = [
    headerRow,
    contentRow
  ];

  // Step 3: Create the block table using the WebImporter helper utility
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Step 4: Replace the original element with the new block table
  element.replaceWith(blockTable);
  
}
