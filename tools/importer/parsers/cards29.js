export default function parse(element, { document }) {
  // Create header row for the table
  const cardsHeader = document.createElement('strong');
  cardsHeader.textContent = 'Cards';

  const rows = [];
  rows.push([cardsHeader]); // Add header row

  // Extract card items only from non-cloned elements
  const items = element.querySelectorAll('.jet-posts__item:not(.slick-cloned)');

  items.forEach(item => {
    // Extract image
    const imageContainer = item.querySelector('.post-thumbnail__img');
    const image = document.createElement('img');
    image.src = imageContainer.dataset.lazySrc || imageContainer.src;
    image.alt = imageContainer.alt || '';

    // Extract title
    const titleContainer = item.querySelector('.entry-title a');
    const title = document.createElement('h4');
    title.textContent = titleContainer ? titleContainer.textContent : '';

    // Extract description
    const descriptionContainer = item.querySelector('.entry-excerpt');
    const description = document.createElement('p');
    description.textContent = descriptionContainer ? descriptionContainer.textContent : '';

    // Extract call-to-action
    const ctaContainer = item.querySelector('.jet-more-wrap a');
    const cta = document.createElement('a');
    if (ctaContainer) {
      cta.href = ctaContainer.href;
      cta.textContent = ctaContainer.querySelector('.btn__text') ? ctaContainer.querySelector('.btn__text').textContent : '';
    }

    // Combine content into second table cell
    const contentCell = document.createElement('div');
    if (title.textContent) contentCell.append(title);
    if (description.textContent) contentCell.append(description);
    if (cta.textContent) contentCell.append(cta);

    // Add row to table
    rows.push([image, contentCell]);
  });

  // Create the block table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}