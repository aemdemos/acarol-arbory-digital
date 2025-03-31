export default function parse(element, { document }) {
  // Create header row matching example
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Embed';
  const headerRow = [headerCell];

  // Begin dynamically extracting content based on provided timeline HTML
  const timelineItems = element.querySelectorAll('.jet-hor-timeline-item');

  // Prepare rows for each timeline point with their corresponding icons and labels
  const rows = [];
  timelineItems.forEach((item) => {
    const iconElement = item.querySelector('.jet-elements-icon i');

    // Extract icon class (if available)
    const iconClass = iconElement ? iconElement.className : 'icon-placeholder';

    // Create an updated row for the timeline point
    const icon = document.createElement('span');
    icon.textContent = iconClass; // Use class as textual representation for icon

    // Add the row with icon and dynamic timeline content
    rows.push([icon]);
  });

  // Combine header row and extracted rows
  const cells = [headerRow, ...rows];

  // Create structured block table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with the new structure
  element.replaceWith(table);
}