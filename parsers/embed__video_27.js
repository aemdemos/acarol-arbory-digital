export default function parse(element, { document }) {
  // Validate input element
  if (!element) return;

  // Extract heading
  const heading = element.querySelector('h4');
  const headingText = heading ? heading.textContent.trim() : '';

  // Extract social icons
  const socialWrapper = element.querySelector('.elementor-social-icons-wrapper');
  const socialLinks = socialWrapper ? Array.from(socialWrapper.querySelectorAll('a')).map(link => {
    const platform = link.querySelector('span.elementor-screen-only')?.textContent.trim();
    const href = link.getAttribute('href');
    return { platform, href };
  }) : [];

  // Create table header row
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = headingText || 'Social Links';

  // Create content rows dynamically based on extracted links
  const contentRows = socialLinks.map(link => {
    const cellContent = document.createElement('div');
    const platformSpan = document.createElement('span');
    platformSpan.textContent = link.platform || 'Unknown Platform';
    const linkElement = document.createElement('a');
    linkElement.href = link.href || '#';
    linkElement.textContent = link.href || 'No Link Provided';
    linkElement.target = '_blank'; // Open link in new tab

    cellContent.appendChild(platformSpan);
    cellContent.appendChild(document.createElement('br'));
    cellContent.appendChild(linkElement);

    return [cellContent];
  });

  // Combine rows for the table
  const cells = [headerRow, ...contentRows];

  // Replace the original element with the created table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}