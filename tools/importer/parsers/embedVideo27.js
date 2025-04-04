/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Embed']; // Header row should always match example
  const socialIcons = element.querySelector('.elementor-social-icons-wrapper');

  // Handle edge case for missing socialIcons
  if (!socialIcons) {
    console.warn('No social icons found in the element.');
    return;
  }

  const links = socialIcons.querySelectorAll('a');

  // Handle edge case for empty links
  if (!links.length) {
    console.warn('No links found in social icons wrapper.');
    return;
  }

  const cells = [headerRow];

  links.forEach((link) => {
    const icon = link.querySelector('i');
    const url = link.href;

    // Ensure URL and icon are dynamically extracted
    if (!url) {
      console.warn('Missing href in link:', link);
      return;
    }

    const cellContent = [];

    if (icon) {
      cellContent.push(icon.cloneNode(true));
    }

    cellContent.push(document.createTextNode(url));

    cells.push([cellContent]); // Each link occupies its own row in a single column
  });

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
