export default function parse(element, { document }) {
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Hero';

  // Extract image information
  const imgElement = element.querySelector('img');
  const imageSrc = imgElement.getAttribute('data-lazy-src') || imgElement.getAttribute('src');
  const altText = imgElement.getAttribute('alt');

  const image = document.createElement('img');
  image.setAttribute('src', imageSrc);
  if (altText) {
    image.setAttribute('alt', altText);
  }

  // Extract the heading dynamically (assuming heading text is provided elsewhere)
  const heading = document.createElement('h1');
  heading.textContent = imgElement ? imgElement.getAttribute('alt') : 'Default Heading';

  // Create table content
  const cells = [
    headerRow,
    [image, heading],
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}