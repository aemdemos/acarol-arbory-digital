export default function parse(element, { document }) {
  // Extract the heading title dynamically
  const heading = element.querySelector('.elementor-heading-title');
  const headingText = heading ? heading.textContent.trim() : '';

  // Collect social links dynamically
  const socialIconsWrapper = element.querySelector('.elementor-social-icons-wrapper');
  const links = [];
  if (socialIconsWrapper) {
    const socialItems = socialIconsWrapper.querySelectorAll('a');
    socialItems.forEach((item) => {
      const socialPlatform = item.querySelector('.elementor-screen-only')?.textContent.trim();
      const url = item.href;
      if (socialPlatform && url) {
        links.push(`${socialPlatform}: ${url}`);
      }
    });
  }

  // Review header row for accuracy
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Social Links';
  const headerRow = [headerCell];

  // Create a single content row with all extracted details
  const contentRow = [document.createElement('div')];
  if (headingText) {
    const headingElem = document.createElement('strong');
    headingElem.textContent = headingText;
    contentRow[0].appendChild(headingElem);
    contentRow[0].appendChild(document.createElement('br'));
  }
  links.forEach((linkText, i) => {
    const linkElem = document.createElement('p');
    linkElem.textContent = linkText;
    contentRow[0].appendChild(linkElem);
    if (i < links.length - 1) {
      contentRow[0].appendChild(document.createElement('br'));
    }
  });

  const tableData = [headerRow, contentRow];

  // Create the final block table
  const tableBlock = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the constructed block
  element.replaceWith(tableBlock);
}