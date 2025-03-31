/* global WebImporter */
export default function parse(element, { document }) {
    const headerRow = ['Cards']; // Define the header row

    // Iterate over all articles
    const rows = [...element.querySelectorAll('article')].map((post) => {
        const imageWrapper = post.querySelector('img')?.cloneNode(true); // Clone the image node if available

        const titleAnchor = post.querySelector('h3 > a');
        const title = titleAnchor ? document.createElement('strong') : '';
        if (titleAnchor) {
            title.textContent = titleAnchor.textContent.trim();
        }

        const dateSpan = post.querySelector('.elementor-post-date');
        const date = dateSpan ? dateSpan.textContent.trim() : '';

        const contentWrapper = document.createElement('div');
        if (title) contentWrapper.appendChild(title);
        if (date) contentWrapper.appendChild(document.createElement('br'));
        if (date) contentWrapper.appendChild(document.createTextNode(date));
        return [imageWrapper || '', contentWrapper];
    });

    const cells = [headerRow, ...rows];

    const table = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(table);
}
