export default function parse(element, { document }) {
  // Extract relevant elements from the input HTML
  const image = element.querySelector('img');
  const heading = element.querySelector('h2');
  const subheading = element.querySelector('p');
  const button = element.querySelector('a');

  // Prepare content for the table
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Hero';

  const contentRow = [];

  // Add image if available
  if (image) {
    const imgElement = document.createElement('img');
    imgElement.src = image.getAttribute('data-lazy-src') || image.getAttribute('src');
    imgElement.alt = image.alt;
    contentRow.push(imgElement);
  }

  // Add heading if available
  if (heading) {
    const headingElement = document.createElement('h1');
    headingElement.textContent = heading.textContent;
    contentRow.push(headingElement);
  }

  // Add subheading if available
  if (subheading) {
    const subheadingElement = document.createElement('p');
    subheadingElement.textContent = subheading.textContent;
    contentRow.push(subheadingElement);
  }

  // Add button if available
  if (button) {
    const buttonElement = document.createElement('a');
    buttonElement.href = button.href;
    buttonElement.textContent = button.textContent;
    contentRow.push(buttonElement);
  }

  // Create the table
  const cells = [headerRow, [contentRow]];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}
