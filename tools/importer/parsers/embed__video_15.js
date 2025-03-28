export default function parse(element, { document }) {
  // Extract dynamic content from the provided HTML element
  const episodeTitle = element.querySelector('.player__episode-title')?.textContent || '';
  const podcastTitle = element.querySelector('.player__podcast-title')?.textContent || '';
  const imageSrc = element.querySelector('.player__artwork img')?.getAttribute('data-lazy-src') || element.querySelector('.player__artwork img')?.src || '';
  const videoLinkUrl = element.querySelector('.elementor-button-link')?.href || '';

  // Prepare header row
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Embed';

  // Prepare content row dynamically
  const contentCell = document.createElement('div');

  if (imageSrc) {
    const image = document.createElement('img');
    image.src = imageSrc;
    contentCell.append(image);
    contentCell.append(document.createElement('br'));
  }

  if (videoLinkUrl) {
    const videoLink = document.createElement('a');
    videoLink.href = videoLinkUrl;
    videoLink.textContent = videoLinkUrl;
    contentCell.append(videoLink);
  }

  const contentRow = [contentCell];

  // Create table structure
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the newly created block
  element.replaceWith(block);
}