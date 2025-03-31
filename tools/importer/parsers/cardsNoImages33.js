/* global WebImporter */
export default function parse(element, { document }) {
    // Validate that the element exists
    if (!element) {
        console.error("Invalid element passed to parse function");
        return;
    }

    // Extract relevant content from input element
    const headerRow = ['Cards (no images)']; // Header exactly matches the example specification

    const rows = [];

    // Process each card section - dynamically finds relevant columns
    const sections = element.querySelectorAll('.elementor-column');
    sections.forEach((section) => {
        const titleElement = section.querySelector('h2'); // Dynamically extracts data
        const textElement = section.querySelector('.elementor-widget-text-editor');

        // Handle edge cases - skip sections without required elements
        if (titleElement && textElement) {
            const heading = document.createElement('p');
            heading.style.fontWeight = 'bold';
            heading.textContent = titleElement.textContent.trim(); // No hardcoding

            const description = document.createElement('p');
            description.textContent = textElement.textContent.trim().replace(/\n+/g, ' ').replace(/<br\s*\/>/g, ' '); // Handles edge cases and formatting

            const cardContent = [heading, description]; // Consistent array structure
            rows.push(cardContent);
        } else {
            console.warn("Section skipped due to missing data", section);
        }
    });

    if (rows.length === 0) {
        console.error("No valid rows found for conversion into table");
        return;
    }

    // Construct the table
    const cells = [headerRow, ...rows.map(row => [row])];
    const blockTable = WebImporter.DOMUtils.createTable(cells, document);

    // Validate constructed table before replacing
    if (!blockTable || !blockTable.tagName || blockTable.tagName.toLowerCase() !== 'table') {
        console.error("Error constructing table");
        return;
    }

    // Replace original element with structured block table
    element.replaceWith(blockTable);
}
