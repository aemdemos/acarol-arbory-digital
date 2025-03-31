export default function parse(element, { document }) {
  // Safely fetch the button element
  const buttonElement = element.querySelector('a.elementor-button');
  if (!buttonElement) {
    console.warn('Button element is missing');
    return;
  }

  // Ensure safe access for text content from '.elementor-button-text'
  const buttonContentWrapper = buttonElement.querySelector('.elementor-button-text');
  const buttonText = (buttonContentWrapper && buttonContentWrapper.innerText) ? buttonContentWrapper.innerText.trim() : 'Request a Quote';
  const linkHref = buttonElement.getAttribute('href') || '#';

  // Create a link element dynamically
  const link = document.createElement('a');
  link.setAttribute('href', linkHref);
  link.textContent = buttonText;

  // Create header row with exact match
  const headerRow = ['Hero'];

  // Define table cells structure
  const cells = [
    headerRow, // Header row matching example
    [link]    // Content row including dynamically created Call-to-Action link
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}