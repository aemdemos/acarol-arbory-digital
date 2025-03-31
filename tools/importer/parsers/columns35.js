/* global WebImporter */
export default function parse(element, { document }) {
  // Helper functions
  const extractColumns = () => {
    const columns = [];
    const columnElements = element.querySelectorAll('.elementor-widget-wrap.elementor-element-populated');

    columnElements.forEach((column) => {
      const iconContainer = column.querySelector('.elementor-icon > i');
      const heading = column.querySelector('h2.elementor-heading-title');

      if (iconContainer && heading) {
        // Directly add the elements without wrapping them in an extra div
        columns.push([iconContainer.cloneNode(true), heading.cloneNode(true)]);
      }
    });

    return columns;
  };

  const createTableCells = (columns) => {
    const headerRow = ['Columns'];
    const dataRow = columns.map((col) => col); // Directly pass the elements array
    return [headerRow, dataRow];
  };

  const columns = extractColumns();
  const tableCells = createTableCells(columns);
  const tableBlock = WebImporter.DOMUtils.createTable(tableCells, document);

  element.replaceWith(tableBlock);
}
