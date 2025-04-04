/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the main content
  const heading = element.querySelector('.elementor-heading-title');
  const title = heading ? heading.textContent.trim() : '';

  const textEditor = element.querySelector('.elementor-widget-text-editor');
  const description = textEditor ? textEditor.textContent.trim() : '';

  const backgroundImageElement = element.querySelector('.jet-parallax-section__image');
  const backgroundImage = backgroundImageElement
    ? backgroundImageElement.style.backgroundImage.replace(/url\(['"]?(.*?)['"]?\)/, '$1')
    : '';

  const buttonElement = element.querySelector('.elementor-button');
  const buttonText = buttonElement ? buttonElement.textContent.trim() : '';
  const buttonLink = buttonElement ? buttonElement.href : '';

  // Create elements for the table
  const headerRow = ['Hero'];

  const content = [];

  if (backgroundImage) {
    const img = document.createElement('img');
    img.src = backgroundImage;
    content.push(img);
  }

  if (title) {
    const titleElement = document.createElement('h1');
    titleElement.textContent = title;
    content.push(titleElement);
  }

  if (description) {
    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = description;
    content.push(descriptionElement);
  }

  if (buttonText && buttonLink) {
    const link = document.createElement('a');
    link.href = buttonLink;
    link.textContent = buttonText;
    content.push(link);
  }

  const cells = [
    headerRow,
    [content],
  ];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}
