export default function parse(element, { document }) {
  // Create the header row matching the example.
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Hero';

  const cells = [headerRow];

  Array.from(element.querySelectorAll('.elementor-widget-flip-box')).forEach((widget) => {
    const front = widget.querySelector('.elementor-flip-box__front');
    const back = widget.querySelector('.elementor-flip-box__back');

    // Extract image dynamically
    let image = front.querySelector('img');
    if (image) {
      const imgElement = document.createElement('img');
      imgElement.src = image.dataset.lazySrc || image.src;
      imgElement.alt = image.alt;
      image = imgElement;
    }

    // Extract heading
    const heading = back.querySelector('.elementor-flip-box__layer__description');
    const headingElement = heading ? document.createElement('h1') : null;
    if (headingElement) {
      headingElement.textContent = heading.textContent.trim();
    }

    // Extract call-to-action link
    const cta = back.querySelector('a');
    const ctaElement = cta ? document.createElement('a') : null;
    if (ctaElement) {
      ctaElement.href = cta.href;
      ctaElement.textContent = cta.textContent.trim();
    }

    const content = [];
    if (image) content.push(image);
    if (headingElement) content.push(headingElement);
    if (ctaElement) content.push(ctaElement);

    cells.push([content]);
  });

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}