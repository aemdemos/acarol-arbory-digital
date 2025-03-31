export default function parse(element, { document }) {
    // Create the header row as a <th><strong> element
    const headerCell = document.createElement('strong');
    headerCell.textContent = 'Cards';
    const headerRow = [headerCell];

    // Helper function to create content rows for each card
    const createCardRow = (article) => {
        const textContainer = document.createElement('div');
        const titleElement = article.querySelector('.elementor-post__title a');
        const dateElement = article.querySelector('.elementor-post-date');
        const readMoreElement = article.querySelector('.elementor-post__read-more');

        const title = titleElement ? document.createElement('span') : null;
        if (title) {
            title.style.fontWeight = 'bold';
            title.appendChild(titleElement.cloneNode(true));
        }

        const date = dateElement ? document.createElement('span') : null;
        if (date) {
            date.textContent = dateElement.textContent.trim();
        }

        const readMore = readMoreElement ? document.createElement('a') : null;
        if (readMore) {
            readMore.href = readMoreElement.href;
            readMore.textContent = readMoreElement.textContent.trim();
        }

        if (title) textContainer.appendChild(title);
        if (date) {
            textContainer.appendChild(document.createElement('br'));
            textContainer.appendChild(date);
        }
        if (readMore) {
            textContainer.appendChild(document.createElement('br'));
            textContainer.appendChild(readMore);
        }

        const imageElement = article.querySelector('.elementor-post__thumbnail img');
        let image = null;

        if (imageElement) {
            image = document.createElement('img');
            image.src = imageElement.getAttribute('data-lazy-src') || imageElement.src;
            image.alt = imageElement.alt || '';
        } else {
            // Handle missing images with a placeholder or empty image structure
            image = document.createElement('img');
            image.src = 'https://via.placeholder.com/150'; // A simple placeholder image
            image.alt = 'Placeholder Image';
        }

        return [image, textContainer];
    };

    const articles = element.querySelectorAll('article');
    const rows = Array.from(articles).map(createCardRow);

    // Combine header row with card rows
    const tableData = [headerRow, ...rows];
    const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

    element.replaceWith(blockTable);
}