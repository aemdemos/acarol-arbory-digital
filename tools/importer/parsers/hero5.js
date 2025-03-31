export default function parse(element, { document }) {
  const tableData = [];

  // Header row
  const headerRow = ['Hero'];
  tableData.push(headerRow);

  // Content row
  const contentRow = [];

  // Extract title (mandatory)
  const titleElement = element.querySelector('h1');
  if (titleElement) {
    const title = document.createElement('h1');
    title.textContent = titleElement.textContent;
    contentRow.push(title);
  }

  // Background image (optional)
  const imageElement = element.querySelector('.jet-parallax-section__image');
  if (
    imageElement &&
    imageElement.style.backgroundImage &&
    imageElement.style.backgroundImage !== 'none'
  ) {
    const imageUrl = imageElement.style.backgroundImage.match(/url\("(.*?)"\)/);
    if (imageUrl && imageUrl[1]) {
      const image = document.createElement('img');
      image.src = imageUrl[1];
      contentRow.push(image);
    }
  }

  // Add content row to table data
  tableData.push([contentRow]);

  // Create block table and replace original element
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(blockTable);
}