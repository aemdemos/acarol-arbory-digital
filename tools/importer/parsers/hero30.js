export default function parse(element, { document }) {
  // Create the header row
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Hero';

  // Extract needed content from the element
  const linkElement = element.querySelector('a.elementor-button');
  const linkText = linkElement ? linkElement.textContent.trim() : '';
  const linkHref = linkElement ? linkElement.getAttribute('href') : '';

  // Create the call-to-action (CTA)
  const cta = document.createElement('a');
  cta.textContent = linkText;
  cta.href = linkHref;

  // Create the content row
  const contentRow = [cta];

  // Build the table
  const tableData = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the created table
  element.replaceWith(table);
}