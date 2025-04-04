/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Video'];

  // Extract the image element dynamically
  const imageElement = element.querySelector('img');
  let image = null;
  if (imageElement) {
    image = document.createElement('img');
    image.src = imageElement.getAttribute('data-lazy-src') || imageElement.src;
    image.alt = imageElement.alt || '';
  }

  // Extract the link dynamically
  const linkElement = element.querySelector('a.elementor-button');
  let link = null;
  if (linkElement) {
    link = document.createElement('a');
    link.href = linkElement.href;
    link.textContent = linkElement.href;
  }

  // Construct table rows dynamically based on extracted content
  const contentRow = [];
  if (image) contentRow.push(image);
  if (link) contentRow.push(link);

  const tableArray = [
    headerRow,
    contentRow,
  ];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(tableArray, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}
