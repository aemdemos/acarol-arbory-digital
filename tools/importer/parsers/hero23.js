/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Hero'];

  const cells = [headerRow];

  // Extract front image content
  const frontImage = element.querySelector('.elementor-flip-box__front img');
  const imageSrc = frontImage ? frontImage.getAttribute('data-lazy-src') || frontImage.src : '';

  const imageElement = document.createElement('img');
  imageElement.src = imageSrc;

  // Extract back side content
  const backDescription = element.querySelector('.elementor-flip-box__layer__description')?.textContent.trim() || '';
  const backLink = element.querySelector('.elementor-flip-box__button');
  const linkText = backLink?.textContent.trim() || '';
  const linkHref = backLink?.href || '';

  const linkElement = document.createElement('a');
  linkElement.href = linkHref;
  linkElement.textContent = linkText;

  // Combine extracted content into a single cell
  const combinedCellContent = document.createElement('div');
  combinedCellContent.appendChild(imageElement);

  const headingElement = document.createElement('h1');
  headingElement.textContent = backDescription;
  combinedCellContent.appendChild(headingElement);

  combinedCellContent.appendChild(linkElement);

  cells.push([combinedCellContent]);

  // Create table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
