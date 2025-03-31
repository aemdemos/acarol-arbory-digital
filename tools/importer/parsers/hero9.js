export default function parse(element, { document }) {
  // Extract title
  const titleElement = element.querySelector('.elementor-heading-title');
  const title = titleElement ? titleElement.cloneNode(true) : document.createElement('div');

  // Extract paragraph
  const paragraphElement = element.querySelector('.elementor-widget-text-editor > div > p');
  const paragraph = paragraphElement ? paragraphElement.cloneNode(true) : document.createElement('div');

  // Extract list items from unordered list
  const listItems = element.querySelectorAll('.elementor-widget-text-editor > div > ul > li');
  const listContainer = document.createElement('ul');
  if (listItems.length > 0) {
    listItems.forEach(li => listContainer.appendChild(li.cloneNode(true)));
  }

  // Extract call-to-action
  const ctaElement = element.querySelector('.elementor-button-wrapper a');
  const callToAction = ctaElement ? ctaElement.cloneNode(true) : document.createElement('a');
  callToAction.innerHTML = ctaElement ? ctaElement.innerHTML : "";
  callToAction.href = ctaElement ? ctaElement.href : "#";

  // Construct the block table
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Hero';
  const headerRow = [headerCell];

  const contentCell = document.createElement('div');
  contentCell.appendChild(title);
  contentCell.appendChild(paragraph);
  contentCell.appendChild(listContainer);
  contentCell.appendChild(callToAction);
  const contentRow = [contentCell];

  const cells = [headerRow, contentRow];

  // Create the table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace element with structured table
  element.replaceWith(table);
}