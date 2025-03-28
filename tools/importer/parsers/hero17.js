export default function parse(element, { document }) {
  // Initialize the header row with a strong element containing 'Hero'
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Hero';

  // Initialize the cell for the content row
  const contentCell = [];

  // Extract Lottie animation (if present)
  const lottieContainer = element.querySelector('.e-lottie__container .e-lottie__animation');
  if (lottieContainer) {
    contentCell.push(lottieContainer);
  }

  // Extract heading (mandatory)
  const heading = element.querySelector('h2.elementor-heading-title');
  if (heading) {
    const headingElement = document.createElement('h1');
    headingElement.textContent = heading.textContent.trim();
    contentCell.push(headingElement);
  }

  // Extract paragraph/subheading (optional)
  const paragraph = element.querySelector('.elementor-widget-text-editor p');
  if (paragraph) {
    const paragraphElement = document.createElement('p');
    paragraphElement.textContent = paragraph.textContent.trim();
    contentCell.push(paragraphElement);
  }

  // Extract call-to-action button (optional)
  const button = element.querySelector('.elementor-widget-button a');
  if (button) {
    const buttonElement = document.createElement('a');
    buttonElement.href = button.href;
    buttonElement.textContent = button.textContent.trim();
    buttonElement.setAttribute('class', button.getAttribute('class')); // Preserve original classes
    contentCell.push(buttonElement);
  }

  // Ensure the content row follows the correct structure
  const cells = [
    headerRow, // Header row indicating block type
    [contentCell] // Content row with all extracted elements
  ];

  // Create a table block using the WebImporter utility
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}