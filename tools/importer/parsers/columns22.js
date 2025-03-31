/* global WebImporter */
 export default function parse(element, { document }) {
  const headerRow = ['Columns'];

  // Extract data from the first column
  const column1Header = element.querySelector('.elementor-element-ef1c906 .elementor-heading-title');
  const column1Content = element.querySelector('.elementor-element-8499343 p');
  
  const column1Cell = [
    column1Header.cloneNode(true),
    column1Content.cloneNode(true),
  ];

  // Extract data from the second column
  const column2Header = element.querySelector('.elementor-element-d19c999 .elementor-heading-title');
  const column2Links = Array.from(element.querySelectorAll('.elementor-element-884d578 .elementor-icon-list-item a')).map(link => link.cloneNode(true));

  const column2Cell = [
    column2Header.cloneNode(true),
    ...column2Links,
  ];

  // Extract data from the third column
  const column3Header = element.querySelector('.elementor-element-d0ec8c7 .elementor-heading-title');
  const column3Links = Array.from(element.querySelectorAll('.elementor-element-92a4c58 .elementor-icon-list-item a')).map(link => link.cloneNode(true));

  const column3Cell = [
    column3Header.cloneNode(true),
    ...column3Links,
  ];

  // Extract data from the fourth column
  const column4Header = element.querySelector('.elementor-element-9213a01 .elementor-heading-title');
  const column4Form = element.querySelector('.elementor-element-bced4d1 form');

  const column4Cell = [
    column4Header.cloneNode(true),
    column4Form.cloneNode(true),
  ];

  const cells = [
    headerRow,
    [column1Cell, column2Cell, column3Cell, column4Cell],
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
