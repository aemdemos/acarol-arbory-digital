export default function parse(element, { document }) {
  // Helper function to create header row
  const createHeaderRow = () => ['Hero'];

  // Extract title heading from the given element
  const extractTitle = (fullElement) => {
    const titleElement = fullElement.querySelector('h2');
    return titleElement ? titleElement.textContent.trim() : '';
  };

  // Extract optional subheading
  const extractSubHeading = (fullElement) => {
    const secondHeadingElement = fullElement.querySelectorAll('h2')[1];
    return secondHeadingElement ? secondHeadingElement.innerHTML.trim() : '';
  };

  // Extract call-to-action information
  const extractButton = (fullElement) => {
    const buttonElement = fullElement.querySelector('.elementor-button');
    if (buttonElement) {
      const buttonText = buttonElement.textContent.trim();
      const buttonHref = buttonElement.getAttribute('href');
      const linkElement = document.createElement('a');
      linkElement.href = buttonHref;
      linkElement.textContent = buttonText;
      return linkElement;
    }
    return null;
  };

  // Extract background image
  const extractBackgroundImage = (fullElement) => {
    const imageElement = fullElement.querySelector('img');
    if (imageElement) {
      const img = document.createElement('img');
      img.src = imageElement.src;
      img.alt = imageElement.alt || '';
      img.width = imageElement.width;
      img.height = imageElement.height;
      return img;
    }
    return null;
  };

  // Extract all content from the element
  const extractContent = (element) => {
    const title = extractTitle(element);
    const subHeading = extractSubHeading(element);
    const button = extractButton(element);
    const backgroundImage = extractBackgroundImage(element);

    const content = document.createElement('div');

    if (title) {
      const heading = document.createElement('h1');
      heading.textContent = title;
      content.appendChild(heading);
    }

    if (subHeading) {
      const subHeadingElement = document.createElement('p');
      subHeadingElement.innerHTML = subHeading;
      content.appendChild(subHeadingElement);
    }

    if (button) {
      content.appendChild(button);
    }

    if (backgroundImage) {
      content.prepend(backgroundImage);
    }

    return content;
  };

  // Create the table structure
  const createTable = (headerRow, content) => {
    const cells = [headerRow, [content]];
    return WebImporter.DOMUtils.createTable(cells, document);
  };

  // Execution starts here
  const headerRow = createHeaderRow();
  const extractedContent = extractContent(element);
  const blockTable = createTable(headerRow, extractedContent);

  // Replace original element with the new block table
  element.replaceWith(blockTable);
}