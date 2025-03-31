export default function parse(element, { document }) {
    // Extract the Heading title
    const headingElement = element.querySelector('h2.elementor-heading-title');
    const headingText = headingElement ? headingElement.textContent.trim() : '';

    // Extract subheading text (if available)
    const subheadingElement = element.querySelector('p');
    const subheadingText = subheadingElement ? subheadingElement.textContent.trim() : '';

    // Extract the Call-To-Action link element
    const ctaElement = element.querySelector('a.elementor-button');
    const ctaText = ctaElement?.textContent.trim();
    const ctaHref = ctaElement?.getAttribute('href');
    const ctaLink = ctaText && ctaHref ? (() => {
        const link = document.createElement('a');
        link.setAttribute('href', ctaHref);
        link.textContent = ctaText;
        return link;
    })() : null;

    // Extract image src (if any)
    const imageElement = element.querySelector('img');
    const imageSrc = imageElement?.getAttribute('src') || '';

    const imgTag = imageSrc ? (() => {
        const img = document.createElement('img');
        img.setAttribute('src', imageSrc);
        return img;
    })() : null;

    const heading = (() => {
        const headingNode = document.createElement('h1');
        headingNode.textContent = headingText;
        return headingNode;
    })();

    const subheading = subheadingText ? (() => {
        const subheadingNode = document.createElement('p');
        subheadingNode.textContent = subheadingText;
        return subheadingNode;
    })() : null;

    const contentRow = [];
    if (imgTag) contentRow.push(imgTag);
    if (heading) contentRow.push(heading);
    if (subheading) contentRow.push(subheading);
    if (ctaLink) contentRow.push(ctaLink);

    const cells = [
        ['Hero'],
        [contentRow],
    ];

    const table = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(table);
}