export default function parse(element, { document }) {
  // Set up the header row based on the example
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Video';

  // Extract the image element
  const imageElement = element.querySelector('img');
  let videoSource = null;

  // Extract image source if present
  if (imageElement) {
    const src = imageElement.getAttribute('data-lazy-src') || imageElement.getAttribute('src');
    imageElement.src = src; // Ensure the src is properly set
  }

  // Extract video link or create a placeholder if not available in the HTML
  const buttonElement = element.querySelector('a.elementor-button');
  if (buttonElement) {
    videoSource = buttonElement.href;
  } else {
    videoSource = 'https://example.com/fallback-video-url'; // Placeholder URL
  }

  // Create content row with image and video link (if both are available)
  const contentRow = [
    [
      imageElement || document.createTextNode('No image available'),
      document.createElement('br'),
      document.createTextNode(videoSource)
    ]
  ];

  // Structure the table data
  const tableData = [
    headerRow,
    contentRow
  ];

  // Create the table block using the helper function
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new table block
  element.replaceWith(blockTable);
}