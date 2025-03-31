/* global WebImporter */
export default function parse(element, { document }) {
    // Extract heading
    const headingElement = element.querySelector('.elementor-heading-title');
    const heading = headingElement ? document.createElement('h2') : null;
    if (heading && headingElement.textContent) {
        heading.textContent = headingElement.textContent.trim();
    }

    // Extract subheading
    const subheadingElement = element.querySelector('.elementor-widget-text-editor p');
    const subheading = subheadingElement ? document.createElement('p') : null;
    if (subheading && subheadingElement.textContent) {
        subheading.textContent = subheadingElement.textContent.trim();
    }

    // Extract background image URL
    const backgroundImageElement = element.querySelector('.jet-parallax-section__image');
    let backgroundImage = null;
    if (backgroundImageElement) {
        const style = backgroundImageElement.getAttribute('style');
        const match = style && style.match(/url\("(.*?)"\)/);
        if (match && match[1]) {
            backgroundImage = document.createElement('img');
            backgroundImage.src = match[1];
        }
    }

    // Combine all extracted elements into a single column in the second row
    const combinedContent = [backgroundImage, heading, subheading].filter(Boolean);

    // Prepare table content
    const cells = [
        ['Hero'], // Header row
        [combinedContent], // Second row with all elements combined into one cell
    ];

    const block = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(block);
}
