/* global WebImporter */
export default function parse(element, { document }) {
    // Extracting the relevant pieces dynamically
    const headerRow = ['Embed'];
    const imageElement = document.createElement('img');
    const playerElement = element.querySelector('.castos-player .player__artwork img');
    const embedLink = element.querySelector('.castos-player audio source')?.src || '';
    
    // Ensure valid dynamic content exists
    if (playerElement) {
        imageElement.src = playerElement?.getAttribute('data-lazy-src') || playerElement?.src;
        imageElement.alt = playerElement?.alt || '';
        imageElement.title = playerElement?.title || '';
    }

    const cells = [
      [headerRow],
      [[imageElement, embedLink]]
    ];
    const block = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element
    element.replaceWith(block);
}
