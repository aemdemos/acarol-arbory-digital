/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards'];

  // Helper function to extract card details
  const extractCardData = (cardElement) => {
    const imageElement = cardElement.querySelector('.jet-hor-timeline-item__card-img img');
    const image = imageElement && document.createElement('img');
    if (image) {
      image.src = imageElement.src;
      image.alt = imageElement.alt;
      image.title = imageElement.title;
    }

    const titleElement = cardElement.querySelector('.jet-hor-timeline-item__card-title');
    const title = titleElement && document.createElement('h5');
    if (title) {
      title.textContent = titleElement.textContent;
    }

    const descElement = cardElement.querySelector('.jet-hor-timeline-item__card-desc');
    const description = descElement && document.createElement('p');
    if (description) {
      description.innerHTML = descElement.innerHTML;
    }

    return [image, [title, description].filter(Boolean)];
  };

  // Extract all cards
  const cards = Array.from(element.querySelectorAll('.jet-hor-timeline-item')).map((cardElement) => extractCardData(cardElement));

  // Create the table
  const tableData = [headerRow, ...cards];
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}
