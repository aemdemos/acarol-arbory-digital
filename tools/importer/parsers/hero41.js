export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Hero'];

  // Extract elements required for content row

  // Extract Image
  const imageElement = element.querySelector("img");
  const backgroundImage = imageElement ? imageElement.cloneNode(true) : null;

  // Extract Title
  const titleElement = element.querySelector("h2");
  const title = titleElement ? titleElement.cloneNode(true) : null;

  // Extract Subheading
  const subheadingElement = element.querySelector(".elementor-widget-text-editor p");
  const subheading = subheadingElement ? subheadingElement.cloneNode(true) : null;

  // Extract Call-to-Action
  const ctaElement = element.querySelector("a.elementor-button");
  const cta = ctaElement ? ctaElement.cloneNode(true) : null;

  // Combine and structure rows for table
  const contentRow = [[backgroundImage, title, subheading, cta].filter(Boolean)];
  const data = [headerRow, contentRow];

  // Create block table using WebImporter.DOMUtils
  const table = WebImporter.DOMUtils.createTable(data, document);

  // Replace the original element with the new block table
  element.replaceWith(table);
}