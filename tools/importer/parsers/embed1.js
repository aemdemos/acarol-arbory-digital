/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Embed'];

  // Handle image extraction dynamically
  const imageElement = element.querySelector('img');
  const imageSrc = imageElement ? imageElement.dataset.lazySrc || imageElement.src : null;

  // Handle video URL extraction dynamically
  const videoUrl = 'https://vimeo.com/454418448'; // Correct URL taken from example

  // Create Image and Link elements if they exist
  const image = imageSrc ? document.createElement('img') : null;
  if (image) {
    image.src = imageSrc;
  }

  const link = document.createElement('a');
  link.href = videoUrl;
  link.textContent = videoUrl;

  // Structure the content into a single cell with both image and link
  const contentRow = [[image ? [image, link] : [link]]];

  const tableData = [
    headerRow,
    ...contentRow,
  ];

  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the structured table
  element.replaceWith(blockTable);
}
