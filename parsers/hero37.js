export default function parse(element, { document }) {
    // Extract the image element
    const img = element.querySelector('img');

    // Create the strong element for the header row
    const headerCell = document.createElement('strong');
    headerCell.textContent = 'Hero';
    const headerRow = [headerCell];

    // Create the content row
    const contentRow = [];

    // Add the image as the background image if available
    if (img) {
        const imageElement = document.createElement('img');
        imageElement.src = img.getAttribute('data-lazy-src') || img.src;
        imageElement.alt = img.alt || '';
        contentRow.push(imageElement);
    }

    // Create the table using the helper function
    const cells = [
        headerRow,
        contentRow
    ];
    const block = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element with the new block
    element.replaceWith(block);
}