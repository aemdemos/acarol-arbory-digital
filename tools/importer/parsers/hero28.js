export default function parse(element, { document }) {
  // Define header row as per example
  const heroHeader = ['Hero'];

  // Extract paragraph element dynamically
  const paragraph = element.querySelector('.elementor-widget-text-editor p');

  // Ensure paragraph exists, else create a fallback
  const paragraphContent = paragraph || document.createElement('p');

  // Extract button element dynamically
  const button = element.querySelector('.elementor-widget-button a');

  // Ensure button exists, else create a fallback with placeholder text
  const buttonElement = button || (() => {
    const fallbackButton = document.createElement('a');
    fallbackButton.textContent = 'Call-to-Action';
    return fallbackButton;
  })();

  // Create table rows keeping extracted content
  const contentRow = [
    paragraphContent,
    buttonElement
  ];

  // Generate block table following the prescribed format
  const blockTable = WebImporter.DOMUtils.createTable(
    [heroHeader, contentRow],
    document
  );

  // Replace original element with the new block table
  element.replaceWith(blockTable);

  // Do not return anything
}