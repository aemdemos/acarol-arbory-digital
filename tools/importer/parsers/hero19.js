export default function parse(element, { document }) {
    // Helper function to get the content of elements safely
    const getContent = (selector) => {
        const el = element.querySelector(selector);
        return el ? el.innerHTML.trim() || el : null;
    };

    // Extract relevant data
    const heading = getContent(".elementor-heading-title.elementor-size-default");
    const subheading = getContent("h3.elementor-heading-title.elementor-size-default");
    const paragraph = getContent(".elementor-widget-text-editor p");
    const button = element.querySelector(".elementor-button")?.cloneNode(true);
    const image = element.querySelector(".elementor-widget-image img");

    // Construct the table rows with proper HTML elements
    const headerRow = ["Hero"];

    const contentRow = [];
    if (image) {
        const img = document.createElement("img");
        img.src = image.getAttribute("data-lazy-src") || image.src;
        img.alt = image.alt || "";
        contentRow.push(img);
    }
    if (heading) {
        const headingEl = document.createElement("h1");
        headingEl.textContent = heading;
        contentRow.push(headingEl);
    }
    if (subheading) {
        const subheadingEl = document.createElement("h2");
        subheadingEl.textContent = subheading;
        contentRow.push(subheadingEl);
    }
    if (paragraph) {
        const paragraphEl = document.createElement("p");
        paragraphEl.innerHTML = paragraph;
        contentRow.push(paragraphEl);
    }
    if (button) {
        contentRow.push(button);
    }

    const cells = [
        headerRow, // First row: block name "Hero"
        [contentRow] // Second row: combined content including image, heading, paragraph, and call-to-action
    ];

    // Create and replace the block
    const block = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(block);
}