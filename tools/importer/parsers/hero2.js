export default function parse(element, { document }) {
  // Extract heading
  const headingElement = element.querySelector('h2.elementor-heading-title');
  const heading = headingElement ? headingElement.textContent.trim() : '';

  // Extract secondary heading
  const subheadingElement = element.querySelectorAll('h2.elementor-heading-title')[1];
  const subheading = subheadingElement ? subheadingElement.innerHTML.trim() : '';

  // Extract call-to-action
  const ctaElement = element.querySelector('a.elementor-button');
  const ctaText = ctaElement ? ctaElement.textContent.trim() : '';
  const ctaLink = ctaElement ? ctaElement.getAttribute('href') : '';

  // Create header row for table
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Hero';
  const headerRow = [headerCell];

  // Create content for second row
  const contentCell = document.createElement('div');

  // Add heading to content cell
  if (heading) {
    const headingElement = document.createElement('h1');
    headingElement.textContent = heading;
    contentCell.appendChild(headingElement);
  }

  // Add subheading to content cell
  if (subheading) {
    const subheadingElement = document.createElement('h2');
    subheadingElement.innerHTML = subheading;
    contentCell.appendChild(subheadingElement);
  }

  // Add call-to-action to content cell
  if (ctaText && ctaLink) {
    const ctaLinkElement = document.createElement('a');
    ctaLinkElement.setAttribute('href', ctaLink);
    ctaLinkElement.textContent = ctaText;
    contentCell.appendChild(ctaLinkElement);
  }

  // Create table rows
  const tableRows = [headerRow, [contentCell]];

  // Create block table
  const blockTable = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace original element
  element.replaceWith(blockTable);
}