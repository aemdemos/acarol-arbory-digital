/* global WebImporter */
export default function parse(element, { document }) {
  // Extract dynamic content from the provided HTML timeline items
  const timelineItems = element.querySelectorAll('.jet-hor-timeline-item');

  // Check if timeline items exist
  if (!timelineItems.length) {
    console.error('No timeline items found');
    return;
  }

  // Extract content for each timeline item
  const contentRows = Array.from(timelineItems).map((item) => {
    const iconElement = item.querySelector('.jet-elements-icon i');
    const icon = iconElement ? iconElement.cloneNode(true) : document.createTextNode('No icon available');

    const textContent = item.dataset.itemId || 'No content available';
    const combinedCell = document.createElement('div');
    combinedCell.append(icon, document.createElement('br'), document.createTextNode(textContent));

    return [combinedCell];
  });

  // Build the table array dynamically
  const cells = [
    ['Embed'], // Header row matches the example exactly
    ...contentRows // Content rows extracted dynamically
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}