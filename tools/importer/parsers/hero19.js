export default function parse(element, { document }) {
  // Header row creation
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Hero';

  // Extracting content dynamically from provided HTML
  const headingElement = element.querySelector('.elementor-element-80772b0 .elementor-heading-title');
  const subheadingElement = element.querySelector('.elementor-element-e60eba9 .elementor-heading-title');
  const textElement = element.querySelector('.elementor-element-fd54bdb p');
  const buttonElement = element.querySelector('.elementor-element-76b7fe9 .elementor-button');
  const imageElement = element.querySelector('.elementor-element-8d129d0 img');

  // Create elements for extracted content
  const heading = document.createElement('h1');
  heading.textContent = headingElement?.textContent || '';

  const subheading = document.createElement('h3');
  subheading.textContent = subheadingElement?.textContent || '';

  const description = document.createElement('p');
  description.textContent = textElement?.textContent || '';

  const button = document.createElement('a');
  button.href = buttonElement?.href || '#';
  button.textContent = buttonElement?.textContent || '';

  const image = document.createElement('img');
  image.src = imageElement?.getAttribute('data-lazy-src') || '';
  image.alt = imageElement?.getAttribute('alt') || '';

  // Organize content into a table structure
  const content = [heading, subheading, description, button, image].filter(el => el.textContent || el.src); // Filter out empty elements

  // Use WebImporter.DOMUtils.createTable to create the block table
  const blockTable = WebImporter.DOMUtils.createTable([
    headerRow, // First row: header
    [content] // Second row: dynamic content
  ], document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}