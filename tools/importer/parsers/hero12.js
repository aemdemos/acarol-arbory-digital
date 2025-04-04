/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Hero'];

  // Extracting title
  const titleElement = element.querySelector('.elementor-column .elementor-widget-heading .elementor-heading-title');
  const title = titleElement ? titleElement.textContent.trim() : '';

  // Extracting subheading
  const subHeadingElement = element.querySelector('.elementor-column .elementor-widget-heading h3');
  const subHeading = subHeadingElement ? subHeadingElement.textContent.trim() : '';

  // Extracting body text
  const bodyTextElement = element.querySelector('.elementor-column .elementor-widget-text-editor p');
  const bodyText = bodyTextElement ? bodyTextElement.textContent.trim() : '';

  // Extracting call-to-action link
  const ctaElement = element.querySelector('.elementor-widget-icon a');
  const ctaLink = ctaElement ? ctaElement.href : '';
  const ctaTextElement = element.querySelector('.elementor-widget-heading a');
  const ctaText = ctaTextElement ? ctaTextElement.textContent.trim() : '';

  // Extracting background image
  const backgroundImageElement = element.querySelector('.jet-parallax-section__image');
  const backgroundImage = backgroundImageElement ? backgroundImageElement.style.backgroundImage.replace(/url\("(.*)"\)/, '$1') : '';

  // Constructing table
  const contentRow = [];

  if (backgroundImage) {
    const imageElement = document.createElement('img');
    imageElement.src = backgroundImage;
    imageElement.alt = 'Background Image';
    contentRow.push(imageElement);
  }

  if (title) {
    const titleElement = document.createElement('h1');
    titleElement.textContent = title;
    contentRow.push(titleElement);
  }

  if (subHeading) {
    const subHeadingElement = document.createElement('h2');
    subHeadingElement.textContent = subHeading;
    contentRow.push(subHeadingElement);
  }

  if (bodyText) {
    const bodyTextElement = document.createElement('p');
    bodyTextElement.textContent = bodyText;
    contentRow.push(bodyTextElement);
  }

  if (ctaLink && ctaText) {
    const ctaLinkElement = document.createElement('a');
    ctaLinkElement.href = ctaLink;
    ctaLinkElement.textContent = ctaText;
    contentRow.push(ctaLinkElement);
  }

  const tableData = [headerRow, [contentRow]];
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  element.replaceWith(blockTable);
}
