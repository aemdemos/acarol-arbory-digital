export default function parse(element, { document }) {
  // Identify all articles within the provided element
  const articles = element.querySelectorAll('article');

  // Initialize rows for the table
  const rows = [];

  // Add the header row
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Cards';
  rows.push(headerRow);

  // Iterate through each article to extract content
  articles.forEach(article => {
    // Extract image if available
    const imageElement = article.querySelector('.elementor-post__thumbnail img');
    let image;
    if (imageElement) {
      image = document.createElement('img');
      image.src = imageElement.getAttribute('data-lazy-src') || imageElement.src;
    }

    // Extract title
    const titleElement = article.querySelector('.elementor-post__title a');
    const title = document.createElement('h3');
    title.textContent = titleElement.textContent.trim();

    // Extract date
    const dateElement = article.querySelector('.elementor-post-date');
    const date = document.createElement('p');
    date.textContent = dateElement ? dateElement.textContent.trim() : '';

    // Extract Read More link
    const readMoreElement = article.querySelector('.elementor-post__read-more');
    const readMoreLink = document.createElement('a');
    if (readMoreElement) {
      readMoreLink.href = readMoreElement.href;
      readMoreLink.textContent = 'Read More »';
    }

    // Combine text content
    const textContent = [title, date, readMoreLink].filter(Boolean);

    // Add a row for the current article
    rows.push([image || '', textContent]);
  });

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}