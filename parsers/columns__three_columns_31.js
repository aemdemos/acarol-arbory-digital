export default function parse(element, { document }) {
  // Extract content from the input element
  const columns = Array.from(element.querySelectorAll('.elementor-column')).map((col, index) => {
    const textContainer = col.querySelector('.elementor-widget-container');
    const content = textContainer ? textContainer.innerHTML : '';

    // Create container for each column
    const container = document.createElement('div');
    const contentDiv = document.createElement('div');
    contentDiv.innerHTML = content;
    container.appendChild(contentDiv);

    return container;
  });

  // Fix for missing third column — add placeholder if fewer than three columns are present
  while (columns.length < 3) {
    const placeholder = document.createElement('div');
    placeholder.innerHTML = '<p>Content missing</p>';
    columns.push(placeholder);
  }

  // Create header row
  const headerRow = ['Column 1', 'Column 2', 'Column 3'].map((text) => {
    const headerCell = document.createElement('strong');
    headerCell.textContent = text;
    return headerCell;
  });

  // Create table block
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columns,
  ], document);

  // Replace original element with new block table
  element.replaceWith(table);
}