/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (no images)'];
  const rows = [headerRow];

  // Extract the cards from the element.
  const cardElements = element.querySelectorAll('.elementor-post');

  const seenTitles = new Set(); // Track seen titles to prevent duplicates

  cardElements.forEach((card) => {
    const title = card.querySelector('.elementor-post__title a')?.textContent.trim();
    const description = card.querySelector('.elementor-post__excerpt p')?.textContent.trim();

    if (!title || seenTitles.has(title)) {
      return; // Skip duplicates or cards with missing titles
    }

    seenTitles.add(title); // Mark this title as seen

    const cellContent = [];

    if (title) {
      const titleElement = document.createElement('strong');
      titleElement.textContent = title;
      cellContent.push(titleElement);
    }

    if (description) {
      const descriptionElement = document.createElement('p');
      descriptionElement.textContent = description;
      cellContent.push(descriptionElement);
    }

    rows.push([cellContent]);
  });

  // Create the block table.
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block table.
  element.replaceWith(blockTable);
}