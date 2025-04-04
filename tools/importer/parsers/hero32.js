/* global WebImporter */
export default function parse(element, { document }) {
  // Step 1: Define the header row correctly
  const headerRow = ['Hero'];

  // Step 2: Extract all timeline items from the original HTML
  const timelineItems = element.querySelectorAll('.jet-hor-timeline-item');

  // Filter timeline items to exclude invalid entries
  const validTimelineItems = Array.from(timelineItems).filter(item => {
    const heading = item.querySelector('.jet-hor-timeline-item__card-title');
    return heading && heading.textContent.trim(); // Ensure the item has a valid heading
  });

  // Step 3: Map over valid timeline items and extract content dynamically
  const contentRows = validTimelineItems.map(item => {
    // Extract image dynamically
    const imgElement = item.querySelector('.jet-hor-timeline-item__card-img img');
    const backgroundImg = imgElement ? imgElement.getAttribute('data-lazy-src') || imgElement.src : null;
    const backgroundImgElement = backgroundImg ? document.createElement('img') : null;
    if (backgroundImgElement) {
      backgroundImgElement.src = backgroundImg;
    }

    // Extract heading dynamically
    const headingText = item.querySelector('.jet-hor-timeline-item__card-title')?.textContent.trim() || '';
    const headingElement = document.createElement('h1');
    headingElement.textContent = headingText;

    // Extract subheading if available
    const subheadingText = item.querySelector('.jet-hor-timeline-item__card-desc')?.textContent.trim() || null;
    const subheadingElement = subheadingText ? document.createElement('p') : null;
    if (subheadingElement) {
      subheadingElement.textContent = subheadingText;
    }

    // Extract Call-to-action if available
    const ctaElement = item.querySelector('a.jet-hor-timeline-item__card-btn');
    const ctaLink = ctaElement ? document.createElement('a') : null;
    if (ctaLink) {
      ctaLink.href = ctaElement.href;
      ctaLink.textContent = ctaElement.textContent.trim();
    }

    // Combine all extracted elements into a valid content row
    return [
      backgroundImgElement,
      headingElement,
      subheadingElement,
      ctaLink
    ].filter(item => item); // Removes any null or undefined items
  });

  // Creating the table cells with header row and valid content rows
  const cells = [
    headerRow,
    ...contentRows
  ];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}