export default function parse(element, { document }) {
  const cells = [];

  // Header row
  const headerRow = ['Hero'];
  cells.push(headerRow);

  // Content row
  const contentRow = [];

  // Extract the image from the first column
  const imageElement = element.querySelector('img');
  const fragments = [];
  if (imageElement) {
    const image = document.createElement('img');
    image.src = imageElement.getAttribute('data-lazy-src') || imageElement.src;
    image.alt = imageElement.alt || '';
    fragments.push(image);
  }

  // Create and style the heading
  const headingElement = element.querySelector('h1');
  if (headingElement) {
    const heading = document.createElement('h1');
    heading.innerHTML = headingElement.innerHTML;
    fragments.push(heading);
  }

  // Add subheading if available
  const subheadingElement = element.querySelector('p');
  if (subheadingElement) {
    const subheading = document.createElement('p');
    subheading.innerHTML = subheadingElement.innerHTML;
    fragments.push(subheading);
  }

  // Add the call-to-action button if available
  const buttonElement = element.querySelector('.elementor-button');
  if (buttonElement) {
    const cta = document.createElement('a');
    cta.href = buttonElement.href;
    cta.innerHTML = buttonElement.textContent.trim();
    fragments.push(cta);
  }

  contentRow.push(fragments);
  cells.push(contentRow);

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}