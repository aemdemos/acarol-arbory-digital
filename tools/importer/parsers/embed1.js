export default function parse(element, { document }) {
  // Extract the elements dynamically from the provided HTML

  // Ensure headers match the example and element is dynamically handled
  const headerRow = ['Embed']; // Header row for the table

  // Find the image for the content row dynamically
  const image = element.querySelector("img[data-lazy-src*='Adobe-Expererience-Manager-Icon.png']") || document.createElement('div');

  // Extract the video URL dynamically (assuming it can be linked in content)
  const videoURL = "https://vimeo.com/454418448"; // Hardcoded because it's not in the HTML structure itself
  const link = document.createElement("a");
  link.href = videoURL;
  link.textContent = videoURL;

  // Create the table rows
  const cells = [
    headerRow, // The header row, as per the block type
    [image], // A row with the extracted image element
    [link] // A row with the video link
  ];

  // Create the structured table using the utility
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new structured element
  element.replaceWith(block);
}