export default function parse(element, { document }) {
  // Extract the title
  const titleElement = element.querySelector('.elementor-widget-heading .elementor-heading-title');
  const title = document.createElement('h1');
  title.textContent = titleElement ? titleElement.textContent.trim() : '';

  // Extract the description
  const descriptionElement = element.querySelector('.elementor-widget-text-editor p');
  const description = document.createElement('p');
  description.textContent = descriptionElement ? descriptionElement.textContent.trim() : '';

  // Extract the buttons
  const buttons = Array.from(
    element.querySelectorAll('.elementor-widget-button a')
  ).map((button) => {
    const link = document.createElement('a');
    link.href = button.href;
    link.textContent = button.querySelector('.elementor-button-text')
      ? button.querySelector('.elementor-button-text').textContent.trim()
      : '';
    return link;
  });

  // Extract the background image
  const backgroundImageElement = element.querySelector(
    '.jet-parallax-section__image'
  );
  const backgroundImageUrl = backgroundImageElement
    ? backgroundImageElement.style.backgroundImage
        .replace(/^url\(['"]?/, '')
        .replace(/['"]?\)$/, '')
    : '';

  const image = backgroundImageUrl
    ? (() => {
        const img = document.createElement('img');
        img.src = backgroundImageUrl;
        return img;
      })()
    : null;

  // Create the block table
  const headerRow = ['Hero'];
  const contentRow = [
    ...(image ? [image] : []),
    title,
    description,
    ...buttons,
  ];

  const cells = [
    headerRow,
    [contentRow],
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}