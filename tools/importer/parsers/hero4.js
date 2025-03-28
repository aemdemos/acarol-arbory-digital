export default function parse(element, { document }) {
  const cells = [];

  // Create the header row with block name 'Hero'
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Hero';
  cells.push(headerRow);

  // Extract image from the element
  const imageContainer = element.querySelector('.elementor-widget-image img');
  const image = document.createElement('img');
  image.src = imageContainer ? (imageContainer.getAttribute('data-lazy-src') || imageContainer.getAttribute('src')) : '';
  image.alt = imageContainer ? (imageContainer.alt || '') : '';

  // Extract heading and subheading
  const headingContainer = element.querySelector('.elementor-element-adce6a5 .elementor-heading-title');
  const heading = document.createElement('h1');
  heading.textContent = headingContainer ? headingContainer.textContent.trim() : '';

  const subheadingContainer = element.querySelector('.elementor-element-3b24faa .elementor-heading-title');
  const subheading = document.createElement('h3');
  subheading.textContent = subheadingContainer ? subheadingContainer.textContent.trim() : '';

  // Combine extracted elements into a single row
  const contentCell = document.createElement('div');
  if (image.src) contentCell.appendChild(image);
  if (heading.textContent) contentCell.appendChild(heading);
  if (subheading.textContent) contentCell.appendChild(subheading);

  const contentRow = [contentCell];
  cells.push(contentRow);

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block
  element.replaceWith(block);
}