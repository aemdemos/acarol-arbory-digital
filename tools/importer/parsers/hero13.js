export default function parse(element, { document }) {
  // Extract the logo link and embedded image dynamically
  const logoImg = element.querySelector('img');
  const logoLink = logoImg.closest('a');

  // Extract unique navigation links, avoiding duplicates
  const navMenus = element.querySelectorAll('.elementor-nav-menu');
  const uniqueLinks = new Map();

  navMenus.forEach((menu) => {
    menu.querySelectorAll('a').forEach((link) => {
      uniqueLinks.set(link.href, link.textContent.trim());
    });
  });

  const navigationLinks = Array.from(uniqueLinks.entries()).map(([href, textContent]) => {
    const a = document.createElement('a');
    a.href = href;
    a.textContent = textContent;
    return a;
  });

  // Create the header row matching the example
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Hero';
  const headerRow = [headerCell];

  // Include only the logo link with the embedded image, no redundant image
  const logoCellContent = [logoLink, ...navigationLinks];

  // Structured table cells
  const cells = [
    headerRow,
    [logoCellContent],
  ];

  // Create and replace the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}