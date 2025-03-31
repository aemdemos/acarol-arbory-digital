/* global WebImporter */
export default function parse(element, { document }) {
  const tableContent = [];

  // Header row defining block type
  const headerRow = ['Hero']; // Correct header row matching example
  tableContent.push(headerRow);

  // Extract relevant content
  const widgetContainer = element.querySelector(
    '.elementor-widget-wrap'
  );

  if (!widgetContainer) {
    console.error('Error: No widget container found');
    return;
  }

  const titleElement = widgetContainer.querySelector(
    '.elementor-element-f2daa5e .elementor-widget-container .elementor-heading-title'
  );
  const subTitleElement = widgetContainer.querySelector(
    '.elementor-element-eb3d807 .elementor-widget-container h3.elementor-heading-title'
  );
  const descriptionParagraph = widgetContainer.querySelector(
    '.elementor-element-d2ec4ab .elementor-widget-container p'
  );
  const ctaLinkElement = widgetContainer.querySelector(
    '.elementor-element-d252473 .elementor-widget-container a.elementor-button'
  );

  const contentRowElements = [];

  // Add title (mandatory)
  if (titleElement) {
    const title = document.createElement('h1');
    title.textContent = titleElement.textContent;
    contentRowElements.push(title);
  } else {
    console.warn('Warning: Title element missing');
  }

  // Add subheading (optional)
  if (subTitleElement) {
    const subheading = document.createElement('h3');
    subheading.textContent = subTitleElement.textContent;
    contentRowElements.push(subheading);
  } else {
    console.warn('Warning: Subheading element missing');
  }

  // Add description (optional)
  if (descriptionParagraph) {
    const description = document.createElement('p');
    description.textContent = descriptionParagraph.textContent;
    contentRowElements.push(description);
  } else {
    console.warn('Warning: Description paragraph missing');
  }

  // Add CTA (optional)
  if (ctaLinkElement) {
    const ctaLink = document.createElement('a');
    ctaLink.setAttribute('href', ctaLinkElement.href);
    ctaLink.textContent = ctaLinkElement.textContent;
    contentRowElements.push(ctaLink);
  } else {
    console.warn('Warning: CTA link element missing');
  }

  // Add content row to tableContent
  tableContent.push([contentRowElements]);

  const blockTable = WebImporter.DOMUtils.createTable(tableContent, document);

  // Replace element with newly structured block table
  element.replaceWith(blockTable);
}
