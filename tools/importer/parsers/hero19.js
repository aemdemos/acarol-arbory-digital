/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the main heading
  const title = element.querySelector('.elementor-element-80772b0 .elementor-heading-title');

  // Extract subheading
  const subheading = element.querySelector('.elementor-element-e60eba9 .elementor-heading-title');

  // Extract description text
  const description = element.querySelector('.elementor-element-fd54bdb p');

  // Analyze the button element
  const buttonEl = element.querySelector('.elementor-element-76b7fe9 .elementor-button');
  const buttonText = buttonEl ? buttonEl.textContent.trim() : '';
  const buttonLink = buttonEl ? buttonEl.getAttribute('href') : '';

  // Extract image element
  const image = element.querySelector('.elementor-element-8d129d0 img');
  const imageEl = document.createElement('img');
  imageEl.src = image.getAttribute('data-lazy-src') || image.getAttribute('src');
  imageEl.alt = image.getAttribute('alt') || '';

  // Combine all elements into a single cell for the second row
  const combinedCellContent = document.createElement('div');
  combinedCellContent.appendChild(imageEl);
  combinedCellContent.appendChild(document.createElement('hr'));
  combinedCellContent.appendChild(title);
  if (subheading) combinedCellContent.appendChild(subheading.cloneNode(true));
  if (description) combinedCellContent.appendChild(description.cloneNode(true));
  if (buttonText && buttonLink) {
    const buttonLinkEl = document.createElement('a');
    buttonLinkEl.href = buttonLink;
    buttonLinkEl.textContent = buttonText;
    combinedCellContent.appendChild(buttonLinkEl);
  }

  // Compose the table for the Hero block
  const cells = [
    ['Hero'],
    [combinedCellContent] // Combine everything into a single cell
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(block); // Replace original element
}
