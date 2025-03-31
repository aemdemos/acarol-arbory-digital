export default function parse(element, { document }) {
  const cardsBlockHeader = ['Cards (no images)'];
  const rows = [];

  rows.push(cardsBlockHeader);

  const columns = element.querySelectorAll('.elementor-column');

  columns.forEach((column) => {
    const titleElement = column.querySelector('h2');
    const textElement = column.querySelector('.elementor-widget-text-editor');

    if (titleElement && textElement) {
      const title = titleElement.innerText.trim();
      const content = textElement.innerHTML.trim();
      const combinedContent = `${title}\n${content}`;
      rows.push([combinedContent]);
    }
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}