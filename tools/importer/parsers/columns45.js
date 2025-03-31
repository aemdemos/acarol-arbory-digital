/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the columns from the section
  const columns = Array.from(element.querySelectorAll('.elementor-column'));

  // Build a header row for the block
  const headerRow = ['Columns'];

  // Collect content from each column
  const contentCells = columns.map((column) => {
    const items = Array.from(column.querySelectorAll('ul li')).map((li) => {
      const itemContent = li.querySelector('p') ? li.querySelector('p').innerHTML : li.innerHTML;
      const div = document.createElement('div');
      div.innerHTML = itemContent.trim();
      return div;
    });
    const wrapperDiv = document.createElement('div');
    items.forEach((item) => wrapperDiv.appendChild(item));
    return wrapperDiv;
  });

  // Create a table array for the block
  const tableArray = [
    headerRow,
    contentCells,
  ];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(tableArray, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}
