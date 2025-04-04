/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the heading
  const heading = element.querySelector('h2.elementor-heading-title');
  const headingText = heading ? heading.textContent.trim() : '';

  // Extract the introductory text
  const introTextElement = element.querySelector('.elementor-widget-text-editor p');
  const introText = introTextElement ? introTextElement.textContent.trim() : '';

  // Extract the call-to-action button
  const buttonElement = element.querySelector('.elementor-button');
  const buttonText = buttonElement ? buttonElement.textContent.trim() : '';
  const buttonLink = buttonElement ? buttonElement.getAttribute('href') : '';

  // Extract the background image
  const imageElement = element.querySelector('img');
  const imageSrc = imageElement ? imageElement.getAttribute('data-lazy-src') || imageElement.getAttribute('src') : '';

  // Create elements for the block
  const headingEl = document.createElement('h1');
  headingEl.textContent = headingText;

  const introTextEl = document.createElement('p');
  introTextEl.textContent = introText;

  const buttonEl = document.createElement('a');
  buttonEl.href = buttonLink;
  buttonEl.textContent = buttonText;

  const imageEl = document.createElement('img');
  imageEl.src = imageSrc;

  // Create table cells
  const headerRow = ['Hero'];
  const contentRow = [imageEl, headingEl, introTextEl, buttonEl];

  const cells = [
    headerRow,
    [contentRow]
  ];

  // Create the table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}