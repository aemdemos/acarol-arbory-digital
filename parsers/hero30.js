export default function parse(element, { document }) {
  // Create the header row for the table
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Hero';
  const headerRow = [headerCell];

  // Extract the call-to-action (CTA) information
  const ctaButton = element.querySelector('a.elementor-button');
  const ctaText = ctaButton?.querySelector('span.elementor-button-text')?.textContent || 'No CTA text';
  const ctaLink = ctaButton?.getAttribute('href') || '#';

  // Create the CTA element with the text and link
  const ctaElement = document.createElement('a');
  ctaElement.textContent = ctaText;
  ctaElement.setAttribute('href', ctaLink);

  // Combine the extracted elements into the table structure
  const cells = [
    headerRow,
    [ctaElement],
  ];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}