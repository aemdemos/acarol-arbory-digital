export default function parse(element, { document }) {
  // Creating the header row
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Hero';
  const headerRow = [headerCell];

  // Creating the content row
  const contentRow = [];

  // Extracting image
  const imageElement = element.querySelector('img');
  if (imageElement) {
    const img = document.createElement('img');
    img.src = imageElement.getAttribute('data-lazy-src') || imageElement.src;
    img.alt = imageElement.alt || '';
    contentRow.push(img);
  }

  // Extracting heading
  const headingElement = element.querySelector('h1');
  if (headingElement) {
    const heading = document.createElement('h1');
    heading.textContent = headingElement.textContent;
    contentRow.push(heading);
  }

  // Extracting subheading
  const subheadingElement = element.querySelector('p');
  if (subheadingElement) {
    const subheading = document.createElement('p');
    subheading.textContent = subheadingElement.textContent;
    contentRow.push(subheading);
  }

  // Extracting Call-to-Action
  const ctaElement = element.querySelector('a.elementor-button');
  if (ctaElement) {
    const cta = document.createElement('a');
    cta.href = ctaElement.href;
    cta.textContent = ctaElement.querySelector('.elementor-button-text')?.textContent || ctaElement.textContent;
    contentRow.push(cta);
  }

  // Combining all extracted content into a single cell
  const combinedContentCell = document.createElement('div');
  contentRow.forEach((item) => combinedContentCell.appendChild(item));
  const combinedRow = [combinedContentCell];

  // Creating the table
  const tableData = [headerRow, combinedRow];
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replacing the original element
  element.replaceWith(block);
}