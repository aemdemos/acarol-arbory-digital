export default function parse(element, { document }) {
  const headerRow = ['Hero'];

  // Extract content from the element
  const titleElement = element.querySelector('.elementor-element-d3d6b61 .elementor-heading-title');
  const subheadingElement = element.querySelector('.elementor-element-c33d2fd .elementor-heading-title');
  const buttonElement = element.querySelector('.elementor-element-1f7e201 a');

  // Create content for the second row
  const contentRow = [];

  // Add title
  if (titleElement) {
    const titleHeading = document.createElement('h1');
    titleHeading.textContent = titleElement.textContent;
    contentRow.push(titleHeading);
  }

  // Add subheading
  if (subheadingElement) {
    const subheading = document.createElement('h3');
    subheading.textContent = subheadingElement.textContent;
    contentRow.push(subheading);
  }

  // Add button (Call-to-Action)
  if (buttonElement) {
    const button = document.createElement('a');
    button.href = buttonElement.href;
    button.textContent = buttonElement.textContent;
    contentRow.push(button);
  }

  // Create the table block
  const blockTable = WebImporter.DOMUtils.createTable([
    headerRow,
    [contentRow],
  ], document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable); // Just replace the element, no return
}