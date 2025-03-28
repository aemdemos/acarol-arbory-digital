export default function parse(element, { document }) {
  // Create header row for the table
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Columns';
  const headerRow = [headerCell];

  // Extract content from the provided HTML into columns
  const column1 = element.querySelector('.elementor-column.elementor-element-f991a3a ul');
  const column2 = element.querySelector('.elementor-column.elementor-element-ee0edaa ul');

  // Handle edge cases for missing or empty columns
  const column1Content = column1 ? column1.cloneNode(true) : document.createElement('ul');
  const column2Content = column2 ? column2.cloneNode(true) : document.createElement('ul');

  // Create table rows
  const rows = [
    headerRow,
    [column1Content, column2Content]
  ];

  // Build table using WebImporter.DOMUtils.createTable
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element with the new table
  element.replaceWith(blockTable);
}