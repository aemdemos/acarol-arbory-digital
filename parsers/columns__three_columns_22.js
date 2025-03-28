export default function parse(element, { document }) {
  // Create header row
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Columns';
  const headerRow = [headerCell];

  // Extract columns content
  const columns = [];
  const columnElements = element.querySelectorAll('.elementor-column');

  columnElements.forEach((columnElement) => {
    const content = [];

    // Extract heading
    const heading = columnElement.querySelector('.elementor-heading-title');
    if (heading) {
      const headingElement = document.createElement('strong');
      headingElement.textContent = heading.textContent.trim();
      content.push(headingElement);
    }

    // Extract text editor content
    const textEditor = columnElement.querySelector('.elementor-widget-text-editor');
    if (textEditor) {
      const paragraphElement = document.createElement('p');
      paragraphElement.textContent = textEditor.textContent.trim();
      content.push(paragraphElement);
    }

    // Extract icon list items
    const iconListItems = columnElement.querySelectorAll('.elementor-icon-list-item');
    if (iconListItems.length > 0) {
      const listElement = document.createElement('ul');
      iconListItems.forEach((item) => {
        const listItem = document.createElement('li');
        const link = item.querySelector('a');
        if (link) {
          const anchor = document.createElement('a');
          anchor.href = link.href;
          anchor.textContent = link.textContent.trim();
          listItem.append(anchor);
        } else {
          listItem.textContent = item.textContent.trim();
        }
        listElement.append(listItem);
      });
      content.push(listElement);
    }

    // Extract and simplify form content
    const form = columnElement.querySelector('.elementor-form');
    if (form) {
      const formElement = document.createElement('div');
      formElement.innerHTML = '<p>Form Placeholder</p>'; // Simplified representation
      content.push(formElement);
    }

    columns.push(content);
  });

  // Create table data
  const tableData = [
    headerRow,
    columns,
  ];

  // Replace original element with the table
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(blockTable);
}
