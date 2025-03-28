export default function parse(element, { document }) {
  // Helper function to find nested elements
  const findElement = (selector) => element.querySelector(selector);

  // Extract relevant content
  const paragraph = findElement('.elementor-widget-text-editor p');
  const button = findElement('.elementor-widget-button a');

  // Edge case handling for missing content
  const headingText = paragraph ? paragraph.textContent.trim() : '';
  const callToActionLink = button ? button.href : '#';
  const callToActionText = button ? button.textContent.trim() : '';

  // Create structured elements
  const heading = document.createElement('h1');
  heading.textContent = headingText;

  const callToAction = document.createElement('a');
  callToAction.href = callToActionLink;
  callToAction.textContent = callToActionText;

  // Create table
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Hero';

  const contentRow = [heading, callToAction];

  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

  // Replace the original element
  element.replaceWith(table);
}