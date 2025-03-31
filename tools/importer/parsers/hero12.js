export default function parse(element, { document }) {
  // Create the header row with strong-typed header text "Hero" matching the example
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Hero';
  const headerRow = [headerCell];

  // Extract title
  const titleElement = element.querySelector('.elementor-heading-title');
  const title = titleElement ? document.createElement('h1') : null;
  if (titleElement) {
    title.textContent = titleElement.textContent.trim();
  }

  // Extract subtitle
  const subtitleElement = element.querySelector('h3.elementor-heading-title');
  const subtitle = subtitleElement ? document.createElement('h2') : null;
  if (subtitleElement) {
    subtitle.textContent = subtitleElement.textContent.trim();
  }

  // Extract paragraph
  const paragraphElement = element.querySelector('.elementor-widget-text-editor p');
  const paragraph = paragraphElement ? document.createElement('p') : null;
  if (paragraphElement) {
    paragraph.textContent = paragraphElement.textContent.trim();
  }

  // Extract call-to-action link
  const ctaLinkElement = element.querySelector('a[href]');
  const cta = ctaLinkElement ? document.createElement('a') : null;
  if (ctaLinkElement) {
    cta.href = ctaLinkElement.href;
    cta.textContent = ctaLinkElement.textContent.trim();
  }

  // Combine extracted elements into a single cell in the second row
  const contentRow = [];
  if (title) contentRow.push(title);
  if (subtitle) contentRow.push(subtitle);
  if (paragraph) contentRow.push(paragraph);
  if (cta) contentRow.push(cta);

  const tableData = [
    headerRow, // Header row
    [contentRow] // Content row
  ];

  // Create the block table using `WebImporter.DOMUtils.createTable`
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}