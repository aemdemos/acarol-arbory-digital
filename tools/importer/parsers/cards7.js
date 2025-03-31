/* global WebImporter */
export default function parse(element, { document }) {
  const rows = [];

  // Add header row
  rows.push(['Cards']);

  // Loop through columns to extract card details
  const columns = element.querySelectorAll('.elementor-column');
  columns.forEach((column) => {
    const icon = column.querySelector('.elementor-icon-box-icon a i');
    const title = column.querySelector('h2.elementor-heading-title');
    const description = column.querySelector('p');
    const cta = column.querySelector('.elementor-button-wrapper a');

    // Extract and prepare elements
    const iconElement = icon ? icon.cloneNode(true) : null; // Clone the icon element
    const content = [];

    if (title) {
      const titleElement = document.createElement('strong');
      titleElement.textContent = title.textContent.trim();
      content.push(titleElement);
      content.push(document.createElement('br'));
    }

    if (description) {
      content.push(document.createTextNode(description.textContent.trim()));
      content.push(document.createElement('br'));
    }

    if (cta) {
      const ctaLink = document.createElement('a');
      ctaLink.href = cta.getAttribute('href');
      ctaLink.textContent = cta.textContent.trim();
      content.push(ctaLink);
    }

    // Add row to table
    rows.push([iconElement, content]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the table
  element.replaceWith(table);
}
