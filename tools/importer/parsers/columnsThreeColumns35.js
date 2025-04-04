/* global WebImporter */
export default function parse(element, { document }) {
  const columns = [...element.querySelectorAll('.elementor-column.elementor-invisible')].map((column) => {
    const iconElement = column.querySelector('.elementor-icon i');
    const headingElement = column.querySelector('h2.elementor-heading-title');

    const icon = document.createElement('div');
    icon.appendChild(iconElement.cloneNode(true));

    const heading = document.createElement('h2');
    heading.textContent = headingElement.textContent;

    return [icon, heading];
  });

  const headerRow = ['Columns'];
  const contentRows = columns.map((column) => [column]);

  const blockTableData = [
    headerRow,
    ...contentRows,
  ];

  const blockTable = WebImporter.DOMUtils.createTable(blockTableData, document);
  element.replaceWith(blockTable);
}
