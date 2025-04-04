/* global WebImporter */
export default function parse(element, { document }) {
  // Extract dynamic content from the element
  const imageSrc = element.querySelector('.player__artwork img')?.getAttribute('data-lazy-src') || 
                   element.querySelector('.player__artwork img')?.src;
  const audioSrc = element.querySelector('audio source')?.src;

  if (!audioSrc) {
    console.error('Unable to find audio source.');
    return;
  }

  // Create image element if imageSrc exists
  let imageElement;
  if (imageSrc) {
    imageElement = document.createElement('img');
    imageElement.src = imageSrc;
  }

  // Construct table cells
  const cells = [
    ['Embed'], // Header row
    [
      imageElement ? [imageElement, document.createTextNode(audioSrc)] : document.createTextNode(audioSrc)
    ]
  ];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}