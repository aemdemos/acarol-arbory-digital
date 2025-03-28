export default function parse(element, { document }) {
  // Create the header row
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Hero';

  // Extract elements from the HTML
  const paragraph = element.querySelector('.elementor-widget-text-editor p');
  const button = element.querySelector('.elementor-widget-button a');

  // Create the content for the second row
  const content = [];

  // Add the paragraph
  if (paragraph) {
    const heading = document.createElement('h1');
    heading.textContent = paragraph.textContent;
    content.push(heading);
  }

  // Add the button
  if (button) {
    const link = document.createElement('a');
    link.href = button.href;
    link.textContent = button.querySelector('.elementor-button-text')?.textContent.trim() || button.textContent.trim();
    content.push(link);
  }

  // Create the block table
  const cells = [
    headerRow, // Header row
    [content], // Content row
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the element with the new block
  element.replaceWith(block);
}