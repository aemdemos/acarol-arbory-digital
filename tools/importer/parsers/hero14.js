/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Hero'];

  // Extract heading (e.g., 'Our AEM Team') dynamically
  const headingElement = element.querySelector('.elementor-widget-heading .elementor-heading-title');
  const headingText = headingElement ? document.createElement('h1') : null;
  if (headingText) headingText.textContent = headingElement.textContent.trim();

  // Extract subheading paragraph dynamically
  const paragraphElement = element.querySelector('.elementor-widget-text-editor p');
  const paragraph = paragraphElement ? document.createElement('p') : null;
  if (paragraph) paragraph.textContent = paragraphElement.textContent.trim();

  // Extract call-to-action button dynamically
  const buttonElement = element.querySelector('.elementor-widget-button .elementor-button');
  const button = buttonElement ? document.createElement('a') : null;
  if (button) {
    button.textContent = buttonElement.textContent.trim();
    button.href = buttonElement.getAttribute('href');
  }

  // Extract background image dynamically
  const backgroundImageElement = element.querySelector('img');
  const backgroundImage = backgroundImageElement ? document.createElement('img') : null;
  if (backgroundImage) {
    backgroundImage.src = backgroundImageElement.getAttribute('src');
    backgroundImage.alt = backgroundImageElement.getAttribute('alt') || '';
  }

  // Structure the content array, handle missing elements gracefully
  const contentRow = [];
  if (backgroundImage) contentRow.push(backgroundImage);
  if (headingText) contentRow.push(headingText);
  if (paragraph) contentRow.push(paragraph);
  if (button) contentRow.push(button);

  const tableData = [headerRow, contentRow];
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}
