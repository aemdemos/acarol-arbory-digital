export default function parse(element, { document }) {
  // Create the header row matching the example exactly
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Hero';
  const headerRow = [headerCell];

  // Extract relevant dynamic content for timeline items
  const timelineItemCards = Array.from(
    element.querySelectorAll('.jet-hor-timeline-item__card')
  );

  const rows = timelineItemCards.map((card) => {
    // Extract title dynamically
    const titleElement = card.querySelector('.jet-hor-timeline-item__card-title');
    const title = document.createElement('h1');
    title.textContent = titleElement ? titleElement.textContent.trim() : '';

    // Extract image dynamically
    const imageElement = card.querySelector('img');
    const image = document.createElement('img');
    image.src = imageElement ? imageElement.getAttribute('data-lazy-src') || imageElement.src : '';
    image.alt = imageElement ? imageElement.alt || '' : '';

    return [title, image];
  });

  // Assemble the table content
  const tableContent = [headerRow, ...rows];

  // Create the table using WebImporter.DOMUtils.createTable helper function
  const table = WebImporter.DOMUtils.createTable(tableContent, document);

  // Replace the original element with the constructed table
  element.replaceWith(table);
}