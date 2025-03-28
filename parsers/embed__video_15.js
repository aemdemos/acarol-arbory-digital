export default function parse(element, { document }) {
  const cells = [];

  // Header row
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Embed';
  const headerRow = [headerCell];
  cells.push(headerRow);

  // Extracting content
  const contentRow = [];

  // Extract image
  const imageElement = element.querySelector('.player__artwork img');
  if (imageElement) {
    const img = document.createElement('img');
    img.src = imageElement.dataset.lazySrc || imageElement.src;
    contentRow.push(img);
  }

  // Extract video URL
  const linkElement = element.querySelector('audio source');
  if (linkElement) {
    const link = document.createElement('a');
    link.href = linkElement.src;
    link.textContent = linkElement.src;
    contentRow.push(link);
  }

  cells.push([contentRow]);

  // Create table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with the new block
  element.replaceWith(block);
}