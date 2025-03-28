export default function parse(element, { document }) {
    const cells = [];

    // First Row - Header
    const headerCell = document.createElement('strong');
    headerCell.textContent = 'Hero';
    const headerRow = [headerCell];
    cells.push(headerRow);

    // Second Row - Content
    const contentRow = [];

    // Extract Background Image
    const imageElement = element.querySelector('img');

    // Extract Title
    const headingElement = document.createElement('h1');
    headingElement.textContent = 'Heading in Block'; // Replace with extracted heading text if available

    // Combine Image and Heading into a single cell
    const combinedCell = document.createElement('div');
    if (imageElement) {
        combinedCell.append(imageElement.cloneNode(true));
    }
    combinedCell.append(headingElement);

    contentRow.push(combinedCell);
    cells.push(contentRow);

    // Create Block Table
    const block = WebImporter.DOMUtils.createTable(cells, document);

    // Replace Original Element
    element.replaceWith(block);
}