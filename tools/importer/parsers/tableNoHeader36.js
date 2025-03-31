/* global WebImporter */
export default function parse(element, { document }) {
  const rows = [];

  // Header row as specified in the example
  rows.push(['Table (no header)']);

  // Extract content dynamically from the element, avoiding duplication
  const heading = element.querySelector('.elementor-widget-heading h3');
  const paragraph = element.querySelector('.elementor-widget-text-editor p');
  const secondaryHeading = element.querySelector('.elementor-widget-heading .elementor-heading-title');
  const button = element.querySelector('.elementor-widget-button a');

  // Ensure each piece of content appears only once
  const contentSet = new Set();
  
  if (heading && !contentSet.has(heading.textContent.trim())) {
    rows.push([heading.textContent.trim()]);
    contentSet.add(heading.textContent.trim());
  }
  if (paragraph && !contentSet.has(paragraph.textContent.trim())) {
    rows.push([paragraph.textContent.trim()]);
    contentSet.add(paragraph.textContent.trim());
  }
  if (secondaryHeading && !contentSet.has(secondaryHeading.textContent.trim())) {
    rows.push([secondaryHeading.textContent.trim()]);
    contentSet.add(secondaryHeading.textContent.trim());
  }
  if (button && !contentSet.has(button.textContent.trim())) {
    rows.push([button.textContent.trim()]);
    contentSet.add(button.textContent.trim());
  }

  // Create and replace the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
