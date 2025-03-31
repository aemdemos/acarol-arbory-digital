/* global WebImporter */
export default function parse(element, { document }) {
  // Define block header
  const headerRow = ['Columns'];

  // Extract the content from the columns
  const column1Element = element.querySelector('.elementor-element-d2b2d8c .elementor-widget-container p');
  const column2Element = element.querySelector('.elementor-element-cdb59a7 .elementor-widget-container p');

  // Safely handle edge cases for missing elements
  const column1Content = column1Element ? column1Element.cloneNode(true) : document.createTextNode('');
  const column2Content = column2Element ? column2Element.cloneNode(true) : document.createTextNode('');

  // Structure table data dynamically
  const cells = [
    headerRow, // Header row
    [
      column1Content,
      column2Content
    ],
  ];

  // Create the block table using the helper function
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the newly created block table
  element.replaceWith(block);
}
