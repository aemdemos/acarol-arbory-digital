export default function parse(element, { document }) {
  // Extract necessary elements
  const title = element.querySelector('.elementor-heading-title');
  const subheading = element.querySelector('h3.elementor-heading-title');
  const description = element.querySelector('p');
  const button = element.querySelector('a.elementor-button');

  // Prepare and clean up header row
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Hero';
  const headerRow = [headerCell];

  // Combine all content dynamically into a single cell for the content row
  const contentCell = document.createElement('div');
  if (title) {
    const titleElement = document.createElement('h1');
    titleElement.textContent = title.textContent.trim();
    contentCell.appendChild(titleElement);
  }

  if (subheading) {
    const subheadingElement = document.createElement('h3');
    subheadingElement.textContent = subheading.textContent.trim();
    contentCell.appendChild(subheadingElement);
  }

  if (description) {
    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = description.textContent.trim();
    contentCell.appendChild(descriptionElement);
  }

  if (button) {
    const buttonLink = document.createElement('a');
    buttonLink.href = button.href;
    buttonLink.textContent = button.textContent.trim();
    contentCell.appendChild(buttonLink);
  }

  const contentRow = [contentCell];

  // Create the block table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}