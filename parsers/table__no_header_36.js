export default function parse(element, { document }) {
  const rows = [];

  // Create header row as specified
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Table (no header)';
  const headerRow = [headerCell];
  rows.push(headerRow);

  // Extract the relevant text content from the element
  const widgets = [...element.querySelectorAll('.elementor-widget-container')];
  widgets.forEach((widget) => {
    const textContent = widget.textContent.trim();
    if (textContent) {
      rows.push([document.createTextNode(textContent)]);
    }
  });

  // Create a table using WebImporter.DOMUtils.createTable
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
