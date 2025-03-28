export default function parse(element, { document }) {
  const titleElement = element.querySelector('.elementor-heading-title');
  const subheadingElement = element.querySelector('h3.elementor-heading-title');
  const textElement = element.querySelector('p');
  const ctaElement = element.querySelector('h2.elementor-heading-title a');

  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Hero';

  const contentCell = [];

  if (titleElement) {
    const title = document.createElement('h1');
    title.textContent = titleElement.textContent;
    contentCell.push(title);
  }

  if (subheadingElement) {
    const subheading = document.createElement('h2');
    subheading.textContent = subheadingElement.textContent;
    contentCell.push(subheading);
  }

  if (textElement) {
    const text = document.createElement('p');
    text.textContent = textElement.textContent;
    contentCell.push(text);
  }

  if (ctaElement) {
    const cta = document.createElement('a');
    cta.textContent = ctaElement.textContent;
    cta.href = ctaElement.href;
    contentCell.push(cta);
  }

  const cells = [
    headerRow,
    [contentCell]
  ];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(blockTable);
}