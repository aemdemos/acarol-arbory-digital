/* global WebImporter */

export default function parse(element, { document }) {
  // Create an array to store rows of the table
  const cells = [];

  // Header Row (denoting block type)
  const headerRow = ['Hero'];
  cells.push(headerRow);

  // Find and dynamically extract key data
  // Extract Image
  const imgElement = element.querySelector('.jet-hor-timeline-item__card-img img');
  let img;
  if (imgElement) {
    img = document.createElement('img');
    img.src = imgElement.dataset.lazySrc || imgElement.src;
    img.alt = imgElement.alt || '';
  }

  // Extract Title
  const titleElement = element.querySelector('.jet-hor-timeline-item__card-title');
  let title;
  if (titleElement) {
    title = document.createElement('h1');
    title.textContent = titleElement.textContent.trim();
  }

  // Combine extracted elements into the second row content
  const secondRowContent = [];
  if (img) secondRowContent.push(img);
  if (title) secondRowContent.push(title);
  cells.push(secondRowContent);

  // Create and replace the table using the utility function
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
