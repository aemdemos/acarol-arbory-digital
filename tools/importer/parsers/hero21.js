/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Hero']; // Ensure the header row matches the example

  // Extract Image URL dynamically
  const backgroundImageStyle = element.querySelector('.jet-parallax-section__image')?.style.backgroundImage;
  const imageUrlMatch = backgroundImageStyle?.match(/url\("(.*?)"\)/);
  const imageUrl = imageUrlMatch ? imageUrlMatch[1] : '';

  let imageElement;
  if (imageUrl) {
    imageElement = document.createElement('img');
    imageElement.src = imageUrl;
  }

  // Extract Title dynamically
  const title = element.querySelector('h1')?.textContent.trim() || '';
  const titleElement = document.createElement('h1');
  titleElement.textContent = title;

  // Extract Subtext dynamically
  const subText = element.querySelector('.elementor-widget-text-editor')?.textContent.trim() || '';
  const subTextElement = document.createElement('p');
  subTextElement.textContent = subText;

  // Extract CTA Button dynamically
  const ctaLink = element.querySelector('.elementor-button')?.href || '';
  const ctaText = element.querySelector('.elementor-button-text')?.textContent.trim() || '';
  let ctaElement;
  if (ctaLink && ctaText) {
    ctaElement = document.createElement('a');
    ctaElement.href = ctaLink;
    ctaElement.textContent = ctaText;
  }

  const content = [];
  if (imageElement) content.push(imageElement); // Handle optional image
  if (titleElement.textContent) content.push(titleElement); // Mandatory title
  if (subTextElement.textContent) content.push(subTextElement); // Handle optional subtext
  if (ctaElement) content.push(ctaElement); // Handle optional CTA

  const tableData = [
    headerRow,
    [content],
  ];

  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(blockTable);
}
