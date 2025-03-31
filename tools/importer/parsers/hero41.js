/* global WebImporter */
export default function parse(element, { document }) {
  // Create helper table function
  const createTable = WebImporter.DOMUtils.createTable;

  // Validate element
  if (!element) return;

  // Step-by-step extraction:

  // Extract image dynamically
  const imageElement = element.querySelector('.elementor-widget-image img');
  const image = document.createElement('img');
  if (imageElement) {
    image.src = imageElement.src;
    image.alt = imageElement.alt || ''; // extracting alt, fallback to empty
  }

  // Extract title dynamically
  const titleElement = element.querySelector('.elementor-widget-heading .elementor-heading-title');
  const title = document.createElement('h1');
  if (titleElement) {
    title.textContent = titleElement.textContent.trim(); // ensure no redundant spaces
  }

  // Extract subheading dynamically (optional)
  const subheadingElement = element.querySelector('.elementor-widget-text-editor p');
  const subheading = document.createElement('p');
  if (subheadingElement) {
    subheading.textContent = subheadingElement.textContent.trim(); // ensure no redundant spaces
  }

  // Extract optional call-to-action (button with link)
  const buttonElement = element.querySelector('.elementor-widget-button a');
  const button = document.createElement('a');
  if (buttonElement) {
    button.href = buttonElement.href;
    button.textContent = buttonElement.textContent.trim();
  }

  // Header row matches exactly
  const headerRow = ['Hero'];

  // Content row handling edge cases:
  const contentRow = [
    [image, title, subheading, button].filter(Boolean), // filter removes any empty elements
  ];

  // Creating the block table - 1 column and 2 rows
  const cells = [
    headerRow,
    contentRow,
  ];
  const block = createTable(cells, document);

  // Replace original element with the generated block
  element.replaceWith(block);
}
