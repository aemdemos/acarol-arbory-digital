/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards'];

  // Extract all unique items (cards) based on their visible state (ignore clones).
  const items = Array.from(element.querySelectorAll('.jet-posts__item:not(.slick-cloned)'));

  // Map each item into structured table rows (2 columns).
  const rows = items.map((item) => {
    const imageLink = item.querySelector('.post-thumbnail__link img');
    const titleLink = item.querySelector('.entry-title a');
    const description = item.querySelector('.entry-excerpt');
    const readMoreLink = item.querySelector('.jet-more-wrap a');

    // Image cell (mandatory)
    const imageCell = document.createElement('div');
    if (imageLink) {
      const img = document.createElement('img');
      img.src = imageLink.getAttribute('data-lazy-src') || imageLink.src;
      img.alt = imageLink.alt;
      imageCell.appendChild(img);
    }

    // Text content cell (mandatory)
    const textContentCell = document.createElement('div');
    if (titleLink) {
      const title = document.createElement('h2');
      title.textContent = titleLink.textContent;
      textContentCell.appendChild(title);
    }
    if (description) {
      const para = document.createElement('p');
      para.textContent = description.textContent;
      textContentCell.appendChild(para);
    }
    if (readMoreLink) {
      const link = document.createElement('a');
      link.href = readMoreLink.href;
      link.textContent = readMoreLink.textContent;
      textContentCell.appendChild(link);
    }

    return [imageCell, textContentCell];
  });

  // Combine header and rows.
  const cells = [headerRow, ...rows];

  // Create block table using WebImporter.DOMUtils.createTable()
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with new block table.
  element.replaceWith(block);
}