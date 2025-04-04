/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Hero'];

  // Extract data
  const titleElement = element.querySelector('.elementor-heading-title');
  const title = titleElement ? titleElement.textContent.trim() : '';

  const subheadingElement = element.querySelector('h3.elementor-heading-title');
  const subheading = subheadingElement ? subheadingElement.textContent.trim() : '';

  const buttonElement = element.querySelector('.elementor-button');
  const buttonText = buttonElement ? buttonElement.textContent.trim() : '';
  const buttonLink = buttonElement ? buttonElement.href : '';

  const imageElement = element.querySelector('.jet-parallax-section__image');
  const backgroundImage = imageElement && imageElement.style.backgroundImage ? imageElement.style.backgroundImage.replace(/url\(['"]?|['"]?\)/g, '') : '';

  // Create content row
  const contentRow = [];

  if (backgroundImage) {
    const img = document.createElement('img');
    img.src = backgroundImage;
    contentRow.push(img);
  }

  if (title) {
    const heading = document.createElement('h1');
    heading.textContent = title;
    contentRow.push(heading);
  }

  if (subheading) {
    const subheadingElem = document.createElement('h3');
    subheadingElem.textContent = subheading;
    contentRow.push(subheadingElem);
  }

  if (buttonText && buttonLink) {
    const linkElem = document.createElement('a');
    linkElem.textContent = buttonText;
    linkElem.href = buttonLink;
    contentRow.push(linkElem);
  }

  // Create table
  const cells = [
    headerRow,
    [contentRow]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(table);
}