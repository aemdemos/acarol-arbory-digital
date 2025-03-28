export default function parse(element, { document }) {
  // Extract the heading
  const heading = element.querySelector('.elementor-heading-title');
  const title = heading ? document.createElement('h1') : null;
  if (title) {
    title.textContent = heading.textContent;
  }

  // Extract the subheading
  const subheadingElement = element.querySelector('.elementor-widget-text-editor p');
  const subheading = subheadingElement ? document.createElement('p') : null;
  if (subheading) {
    subheading.textContent = subheadingElement.textContent;
  }

  // Extract background image
  const parallaxImageDiv = element.querySelector('.jet-parallax-section__image');
  const backgroundImageStyle = parallaxImageDiv?.style.backgroundImage;
  let backgroundImageElement = null;

  if (backgroundImageStyle && backgroundImageStyle.includes('url')) {
    const imageUrl = backgroundImageStyle.slice(
      backgroundImageStyle.indexOf('url(') + 4,
      backgroundImageStyle.lastIndexOf(')')
    ).replace(/("|")/g, '');

    backgroundImageElement = document.createElement('img');
    backgroundImageElement.src = imageUrl;
  }

  // Create table rows
  const rows = [];
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Hero';
  const headerRow = [headerCell];
  rows.push(headerRow);

  const contentRow = [document.createElement('div')];
  const contentContainer = contentRow[0];

  if (backgroundImageElement) {
    contentContainer.appendChild(backgroundImageElement);
  }
  if (title) {
    contentContainer.appendChild(title);
  }
  if (subheading) {
    contentContainer.appendChild(subheading);
  }

  rows.push([contentContainer]);

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(blockTable);
}