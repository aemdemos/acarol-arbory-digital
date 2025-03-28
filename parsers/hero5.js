export default function parse(element, { document }) {
  // Extract the title
  const titleElement = element.querySelector('h1.elementor-heading-title');
  const title = titleElement ? titleElement.textContent.trim() : '';

  // Extract the background image URL, if available
  const sectionElement = element.closest('section');
  const backgroundImageStyle = sectionElement ? sectionElement.querySelector('.jet-parallax-section__image')?.style.backgroundImage : '';
  const backgroundImageUrl = backgroundImageStyle ? backgroundImageStyle.slice(5, -2) : null;

  // Create the header row
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Hero';
  const headerRow = [headerCell];

  // Create the content row
  const contentCell = document.createElement('div');

  // Add background image if available
  if (backgroundImageUrl) {
    const imgElement = document.createElement('img');
    imgElement.src = backgroundImageUrl;
    contentCell.appendChild(imgElement);
  }

  // Add title if available
  if (title) {
    const titleHeading = document.createElement('h1');
    titleHeading.textContent = title;
    contentCell.appendChild(titleHeading);
  }

  const contentRow = [contentCell];

  // Build the table
  const tableData = [headerRow, contentRow];
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}
