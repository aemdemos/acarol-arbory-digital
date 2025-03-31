/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as specified in the example
  const headerRow = ['Embed'];

  // Extract and dynamically handle the image
  const image = element.querySelector('img');
  const imageElement = image ? document.createElement('img') : null;
  if (imageElement && image.getAttribute('src')) {
    imageElement.setAttribute('src', image.getAttribute('src'));
    imageElement.setAttribute('alt', image.getAttribute('alt'));
  }

  // Extract and dynamically handle the video link
  const link = element.querySelector('a');
  const linkElement = link ? document.createElement('a') : null;
  if (linkElement && link.getAttribute('href')) {
    linkElement.setAttribute('href', link.getAttribute('href'));
    linkElement.textContent = link.getAttribute('href');
  }

  // Organize content into a single cell with vertical stacking
  const contentCell = [];
  if (imageElement) contentCell.push(imageElement);
  if (linkElement) contentCell.push(document.createElement('br'), linkElement); // Add a line-break for vertical stacking

  const cells = [
    headerRow,
    [contentCell] // Ensure the second row has one column with stacked content
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block); // Replace the original element with the new block
}
