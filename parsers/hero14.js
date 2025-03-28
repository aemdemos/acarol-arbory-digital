export default function parse(element, { document }) {
  const createTable = WebImporter.DOMUtils.createTable;

  // Create the header row with exact text
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Hero';
  const headerRow = [headerCell];

  // Extract heading (mandatory)
  const headingElement = element.querySelector('.elementor-heading-title');
  const heading = document.createElement('h1');
  heading.textContent = headingElement ? headingElement.textContent.trim() : '';

  // Extract image (optional)
  const imageElement = element.querySelector('img');
  const image = document.createElement('img');
  if (imageElement) {
    image.src = imageElement.dataset.lazySrc || imageElement.src;
    image.alt = imageElement.alt || '';
  }

  // Extract call-to-action (optional)
  const buttonElement = element.querySelector('.elementor-button');
  const ctaLink = document.createElement('a');
  if (buttonElement) {
    ctaLink.href = buttonElement.href;
    ctaLink.textContent = buttonElement.textContent.trim();
  }

  // Combine the content into a single cell
  const contentCell = document.createElement('div');
  if (image) contentCell.appendChild(image);
  if (heading) contentCell.appendChild(heading);
  if (ctaLink) contentCell.appendChild(ctaLink);

  const contentRow = [contentCell];

  // Create the table
  const table = createTable([headerRow, contentRow], document);

  // Replace the original element with the new block table
  element.replaceWith(table);
}