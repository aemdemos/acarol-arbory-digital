/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards'];

  const articles = [...element.querySelectorAll('article')];

  const rows = articles.map((article) => {
    const imgElement = article.querySelector('.elementor-post__thumbnail img');
    const image = imgElement ? document.createElement('img') : null;
    if (imgElement) {
      image.src = imgElement.getAttribute('data-lazy-src') || imgElement.src;
    }

    const titleAnchor = article.querySelector('.elementor-post__title a');
    const title = document.createElement('strong');
    title.textContent = titleAnchor ? titleAnchor.textContent.trim() : '';

    const dateElement = article.querySelector('.elementor-post-date');
    const date = dateElement ? dateElement.textContent.trim() : '';

    const readMoreAnchor = article.querySelector('.elementor-post__read-more');
    const readMoreLink = readMoreAnchor ? document.createElement('a') : null;
    if (readMoreAnchor) {
      readMoreLink.href = readMoreAnchor.href;
      readMoreLink.textContent = 'Read More »';
    }

    const textContent = [title, document.createElement('br'), date];
    if (readMoreLink) textContent.push(document.createElement('br'), readMoreLink);

    return [image, textContent];
  });

  const tableData = [headerRow, ...rows];

  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  element.replaceWith(blockTable);
}