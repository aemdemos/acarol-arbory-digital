export default function parse(element, { document }) {
  // Helper function from WebImporter.DOMUtils
  const { createTable } = WebImporter.DOMUtils;

  // Extract text content from both columns
  const column1Element = element.querySelector(
    '.elementor-column[data-id="d2b2d8c"] .elementor-widget-container > p'
  );

  const column2Element = element.querySelector(
    '.elementor-column[data-id="cdb59a7"] .elementor-widget-container > p'
  );

  // Ensure we handle edge cases like missing elements
  const column1Content = column1Element ? column1Element.outerHTML : '';
  const column2Content = column2Element ? column2Element.outerHTML : '';

  // Build rows for the output block table
  const headerRow = ['Columns']; // Define the header of the table

  const bodyRow = [
    column1Content,
    column2Content,
  ];

  // Create the table block
  const tableBlock = createTable([headerRow, bodyRow], document);

  // Replace the original element with the generated table block
  element.replaceWith(tableBlock);
}