/* global WebImporter */
export default function parse(element, { document }) {
  // Initializing the header row as per the example
  const headerRow = ['Embed'];

  // Extracting social media links dynamically from the HTML
  const socialLinks = element.querySelectorAll('.elementor-social-icons-wrapper .elementor-grid-item a');

  // Creating an array for each extracted link
  const linkElements = [];
  socialLinks.forEach((link) => {
    const linkElement = document.createElement('a');
    linkElement.href = link.href;
    linkElement.textContent = link.href; // Making link text visible
    linkElements.push(linkElement);
  });

  // Creating the block table using dynamic data
  const blockTable = WebImporter.DOMUtils.createTable([
    headerRow,
    [linkElements],
  ], document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}
