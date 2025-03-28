export default function parse(element, { document }) {
  // Check for the presence of the elementor-heading-title, which contains the main title.
  const headingElement = element.querySelector('.elementor-heading-title');

  // Handle cases where heading is missing or empty.
  const headingContent = headingElement ? headingElement.textContent.trim() : '';

  // Dynamically create the header row with matching format.
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Hero';
  const headerRow = [headerCell];

  // Create the table content row, ensuring content from headingElement is used.
  const contentRow = [];
  if (headingContent) {
    const heading = document.createElement('h1');
    heading.textContent = headingContent;
    contentRow.push(heading);
  } else {
    contentRow.push(document.createTextNode('No heading provided')); // Fallback for empty heading.
  }

  // Create the block table using helper function
  const blockTable = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}