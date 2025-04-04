/* global WebImporter */
export default function parse(element, { document }) {
  // Extract content from the first column
  const firstColumnWidget = element.querySelector('.elementor-element-4568ce0 .elementor-widget-container');
  const firstColumnContent = firstColumnWidget ? firstColumnWidget.innerHTML : '';

  // Extract content from the second column
  const secondColumnWidget = element.querySelector('.elementor-element-1556797 .elementor-widget-container');
  const secondColumnContent = secondColumnWidget ? secondColumnWidget.innerHTML : '';

  // Create table structure
  const headerRow = ['Columns'];

  const secondRow = [
    document.createElement('div'),
    document.createElement('div'),
  ];

  secondRow[0].innerHTML = firstColumnContent;
  secondRow[1].innerHTML = secondColumnContent;

  const tableData = [headerRow, secondRow];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block table
  element.parentNode.replaceChild(table, element);
}