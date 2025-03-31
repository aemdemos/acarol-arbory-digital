/* global WebImporter */

export default function parse(element, { document }) {
  // Extract the logo
  const logoElement = element.querySelector('.elementor-widget-image a img');
  const logo = logoElement ? `<div class="logo-container">${logoElement.outerHTML}</div>` : '';

  // Extract navigation menu items dynamically
  const menuLinks = [...element.querySelectorAll('.elementor-nav-menu a')]
    .map(link => `<li>${link.outerHTML}</li>`)
    .join('');
  const menuHTML = menuLinks ? `<ul class="menu-links">${menuLinks}</ul>` : '';

  // Extract the podcast image dynamically
  const podcastElement = element.querySelector('.elementor-widget-image:nth-of-type(2) a img');
  const podcastImage = podcastElement ? `<div class="podcast-image">${podcastElement.outerHTML}</div>` : '';

  // Combine all content into a single structured block
  const combinedContent = `<div class="hero-content">
    ${logo}
    ${menuHTML}
    ${podcastImage}
  </div>`;

  // Create a structured table adhering to the example markdown
  const cells = [
    ['Hero'], // Correct header row
    [document.createRange().createContextualFragment(combinedContent)] // Combine all content logically into a single cell using HTML fragments
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the structured block
  element.replaceWith(block);
}
