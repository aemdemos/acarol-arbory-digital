/* global WebImporter */
export default function parse(element, { document }) {
  // Extract relevant data from the HTML element
  const rows = [];

  // Define the header row as specified in the example
  const headerRow = ['Table (striped, bordered)'];
  rows.push(headerRow);

  // Create a deduplication map for URLs to avoid redundancy in rows
  const seenUrls = new Set();

  // Gather product data dynamically from the given HTML structure
  const productElements = element.querySelectorAll('a[href]');
  productElements.forEach((product) => {
    const productName = product.getAttribute('data-elementor-lightbox-title');
    const productUrl = product.getAttribute('href');

    if (productName && productUrl && !seenUrls.has(productUrl)) {
      // Create anchor element for clickable URLs
      const anchorElement = document.createElement('a');
      anchorElement.href = productUrl;
      anchorElement.textContent = productUrl;

      rows.push([productName, anchorElement]);
      seenUrls.add(productUrl);
    }
  });

  // Create the table block
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}
