export default function parse(element, { document }) {
    // Extract the title text from the provided header element
    const headlineElement = element.querySelector('[itemprop="headline"]');
    const headline = headlineElement ? headlineElement.textContent.trim() : 'No headline found';

    // Define table structure for the replacement block
    const headerCell = document.createElement('strong');
    headerCell.textContent = 'Table (striped, bordered)';
    const headerRow = [headerCell];
    const contentRow = [document.createTextNode(headline)];

    const cells = [
        headerRow, // Header row
        contentRow, // Content row
    ];

    // Create a table block using the helper function
    const block = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element with the created table block
    if (element.parentNode) {
        element.replaceWith(block);
    } else {
        console.error('Parent node not available for element replacement');
    }
}