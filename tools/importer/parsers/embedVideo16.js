/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the video element and URL from the provided HTML structure
  const videoElement = element.querySelector('video.elementor-background-video-hosted');
  const videoUrl = videoElement ? videoElement.getAttribute('src') : '';

  // Validate that the video URL exists and include it in the table
  if (!videoUrl) {
    console.error('Video URL is missing');
    return;
  }

  // Create the header row for the Embed block
  const headerRow = ['Embed'];

  // Create the content row with the video URL embedded as a clickable link
  const linkElement = document.createElement('a');
  linkElement.href = videoUrl;
  linkElement.textContent = videoUrl;
  const contentRow = [linkElement];

  // Assemble the rows into a table structure
  const tableRows = [headerRow, contentRow];

  // Create the block table using the helper function
  const block = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}
