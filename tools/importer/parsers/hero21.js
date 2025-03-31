export default function parse(element, { document }) {
  const headerRow = ['Hero'];

  // Extract title
  const titleElement = element.querySelector('h1');
  const titleText = titleElement ? titleElement.textContent.trim() : '';
  const title = document.createElement('h1');
  title.textContent = titleText;

  // Extract description
  const descriptionElement = element.querySelector('.elementor-widget-text-editor .elementor-widget-container');
  const descriptionText = descriptionElement ? descriptionElement.textContent.trim() : '';
  const description = document.createElement('p');
  description.textContent = descriptionText;

  // Extract call-to-action
  const ctaElement = element.querySelector('.elementor-widget-button a');
  const ctaText = ctaElement ? ctaElement.textContent.trim() : '';
  const ctaLink = ctaElement ? ctaElement.href : '';
  const cta = document.createElement('a');
  cta.textContent = ctaText;
  cta.href = ctaLink;

  // Construct block table
  const cells = [
    headerRow,
    [title, description, cta]
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}