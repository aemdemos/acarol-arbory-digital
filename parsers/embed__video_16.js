export default function parse(element, { document }) {
  const cells = [];

  // Header row with block name "Embed"
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Embed';
  cells.push(headerRow);

  // Extract video URL from the HTML
  const videoElement = element.querySelector('video');
  if (videoElement) {
    const videoSrc = videoElement.getAttribute('src');

    // Create cell with image and video URL
    const rowContent = [];

    // Screenshot of the video (poster)
    const imgTag = document.createElement('img');
    imgTag.src = videoSrc; // Dynamically extract the video source as the poster image
    rowContent.push(imgTag);

    // Vimeo/YouTube/External video URL
    const linkTag = document.createElement('a');
    linkTag.href = videoSrc;
    linkTag.textContent = videoSrc;
    rowContent.push(linkTag);

    cells.push([rowContent]);
  } else {
    // Handle edge case where video element is missing
    const missingDataRow = [document.createElement('span')];
    missingDataRow[0].textContent = 'No video source available';
    cells.push(missingDataRow);
  }

  // Create the table block
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the structured table
  element.replaceWith(blockTable);
}
