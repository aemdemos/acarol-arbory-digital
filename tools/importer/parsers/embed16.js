export default function parse(element, { document }) {
  // Extract the video URL dynamically from the provided HTML
  const videoElement = element.querySelector('video');
  const videoURL = videoElement?.getAttribute('src');

  if (!videoURL) {
    console.warn('Video element missing or invalid URL');
    return;
  }

  const headerRow = ['Embed'];

  // Create the video link row dynamically
  const contentRow = [document.createElement('a')];
  const linkElement = contentRow[0];
  linkElement.setAttribute('href', videoURL);
  linkElement.textContent = videoURL;

  const cells = [
    headerRow, // Block header row identical to the example
    contentRow // Content row dynamically constructed with the video URL link
  ];

  // Dynamically create the block table using the provided helper function
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the newly generated block table
  element.replaceWith(blockTable);
}