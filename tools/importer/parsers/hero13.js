/* global WebImporter */
export default function parse(element, { document }) {
  // Extract logo image
  const logoImgElement = element.querySelector('.elementor-widget-image img');
  const logoImg = document.createElement('img');
  if (logoImgElement) {
    logoImg.src = logoImgElement.getAttribute('data-lazy-src') || logoImgElement.src;
  }

  // Extract navigation menu
  const navElement = element.querySelector('.elementor-nav-menu');
  const navLinks = [];
  if (navElement) {
    Array.from(navElement.querySelectorAll('li > a')).forEach((link) => {
      const navLink = document.createElement('a');
      navLink.href = link.href;
      navLink.textContent = link.textContent.trim();
      navLinks.push(navLink);
    });
  }

  // Extract additional podcast banner image
  const podcastImgElement = element.querySelector('.elementor-hidden-mobile img');
  const podcastImg = document.createElement('img');
  if (podcastImgElement) {
    podcastImg.src = podcastImgElement.getAttribute('data-lazy-src') || podcastImgElement.src;
  }

  // Create block table
  const tableCells = [
    ['Hero'],
    [
      [logoImg, document.createElement('hr'), ...navLinks, document.createElement('hr'), podcastImg],
    ],
  ];

  const blockTable = WebImporter.DOMUtils.createTable(tableCells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}
