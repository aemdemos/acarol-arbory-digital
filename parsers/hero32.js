export default function parse(element, { document }) {
  // Extract relevant content from the input element
  const timelineItems = element.querySelectorAll('.jet-hor-timeline-item');

  const rows = [];

  // Add header row as specified in the example
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Hero';
  const headerRow = [headerCell];
  rows.push(headerRow);

  // Iterate through timeline items to populate rows
  timelineItems.forEach((item) => {
    const meta = item.querySelector('.jet-hor-timeline-item__meta');
    const title = item.querySelector('.jet-hor-timeline-item__card-title');
    const description = item.querySelector('.jet-hor-timeline-item__card-desc');
    const image = item.querySelector('img');
    const cta = item.querySelector('.jet-hor-timeline-item__card-btn');

    // Check if the item has valid content to include
    if (!(meta || title || description || image || cta)) return; // Skip empty entries

    const cellContent = [];

    // Background Image
    if (image && image.dataset.lazySrc) {
      const imgElement = document.createElement('img');
      imgElement.src = image.dataset.lazySrc;
      cellContent.push(imgElement);
    }

    // Title (mandatory)
    if (title) {
      const titleElement = document.createElement('h1');
      titleElement.textContent = title.textContent;
      cellContent.push(titleElement);
    }

    // Subheading (optional)
    if (meta) {
      const metaElement = document.createElement('h2');
      metaElement.textContent = meta.textContent;
      cellContent.push(metaElement);
    }

    // Description
    if (description) {
      const descElement = document.createElement('p');
      descElement.textContent = description.textContent;
      cellContent.push(descElement);
    }

    // Call-to-Action (optional)
    if (cta) {
      const ctaElement = document.createElement('a');
      ctaElement.href = cta.href;
      ctaElement.textContent = cta.textContent;
      cellContent.push(ctaElement);
    }

    if (cellContent.length > 0) {
      rows.push([cellContent]); // Add only non-empty rows
      rows.push([document.createElement('hr')]); // Add horizontal rule after each item
    }
  });

  // Remove trailing horizontal rule if it exists
  if (rows.length > 1 && rows[rows.length - 1][0].tagName === 'HR') {
    rows.pop();
  }

  // Create and replace the block table
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(blockTable);
}
