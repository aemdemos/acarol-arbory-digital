/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the image
  const imageElement = element.querySelector('img');
  const image = imageElement ? document.createElement('img') : null;
  if (image) {
    image.src = imageElement.dataset.lazySrc || imageElement.src;
    image.alt = imageElement.alt || '';
  }

  // Extract the heading
  const headingElement = element.querySelector('h1');
  const heading = headingElement ? document.createElement('h1') : null;
  if (heading) {
    heading.textContent = headingElement.textContent.trim();
  }

  // Extract the subheading
  const subheadingElement = element.querySelector('p');
  const subheading = subheadingElement ? document.createElement('p') : null;
  if (subheading) {
    subheading.textContent = subheadingElement.textContent.trim();
  }

  // Extract the call-to-action
  const ctaElement = element.querySelector('.elementor-button');
  const cta = ctaElement ? document.createElement('a') : null;
  if (cta) {
    cta.href = ctaElement.href;
    cta.textContent = ctaElement.textContent.trim();
  }

  // Create the block table
  const headerRow = ['Hero'];
  const contentRow = [
    [image, heading, subheading, cta].filter(Boolean), // Filter out null values
  ];
  const tableData = [headerRow, contentRow];
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new table block
  element.replaceWith(blockTable);
}
