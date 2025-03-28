export default function parse(element, { document }) {
    const cards = Array.from(element.querySelectorAll('.jet-hor-timeline-item'));

    const rows = [];

    // Add the header row
    const headerRow = [document.createElement('strong')];
    headerRow[0].textContent = "Cards";
    rows.push(headerRow);

    // Process each card and create rows
    cards.forEach((card) => {
        const imageElement = card.querySelector('.jet-hor-timeline-item__card-img img');
        const imageCell = document.createElement('img');
        
        if (imageElement) {
            imageCell.src = imageElement.getAttribute('data-lazy-src') || imageElement.getAttribute('src');
            imageCell.alt = imageElement.getAttribute('alt') || '';
        }

        const titleElement = card.querySelector('.jet-hor-timeline-item__card-title');
        const descElement = card.querySelector('.jet-hor-timeline-item__card-desc');

        // Create the text cell
        const textCell = [];
        if (titleElement) {
            const title = document.createElement('h5');
            title.textContent = titleElement.textContent;
            textCell.push(title);
        }
        if (descElement) {
            const description = document.createElement('p');
            description.innerHTML = descElement.innerHTML; // Use innerHTML to preserve line breaks.
            textCell.push(description);
        }

        rows.push([imageCell, textCell]);
    });

    // Create the table
    const table = WebImporter.DOMUtils.createTable(rows, document);

    // Replace the original element with the table
    element.replaceWith(table);
}