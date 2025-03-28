export default function parse(element, { document }) {
  // Extract the title dynamically
  const titleElement = element.querySelector('.elementor-widget-heading h1');
  const title = titleElement ? document.createElement('h1') : null;
  if (title) {
    title.textContent = titleElement.textContent;
  }

  // Extract the description dynamically
  const descriptionElement = element.querySelector('.elementor-widget-text-editor p');
  const description = descriptionElement ? document.createElement('p') : null;
  if (description) {
    description.textContent = descriptionElement.textContent;
  }

  // Extract buttons dynamically
  const buttons = Array.from(element.querySelectorAll('.elementor-widget-button a')).map((button) => {
    const link = document.createElement('a');
    link.href = button.href;
    link.textContent = button.querySelector('.elementor-button-text').textContent;
    return link;
  });

  // Create the header row dynamically
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Hero';

  // Create the content row dynamically with proper filtering of valid elements
  const contentRow = [
    [title, description, ...buttons].filter(Boolean), // Ensure only valid elements exist
  ];

  // Use the helper function to create the block table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element dynamically
  element.replaceWith(block);
}
