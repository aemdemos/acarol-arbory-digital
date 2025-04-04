/* global WebImporter */
export default function parse(element, { document }) {
    // Extract the phone icon and heading
    const iconWrapper = element.querySelector('.elementor-icon-wrapper');
    const heading = element.querySelector('h2 a');

    // Validate extracted elements
    if (!iconWrapper || !heading) {
        console.error('Required elements are missing from the provided HTML structure.');
        return;
    }

    // Create the new table structure
    const headerRow = ['Embed'];
    const contentRow = [
        [iconWrapper.cloneNode(true), heading.cloneNode(true)] // Clone the elements to preserve their structure
    ];

    const tableData = [headerRow, contentRow];

    // Create the block table
    const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

    // Replace the original element with the block table
    element.replaceWith(blockTable);
}