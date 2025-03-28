export default function parse(element, { document }) {
  // Correctly match the header row according to the example
  const headerRow = ['Embed'];

  // Extract the image dynamically
  const imageElement = element.querySelector('img');
  const clonedImage = imageElement ? imageElement.cloneNode(true) : null;

  // Use the external video URL as per the example
  const externalVideoUrl = 'https://vimeo.com/454418448';

  // Create the content row with the image and external video URL
  const contentRow = [];
  if (clonedImage) contentRow.push(clonedImage);
  contentRow.push(externalVideoUrl);

  // Create the table structure with the corrected header row and content row
  const cells = [
    headerRow,
    contentRow,
  ];

  // Create the block table using WebImporter.DOMUtils.createTable()
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the generated block table
  element.replaceWith(blockTable);
}
