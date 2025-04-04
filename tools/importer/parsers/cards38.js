/* global WebImporter */
export default function parse(element, { document }) {
  // Extract all timeline items
  const items = element.querySelectorAll('.jet-hor-timeline-item');

  // Prepare table rows
  const rows = [['Cards']]; // Header row

  items.forEach((item) => {
    const imageElement = item.querySelector('.jet-hor-timeline-item__card-img img');
    const titleElement = item.querySelector('.jet-hor-timeline-item__card-title');
    const descElement = item.querySelector('.jet-hor-timeline-item__card-desc');

    // Create image element
    const image = document.createElement('img');
    image.src = imageElement?.dataset.lazySrc || imageElement?.src || ''; // Handle missing image source
    image.alt = imageElement?.alt || ''; // Handle missing alt text

    // Create text content
    const textContent = document.createElement('div');

    if (titleElement) {
      const title = document.createElement('h5');
      title.textContent = titleElement.textContent;
      textContent.appendChild(title);
    }

    if (descElement) {
      const desc = document.createElement('p');
      desc.innerHTML = descElement.innerHTML; // Keep inner formatting
      textContent.appendChild(desc);
    }

    rows.push([image, textContent]);
  });

  // Create table block
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element with the block
  element.replaceWith(block);
}
