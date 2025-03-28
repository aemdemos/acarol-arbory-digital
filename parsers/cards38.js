export default function parse(element, { document }) {
  const rows = [];

  // Add the header row
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Cards';
  rows.push([headerCell]);

  // Collect card details
  const items = element.querySelectorAll('.jet-hor-timeline-item');

  items.forEach((item) => {
    const imageElement = item.querySelector('.jet-hor-timeline-item__card-img img');
    const titleElement = item.querySelector('.jet-hor-timeline-item__card-title');
    const descriptionElement = item.querySelector('.jet-hor-timeline-item__card-desc');

    // Create the image cell
    const imageCell = document.createElement('img');
    if (imageElement) {
      imageCell.src = imageElement.getAttribute('src');
      imageCell.alt = imageElement.getAttribute('alt') || '';
      imageCell.title = imageElement.getAttribute('title') || '';
    }

    // Create the content cell
    const contentCell = document.createElement('div');

    if (titleElement) {
      const title = document.createElement('strong');
      title.textContent = titleElement.textContent;
      contentCell.appendChild(title);
    }

    if (descriptionElement) {
      const description = document.createElement('p');
      description.innerHTML = descriptionElement.innerHTML;
      contentCell.appendChild(description);
    }

    // Push the row
    rows.push([imageCell, contentCell]);
  });

  // Create the table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(table);
}