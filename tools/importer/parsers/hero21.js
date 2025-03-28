export default function parse(element, { document }) {
  // Step 1: Create header row for the block table
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Hero';
  const headerRow = [headerCell];

  // Step 2: Extract Heading text
  const headingElement = element.querySelector('h1.elementor-heading-title');
  const heading = headingElement ? headingElement.textContent.trim() : '';
  const headingHTML = document.createElement('h1');
  headingHTML.textContent = heading;

  // Step 3: Extract Subheading text
  const textEditorElement = element.querySelector('.elementor-widget-text-editor .elementor-widget-container');
  const subheading = textEditorElement ? textEditorElement.textContent.trim() : '';
  const subheadingHTML = document.createElement('p');
  subheadingHTML.textContent = subheading;

  // Step 4: Extract Call-to-Action (CTA) link and text
  const ctaElement = element.querySelector('.elementor-button-link');
  const ctaLink = ctaElement ? ctaElement.href : '';
  const ctaText = ctaElement ? ctaElement.textContent.trim() : '';
  const ctaHTML = document.createElement('a');
  ctaHTML.href = ctaLink;
  ctaHTML.textContent = ctaText;

  // Step 5: Combine all extracted elements into a single cell
  const combinedCell = document.createElement('div');
  combinedCell.appendChild(headingHTML);
  combinedCell.appendChild(subheadingHTML);
  combinedCell.appendChild(ctaHTML);

  // Step 6: Assemble content row with the combined cell
  const contentRow = [[combinedCell]];

  // Step 7: Create the block table using the helper function
  const block = WebImporter.DOMUtils.createTable([headerRow, ...contentRow], document);

  // Step 8: Replace the original element with the new block table
  element.replaceWith(block);
}