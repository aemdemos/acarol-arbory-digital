export default function parse(element, { document }) {
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Hero';
  const headerRow = [headerCell];

  // Extract the content for the second row and combine all content into a single cell
  const backgroundImageElement = element.querySelector('.jet-hor-timeline-item__card-img img');
  const backgroundImage = backgroundImageElement ? document.createElement('img') : null;
  if (backgroundImage) {
    backgroundImage.src = backgroundImageElement.getAttribute('data-lazy-src') || backgroundImageElement.src;
    backgroundImage.alt = backgroundImageElement.alt || '';
  }

  const titleElement = element.querySelector('.jet-hor-timeline-item__card-title');
  const title = titleElement ? document.createElement('h1') : null;
  if (title) {
    title.textContent = titleElement.textContent.trim();
  }

  const descriptionElement = element.querySelector('.jet-hor-timeline-item__card-desc');
  const description = descriptionElement ? document.createElement('p') : null;
  if (description) {
    description.textContent = descriptionElement.textContent.trim();
  }

  const ctaElement = element.querySelector('.jet-hor-timeline-item__card-btn');
  const cta = ctaElement ? document.createElement('a') : null;
  if (cta) {
    cta.href = ctaElement.href;
    cta.textContent = ctaElement.textContent.trim();
  }

  // Combine all content into a single cell for the second row
  const secondRowContent = [backgroundImage, title, description, cta].filter(Boolean);

  const cells = [
    headerRow,
    [secondRowContent],
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table block
  element.replaceWith(table);
}