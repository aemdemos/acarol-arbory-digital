export default function parse(element, { document }) {
  // Helper function to create the structured table
  const createTable = WebImporter.DOMUtils.createTable;

  // Extract image
  const imageElement = element.querySelector('img');
  const image = imageElement ? document.createElement('img') : null;
  if (image) {
    image.src = imageElement.dataset.lazySrc || imageElement.src;
    image.alt = imageElement.alt;
  }

  // Extract video link
  const videoLink = 'https://vimeo.com/454418448';  // Example external video URL.
  const link = document.createElement('a');
  link.href = videoLink;
  link.textContent = videoLink;

  // Create the table structure
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Embed';
  const headerRow = [headerCell];

  // Combine image and link into a single cell
  const contentCell = document.createElement('div');
  if (image) contentCell.appendChild(image);
  contentCell.appendChild(link);
  const contentRow = [contentCell];

  const cells = [headerRow, contentRow];

  // Create the block table
  const blockTable = createTable(cells, document);

  // Replace the original element
  element.replaceWith(blockTable);
}