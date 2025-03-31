/* global WebImporter */
export default function parse(element, { document }) {
  // Define the block name header for the table
  const blockName = 'Embed';

  // Ensure the header row matches the example precisely
  const headerRow = [blockName];

  // Dynamically extract the target elements from the HTML structure
  const iconWrapper = element.querySelector('.elementor-icon-wrapper a');
  const headingTitle = element.querySelector('.elementor-heading-title a');

  // Check and handle possible missing or empty content
  const phoneLink = iconWrapper ? iconWrapper.href : ''; // Extract href for link
  const phoneText = headingTitle ? headingTitle.textContent.trim() : ''; // Extract text within <a>

  // Create the single content cell with the extracted link and text
  const contentCell = document.createElement('div');
  if (phoneLink) {
    const anchor = document.createElement('a');
    anchor.href = phoneLink; // Set link URL dynamically
    anchor.textContent = phoneText || phoneLink; // Use extracted text or fallback to href
    contentCell.appendChild(anchor); // Append anchor to content cell
  }

  // Prepare data rows for the block table
  const contentRow = [contentCell];

  // Utilize WebImporter to structure table
  const cells = [headerRow, contentRow];
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new structured table
  element.replaceWith(blockTable);
}
