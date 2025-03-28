export default function parse(element, { document }) {
  // Create the header row
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Hero';
  const headerRow = [headerCell];

  // Extract content elements
  const imgContainer = element.querySelector('.elementor-widget-image img');
  const img = imgContainer ? imgContainer.cloneNode(true) : null;

  const headingContainer = element.querySelector('.elementor-widget-text-editor h1');
  const heading = headingContainer ? headingContainer.cloneNode(true) : null;

  const subheadingContainer = element.querySelector('.elementor-widget-text-editor p');
  const subheading = subheadingContainer ? subheadingContainer.cloneNode(true) : null;

  const ctaContainer = element.querySelector('.elementor-widget-button a');
  const cta = ctaContainer ? ctaContainer.cloneNode(true) : null;

  // Combine all elements into a single cell
  const contentCell = document.createElement('div');
  if (img) contentCell.appendChild(img);
  if (heading) contentCell.appendChild(heading);
  if (subheading) contentCell.appendChild(subheading);
  if (cta) contentCell.appendChild(cta);

  const contentRow = [contentCell];

  // Build the table data
  const tableData = [headerRow, contentRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element
  element.replaceWith(block);
}
