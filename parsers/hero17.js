export default function parse(element, { document }) {
    // Helper to extract text content safely
    const getTextContent = (selector) => {
        const el = element.querySelector(selector);
        return el ? el.textContent.trim() : '';
    };

    // Helper to extract and clone an element
    const getClonedElement = (selector) => {
        const el = element.querySelector(selector);
        return el ? el.cloneNode(true) : null;
    };

    // Extract required information
    const heading = getClonedElement('.elementor-heading-title');
    const description = getClonedElement('.elementor-widget-text-editor p');

    // Create the call-to-action button element
    const ctaButtonEl = element.querySelector('.elementor-button');
    let ctaButton = null;
    if (ctaButtonEl) {
        const a = document.createElement('a');
        a.href = ctaButtonEl.href;
        a.textContent = ctaButtonEl.textContent.trim();
        ctaButton = a;
    }

    // Create header row that matches the example
    const headerRow = document.createElement('strong');
    headerRow.textContent = 'Hero';

    // Create the table structure
    const cells = [
        // Header row
        [[headerRow]],

        // Content row
        [[heading, description, ctaButton].filter(Boolean)]
    ];

    // Create the table using the helper function
    const block = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the old element with the new table
    element.replaceWith(block);
}