/* global WebImporter */

export default function parse(element, { document }) {
  const headerRow = ['Cards (no images)'];

  const rows = [];

  // Extract cards content
  const articleElements = element.querySelectorAll('.elementor-posts-container .elementor-post');
  const uniqueTitles = new Set(); // To track unique titles

  articleElements.forEach((article) => {
    const contentContainer = []; // Container for cell content

    // Extract title
    const titleElement = article.querySelector('.elementor-post__title a');
    if (titleElement) {
      const titleText = titleElement.textContent.trim();
      if (!uniqueTitles.has(titleText)) {
        uniqueTitles.add(titleText); // Avoid duplicating entries

        const heading = document.createElement('h3');
        heading.textContent = titleText;
        contentContainer.push(heading);

        // Extract description
        const descriptionElement = article.querySelector('.elementor-post__excerpt p');
        if (descriptionElement) {
          const description = document.createElement('p');
          description.textContent = descriptionElement.textContent.trim();
          contentContainer.push(description);
        }

        // Add extracted content to table rows
        rows.push([contentContainer]);
      }
    }
  });

  // Create the table block
  const tableData = [headerRow, ...rows];
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block
  element.replaceWith(blockTable);
}
