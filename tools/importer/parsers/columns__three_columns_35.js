export default function parse(element, { document }) {
  // Extract the content rows from the HTML
  const columns = Array.from(element.querySelectorAll('.elementor-column.elementor-top-column.elementor-invisible'));

  const cells = [];

  // Add the header row
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Columns';
  cells.push(headerRow);

  const contentRow = columns.map((column) => {
    const iconElement = column.querySelector('.elementor-icon i');
    const headingElement = column.querySelector('h2');

    const content = [];

    if (iconElement) {
      const iconClone = iconElement.cloneNode(true);
      content.push(iconClone);
    }

    if (headingElement) {
      const headingClone = headingElement.cloneNode(true);
      content.push(headingClone);
    }

    return content;
  });

  cells.push(contentRow);

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);

  return block;
}