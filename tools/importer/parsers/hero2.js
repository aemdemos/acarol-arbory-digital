/* global WebImporter */
export default function parse(element, { document }) {
  // Extract dynamic content from the element
  const titleElement = element.querySelector('.elementor-heading-title');
  const subheadingElement = element.querySelector('div.elementor-widget-heading:nth-child(2) .elementor-heading-title');
  const ctaElement = element.querySelector('.elementor-button a');
  const imageElement = element.querySelector('img');

  // Handle edge cases for missing data
  const title = titleElement ? (() => {
    const h1 = document.createElement('h1');
    h1.textContent = titleElement.textContent.trim();
    return h1;
  })() : '';

  const subheading = subheadingElement ? (() => {
    const h2 = document.createElement('h2');
    h2.innerHTML = subheadingElement.innerHTML.trim();
    return h2;
  })() : '';

  const cta = ctaElement ? (() => {
    const link = document.createElement('a');
    link.href = ctaElement.href;
    link.textContent = ctaElement.textContent.trim();
    return link;
  })() : '';

  const image = imageElement ? (() => {
    const img = document.createElement('img');
    img.src = imageElement.dataset.lazySrc || imageElement.src;
    img.alt = imageElement.alt || '';
    return img;
  })() : '';

  // Create table cells dynamically based on extracted content
  const cellContent = [image, title, subheading, cta].filter(Boolean);

  // Define table structure
  const cells = [
    ['Hero'], // Header row matching the example
    [cellContent] // Content row with all extracted elements
  ];

  // Create block table using helper function
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}