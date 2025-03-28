export default function parse(element, { document }) {
  // Function to parse the given HTML and replace the element

  // Helper function: Create a text element
  const createTextElement = (text) => {
    const p = document.createElement('p');
    p.textContent = text;
    return p;
  };

  // Extract content dynamically from the element

  // Get heading content
  const headingElement = element.querySelector('.elementor-heading-title');
  const heading = headingElement?.textContent.trim() || '';

  // Get description content
  const descriptionElement = element.querySelector('.elementor-widget-text-editor p');
  const description = descriptionElement?.textContent.trim() || '';

  // Get subheading content
  const subHeadingElement = element.querySelector('.elementor-widget-heading:not(:first-child) .elementor-heading-title');
  const subHeading = subHeadingElement?.textContent.trim() || '';

  // Get button text and link
  const buttonElement = element.querySelector('.elementor-button');
  const buttonText = buttonElement?.textContent.trim() || '';
  const buttonLink = buttonElement?.getAttribute('href') || '';

  // Create the block table header row dynamically
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Table (no header)';
  const headerRow = [headerCell];

  // Prepare the table data structure
  const cells = [
    headerRow, // Header row
    [createTextElement(heading)],
    [createTextElement(description)],
    [createTextElement(subHeading)],
    [createTextElement(buttonText)],
    [createTextElement(buttonLink)],
  ];

  // Use the helper function to create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}