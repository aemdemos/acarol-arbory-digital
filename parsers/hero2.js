export default function parse(element, { document }) {
  // Helper to extract content by class name
  function extractTextContent(el, className) {
    const child = el.querySelector(`.${className}`);
    return child ? child.textContent.trim() : '';
  }

  // Extract the first heading (Title)
  const title = extractTextContent(element, 'elementor-element-cc93e34');

  // Extract the second heading (Subheading)
  const subheading = extractTextContent(element, 'elementor-element-9e1afbc');

  // Extract the button text and link
  const buttonElement = element.querySelector('.elementor-element-111d2e8 a');
  const buttonText = buttonElement ? buttonElement.textContent.trim() : '';
  const buttonLink = buttonElement ? buttonElement.href : '';

  // Extract hero image (assume it's the first image in the right column)
  const heroImageElement = element.querySelector('.elementor-image-box-img img');
  const heroImageUrl = heroImageElement ? heroImageElement.src : '';

  // Create structured table data
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Hero';
  const headerRow = [headerCell];

  const cells = [
    headerRow,
    [
      heroImageUrl ? (() => {
        const img = document.createElement('img');
        img.src = heroImageUrl;
        return img;
      })() : '',
      (() => {
        const contentWrapper = document.createElement('div');
        if (title) {
          const titleElement = document.createElement('h2');
          titleElement.textContent = title;
          contentWrapper.appendChild(titleElement);
        }
        if (subheading) {
          const subheadingElement = document.createElement('h3');
          subheadingElement.textContent = subheading;
          contentWrapper.appendChild(subheadingElement);
        }
        if (buttonText && buttonLink) {
          const buttonElement = document.createElement('a');
          buttonElement.href = buttonLink;
          buttonElement.textContent = buttonText;
          buttonElement.className = 'cta-button';
          contentWrapper.appendChild(buttonElement);
        }
        return contentWrapper;
      })(),
    ],
  ];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}
