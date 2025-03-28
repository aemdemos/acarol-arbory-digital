export default function parse(element, { document }) {
    const cells = [];

    // Create header row dynamically
    const headerRow = [document.createElement('strong')];
    headerRow[0].textContent = 'Cards (no images)';
    cells.push(headerRow);

    // Extract cards content dynamically
    const cardElements = Array.from(element.querySelectorAll('.elementor-post__card'));

    cardElements.forEach(card => {
        const titleElement = card.querySelector('.elementor-post__title a');
        const descriptionElement = card.querySelector('.elementor-post__excerpt p');

        const cardContent = document.createElement('div');

        // Properly handle title extraction
        if (titleElement && titleElement.textContent.trim()) {
            const title = document.createElement('h3');
            title.textContent = titleElement.textContent.trim();
            cardContent.appendChild(title);
        }

        // Properly handle description extraction
        if (descriptionElement && descriptionElement.textContent.trim()) {
            const description = document.createElement('p');
            description.textContent = descriptionElement.textContent.trim();
            cardContent.appendChild(description);
        }

        // Add card content dynamically to cells
        cells.push([cardContent]);
    });

    // Create table block dynamically
    const block = WebImporter.DOMUtils.createTable(cells, document);

    // Replace original element dynamically
    element.replaceWith(block);
}