export default function parse(element, { document }) {
    const createTable = WebImporter.DOMUtils.createTable;

    // Extract the content from the columns dynamically
    const columns = Array.from(element.querySelectorAll('.elementor-column'));

    // Create the table header row dynamically
    const headerRow = [document.createElement('strong')];
    headerRow[0].textContent = 'Columns';

    // Extract content from each column
    const contentRow = columns.map(column => {
        const textEditor = column.querySelector('.elementor-widget-text-editor');
        if (textEditor) {
            const paragraph = textEditor.querySelector('p');
            if (paragraph) {
                const div = document.createElement('div');
                div.innerHTML = paragraph.innerHTML;
                return div;
            }
        }
        // If no content is found, return empty content
        return document.createTextNode('');
    });

    const cells = [
        headerRow,
        contentRow
    ];

    const blockTable = createTable(cells, document);

    // Replace the original element with the block table
    element.replaceWith(blockTable);
}