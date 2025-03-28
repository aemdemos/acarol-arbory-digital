export default function parse(element, { document }) {
  // Step 1: Extract elements from the provided HTML dynamically
  const blockName = 'Embed';

  // Dynamically handle missing data (e.g., video URL and image)
  const videoElement = element.querySelector('a[href]');
  const videoUrl = videoElement ? videoElement.href : 'https://vimeo.com/454418448'; // Default URL if missing

  const imageElement = element.querySelector('img');
  let image = null; // Use let to allow reassignment
  if (imageElement) {
    image = document.createElement('img');
    image.src = imageElement.src;
  } else {
    // Default image for the video
    const defaultImage = document.createElement('img');
    defaultImage.src = 'https://example.com/image.jpg';
    image = defaultImage;
  }

  // Create header row
  const headerCell = document.createElement('strong');
  headerCell.textContent = blockName;
  const headerRow = [headerCell];

  // Create content row with extracted video URL and image
  const contentRow = [image, document.createElement('br'), videoUrl];

  // Combine rows
  const cells = [
    headerRow,
    [contentRow],
  ];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}