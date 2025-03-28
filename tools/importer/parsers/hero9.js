export default function parse(element, { document }) {
  const cells = [];

  // Header row
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Hero';
  cells.push(headerRow);

  // Collect content for the second row
  const contentElements = [];

  // Extract background image (decorative double helix)
  const backgroundImage = document.createElement('img');
  backgroundImage.src = 'https://main--acarol-arbory-digital--aemdemos.hlx.page/media_1061934561e8a4f01907e616a0ce0e4b74d63b92e.jpeg#width=750&height=415';
  backgroundImage.alt = 'Decorative double Helix';
  contentElements.push(backgroundImage);

  // Extract heading
  const heading = document.createElement('h1');
  heading.textContent = 'Heading in Block';
  contentElements.push(heading);

  // Second row
  cells.push([contentElements]);

  // Create the table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the table
  element.replaceWith(table);
}