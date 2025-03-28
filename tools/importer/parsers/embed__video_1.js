export default function parse(element, { document }) {
    const createTable = WebImporter.DOMUtils.createTable;

    // Extract relevant elements dynamically:
    const headerText = 'Embed';
    const videoLinkElement = element.querySelector('a');
    const videoUrl = videoLinkElement ? videoLinkElement.href : ''; // Extract URL dynamically

    const imageElement = element.querySelector('img');
    const videoThumbnail = imageElement ? imageElement.cloneNode(true) : null; // Clone image if exists

    // Create header row that matches example exactly:
    const headerCell = document.createElement('strong');
    headerCell.textContent = headerText;
    const headerRow = [headerCell];

    // Create content row with dynamically extracted content:
    const urlElement = document.createElement('a');
    urlElement.href = videoUrl;
    urlElement.textContent = videoUrl;

    const contentRow = [
      videoThumbnail ? [videoThumbnail, urlElement] : [urlElement]
    ];

    // Create table with extracted data:
    const table = createTable([headerRow, contentRow], document);

    // Replace original element with new block table:
    element.replaceWith(table);
}