export default function parse(element, { document }) {
  const rows = [];

  // Correct header row - Matches example exactly
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Cards';
  const headerRow = [headerCell];
  rows.push(headerRow);

  // Extract articles from the given element
  const articles = element.querySelectorAll('article');

  articles.forEach((article) => {
    const cells = [];

    // Process image
    const thumbnailLink = article.querySelector('.elementor-post__thumbnail__link img');
    if (thumbnailLink) {
      const img = document.createElement('img');
      img.src = thumbnailLink.getAttribute('data-lazy-src') || thumbnailLink.src;
      img.alt = thumbnailLink.alt || 'Image';
      cells.push(img);
    } else {
      // Provide meaningful alternative representation for missing images
      const placeholderText = document.createElement('p');
      placeholderText.textContent = 'Image missing';
      cells.push(placeholderText);
    }

    // Process text content
    const textContent = [];

    const titleLink = article.querySelector('.elementor-post__title a');
    if (titleLink) {
      const title = document.createElement('h3');
      const link = document.createElement('a');
      link.href = titleLink.href;
      link.textContent = titleLink.textContent.trim();
      title.appendChild(link);
      textContent.push(title);
    }

    const dateSpan = article.querySelector('.elementor-post-date');
    if (dateSpan) {
      const date = document.createElement('p');
      date.textContent = dateSpan.textContent.trim();
      textContent.push(date);
    }

    const readMoreLink = article.querySelector('.elementor-post__read-more');
    if (readMoreLink) {
      const cta = document.createElement('a');
      cta.href = readMoreLink.href;
      cta.textContent = 'Read More';
      textContent.push(cta);
    }

    cells.push(textContent);
    rows.push(cells);
  });

  // Create table block
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}
