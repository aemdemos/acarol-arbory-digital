/* global WebImporter */
export default function parse(element, { document }) {
  // Extracting image
  const image = element.querySelector('img');
  const backgroundImage = image ? document.createElement('img') : null;
  if (backgroundImage) {
    backgroundImage.src = image.dataset.lazySrc || image.src;
    backgroundImage.alt = image.alt || '';
  }

  // Extracting heading
  const headingEl = element.querySelector('h2');
  const heading = headingEl ? document.createElement('h1') : null;
  if (heading) {
    heading.textContent = headingEl.textContent.trim();
  }

  // Extracting subheading
  const subheadingEl = element.querySelector('.elementor-widget-text-editor p');
  const subheading = subheadingEl ? document.createElement('p') : null;
  if (subheading) {
    subheading.textContent = subheadingEl.textContent.trim();
  }

  // Extracting call-to-action
  const ctaEl = element.querySelector('.elementor-widget-button a');
  const cta = ctaEl ? document.createElement('a') : null;
  if (cta) {
    cta.textContent = ctaEl.textContent.trim();
    cta.href = ctaEl.href;
  }

  // Preparing table data
  const headerRow = ['Hero'];
  const contentRow = [
    [backgroundImage, heading, subheading, cta].filter(Boolean),
  ];

  const cells = [headerRow, contentRow];

  // Creating a block table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replacing the original element with the new block table
  element.replaceWith(blockTable);
}