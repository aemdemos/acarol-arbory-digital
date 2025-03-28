export default function parse(element, { document }) {
  // Extract the relevant data
  const imageElement = element.querySelector('.elementor-widget-image img');
  const headingElement = element.querySelector('.elementor-element-adce6a5 .elementor-heading-title');
  const subheadingElement = element.querySelector('.elementor-element-3b24faa .elementor-heading-title');

  // Check if elements exist and handle edge cases
  const image = document.createElement('img');
  if (imageElement) {
    image.src = imageElement.dataset.lazySrc || imageElement.src;
    image.alt = imageElement.alt || '';
  } else {
    console.warn('Image element not found.');
  }

  const heading = document.createElement('h1');
  if (headingElement) {
    heading.textContent = headingElement.textContent;
  } else {
    console.warn('Heading element not found.');
  }

  const subheading = document.createElement('h3');
  if (subheadingElement) {
    subheading.textContent = subheadingElement.textContent;
  } else {
    console.warn('Subheading element not found.');
  }

  // Structure the table content
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Hero';
  const headerRow = [headerCell];

  // Combine all content into a single cell in the second row
  const contentCell = document.createElement('div');
  if (image) contentCell.appendChild(image);
  if (heading) contentCell.appendChild(heading);
  if (subheading) contentCell.appendChild(subheading);

  const contentRow = [contentCell];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

  // Replace the original element with the new block
  element.replaceWith(block);
}