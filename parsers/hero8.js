export default function parse(element, { document }) {
  // Extract the block type (header row)
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Hero';

  // Extract the title
  const titleElement = element.querySelector('.elementor-heading-title');
  const title = titleElement ? document.createElement('h1') : null;
  if (title && titleElement.textContent) {
    title.textContent = titleElement.textContent;
  }

  // Extract the subheading
  const subheadingElement = element.querySelector('h3.elementor-heading-title');
  const subheading = subheadingElement ? document.createElement('h3') : null;
  if (subheading && subheadingElement.textContent) {
    subheading.textContent = subheadingElement.textContent;
  }

  // Extract the paragraph content
  const paragraphElement = element.querySelector('.elementor-widget-text-editor p');
  const paragraph = paragraphElement ? document.createElement('p') : null;
  if (paragraph && paragraphElement.textContent) {
    paragraph.textContent = paragraphElement.textContent;
  }

  // Extract the call-to-action button
  const buttonElement = element.querySelector('a.elementor-button');
  const button = buttonElement ? document.createElement('a') : null;
  if (button && buttonElement.querySelector('.elementor-button-text')) {
    button.href = buttonElement.href;
    button.textContent = buttonElement.querySelector('.elementor-button-text').textContent;
  }

  // Ensure all extracted elements are present before creating the final block.
  const content = [];
  if (title) content.push(title);
  if (subheading) content.push(subheading);
  if (paragraph) content.push(paragraph);
  if (button) content.push(button);

  // Create the table block
  const cells = [
    headerRow,
    content.length > 0 ? [content] : [],
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}
