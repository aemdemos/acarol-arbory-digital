export default function parse(element, { document }) {
  const headerRow = ['Table (striped, bordered)'];

  // Extracting relevant links and titles
  const slides = element.querySelectorAll('a[data-elementor-lightbox-title]');
  const rows = Array.from(slides).map(slide => {
    const title = slide.getAttribute('data-elementor-lightbox-title');
    const link = slide.getAttribute('href');

    const anchor = document.createElement('a');
    anchor.href = link;
    anchor.textContent = link;
    return [title || '', anchor];
  });

  // Creating the table block
  const cells = [headerRow, ...rows];
  const tableBlock = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the table block
  element.replaceWith(tableBlock);
}