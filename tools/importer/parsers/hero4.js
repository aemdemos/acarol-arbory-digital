/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Hero'];

  // Extracting content from the image element
  const imageElement = element.querySelector('img');
  const image = document.createElement('img');
  image.src = imageElement.getAttribute('data-lazy-src') || imageElement.src;
  image.alt = imageElement.alt || '';

  // Extracting title and subheading
  const titleElement = element.querySelector('.elementor-element-adce6a5 .elementor-heading-title');
  const subheadingElement = element.querySelector('.elementor-element-3b24faa .elementor-heading-title');

  const title = document.createElement('h1');
  title.textContent = titleElement ? titleElement.textContent : '';

  const subheading = document.createElement('h3');
  subheading.textContent = subheadingElement ? subheadingElement.textContent : '';

  // Combine image, title, and subheading into a single cell
  const combinedContent = [image, title, subheading];

  // Creating table rows
  const cells = [
    headerRow,
    [combinedContent],
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the newly created block
  element.replaceWith(table);
}
