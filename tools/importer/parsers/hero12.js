/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Hero'];

  // Safely extract content from the HTML structure
  const titleElementRaw = element.querySelector('.elementor-heading-title');
  const titleText = titleElementRaw && titleElementRaw.textContent ? titleElementRaw.textContent.trim() : '';
  const titleElement = document.createElement('h1');
  titleElement.textContent = titleText;

  const subtitleElementRaw = element.querySelector('h3.elementor-heading-title');
  const subtitleText = subtitleElementRaw && subtitleElementRaw.textContent ? subtitleElementRaw.textContent.trim() : '';
  const subtitleElement = document.createElement('h3');
  subtitleElement.textContent = subtitleText;

  const paragraphElementRaw = element.querySelector('p');
  const paragraphText = paragraphElementRaw && paragraphElementRaw.textContent ? paragraphElementRaw.textContent.trim() : '';
  const paragraphElement = document.createElement('p');
  paragraphElement.textContent = paragraphText;

  const ctaElementRaw = element.querySelector('h2.elementor-heading-title a');
  const ctaLink = document.createElement('a');
  if (ctaElementRaw && ctaElementRaw.href) {
    ctaLink.href = ctaElementRaw.href;
    ctaLink.textContent = ctaElementRaw.textContent ? ctaElementRaw.textContent.trim() : '';
  } else {
    ctaLink.textContent = '';
  }

  // Adjust rows to match the example, consolidating content into a single column
  const contentRow = [[titleElement, subtitleElement, paragraphElement, ctaLink]];

  const cells = [
    headerRow, // Block type header (this stays as a single column)
    [contentRow.flat()] // Consolidated single cell for the 2nd row
  ];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(blockTable);
}
