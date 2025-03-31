export default function parse(element, { document }) {
  // Create header row and ensure proper formatting
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Embed';
  const headerRow = [headerCell];

  // Dynamically extract image content
  const imageDiv = element.querySelector('.jet-parallax-section__image');
  const imageElement = document.createElement('img');
  if (imageDiv) {
    const backgroundImage = imageDiv.style.backgroundImage;
    if (backgroundImage) {
      const imageUrlMatch = backgroundImage.match(/url\(['"]?([^'"]*)['"]?\)/);
      if (imageUrlMatch && imageUrlMatch[1]) {
        imageElement.src = imageUrlMatch[1];
      }
    }
  }
  imageElement.alt = 'Video thumbnail';

  // Dynamically extract video link
  const linkElement = element.querySelector('a[href*="vimeo.com"]');
  const videoLink = document.createElement('a');
  if (linkElement && linkElement.href) {
    videoLink.href = linkElement.href;
    videoLink.textContent = linkElement.href;
  }

  // Create table rows
  const cells = [
    headerRow, // Header row with correct formatting
    [imageElement, videoLink], // Content row with extracted elements
  ];

  // Create block table using helper function
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with new table
  element.replaceWith(block);
}