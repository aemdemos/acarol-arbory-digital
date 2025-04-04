/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row matching the example
  const headerRow = ['Embed'];

  // Safely extract the image or fallback to an empty element
  const imageElement = element.querySelector('img');
  let image;
  if (imageElement) {
    image = document.createElement('img');
    image.src = imageElement.getAttribute('data-lazy-src') || imageElement.getAttribute('src');
  } else {
    image = document.createElement('span'); // Empty placeholder if no image
  }

  // Safely extract the link or fallback to an empty element
  const linkElement = element.querySelector('a[href]');
  let link;
  if (linkElement) {
    link = document.createElement('a');
    link.href = linkElement.getAttribute('href');
    link.textContent = link.href;
  } else {
    link = document.createElement('span'); // Empty placeholder if no link
  }

  // Combine image and link in a single cell
  const combinedCell = [image, link];

  // Construct table cells
  const cells = [
    headerRow,
    [combinedCell],
  ];

  // Create table block using the helper function
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}