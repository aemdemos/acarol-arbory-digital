export default function parse(element, { document }) {
  const createTable = WebImporter.DOMUtils.createTable;

  // Extract content relevant for the block
  const logo = element.querySelector('img');
  const copyrightLink = element.querySelector('.elementor-heading-title a');
  const socialIcons = element.querySelectorAll('.elementor-social-icons-wrapper a');

  // Create table rows
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Embed';

  const contentRow = [];

  // Add logo image
  if (logo) {
    const imageElement = document.createElement('img');
    imageElement.src = logo.getAttribute('src');
    imageElement.alt = logo.getAttribute('alt');
    contentRow.push(imageElement);
  }

  // Add copyright text with link
  if (copyrightLink) {
    const linkElement = document.createElement('a');
    linkElement.href = copyrightLink.getAttribute('href');
    linkElement.target = '_blank';
    linkElement.textContent = copyrightLink.textContent;
    contentRow.push(linkElement);
  }

  // Add social media icons
  socialIcons.forEach((icon) => {
    const socialLink = document.createElement('a');
    socialLink.href = icon.href;
    socialLink.target = '_blank';
    socialLink.innerHTML = icon.innerHTML; // Includes the icon itself
    contentRow.push(socialLink);
  });

  // Create block table
  const tableData = [headerRow, [contentRow]];
  const blockTable = createTable(tableData, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}