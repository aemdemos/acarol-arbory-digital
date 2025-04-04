/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Hero'];

  // Extract relevant elements dynamically
  const titleElement = element.querySelector('.elementor-element-80772b0 .elementor-heading-title');
  const headingElement = element.querySelector('.elementor-element-e60eba9 h3');
  const paragraphElement = element.querySelector('.elementor-element-fd54bdb p');
  const ctaElement = element.querySelector('.elementor-element-76b7fe9 .elementor-button');
  const imageElement = element.querySelector('.elementor-element-8d129d0 img');

  // Combine all extracted content into a single cell for the second row
  const combinedCellContent = document.createElement('div');

  if (imageElement) {
    const img = document.createElement('img');
    img.src = imageElement.src;
    combinedCellContent.appendChild(img);
  }

  if (titleElement) {
    const titleDiv = document.createElement('div');
    titleDiv.textContent = titleElement.textContent;
    combinedCellContent.appendChild(titleDiv);
  }

  if (headingElement) {
    const headingDiv = document.createElement('h3');
    headingDiv.textContent = headingElement.textContent;
    combinedCellContent.appendChild(headingDiv);
  }

  if (paragraphElement) {
    const paragraphDiv = document.createElement('p');
    paragraphDiv.textContent = paragraphElement.textContent;
    combinedCellContent.appendChild(paragraphDiv);
  }

  if (ctaElement) {
    const link = document.createElement('a');
    link.href = ctaElement.href;
    link.textContent = ctaElement.textContent;
    combinedCellContent.appendChild(link);
  }

  const cells = [
    headerRow,
    [combinedCellContent],
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(block);
}