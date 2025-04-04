/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Hero'];

  // Extract content from the element
  const title = element.querySelector('.elementor-heading-title')?.textContent.trim();
  const text = element.querySelector('.elementor-widget-text-editor p')?.textContent.trim();
  const button = element.querySelector('.elementor-button');
  const buttonLink = button?.href;
  const buttonText = button?.textContent.trim();

  // Create structured elements
  const titleElement = title ? document.createElement('h1') : null;
  if (titleElement) {
    titleElement.textContent = title;
  }

  const textElement = text ? document.createElement('p') : null;
  if (textElement) {
    textElement.textContent = text;
  }

  const buttonElement = buttonText && buttonLink ? document.createElement('a') : null;
  if (buttonElement) {
    buttonElement.href = buttonLink;
    buttonElement.textContent = buttonText;
  }

  // Assemble data into table format
  const cells = [
    headerRow,
    [
      [titleElement, textElement, buttonElement].filter(Boolean), // Only include non-null elements
    ],
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
