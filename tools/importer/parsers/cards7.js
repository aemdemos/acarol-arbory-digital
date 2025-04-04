/* global WebImporter */
export default function parse(element, { document }) {
  const tableData = [];

  // Add header row
  tableData.push(['Cards']);

  // Extract card data from columns
  const columns = Array.from(element.querySelectorAll('.elementor-column'));
  columns.forEach((column) => {
    const iconElement = column.querySelector('.elementor-icon-box-icon i');
    const icon = iconElement ? iconElement.cloneNode(true) : '';

    const titleElement = column.querySelector('h2.elementor-heading-title');
    const title = titleElement ? titleElement.innerHTML : '';

    const descriptionElement = column.querySelector('.elementor-widget-text-editor p');
    const description = descriptionElement ? descriptionElement.innerHTML : '';

    const buttonElement = column.querySelector('.elementor-button');
    const button = buttonElement ? buttonElement.cloneNode(true) : '';

    const contentCell = document.createElement('div');
    if (title) {
      const heading = document.createElement('h2');
      heading.innerHTML = title;
      contentCell.appendChild(heading);
    }
    if (description) {
      const paragraph = document.createElement('p');
      paragraph.innerHTML = description;
      contentCell.appendChild(paragraph);
    }
    if (button) {
      contentCell.appendChild(button);
    }

    tableData.push([icon, contentCell]);
  });

  // Create block table
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}