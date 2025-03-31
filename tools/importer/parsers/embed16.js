/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the video URL
  const videoElement = element.querySelector('.elementor-background-video-hosted');
  const videoUrl = videoElement?.getAttribute('src') || '';

  // Prepare the header row and content row
  const headerRow = ['Embed'];

  const contentRow = [];

  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', videoUrl);
  linkElement.textContent = videoUrl;

  if (videoUrl) {
    contentRow.push(linkElement);
  }

  // Create the table block
  const cells = [
    headerRow,
    contentRow
  ];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(blockTable);
}
