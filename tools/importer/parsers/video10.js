/* global WebImporter */
export default function parse(element, { document }) {
  // Extract relevant data from the HTML structure

  // Extracting the image element and its data
  const imageElement = element.querySelector('img');
  const imageSrc = imageElement.getAttribute('data-lazy-src') || imageElement.getAttribute('src');
  const image = document.createElement('img');
  image.setAttribute('src', imageSrc);

  // Extracting text content from headings
  const headingElement = element.querySelector('.elementor-heading-title');
  const headingText = headingElement ? headingElement.textContent.trim() : '';

  const subHeadingElement = element.querySelector('h3');
  const subHeadingText = subHeadingElement ? subHeadingElement.textContent.trim() : '';

  // Extracting text from the content editor
  const contentElement = element.querySelector('.elementor-widget-text-editor');
  const contentHTML = contentElement ? contentElement.innerHTML.trim() : '';
  const contentDiv = document.createElement('div');
  contentDiv.innerHTML = contentHTML;

  // Extracting button content
  const buttonElement = element.querySelector('.elementor-button');
  const buttonHref = buttonElement ? buttonElement.getAttribute('href') : '';
  const buttonText = buttonElement ? buttonElement.textContent.trim() : '';
  const buttonLink = document.createElement('a');
  if (buttonHref) {
    buttonLink.setAttribute('href', buttonHref);
    buttonLink.textContent = buttonText;
  }

  // Creating header row
  const headerRow = ['Video'];

  // Consolidating content into a single cell
  const combinedContent = document.createElement('div');
  const heading = document.createElement('div');
  heading.textContent = `${headingText} ${subHeadingText}`;
  combinedContent.appendChild(heading);
  combinedContent.appendChild(image);
  combinedContent.appendChild(contentDiv);
  combinedContent.appendChild(buttonLink);

  // Creating rows for createTable
  const cells = [
    headerRow,
    [combinedContent],
  ];

  // Using createTable to construct the block table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replacing the element with the new block table
  element.replaceWith(blockTable);
}
