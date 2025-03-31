/* global WebImporter */
export default function parse(element, { document }) {
  // Validate the element exists
  if (!element) return;

  // Extract the image source dynamically
  const img = element.querySelector('img');
  const imgSrc = img ? img.getAttribute('data-lazy-src') || img.getAttribute('src') : '';

  // Create the image element dynamically
  const imageElement = document.createElement('img');
  if (imgSrc) {
    imageElement.src = imgSrc;
  } else {
    // Handle edge case: Missing image source
    imageElement.alt = 'Image not available';
  }

  // Extract header dynamically if available
  const titleText = img ? img.alt : 'Default Heading'; // Use the alt text or fallback if no alt text
  const titleElement = document.createElement('h1');
  titleElement.textContent = titleText;

  // Construct the header row dynamically
  const headerRow = ['Hero'];

  // Structure the table data dynamically
  const tableData = [
    headerRow,
    [imageElement, titleElement],
  ];

  // Use createTable to create the structured table
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new table dynamically
  element.replaceWith(table);
}
