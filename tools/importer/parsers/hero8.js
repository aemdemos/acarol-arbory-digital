/* global WebImporter */
export default function parse(element, { document }) {
  // Extracting relevant content
  const backgroundImage = element.querySelector('.jet-parallax-section__image');
  const titleElement = element.querySelector('.elementor-widget-heading .elementor-heading-title');
  const subheadingElement = element.querySelector('.elementor-widget-heading:nth-of-type(2) .elementor-heading-title');
  const textElement = element.querySelector('.elementor-widget-text-editor p'); // Selecting only the <p> for text
  const buttonElement = element.querySelector('.elementor-widget-button a');

  // Creating structured elements
  const image = backgroundImage && backgroundImage.style.backgroundImage
    ? (() => {
        const img = document.createElement('img');
        const imageUrl = backgroundImage.style.backgroundImage.match(/url\("(.*)"\)/)?.[1];
        if (imageUrl) {
          img.src = imageUrl;
        }
        return img;
      })()
    : null;

  const title = titleElement && titleElement.textContent
    ? (() => {
        const h1 = document.createElement('h1');
        h1.textContent = titleElement.textContent.trim();
        return h1;
      })()
    : null;

  const subheading = subheadingElement && subheadingElement.textContent
    ? (() => {
        const h3 = document.createElement('h3');
        h3.textContent = subheadingElement.textContent.trim();
        return h3;
      })()
    : null;

  const text = textElement && textElement.textContent
    ? (() => {
        const p = document.createElement('p');
        p.textContent = textElement.textContent.trim(); // Using textContent to avoid nested HTML
        return p;
      })()
    : null;

  const button = buttonElement && buttonElement.textContent && buttonElement.href
    ? (() => {
        const a = document.createElement('a');
        a.textContent = buttonElement.textContent.trim();
        a.href = buttonElement.href;
        return a;
      })()
    : null;

  // Constructing the table
  const headerRow = ['Hero'];
  const contentRow = [
    [image, title, subheading, text, button].filter(Boolean),
  ];

  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replacing the original element
  element.replaceWith(block);
}