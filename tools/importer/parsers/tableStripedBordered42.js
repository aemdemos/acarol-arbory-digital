/* global WebImporter */
export default function parse(element, { document }) {
  // Extract relevant content
  const slides = Array.from(element.querySelectorAll('.swiper-slide a'));
  const slideData = slides.map((slide) => {
    const title = slide.getAttribute('data-elementor-lightbox-title') || 'Unknown Title';
    const url = slide.getAttribute('href') || 'Unknown URL';
    return [title, url];
  });

  // Create table cells
  const cells = [
    ['Product Name', 'Website'], // Correct header row as per example
    ...slideData.map(([title, url]) => {
      const link = document.createElement('a');
      link.href = url;
      link.textContent = url;
      return [title, link];
    }),
  ];

  // Create a block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
