/* global WebImporter */
export default function parse(element, { document }) {
    const tableHeader = ['Hero'];

    // Extract content from the original element
    const headingElement = element.querySelector('h2.elementor-heading-title');
    const paragraphElement = element.querySelector('p');

    // Handle missing heading and paragraph gracefully
    const heading = headingElement ? document.createElement('h1') : null;
    if (heading) {
        heading.textContent = headingElement.textContent;
    }

    const paragraph = paragraphElement ? document.createElement('p') : null;
    if (paragraph) {
        paragraph.textContent = paragraphElement.textContent;
    }

    // Combine heading and paragraph into a single cell if both exist
    const contentCell = document.createElement('div');
    if (heading) contentCell.appendChild(heading);
    if (paragraph) contentCell.appendChild(paragraph);

    const tableContent = [
        tableHeader,
        [
            contentCell,
        ],
    ];

    // Create the block table
    const block = WebImporter.DOMUtils.createTable(tableContent, document);

    // Replace the original element
    element.replaceWith(block);
}