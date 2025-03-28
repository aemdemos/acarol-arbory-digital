export default function parse(element, { document }) {
  // Extract the heading title dynamically
  const headingTitleElement = element.querySelector('.elementor-widget-heading .elementor-heading-title');
  const headingTitle = document.createElement('h1');
  headingTitle.textContent = headingTitleElement ? headingTitleElement.textContent : '';

  // Extract the subheading dynamically
  const subHeadingElement = element.querySelector('.elementor-widget-heading h3');
  const subHeading = document.createElement('h3');
  subHeading.textContent = subHeadingElement ? subHeadingElement.textContent : '';

  // Extract the text content dynamically
  const paragraphElement = element.querySelector('.elementor-widget-text-editor p');
  const paragraph = document.createElement('p');
  paragraph.textContent = paragraphElement ? paragraphElement.textContent : '';

  // Extract the call-to-action dynamically
  const ctaLinkElement = element.querySelector('.elementor-widget-heading a');
  const ctaLink = document.createElement('a');
  ctaLink.href = ctaLinkElement ? ctaLinkElement.href : '#';
  ctaLink.textContent = ctaLinkElement ? ctaLinkElement.textContent : '';

  // Extract the icon dynamically
  const ctaIconElement = element.querySelector('.elementor-widget-icon i');
  const ctaIcon = document.createElement('i');
  ctaIcon.className = ctaIconElement ? ctaIconElement.className : '';

  const ctaWrapper = document.createElement('div');
  if (ctaIcon.className) ctaWrapper.append(ctaIcon);
  if (ctaLink.textContent) ctaWrapper.append(ctaLink);

  // Create the header row
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Hero';
  const headerRow = [headerCell];

  // Create the content row with all extracted elements combined into one cell
  const contentCell = document.createElement('div');
  contentCell.append(headingTitle, subHeading, paragraph, ctaWrapper);
  const contentRow = [contentCell];

  // Combine rows into table data
  const tableData = [headerRow, contentRow];

  // Replace the element
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(blockTable);
}