export default function parse(element, { document }) {
  const cards = [];

  // Header row for the block
  const headerRow = ['Cards'];
  cards.push(headerRow);

  // Extract card data
  const items = element.querySelectorAll('.jet-hor-timeline-item');
  items.forEach((item) => {
    const imgElement = item.querySelector('.jet-hor-timeline-item__card-img img');
    const titleElement = item.querySelector('.jet-hor-timeline-item__card-title');
    const descElement = item.querySelector('.jet-hor-timeline-item__card-desc');

    // Ensure valid image element
    let img = null;
    if (imgElement) {
      img = document.createElement('img');
      img.src = imgElement.getAttribute('data-lazy-src') || imgElement.src;
      img.alt = imgElement.alt || '';
    }

    // Content: Ensure valid title and description elements
    const content = [];
    if (titleElement && titleElement.textContent.trim()) {
      const title = document.createElement('p');
      title.innerHTML = `<strong>${titleElement.textContent.trim()}</strong>`;
      content.push(title);
    }
    if (descElement && descElement.textContent.trim()) {
      const description = document.createElement('p');
      description.innerHTML = descElement.innerHTML.trim();
      content.push(description);
    }

    // Add row to cards
    cards.push([img, content]);
  });

  // Create the table and replace the element
  const table = WebImporter.DOMUtils.createTable(cards, document);
  element.replaceWith(table);
}