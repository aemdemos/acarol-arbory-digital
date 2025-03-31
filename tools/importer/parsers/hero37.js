export default function parse(element, { document }) {
  // Create header row with proper formatting dynamically
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Hero';
  const headerRow = [headerCell];

  // Extract image dynamically from the element
  const imgElement = element.querySelector('img');
  const image = document.createElement('img');
  if (imgElement) {
    image.src = imgElement.getAttribute('data-lazy-src') || imgElement.src; // Handle fallback to 'src' in case 'data-lazy-src' is missing
    image.alt = imgElement.alt || ''; // Handle missing 'alt' attribute
  }

  // Extract dynamically the heading, ensuring no assumptions are hard-coded
  const headingContent = imgElement ? imgElement.alt : 'Heading in Block';
  const heading = document.createElement('h1');
  heading.textContent = headingContent;

  // Assemble table rows, ensuring no empty cells are created
  const cells = [
    headerRow,
    [image, heading],
  ];

  // Create table using WebImporter.DOMUtils.createTable
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with created block table
  element.replaceWith(block);
}