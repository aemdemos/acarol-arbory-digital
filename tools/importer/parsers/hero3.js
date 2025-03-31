export default function parse(element, { document }) {
  // Helper function to get background image
  const getBackgroundImageUrl = (element) => {
    const imageDiv = element.querySelector('.jet-parallax-section__image');
    if (imageDiv) {
      const style = imageDiv.getAttribute('style');
      const urlMatch = style.match(/background-image: url\(([^)]+)\)/);
      return urlMatch ? urlMatch[1].replace(/&quot;/g, '') : null;
    }
    return null;
  };

  // Extract background image URL
  const backgroundImageUrl = getBackgroundImageUrl(element);

  // Extract title
  const titleElement = element.querySelector('h2.elementor-heading-title');
  const titleText = titleElement ? titleElement.textContent.trim() : '';

  // Extract subheading
  const subheadingElement = element.querySelector('div.elementor-widget-text-editor p');
  const subheadingText = subheadingElement ? subheadingElement.textContent.trim() : '';

  // Create header row matching example
  const headerRow = ['Hero'];

  // Build content row dynamically based on extracted elements
  const contentRow = [];
  const combinedContent = [];
  if (backgroundImageUrl) {
    const img = document.createElement('img');
    img.setAttribute('src', backgroundImageUrl);
    combinedContent.push(img);
  }
  if (titleText) {
    const heading = document.createElement('h1');
    heading.textContent = titleText;
    combinedContent.push(heading);
  }
  if (subheadingText) {
    const subheading = document.createElement('p');
    subheading.textContent = subheadingText;
    combinedContent.push(subheading);
  }
  contentRow.push(combinedContent);

  // Create block table: Ensure structure matches example precisely
  const blockTable = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

  // Replace the original element with the block containing the table
  element.replaceWith(blockTable);
}