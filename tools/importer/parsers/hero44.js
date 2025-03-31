export default function parse(element, { document }) {
  // Helper method to extract text content from an element
  const getTextContent = (selector) => {
    const el = element.querySelector(selector);
    return el ? el.textContent.trim() : '';
  };

  // Helper method to extract href link from button
  const getButtonLink = (selector) => {
    const button = element.querySelector(selector);
    return button ? button.href : '';
  };

  // Helper method to create an HTML CTA element
  const createCTAElement = (text, url) => {
    if (text && url) {
      const link = document.createElement('a');
      link.href = url;
      link.textContent = text;
      return link;
    }
    return null;
  };

  // Extract required information from the element
  const title = getTextContent('.elementor-widget-heading h1');
  const description = getTextContent('.elementor-widget-text-editor p');
  const contactUsLink = getButtonLink('a.elementor-button[href*="contactus"]');
  const whatWeDoLink = getButtonLink('a.elementor-button[href*="about-arbory-digital"]');

  // Create CTA elements dynamically
  const contactUsCTA = contactUsLink ? createCTAElement('Contact us', contactUsLink) : null;
  const whatWeDoCTA = whatWeDoLink ? createCTAElement('What we do', whatWeDoLink) : null;

  // Create content cell with extracted and constructed content
  const contentCell = document.createElement('div');

  if (title) {
    const titleElement = document.createElement('h1');
    titleElement.textContent = title;
    contentCell.appendChild(titleElement);
  }

  if (description) {
    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = description;
    contentCell.appendChild(descriptionElement);
  }

  if (contactUsCTA) {
    contentCell.appendChild(contactUsCTA);
  }

  if (whatWeDoCTA) {
    contentCell.appendChild(whatWeDoCTA);
  }

  // Create table structure
  const cells = [
    ['Hero'], // Header row matches the example EXACTLY
    [contentCell],
  ];

  // Create table block
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the table block
  element.replaceWith(table);
}