/* global WebImporter */
export default function parse(element, { document }) {
  // Extract relevant content from input element
  const headerRow = ['Hero'];

  // Prepare cells for the rows
  const cells = [
    [headerRow],
    [
      (() => {
        const blockContainer = document.createElement('div');

        // Optional background image
        const backgroundImage = element.querySelector('img');
        if (backgroundImage) {
          const image = document.createElement('img');
          image.src = backgroundImage.dataset.lazySrc || backgroundImage.src;
          blockContainer.appendChild(image);
        }

        // Mandatory title / heading
        const titleElement = element.querySelector('.elementor-flip-box__layer__overlay h1, .elementor-flip-box__layer__overlay h2');
        if (titleElement) {
          const heading = document.createElement('h1');
          heading.textContent = titleElement.textContent.trim();
          blockContainer.appendChild(heading);
        }

        // Optional subheading or description
        const descriptionElement = element.querySelector('.elementor-flip-box__layer__description');
        if (descriptionElement) {
          const description = document.createElement('p');
          description.textContent = descriptionElement.textContent.trim();
          blockContainer.appendChild(description);
        }

        // Optional call-to-action
        const ctaElement = element.querySelector('a');
        if (ctaElement) {
          const cta = document.createElement('a');
          cta.href = ctaElement.href;
          cta.textContent = ctaElement.textContent.trim();
          blockContainer.appendChild(cta);
        }

        return blockContainer;
      })(),
    ],
  ];

  // Create the block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new structured block
  element.replaceWith(block);
}
