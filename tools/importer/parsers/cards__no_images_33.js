export default function parse(element, { document }) {
    // Initialize the table data array
    const tableData = [
        ['Cards (no images)'], // Exact header row matching the example
    ];

    // Extract relevant sections
    const sections = element.querySelectorAll('.elementor-column');

    // Set to track processed cards to avoid duplicates
    const processedHeadings = new Set();

    // Iterate through sections to extract content
    sections.forEach((section) => {
        const headingElement = section.querySelector('h2');
        const textElement = section.querySelector('.elementor-widget-text-editor');

        // Avoid processing duplicate headings
        if (headingElement && processedHeadings.has(headingElement.textContent.trim())) {
            return;
        }

        if (headingElement || textElement) {
            const cellContent = [];

            // Add heading if present
            if (headingElement) {
                const heading = document.createElement('strong');
                heading.textContent = headingElement.textContent.trim();
                cellContent.push(heading);

                // Mark this heading as processed
                processedHeadings.add(headingElement.textContent.trim());
            }

            // Add description if present, ensuring a single <p> wrapping
            if (textElement) {
                const description = document.createElement('p');
                description.innerHTML = textElement.innerHTML.replace(/(<p[^>]*>|<\/p>|<div[^>]*>|<\/div>)/g, '').trim();
                cellContent.push(description);
            }

            tableData.push([cellContent]);
        }
    });

    // Create the block table
    const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

    // Replace the original element with the new block table
    element.replaceWith(blockTable);
}