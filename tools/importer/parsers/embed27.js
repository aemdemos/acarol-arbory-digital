export default function parse(element, { document }) {
    const createTable = WebImporter.DOMUtils.createTable;

    // Extract the title
    const titleElement = element.querySelector('.elementor-widget-heading .elementor-heading-title');
    const title = titleElement ? titleElement.textContent.trim() : '';

    // Extract the social links
    const socialLinksContainer = element.querySelector('.elementor-social-icons-wrapper');
    const socialLinks = [];
    if (socialLinksContainer) {
        const icons = socialLinksContainer.querySelectorAll('a');
        icons.forEach((icon) => {
            const href = icon.getAttribute('href');
            if (href) {
                const linkElement = document.createElement('a');
                linkElement.setAttribute('href', href);
                linkElement.textContent = href;
                socialLinks.push(linkElement);
            }
        });
    }

    // Construct the table data
    const tableData = [
        ['Embed'], // Header row matches example
        socialLinks.length > 0 ? [socialLinks] : ['No social links available']
    ];

    // Create the table block
    const tableBlock = createTable(tableData, document);

    // Replace the original element with the new block table
    element.replaceWith(tableBlock);
}