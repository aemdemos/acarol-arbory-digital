export default function parse(element, { document }) {
  // Create table header row
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Hero';
  const headerRow = [headerCell];

  // Extract background image URL
  const backgroundImageStyle = element.querySelector('.jet-parallax-section__image')?.style.backgroundImage;
  const backgroundImageUrl = backgroundImageStyle?.match(/url\("(.*?)"\)/)?.[1];

  // Extract title
  const titleElement = element.querySelector('.elementor-heading-title');
  const title = document.createElement('h1');
  title.textContent = titleElement?.textContent || '';

  // Extract subheading
  const textElement = element.querySelector('.elementor-widget-text-editor .elementor-widget-container');
  const subheading = document.createElement('p');
  subheading.innerHTML = textElement?.innerHTML || '';

  // Extract call-to-action button
  const buttonElement = element.querySelector('.elementor-button');
  const callToAction = document.createElement('a');
  callToAction.href = buttonElement?.href || '#';
  callToAction.textContent = buttonElement?.textContent || '';

  // Collect content into a single cell for the second row
  const secondRowContent = [];

  if (backgroundImageUrl) {
    const img = document.createElement('img');
    img.src = backgroundImageUrl;
    secondRowContent.push(img);
  }

  if (title.textContent.trim()) {
    secondRowContent.push(title);
  }

  if (subheading.textContent.trim()) {
    secondRowContent.push(subheading);
  }

  if (callToAction.href !== '#') {
    secondRowContent.push(callToAction);
  }

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([headerRow, [secondRowContent]], document);

  // Replace the original element with the table
  element.replaceWith(table);
}
