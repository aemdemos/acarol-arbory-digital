export default function parse(element, { document }) {
  // Extracting the heading text
  const heading = element.querySelector("div[data-id='c9aad01'] h3.elementor-heading-title")?.textContent.trim();

  // Extracting the paragraph text
  const paragraph = element.querySelector("div[data-id='447822f'] p")?.textContent.trim();

  // Extracting the button text and URL
  const buttonWrapper = element.querySelector("div[data-id='917a173'] .elementor-button-wrapper a");
  const buttonText = buttonWrapper?.querySelector("span.elementor-button-text")?.textContent.trim();
  const buttonLink = buttonWrapper?.getAttribute("href");

  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Table (no header)';
  const headerRow = [headerCell];

  // Handling edge cases with proper checks
  const rows = [];
  if (heading) rows.push([document.createTextNode(heading)]);
  if (paragraph) rows.push([document.createTextNode(paragraph)]);
  if (buttonText && buttonLink) {
    const linkElement = document.createElement('a');
    linkElement.textContent = buttonText;
    linkElement.href = buttonLink;
    rows.push([linkElement]);
  }

  const cells = [headerRow, ...rows];

  // Creating the table block
  const tableBlock = WebImporter.DOMUtils.createTable(cells, document);

  // Replacing the original element
  element.replaceWith(tableBlock);
}