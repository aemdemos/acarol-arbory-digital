/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Hero'];

  // Extract image dynamically
  const imageContainer = element.querySelector('.elementor-widget-image img');
  let image = null;
  if (imageContainer) {
    image = document.createElement('img');
    image.src = imageContainer.getAttribute('data-lazy-src') || imageContainer.src;
  }

  // Extract heading dynamically
  const headingContainer = element.querySelector('.elementor-widget-text-editor h1');
  let heading = null;
  if (headingContainer) {
    heading = document.createElement('h1');
    heading.textContent = headingContainer.textContent;
  }

  // Extract subheading dynamically
  const subheadingContainer = element.querySelector('.elementor-widget-text-editor p');
  let subheading = null;
  if (subheadingContainer) {
    subheading = document.createElement('p');
    subheading.textContent = subheadingContainer.textContent;
  }

  // Extract call-to-action dynamically
  const buttonContainer = element.querySelector('.elementor-widget-button a');
  let callToAction = null;
  if (buttonContainer) {
    callToAction = document.createElement('p');
    const link = document.createElement('a');
    link.href = buttonContainer.href;
    link.textContent = buttonContainer.querySelector('.elementor-button-text')?.textContent || '';
    callToAction.appendChild(link);
  }

  const cells = [
    headerRow,
    [image, heading, subheading, callToAction].filter(Boolean) // Filter out null values
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
