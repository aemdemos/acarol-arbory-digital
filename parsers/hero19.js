export default function parse(element, { document }) {
  // Helper to create an <hr> element
  const createHr = () => document.createElement('hr');

  // Extract title and subheading
  const titleEl = element.querySelector('.elementor-heading-title');
  const title = document.createElement('h1');
  title.textContent = titleEl ? titleEl.textContent : '';

  const subheadingEl = element.querySelector('.elementor-widget-heading h3');
  const subheading = document.createElement('h3');
  subheading.textContent = subheadingEl ? subheadingEl.textContent : '';

  // Extract text content
  const textEl = element.querySelector('.elementor-widget-text-editor p');
  const text = document.createElement('p');
  text.textContent = textEl ? textEl.textContent : '';

  // Extract image
  const imageEl = element.querySelector('img');
  const image = document.createElement('img');
  if (imageEl) {
    image.src = imageEl.getAttribute('data-lazy-src') || imageEl.src;
    image.alt = imageEl.alt;
    image.width = imageEl.width;
    image.height = imageEl.height;
  }

  // Extract call to action
  const buttonEl = element.querySelector('.elementor-button');
  const cta = document.createElement('a');
  if (buttonEl) {
    cta.href = buttonEl.href;
    cta.textContent = buttonEl.textContent.trim();
  }

  // Create the block table
  const headerRow = ['Hero'];
  const contentCell = document.createElement('div');

  if (image) contentCell.appendChild(image);
  if (title) contentCell.appendChild(title);
  if (subheading) contentCell.appendChild(subheading);
  if (text) contentCell.appendChild(text);
  if (cta) contentCell.appendChild(cta);
  contentCell.appendChild(createHr());

  const cells = [
    headerRow,
    [contentCell],
  ];
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with the block table
  element.replaceWith(blockTable);
}
