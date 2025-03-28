export default function parse(element, { document }) {
  const blockNameRow = [document.createElement('strong')];
  blockNameRow[0].textContent = 'Hero';

  const rows = [blockNameRow];

  const titleElement = element.querySelector('.elementor-heading-title');
  const subtitleElement = element.querySelector('.elementor-widget-text-editor p');

  const contentRow = [];

  if (titleElement && titleElement.textContent.trim()) {
    const heading = document.createElement('h2');
    heading.textContent = titleElement.textContent.trim();
    contentRow.push(heading);
  }

  if (subtitleElement && subtitleElement.textContent.trim()) {
    const subtitle = document.createElement('p');
    subtitle.textContent = subtitleElement.textContent.trim();
    contentRow.push(subtitle);
  }

  rows.push([contentRow]); // Ensuring only one cell per row

  const block = WebImporter.DOMUtils.createTable(rows, document);

  element.replaceWith(block);
}
