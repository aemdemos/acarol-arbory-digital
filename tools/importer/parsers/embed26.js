export default function parse(element, { document }) {
  // Extract the image dynamically
  const image = element.querySelector('img');

  // Extract the heading with URL dynamically
  const headingLinkWrapper = element.querySelector('.elementor-widget-heading .elementor-heading-title a');
  const headingLink = headingLinkWrapper ? headingLinkWrapper.href : '';
  const headingText = headingLinkWrapper ? headingLinkWrapper.textContent.trim() : '';

  // Create the URL paragraph element combining text and link (handling dynamic structure)
  const textNode = document.createTextNode(headingText);
  const linkNode = document.createElement('a');
  linkNode.href = headingLink;
  linkNode.textContent = headingLink;
  const paragraphEl = document.createElement('p');
  paragraphEl.appendChild(textNode);
  paragraphEl.appendChild(linkNode);

  // Extract and dynamically handle social media links
  const socialLinks = [...element.querySelectorAll('.elementor-social-icons-wrapper a')]
    .map((link) => {
      const linkEl = document.createElement('a');
      linkEl.href = link.href;
      linkEl.textContent = link.className.match(/elementor-social-icon-(\w+)/)?.[1] || 'unknown';
      return linkEl;
    });

  // Create content for block table ensuring correct placement of content
  const cells = [
    ['Embed'], // Header row matches example
    [
      image ? [image, paragraphEl] : paragraphEl, // Combine image and text inside the same cell dynamically
      ...socialLinks // Place social links in separate cells but still part of the content row
    ],
  ];

  // Replace element with structured block table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(blockTable);
}