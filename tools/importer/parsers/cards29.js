export default function parse(element, { document }) {
    // Import the needed helper
    const { createTable } = WebImporter.DOMUtils;

    // Create the header row for the table
    const headerCell = document.createElement('strong');
    headerCell.textContent = 'Cards';
    const headerRow = [headerCell];

    // Extract cards
    const cards = Array.from(element.querySelectorAll('.jet-posts__item')).map(card => {
        // Image extraction
        const imgLink = card.querySelector('.post-thumbnail__link img');
        const image = document.createElement('img');
        image.src = imgLink.dataset.lazySrc || imgLink.src;
        image.alt = imgLink.getAttribute('alt');
        
        // Text extraction
        const titleLink = card.querySelector('.entry-title a');
        const title = document.createElement('strong'); // Styled heading as per example
        title.textContent = titleLink.textContent;

        const descriptionEl = card.querySelector('.entry-excerpt');
        const description = descriptionEl ? document.createElement('p') : null;
        if (descriptionEl) {
            description.textContent = descriptionEl.textContent;
        }

        const ctaLink = card.querySelector('.jet-more-wrap a');
        const cta = ctaLink ? document.createElement('a') : null;
        if (ctaLink) {
            cta.href = ctaLink.getAttribute('href');
            cta.textContent = ctaLink.querySelector('.btn__text').textContent;
        }

        // Combine content into appropriate structure
        const content = [title];
        if (description) content.push(description);
        if (cta) content.push(cta);

        return [image, content];
    });

    // Combine header and cards into the table structure
    const tableData = [headerRow, ...cards];

    // Replace the element with the block table
    const tableBlock = createTable(tableData, document);
    element.replaceWith(tableBlock);
}