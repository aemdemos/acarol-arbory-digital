export default function parse(element, { document }) {
  const rows = [];

  // First row: Header row with block name
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Hero';
  rows.push(headerRow);

  // Second row: Content row
  const contentCell = document.createElement('div');

  // Extracting the image element
  const imgElement = element.querySelector('.elementor-flip-box__image img');
  if (imgElement) {
    const image = document.createElement('img');
    image.src = imgElement.dataset.lazySrc || imgElement.src;
    image.alt = imgElement.alt;
    contentCell.appendChild(image);
  }

  // Extracting the heading
  const flipBoxFront = element.querySelector('.elementor-flip-box__layer__front');
  if (flipBoxFront) {
    const headingElement = document.createElement('h1');
    headingElement.textContent = flipBoxFront.querySelector('.elementor-flip-box__layer__inner')?.textContent.trim();
    contentCell.appendChild(headingElement);
  }

  // Extracting the description
  const descriptionElement = element.querySelector('.elementor-flip-box__layer__description');
  if (descriptionElement) {
    const paragraph = document.createElement('p');
    paragraph.textContent = descriptionElement.textContent.trim();
    contentCell.appendChild(paragraph);
  }

  // Extracting the call-to-action button
  const ctaElement = element.querySelector('.elementor-flip-box__button');
  if (ctaElement) {
    const ctaLink = document.createElement('a');
    ctaLink.href = ctaElement.href;
    ctaLink.textContent = ctaElement.textContent.trim();
    contentCell.appendChild(ctaLink);
  }

  rows.push([contentCell]);

  // Creating the table using WebImporter.DOMUtils.createTable
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replacing the original element with the new table
  element.replaceWith(table);
}