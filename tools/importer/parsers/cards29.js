/* global WebImporter */
export default function parse(element, { document }) {
    const tableData = [];

    // Add the header row
    tableData.push(['Cards']);

    // Extract card content
    const cards = element.querySelectorAll('.jet-posts__item');

    // Use a Set to filter out duplicates based on the URL of the card (Image URL is unique identifier for each card)
    const processedUrls = new Set();

    cards.forEach(card => {
        const imageLink = card.querySelector('.post-thumbnail__link img');
        const titleElement = card.querySelector('.entry-title a');
        const descriptionElement = card.querySelector('.entry-excerpt');
        const callToActionElement = card.querySelector('.jet-more-wrap a');

        // Ensure the necessary elements exist and check for duplication
        if (imageLink && titleElement && descriptionElement && callToActionElement) {
            const imageUrl = imageLink.getAttribute('data-lazy-src') || imageLink.src;
            if (!processedUrls.has(imageUrl)) {
                processedUrls.add(imageUrl);

                // Extract image
                const image = document.createElement('img');
                image.src = imageUrl;
                image.alt = imageLink.alt;

                // Extract title
                const title = document.createElement('h3');
                title.textContent = titleElement.textContent;

                // Extract description
                const description = document.createElement('p');
                description.textContent = descriptionElement.textContent;

                // Extract call-to-action
                const callToAction = document.createElement('a');
                callToAction.href = callToActionElement.href;
                callToAction.textContent = callToActionElement.textContent;

                const contentCell = [title, description, callToAction];

                // Add row for this card
                tableData.push([image, contentCell]);
            }
        }
    });

    const block = WebImporter.DOMUtils.createTable(tableData, document);

    // Replace the original element with the new structured block
    element.replaceWith(block);
}
