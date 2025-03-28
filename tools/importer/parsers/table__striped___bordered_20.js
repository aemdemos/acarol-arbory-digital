export default function parse(element, { document }) {
    // Validate input and handle edge cases
    if (!element || !document) return;

    // Extract relevant content from the input element
    const titleElement = element.querySelector('h2.single-post-title');
    const titleText = titleElement ? titleElement.textContent.trim() : 'No Title Available';

    // Organize the content into a table structure
    const headerCell = document.createElement('strong');
    headerCell.textContent = 'Table (striped, bordered)';
    const headerRow = [headerCell];

    const contentRow = [titleText];

    const cells = [
        headerRow,
        contentRow
    ];

    // Create the block table using WebImporter.DOMUtils.createTable()
    const blockTable = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element with the new block table
    element.replaceWith(blockTable);
}