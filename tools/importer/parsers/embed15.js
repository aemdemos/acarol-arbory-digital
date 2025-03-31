export default function parse(element, { document }) {
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Embed';
  
  const headerRow = [headerCell];

  // Extract the image URL and create an img element
  const imgContainer = element.querySelector('.player__artwork img');
  const imgSrc = imgContainer ? imgContainer.getAttribute('data-lazy-src') || imgContainer.getAttribute('src') : '';
  const imageElement = imgSrc ? document.createElement('img') : null;
  if (imageElement) {
    imageElement.src = imgSrc;
    imageElement.alt = imgContainer ? imgContainer.alt : '';
    imageElement.title = imgContainer ? imgContainer.title : '';
  }

  // Extract the URL from the audio source
  const audioElement = element.querySelector('audio.clip source');
  const embedUrl = audioElement ? audioElement.src : '';

  const urlElement = embedUrl ? document.createElement('a') : null;
  if (urlElement) {
    urlElement.href = embedUrl;
    urlElement.textContent = embedUrl;
  }

  // Construct the rows for the table
  const rows = [
    headerRow,
    [imageElement ? [imageElement, document.createElement('br'), urlElement] : urlElement]
  ];

  // Create the table block and replace the original element
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}