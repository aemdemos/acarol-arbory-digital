export default function parse(element, { document }) {
    const headerCell = document.createElement('strong');
    headerCell.textContent = 'Cards';
    const headerRow = [headerCell];

    // Extract all columns containing card data
    const columns = Array.from(element.querySelectorAll('.elementor-column'));

    // Collect and structure data from each card
    const rows = columns.map((col) => {
        const wrapper = col.querySelector('.elementor-widget-wrap');

        // Extract icon/image
        const iconBox = wrapper.querySelector('.elementor-icon');
        const icon = iconBox ? iconBox.cloneNode(true) : document.createElement('div');

        // Extract title
        const heading = wrapper.querySelector('.elementor-heading-title');
        const title = heading ? heading.cloneNode(true) : document.createElement('div');

        // Extract description
        const descriptionElement = wrapper.querySelector('.elementor-widget-text-editor p');
        const description = descriptionElement ? descriptionElement.cloneNode(true) : document.createElement('div');

        // Extract CTA
        const ctaElement = wrapper.querySelector('.elementor-button');
        const cta = ctaElement ? ctaElement.cloneNode(true) : document.createElement('div');

        // Combine structured data into second cell
        const contentCell = document.createElement('div');
        [title, description, cta].forEach((el) => contentCell.appendChild(el));

        return [icon, contentCell];
    });

    // Build table rows: header + card rows
    const tableData = [headerRow, ...rows];

    // Create Cards table block
    const cardsTable = WebImporter.DOMUtils.createTable(tableData, document);

    // Replace element with Cards table block
    element.replaceWith(cardsTable);
}