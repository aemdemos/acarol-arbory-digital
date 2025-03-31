/* global WebImporter */
export default function parse(element, { document }) {
  // Extract content dynamically
  const imageEl = element.querySelector('img');
  const titleEl = element.querySelector('.elementor-column .elementor-element-adce6a5 .elementor-widget-container .elementor-heading-title');
  const subheadingEl = element.querySelector('.elementor-column .elementor-element-3b24faa .elementor-widget-container h3');

  // Create content pieces dynamically, with safeguards
  let contentArray = [];

  if (imageEl) {
    const image = document.createElement('img');
    image.src = imageEl.src;
    image.alt = imageEl.alt || '';
    contentArray.push(image);
  }

  if (titleEl) {
    const title = document.createElement('h1');
    title.textContent = titleEl.textContent.trim();
    contentArray.push(title);
  }

  if (subheadingEl) {
    const subheading = document.createElement('h3');
    subheading.textContent = subheadingEl.textContent.trim();
    contentArray.push(subheading);
  }

  // Build table structure
  const cells = [
    ['Hero'], // Header row exactly matches example -- one column with block name 'Hero'
    [contentArray], // Combine all content into a single cell in the second row
  ];

  // Create replacement block table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with the new block table
  element.replaceWith(table);
}
