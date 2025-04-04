/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the image URL and alt text
  const imageElement = element.querySelector('img');
  const imageUrl = imageElement?.getAttribute('src') || '';
  const altText = imageElement?.getAttribute('alt') || 'Default Alt Text';

  // Create an image element dynamically
  const image = document.createElement('img');
  if (imageUrl) {
    image.setAttribute('src', imageUrl);
  } else {
    console.warn('Image URL is missing');
  }
  image.setAttribute('alt', altText);

  // Extract title from alt text dynamically
  const titleText = altText?.split('–')[0]?.trim() || 'Default Title';

  // Create a heading element dynamically
  const heading = document.createElement('h1');
  heading.textContent = titleText;

  // Create the table structure matching the example
  const cells = [
    ['Hero'], // Header row, exactly matching the example
    [[image, heading]] // Combine image and heading into one cell in the content row
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}