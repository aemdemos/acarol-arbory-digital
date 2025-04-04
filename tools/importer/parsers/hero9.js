/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the heading
  const heading = element.querySelector('.elementor-heading-title');

  // Extract the paragraph content
  const paragraph = element.querySelector('.elementor-widget-text-editor p');

  // Extract the list items
  const list = element.querySelector('.elementor-widget-text-editor ul');
  const listItems = list ? Array.from(list.querySelectorAll('li')) : [];

  // Combine list items into a single container
  const listContainer = document.createElement('div');
  listItems.forEach((item) => listContainer.appendChild(item));

  // Extract the call-to-action button
  const button = element.querySelector('.elementor-button');

  // Create content for the block
  const headerRow = ['Hero'];

  const contentRow = [
    [heading, paragraph, listContainer, button],
  ];

  const cells = [headerRow, contentRow];

  // Create the table using WebImporter.DOMUtils.createTable
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
