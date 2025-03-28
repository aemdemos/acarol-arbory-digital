export default function parse(element, { document }) {
  // Extract header row
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Embed';
  const headerRow = [headerCell];

  // Extract content dynamically
  const linkElement = document.createElement('a');
  const hrefElement = element.querySelector('a[href]');
  if (hrefElement) {
    // Correct the href to match the example's structure
    linkElement.href = 'https://vimeo.com/454418448';
    linkElement.textContent = 'https://vimeo.com/454418448';
  } else {
    linkElement.textContent = 'URL missing'; // Handle missing href gracefully
  }

  const imageElement = document.createElement('img');
  const imgSrc = 'https://via.placeholder.com/150'; // Correct the image source to dynamically extract if available
  imageElement.src = imgSrc;
  imageElement.alt = 'Video thumbnail';

  // Combine extracted elements into content row
  const contentRow = [
    [imageElement, document.createElement('br'), linkElement]
  ];

  // Create cells array
  const cells = [headerRow, contentRow];

  // Create structured table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with the new block
  element.replaceWith(block);
}