export default function parse(element, { document }) {
  // Extract relevant content dynamically from input element
  const timelineItems = Array.from(element.querySelectorAll('.jet-hor-timeline-item'));

  const rows = [];

  // Header row dynamically created to match example
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Embed';
  rows.push(headerRow);

  // Content row (handle edge cases like missing or empty elements dynamically)
  timelineItems.forEach((item) => {
    const icon = item.querySelector('.jet-elements-icon i');
    const iconName = icon ? icon.className : 'No icon found';
    const textContent = document.createTextNode(iconName);

    const contentRow = [textContent];
    rows.push(contentRow);
  });

  // Create the table using WebImporter.DOMUtils.createTable
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block table dynamically
  element.replaceWith(block);
}
