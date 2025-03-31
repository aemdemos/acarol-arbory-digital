export default function parse(element, { document }) {
  const cells = [];

  // Create header row
  const headerRow = ['Columns'];
  cells.push(headerRow);

  // Extract columns
  Array.from(element.querySelectorAll('.elementor-column')).forEach((column) => {
    const iconWrapper = column.querySelector('.elementor-icon-wrapper .elementor-icon i');
    const heading = column.querySelector('.elementor-widget-heading .elementor-heading-title');

    if (iconWrapper && heading) {
      const icon = document.createElement('i');
      icon.className = iconWrapper.className;

      const headingContent = document.createElement('h2');
      headingContent.textContent = heading.textContent;

      // Combine icon and heading into a single table cell
      const combinedCellContent = document.createElement('div');
      combinedCellContent.appendChild(icon);
      combinedCellContent.appendChild(headingContent);

      cells.push([combinedCellContent]);
    }
  });

  // Create table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the element
  element.replaceWith(block);
}