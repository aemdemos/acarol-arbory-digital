export default function parse(element, { document }) {
  // Helper function to create image elements
  const createImageElement = (src, alt) => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    return img;
  };

  // Extract content from the provided element
  const posts = element.querySelectorAll('.jet-posts__item');
  const rows = [];

  // Create header row
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Cards';
  rows.push(headerRow);

  posts.forEach((post) => {
    const imageLink = post.querySelector('.post-thumbnail a');
    const image = imageLink.querySelector('img');
    const titleLink = post.querySelector('.entry-title a');
    const excerpt = post.querySelector('.entry-excerpt');
    const readMoreLink = post.querySelector('.jet-more-wrap a');

    // Handle edge cases for missing data
    const imageSrc = image?.dataset.lazySrc || image?.src || '';
    const imageAlt = image?.alt || 'Image';
    const titleText = titleLink?.textContent || 'No Title';
    const excerptText = excerpt?.textContent || 'No Description';
    const readMoreHref = readMoreLink?.href || '#';

    // Create content for each card
    const imageElement = createImageElement(imageSrc, imageAlt);
    const titleElement = document.createElement('p');
    titleElement.textContent = titleText;
    titleElement.style.fontWeight = 'bold';

    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = excerptText;

    const ctaElement = document.createElement('a');
    ctaElement.href = readMoreHref;
    ctaElement.textContent = 'Read More';

    const contentCell = document.createElement('div');
    contentCell.append(titleElement, descriptionElement, ctaElement);

    rows.push([imageElement, contentCell]);
  });

  // Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}