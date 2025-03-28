export default function parse(element, { document }) {
  const columns = Array.from(element.querySelectorAll('.elementor-column'));

  // Create the header row
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Columns';
  const headerRow = [headerCell];

  // Create content rows by properly merging content into a single cell per column
  const contentRows = columns.map(column => {
    const items = Array.from(column.querySelectorAll('li'));

    // Merge items into a single string or HTML content
    const combinedContent = document.createElement('div');
    items.forEach(item => {
      combinedContent.append(...item.childNodes);
      combinedContent.append(document.createElement('br')); // Add line breaks for separation
    });

    return [combinedContent];
  });

  // Assemble rows into a table
  const tableRows = [headerRow, ...contentRows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}