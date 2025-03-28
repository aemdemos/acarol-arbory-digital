export default function parse(element, { document }) {
  // Helper function to create structured content for the block
  const createBlockContent = (imageSrc, heading, description, ctaText, ctaLink) => {
    const image = document.createElement('img');
    image.src = imageSrc;

    const headingElement = document.createElement('h1');
    headingElement.textContent = heading;

    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = description;

    const ctaElement = document.createElement('a');
    ctaElement.href = ctaLink || '#'; // Ensure a default link if empty
    ctaElement.textContent = ctaText || 'Learn More'; // Provide default CTA text if missing

    // Combine all elements into a single array (block content)
    return [image, headingElement, descriptionElement, ctaElement];
  };

  // Extract relevant content from the input element
  const columns = Array.from(element.querySelectorAll('.elementor-column'));

  const blockRows = [['Hero']]; // Correctly match the header row format from the example

  columns.forEach((column) => {
    const frontLayer = column.querySelector('.elementor-flip-box__front');
    const backLayer = column.querySelector('.elementor-flip-box__back');

    // Extract front-layer image
    const imageElement = frontLayer.querySelector('img');
    const imageSrc = imageElement?.dataset.lazySrc || imageElement?.src || '';

    // Extract back-layer heading, description, and CTA
    const description = backLayer.querySelector('.elementor-flip-box__layer__description')?.textContent.trim() || '';
    const ctaElement = backLayer.querySelector('a');
    const ctaText = ctaElement?.textContent.trim() || '';
    const ctaLink = ctaElement?.href || '';

    const heading = description.split('.')[0]; // Extract the first sentence as the heading

    blockRows.push([createBlockContent(imageSrc, heading, description, ctaText, ctaLink)]);
  });

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(blockRows, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}