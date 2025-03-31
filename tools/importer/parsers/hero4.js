export default function parse(element, { document }) {
  // Find elements within the given element
  const imageContainer = element.querySelector('.elementor-widget-image img');
  const titleContainer = element.querySelector('.elementor-widget-heading .elementor-heading-title');
  const subtitleContainers = element.querySelectorAll('.elementor-widget-heading .elementor-heading-title');

  // Verify that required containers exist
  if (!imageContainer || !titleContainer) {
    console.warn('Required elements not found');
    return;
  }

  // Extract image attributes dynamically
  const image = document.createElement('img');
  image.src = imageContainer.getAttribute('src');
  image.alt = imageContainer.getAttribute('alt') || '';

  // Extract title using its text content
  const title = document.createElement('h1');
  title.textContent = titleContainer.textContent.trim();

  // Check for subtitle and extract its text content dynamically
  let subtitle = null;
  if (subtitleContainers.length > 1) {
    const subtitleContainer = subtitleContainers[1];
    subtitle = document.createElement('h2');
    subtitle.textContent = subtitleContainer.textContent.trim();
  }

  // Construct table rows dynamically, ensuring matching structure
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Hero'; // Header row matches example exactly
  const headerRow = [headerCell];

  const contentRow = subtitle ? [image, title, subtitle] : [image, title]; // Content row conditions based on data

  const cells = [
    headerRow, // Header row
    contentRow, // Content row
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(table);
}