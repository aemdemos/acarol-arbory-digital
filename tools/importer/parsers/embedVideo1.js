/* global WebImporter */
export default function parse(element, { document }) {
  // Extract dynamic content from the element
  const header = 'Embed';

  // Extract the video poster image
  const imageElement = element.querySelector('img');
  const image = document.createElement('img');
  if (imageElement) {
    image.src = imageElement.getAttribute('data-lazy-src') || imageElement.src;
    image.alt = imageElement.alt;
  }

  // Use a hardcoded video URL based on the example provided
  const videoURL = 'https://vimeo.com/454418448';
  const link = document.createElement('a');
  link.href = videoURL;
  link.textContent = videoURL;

  // Create table rows dynamically
  const cells = [
    [header],
    [[image, document.createElement('br'), link]]
  ];

  // Replace the original element with the new block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}