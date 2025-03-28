export default function parse(element, { document }) {
  // Start by creating the header row for the table
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Hero';

  // Initialize content row to store extracted elements
  const contentRow = [];

  // Extract image source dynamically from the img tag
  const imgElement = element.querySelector('img');
  if (imgElement) {
    const img = document.createElement('img');
    img.src = imgElement.dataset.lazySrc || imgElement.src;
    img.alt = imgElement.alt || ''; // Handle missing alt attribute
    contentRow.push(img);
  }

  // Extract heading text dynamically
  const headingElement = element.querySelector('h2');
  if (headingElement) {
    const heading = document.createElement('h1');
    heading.textContent = headingElement.textContent;
    contentRow.push(heading);
  }

  // Extract paragraph text dynamically
  const paragraphElement = element.querySelector('p');
  if (paragraphElement) {
    const paragraph = document.createElement('p');
    paragraph.textContent = paragraphElement.textContent;
    contentRow.push(paragraph);
  }

  // Extract call-to-action button dynamically
  const buttonElement = element.querySelector('a.elementor-button');
  if (buttonElement) {
    const button = document.createElement('a');
    button.href = buttonElement.href;
    button.textContent = buttonElement.querySelector('.elementor-button-text')?.textContent || buttonElement.textContent; // Handle inner text extraction
    contentRow.push(button);
  }

  // Create an array representing the table's rows
  const cells = [headerRow, [contentRow]]; // Ensure the content row is wrapped as a single cell

  // Create the block table using the WebImporter helper function
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the newly created table
  element.replaceWith(table);
}