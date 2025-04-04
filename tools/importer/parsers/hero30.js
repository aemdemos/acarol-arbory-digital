/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Hero'];

  // Extract the call-to-action link
  const link = element.querySelector('a');
  const linkText = link ? link.textContent.trim() : '';
  const linkHref = link ? link.getAttribute('href') : '';

  const cta = document.createElement('a');
  cta.href = linkHref;
  cta.textContent = linkText;

  // Create the table structure
  const cells = [
    headerRow, // Header row
    [cta], // Content row
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}
