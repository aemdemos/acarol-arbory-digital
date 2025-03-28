export default function parse(element, { document }) {
  // Create the header row for the table with dynamic content.
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Columns';

  // Extract all relevant column elements from the provided HTML.
  const columns = Array.from(element.querySelectorAll('.elementor-column.elementor-top-column'))
    .filter((col) => col.querySelector('.elementor-widget-heading'))
    .map((col) => {
      const iconWrapper = col.querySelector('.elementor-icon-wrapper');
      const heading = col.querySelector('.elementor-heading-title');

      // Handle cases where icon or heading is missing.
      const icon = iconWrapper ? iconWrapper.cloneNode(true) : document.createTextNode('');
      const headingClone = heading ? heading.cloneNode(true) : document.createTextNode('');

      return [icon, headingClone];
    });

  // Ensure the block table is created dynamically and replace the original element.
  const blockTable = WebImporter.DOMUtils.createTable([headerRow, columns], document);
  element.replaceWith(blockTable);
}
