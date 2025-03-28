export default function parse(element, { document }) {
  // Extract relevant data from the HTML
  const slides = Array.from(element.querySelectorAll('.swiper-slide a'));

  // Create the correct header row
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Table (striped, bordered)';
  const headerRow = [headerCell];

  // Extract rows of data dynamically
  const rows = slides.map((slide) => {
    const title = slide.getAttribute('data-elementor-lightbox-title');
    const url = slide.href;

    const titleElement = document.createElement('span');
    titleElement.textContent = title;

    const urlElement = document.createElement('a');
    urlElement.href = url;
    urlElement.textContent = url;

    return [titleElement, urlElement];
  });

  const tableData = [headerRow, ...rows];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}
