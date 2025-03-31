/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // First row: Header indicating block type
  const headerRow = ['Hero'];
  cells.push(headerRow);

  // Second row: Content components extracted dynamically
  const contentRow = [];

  // Background Image (Optional)
  const bgImageElement = element.querySelector('.jet-parallax-section__image');
  const bgImageStyle = bgImageElement ? bgImageElement.style.backgroundImage : '';
  let bgImage = null;
  if (bgImageStyle) {
    const urlMatch = bgImageStyle.match(/url\((.*?)\)/);
    if (urlMatch && urlMatch[1]) {
      bgImage = document.createElement('img');
      bgImage.src = urlMatch[1].replace(/"/g, '');
    }
  }

  // Extract Title (mandatory)
  const titleElement = element.querySelector('.elementor-column .elementor-widget-heading .elementor-heading-title');
  const title = titleElement ? document.createElement('h1') : null;
  if (title && titleElement) {
    title.textContent = titleElement.textContent;
  }

  // Extract Subheading (optional)
  const subheadingElement = element.querySelector('.elementor-column .elementor-widget-heading + .elementor-widget-heading .elementor-heading-title');
  const subheading = subheadingElement ? document.createElement('p') : null;
  if (subheading && subheadingElement) {
    subheading.textContent = subheadingElement.textContent;
  }

  // Extract Call-to-Action (optional)
  const ctaElement = element.querySelector('.elementor-column .elementor-widget-button .elementor-widget-container .elementor-button-link');
  const ctaLink = ctaElement ? document.createElement('a') : null;
  if (ctaLink && ctaElement) {
    ctaLink.href = ctaElement.href;
    ctaLink.textContent = ctaElement.textContent;
  }

  // Combine extracted components into a single row
  const contentElements = [bgImage, title, subheading, ctaLink].filter(Boolean);
  contentRow.push(contentElements);

  // Add the content row to the table
  cells.push(contentRow);

  // Create the block table using WebImporter.DOMUtils.createTable
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the constructed block table
  element.replaceWith(block);
}
