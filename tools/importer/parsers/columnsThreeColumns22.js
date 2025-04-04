/* global WebImporter */
export default function parse(element, { document }) {
  // Header row matches example exactly
  const headerRow = ['Columns'];

  // Extract each column's content
  const columns = [...element.querySelectorAll('.elementor-column')].map((col) => {
    const content = [];

    // Extract heading text
    const heading = col.querySelector('.elementor-widget-heading .elementor-heading-title');
    if (heading) {
      const headingElement = document.createElement('h2');
      headingElement.textContent = heading.textContent.trim();
      content.push(headingElement);
    }

    // Extract paragraph content
    const textEditor = col.querySelector('.elementor-widget-text-editor p');
    if (textEditor) {
      const paragraphElement = document.createElement('p');
      paragraphElement.textContent = textEditor.textContent.trim();
      content.push(paragraphElement);
    }

    // Extract list content
    const iconList = col.querySelector('.elementor-icon-list-items');
    if (iconList) {
      const listElement = document.createElement('ul');
      [...iconList.querySelectorAll('li')].forEach((listItem) => {
        const li = document.createElement('li');
        const link = listItem.querySelector('a');
        if (link) {
          const linkElement = document.createElement('a');
          linkElement.href = link.href;
          linkElement.textContent = link.textContent.trim();
          li.appendChild(linkElement);
        } else {
          li.textContent = listItem.textContent.trim();
        }
        listElement.appendChild(li);
      });
      content.push(listElement);
    }

    // Extract form content (simplified)
    const form = col.querySelector('form');
    if (form) {
      const formClone = form.cloneNode(true);
      formClone.querySelectorAll('div, span').forEach((node) => {
        node.remove(); // Remove unnecessary nested elements
      });
      content.push(formClone);
    }

    return content;
  });

  // Ensure no empty cells or columns are added
  const tableData = [
    headerRow, // Header row
    columns.filter((column) => column.length > 0), // Content row
  ];

  // Create and replace the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(block);
}
