/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // First row: Header row
  cells.push(['Hero']);

  // Second row: Content row
  const contentRow = [];

  // Extract background image if available
  const backgroundImgDiv = element.querySelector('.jet-parallax-section__image');
  let backgroundImg;
  if (backgroundImgDiv) {
    const style = backgroundImgDiv.getAttribute('style');
    const [, , url] = style?.match(/url\((['"]?)(.*?)\1\)/) || [];
    if (url) {
      const img = document.createElement('img');
      img.src = url;
      backgroundImg = img;
    }
  }

  // Extract title
  const title = element.querySelector('h1.elementor-heading-title');
  let heading;
  if (title) {
    heading = document.createElement('h1');
    heading.textContent = title.textContent.trim();
  }

  // Extract subheading if available
  const subheading = element.querySelector('h3.elementor-heading-title');
  let subheadingElem;
  if (subheading) {
    subheadingElem = document.createElement('h3');
    subheadingElem.textContent = subheading.textContent.trim();
  }

  // Extract call-to-action if available
  const ctaLink = element.querySelector('a.elementor-button');
  let ctaElem;
  if (ctaLink) {
    ctaElem = document.createElement('a');
    ctaElem.href = ctaLink.href;
    ctaElem.textContent = ctaLink.textContent.trim();
  }

  // Combine all extracted content into a single cell
  const combinedContent = document.createElement('div');
  if (backgroundImg) combinedContent.appendChild(backgroundImg);
  if (heading) combinedContent.appendChild(heading);
  if (subheadingElem) combinedContent.appendChild(subheadingElem);
  if (ctaElem) combinedContent.appendChild(ctaElem);

  contentRow.push(combinedContent);

  cells.push(contentRow);

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
