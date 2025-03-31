/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Hero'];

  // Extract Heading
  const headingDiv = element.querySelector('.elementor-heading-title');
  const headingText = headingDiv ? headingDiv.textContent.trim() : '';
  const heading = headingText ? document.createElement('h1') : null;
  if (heading) {
    heading.textContent = headingText;
  }

  // Extract Description
  const descriptionDiv = element.querySelector('.elementor-widget-text-editor');
  const descriptionText = descriptionDiv ? descriptionDiv.textContent.trim() : '';
  const description = descriptionText ? document.createElement('p') : null;
  if (description) {
    description.textContent = descriptionText;
  }

  // Extract Call-to-Action
  const ctaDiv = element.querySelector('.elementor-widget-button a');
  const ctaLink = ctaDiv ? ctaDiv.href : '';
  const ctaText = ctaDiv ? ctaDiv.textContent.trim() : '';
  const cta = ctaLink && ctaText ? document.createElement('a') : null;
  if (cta) {
    cta.href = ctaLink;
    cta.textContent = ctaText;
  }

  // Combine all extracted content
  const combinedContent = document.createElement('div');
  [heading, description, cta].filter(Boolean).forEach((el) => combinedContent.appendChild(el));

  // Table structure: Header row (1 column) + Content row (1 column)
  const tableRows = [
    headerRow,
    [combinedContent],
  ];

  // Construct the block table
  const block = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the new table
  element.replaceWith(block);
}
