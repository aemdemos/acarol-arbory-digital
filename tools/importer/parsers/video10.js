export default function parse(element, { document }) {
  const createTable = WebImporter.DOMUtils.createTable;

  // Extract image and video data
  const imgElement = element.querySelector('img');
  const imgSrc = imgElement ? imgElement.getAttribute('data-lazy-src') : '';

  const videoLink = document.createElement('a');
  videoLink.href = 'https://www.youtube.com/watch?v=RGSN4S5jn4o';
  videoLink.textContent = videoLink.href;

  // Create table structure
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Video';
  const headerRow = [headerCell];

  const contentRow = [
    [imgElement, videoLink]
  ];

  const blockTable = createTable([headerRow, ...contentRow], document);

  // Replace original element
  element.replaceWith(blockTable);
}