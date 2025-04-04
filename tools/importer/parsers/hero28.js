/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Hero'];

  // Extracting necessary content from the provided HTML
  const paragraph = element.querySelector('p');
  const linkWrapper = element.querySelector('.elementor-button-wrapper a');

  // Create elements for the content row
  const contentRow = [];

  if (paragraph || linkWrapper) {
    const container = document.createElement('div');

    if (paragraph) {
      const paragraphElement = document.createElement('p');
      paragraphElement.textContent = paragraph.textContent;
      container.appendChild(paragraphElement);
    }

    if (linkWrapper) {
      const linkElement = document.createElement('a');
      linkElement.href = linkWrapper.href;
      linkElement.textContent = linkWrapper.textContent.trim();
      container.appendChild(linkElement);
    }

    contentRow.push(container);
  }

  // Table structure
  const cells = [
    headerRow,          // Header row (only one column)
    contentRow          // Content row (only one column with combined content)
  ];

  // Create table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}