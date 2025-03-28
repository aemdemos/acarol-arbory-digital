export default function parse(element, { document }) {
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Columns';
  const headerRow = [headerCell];

  const columns = Array.from(element.querySelectorAll('.elementor-column')).map((column) => {
    const cells = [];

    const heading = column.querySelector('.elementor-heading-title');
    if (heading) {
      const headingElement = document.createElement('h2');
      headingElement.textContent = heading.textContent;
      cells.push(headingElement);
    }

    const contentItems = column.querySelectorAll(
      '.elementor-widget-container p, .elementor-icon-list-text'
    );
    contentItems.forEach((item) => {
      const paragraph = document.createElement('p');
      paragraph.textContent = item.textContent.trim();
      cells.push(paragraph);
    });

    const newsletterButton = column.querySelector(
      '.elementor-button-content-wrapper'
    );
    if (newsletterButton && heading?.textContent.trim() === 'Subscribe to our Newsletter') {
      const paragraph = document.createElement('p');
      paragraph.textContent = newsletterButton.textContent.trim();
      cells.push(paragraph);
    }

    return cells.length > 0 ? cells : undefined;
  }).filter(Boolean);

  const blockTable = WebImporter.DOMUtils.createTable([headerRow, columns], document);
  element.replaceWith(blockTable);
}