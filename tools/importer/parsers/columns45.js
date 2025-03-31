export default function parse(element, { document }) {
    // Helper function to wrap text in an HTML tag
    const wrapInTag = (text, tagName = 'p') => {
        const tag = document.createElement(tagName);
        tag.textContent = text;
        return tag;
    };

    // Extract content from the columns
    const column1 = element.querySelector('.elementor-element-4568ce0');
    const column2 = element.querySelector('.elementor-element-1556797');

    const extractContent = (columnElement) => {
        if (!columnElement) return [];
        return Array.from(columnElement.querySelectorAll('li')).map((li) => {
            const paragraph = li.querySelector('p');
            return paragraph ? wrapInTag(paragraph.textContent) : wrapInTag(li.textContent);
        });
    };

    const contentColumn1 = extractContent(column1);
    const contentColumn2 = extractContent(column2);

    // Create header row
    const headerRow = ['Columns']; // Matches the example exactly

    // Combine the extracted contents into structured rows as specified in the example
    const cells = [
        headerRow,
        [contentColumn1[0], contentColumn2[0]],
        [contentColumn1[1], contentColumn2[1]],
        [contentColumn1[2], contentColumn2[2]],
        [contentColumn1[3], contentColumn2[3]],
        [contentColumn1[4], contentColumn2[4]],
    ];

    // Replace the original element with the new structured block table
    const blockTable = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(blockTable);
}