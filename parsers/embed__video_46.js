export default function parse(element, { document }) {
  // Extract relevant content dynamically from the input element
  const phoneIconWrapper = element.querySelector(
    '.elementor-icon-wrapper .elementor-icon'
  );
  const phoneNumberWrapper = element.querySelector(
    '.elementor-heading-title a'
  );

  // Handle edge cases: If elements are missing, log a warning and return
  if (!phoneIconWrapper || !phoneNumberWrapper) {
    console.warn('Required elements are missing');
    return;
  }

  // Clone and extract the phone icon and the phone number with hyperlink
  const phoneIcon = phoneIconWrapper.cloneNode(true);
  const phoneNumberLink = phoneNumberWrapper.cloneNode(true);

  // Create the header row
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Embed';
  const headerRow = [headerCell];

  // Create the table content row
  const contentRow = [document.createElement('div')];
  contentRow[0].append(phoneIcon, phoneNumberLink);

  // Create the block table using WebImporter.DOMUtils.createTable()
  const block = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}