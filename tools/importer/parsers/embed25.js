/* global WebImporter */
export default function parse(element, { document }) {
  // Extract relevant content dynamically
  const timelineItems = element.querySelectorAll('.jet-hor-timeline-item');

  // Prepare header row
  const headerRow = ['Embed'];

  // Extract videos dynamically and create a unified content row
  const contentRow = Array.from(timelineItems).map((item) => {
    const icon = document.createElement('i');
    icon.className = item.querySelector('i')?.className || '';
    return icon;
  });

  const cells = [
    headerRow, // Single column header row
    [contentRow] // Single column content row combining content dynamically
  ];

  // Create table block and replace original element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
