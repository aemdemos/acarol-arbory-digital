export default function parse(element, { document }) {
    // Extract the title element within the provided HTML block
    const titleElement = element.querySelector('.single-post-title.entry-title');

    // Handle edge case for missing or empty title element
    const titleText = titleElement ? titleElement.textContent.trim() : 'No Title Found';

    // Create header row for the table matching the example structure
    const headerRow = [document.createElement('strong')];
    headerRow[0].textContent = 'Table (striped, bordered)';

    // Create content row for the table
    const contentRow = [titleText];

    // Assemble the table array
    const tableArray = [
        headerRow,
        contentRow
    ];

    // Create the table block using WebImporter.DOMUtils.createTable()
    const blockTable = WebImporter.DOMUtils.createTable(tableArray, document);

    // Replace the original element with the newly created block table
    element.replaceWith(blockTable);
}