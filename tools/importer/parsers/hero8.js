export default function parse(element, { document }) {
  // Extract the background image URL
  const parallaxSection = element.querySelector('.jet-parallax-section__image');
  const backgroundImageUrl = parallaxSection && parallaxSection.style.backgroundImage
    ? parallaxSection.style.backgroundImage.slice(5, -2) // Stripping `url("` and `")`
    : null;

  // Extract the title
  const titleElement = element.querySelector('.elementor-widget-heading .elementor-heading-title');
  const title = titleElement ? titleElement.textContent.trim() : '';

  // Extract the subheading
  const subheadingElement = element.querySelector('.elementor-widget-heading h3.elementor-heading-title');
  const subheading = subheadingElement ? subheadingElement.textContent.trim() : '';

  // Extract the description text
  const textEditorElement = element.querySelector('.elementor-widget-text-editor p');
  const description = textEditorElement ? textEditorElement.textContent.trim() : '';

  // Extract the call-to-action
  const buttonElement = element.querySelector('.elementor-widget-button a');
  const ctaText = buttonElement ? buttonElement.textContent.trim() : '';
  const ctaLink = buttonElement ? buttonElement.getAttribute('href') : '';

  // Create table header row
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Hero';

  // Combine content into one cell for the second row
  const secondRowContent = [];

  // Add background image if available
  if (backgroundImageUrl) {
    const img = document.createElement('img');
    img.src = backgroundImageUrl;
    secondRowContent.push(img);
  }

  // Add title
  if (title) {
    const titleHeading = document.createElement('h1');
    titleHeading.textContent = title;
    secondRowContent.push(titleHeading);
  }

  // Add subheading
  if (subheading) {
    const subheadingElement = document.createElement('h3');
    subheadingElement.textContent = subheading;
    secondRowContent.push(subheadingElement);
  }

  // Add description text
  if (description) {
    const descriptionParagraph = document.createElement('p');
    descriptionParagraph.textContent = description;
    secondRowContent.push(descriptionParagraph);
  }

  // Add CTA button
  if (ctaText && ctaLink) {
    const ctaElement = document.createElement('a');
    ctaElement.textContent = ctaText;
    ctaElement.href = ctaLink;
    secondRowContent.push(ctaElement);
  }

  // Create the table rows
  const tableRows = [
    headerRow,
    [secondRowContent] // Second row is a single cell containing all the content
  ];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}