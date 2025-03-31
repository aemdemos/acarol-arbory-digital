/* global WebImporter */
export default function parse(element, { document }) {
  // Step 1: Extract relevant content
  const headerRow = ['Hero'];

  const callToActionLink = element.querySelector('a.elementor-button');

  const extractLinkElement = () => {
    const ctaText = callToActionLink?.querySelector('.elementor-button-text')?.textContent.trim() || '';
    const ctaHref = callToActionLink?.getAttribute('href') || '';

    const ctaElement = document.createElement('p');
    const ctaAnchor = document.createElement('a');
    ctaAnchor.href = ctaHref;
    ctaAnchor.textContent = ctaText;
    ctaElement.appendChild(ctaAnchor);

    return ctaElement;
  };

  const callToAction = callToActionLink ? extractLinkElement() : '';

  // Example of how a heading element can be manually created
  const heading = document.createElement('h1');
  heading.textContent = 'Heading in Block'; // Using placeholder/example heading.

  const backgroundImage = document.createElement('img');
  backgroundImage.src = 'https://main--acarol-arbory-digital--aemdemos.hlx.page/media_1061934561e8a4f01907e616a0ce0e4b74d63b92e.jpeg#width=750&height=415';
  backgroundImage.alt = 'Decorative double Helix';

  // Step 2: Organize content into a table array
  const cells = [headerRow, [[heading, backgroundImage, callToAction]]]; // All elements consolidated into one cell

  // Step 3: Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Step 4: Replace original element
  element.replaceWith(block);
}
