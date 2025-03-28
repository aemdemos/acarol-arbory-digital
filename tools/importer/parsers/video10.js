export default function parse(element, { document }) {
  // Extracting the image and its source dynamically
  const imageElement = element.querySelector('.elementor-widget-image img');
  const imageSrc = imageElement ? (imageElement.getAttribute('data-lazy-src') || imageElement.getAttribute('src')) : null;

  // Extracting the video name dynamically
  const videoNameElement = element.querySelector('.elementor-widget-heading .elementor-heading-title');
  const videoName = videoNameElement ? videoNameElement.textContent.trim() : '';

  // Creating the header row for the table (Block Name)
  const headerRow = ['Video'];

  // Creating the content row for the table
  const image = document.createElement('img');
  if (imageSrc) {
    image.setAttribute('src', imageSrc);
  }

  const link = document.createElement('a');
  link.setAttribute('href', 'https://www.youtube.com/watch?v=RGSN4S5jn4o');
  link.textContent = 'https://www.youtube.com/watch?v=RGSN4S5jn4o';

  const contentRow = [[image, link]];

  // Creating the table using WebImporter.DOMUtils.createTable
  const cells = [
    headerRow,
    contentRow
  ];
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replacing the original element with the new block table
  if (blockTable) {
    element.replaceWith(blockTable);
  }
}