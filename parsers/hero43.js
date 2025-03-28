export default function parse(element, { document }) {
  // Extract the background image
  const backgroundStyle = element.querySelector('.jet-parallax-section__image')?.style.backgroundImage;
  const backgroundUrlMatch = backgroundStyle?.match(/url\("(.*?)"\)/);
  const backgroundUrl = backgroundUrlMatch ? backgroundUrlMatch[1] : null;

  // Extract the title
  const titleElement = element.querySelector('[data-id="d3d6b61"] .elementor-heading-title');
  const title = titleElement ? titleElement.textContent.trim() : '';

  // Extract the subtitle
  const subtitleElement = element.querySelector('[data-id="c33d2fd"] .elementor-heading-title');
  const subtitle = subtitleElement ? subtitleElement.textContent.trim() : '';

  // Extract the call-to-action
  const ctaElement = element.querySelector('[data-id="1f7e201"] .elementor-button');
  const ctaLink = ctaElement ? ctaElement.href : '';
  const ctaText = ctaElement ? ctaElement.textContent.trim() : '';

  // Create the table rows
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Hero';
  const headerRow = [headerCell];

  const contentRow = [];

  if (backgroundUrl) {
    const imageElement = document.createElement('img');
    imageElement.src = backgroundUrl;
    contentRow.push(imageElement);
  }

  if (title) {
    const titleHeading = document.createElement('h1');
    titleHeading.textContent = title;
    contentRow.push(titleHeading);
  }

  if (subtitle) {
    const subtitleHeading = document.createElement('h3');
    subtitleHeading.textContent = subtitle;
    contentRow.push(subtitleHeading);
  }

  if (ctaText && ctaLink) {
    const ctaAnchor = document.createElement('a');
    ctaAnchor.href = ctaLink;
    ctaAnchor.textContent = ctaText;
    contentRow.push(ctaAnchor);
  }

  // Generate the table
  const cells = [headerRow, [contentRow]];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
