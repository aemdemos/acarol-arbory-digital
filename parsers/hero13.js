export default function parse(element, { document }) {
  // Extract the image element
  const imageElement = element.querySelector('img');
  const imageUrl = imageElement ? imageElement.getAttribute('data-lazy-src') || imageElement.getAttribute('src') : '';

  // Extract the anchor element for the image
  const imageAnchor = imageElement ? imageElement.closest('a') : null;
  const imageAnchorUrl = imageAnchor ? imageAnchor.getAttribute('href') : '';

  // Extract heading content
  const headingElement = element.querySelector('h1, h2, h3, h4, h5, h6');
  const headingText = headingElement ? headingElement.textContent.trim() : '';

  // Create the table header row
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Hero';

  // Create the content row
  const contentRow = [];

  if (imageElement) {
    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = imageElement.getAttribute('alt') || '';

    if (imageAnchorUrl) {
      const anchor = document.createElement('a');
      anchor.href = imageAnchorUrl;
      anchor.appendChild(img);
      contentRow.push(anchor);
    } else {
      contentRow.push(img);
    }
  }

  if (headingText) {
    const heading = document.createElement('h1');
    heading.textContent = headingText;
    contentRow.push(heading);
  }

  // Create the block table
  const tableData = [headerRow, contentRow];
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block
  element.replaceWith(blockTable);
}
