export default function parse(element, { document }) {
  const rows = [];

  // Header row
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Cards (no images)';
  const headerRow = [headerCell];
  rows.push(headerRow);

  // Extract cards content
  const cardElements = element.querySelectorAll('.elementor-post');
  const seenTitles = new Set(); // To track unique card titles

  cardElements.forEach((cardElement) => {
    const titleElement = cardElement.querySelector('.elementor-post__title a');
    const descriptionElement = cardElement.querySelector('.elementor-post__excerpt p');

    const titleText = titleElement ? titleElement.textContent.trim() : '';
    const descriptionText = descriptionElement ? descriptionElement.textContent.trim() : '';

    // Ensure only unique titles are included
    if (titleText && !seenTitles.has(titleText)) {
      seenTitles.add(titleText);

      const cardContent = document.createElement('div');

      // Add title
      const title = document.createElement('h3');
      title.textContent = titleText;
      cardContent.appendChild(title);

      // Add description if present
      if (descriptionText) {
        const description = document.createElement('p');
        description.textContent = descriptionText;
        cardContent.appendChild(description);
      }

      rows.push([cardContent]);
    }
  });

  // Generate the block table
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}
