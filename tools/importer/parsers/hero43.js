export default function parse(element, { document }) {
  // Extracting content dynamically
  const titleElement = element.querySelector('.elementor-element-d3d6b61 .elementor-heading-title');
  const titleText = titleElement ? titleElement.textContent.trim() : '';

  const subheadingElement = element.querySelector('.elementor-element-c33d2fd .elementor-heading-title');
  const subheadingText = subheadingElement ? subheadingElement.textContent.trim() : '';

  const buttonElement = element.querySelector('.elementor-element-1f7e201 a');
  const buttonText = buttonElement ? buttonElement.textContent.trim() : '';
  const buttonHref = buttonElement ? buttonElement.href : '';

  // Creating the table structure dynamically
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Hero';

  const contentCell = document.createElement('div');

  if (titleText) {
    const title = document.createElement('h1');
    title.textContent = titleText;
    contentCell.appendChild(title);
  }

  if (subheadingText) {
    const subheading = document.createElement('h3');
    subheading.textContent = subheadingText;
    contentCell.appendChild(subheading);
  }

  if (buttonText && buttonHref) {
    const button = document.createElement('a');
    button.textContent = buttonText;
    button.href = buttonHref;
    contentCell.appendChild(button);
  }

  // Using the helper function to create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    [contentCell],
  ], document);

  // Replacing the original element with the new table
  element.replaceWith(table);
}