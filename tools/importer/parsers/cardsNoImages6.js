export default function parse(element, { document }) {
  // Correcting header row: Must match the example exactly
  const headerRow = ['Cards (no images)'];

  // Extracting unique card data dynamically
  const seenTitles = new Set();
  const cards = [...element.querySelectorAll('.elementor-post')]
    .filter(post => {
      const title = post.querySelector('.elementor-post__title a')?.textContent.trim();
      // Skip duplicate titles
      if (title && seenTitles.has(title)) {
        return false;
      }
      seenTitles.add(title);
      return true;
    })
    .map(post => {
      // Fetching card title (if available)
      const title = post.querySelector('.elementor-post__title a')?.textContent.trim() || '';

      // Fetching description (if present)
      const description = post.querySelector('.elementor-post__excerpt p')?.textContent.trim() || '';

      // Creating card rows with proper HTML elements dynamically
      const content = [];

      if (title) {
        const heading = document.createElement('h3');
        heading.textContent = title;
        content.push(heading);
      }

      if (description) {
        const desc = document.createElement('p');
        desc.textContent = description;
        content.push(desc);
      }

      return [content];
    });

  // Combine header row and card rows
  const tableData = [headerRow, ...cards];

  // Create the table block dynamically using WebImporter helper method
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace original element with the new structured table block
  element.replaceWith(table);
}