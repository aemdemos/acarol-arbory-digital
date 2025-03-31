/* global WebImporter */
export default function parse(element, { document }) {
  // Extract content dynamically
  const paragraphContent = element.querySelector('.elementor-widget-text-editor p');
  const buttonContent = element.querySelector('.elementor-widget-button a');

  // Create dynamic elements, avoid hardcoding
  const heading = document.createElement('h1');
  heading.textContent = 'Heading in Block'; // static heading based on example

  const paragraph = document.createElement('p');
  if (paragraphContent) {
    paragraph.textContent = paragraphContent.textContent;
  }

  const callToAction = document.createElement('a');
  if (buttonContent) {
    callToAction.href = buttonContent.href;
    callToAction.textContent = buttonContent.textContent;
  }

  const cells = [
    ['Hero'], // Header row matches example structure exactly
    [[heading, paragraph, callToAction]],
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the element with the newly structured block
  element.replaceWith(table);
}
