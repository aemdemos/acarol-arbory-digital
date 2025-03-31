export default function parse(element, { document }) {
  // Helper function to parse the content of a column
  const parseColumn = (columnElement) => {
    const headingEl = columnElement.querySelector('.elementor-heading-title');
    const headingText = headingEl ? headingEl.textContent.trim() : '';

    const listItems = Array.from(columnElement.querySelectorAll('.elementor-icon-list-item')).map((item) => {
      const linkEl = item.querySelector('a');
      if (linkEl) {
        const link = document.createElement('a');
        link.href = linkEl.href;
        link.textContent = linkEl.textContent.trim();
        return link;
      }
      return null;
    }).filter(Boolean);

    const paragraphs = Array.from(columnElement.querySelectorAll('p')).map((p) => {
      const paragraphEl = document.createElement('p');
      paragraphEl.textContent = p.textContent.trim();
      return paragraphEl;
    });

    const formEl = columnElement.querySelector('form');
    let formContent = [];
    if (formEl) {
      const emailInput = formEl.querySelector('input[type="email"]');
      if (emailInput) {
        const emailDiv = document.createElement('div');
        emailDiv.textContent = `Email: ${emailInput.placeholder}`;
        formContent.push(emailDiv);
      }

      const checkboxLabel = formEl.querySelector('label[for="form-field-field_9c285f5"]');
      if (checkboxLabel) {
        const checkboxDiv = document.createElement('div');
        checkboxDiv.appendChild(checkboxLabel.cloneNode(true));
        formContent.push(checkboxDiv);
      }

      const submitButton = formEl.querySelector('button[type="submit"]');
      if (submitButton) {
        const submitDiv = document.createElement('div');
        submitDiv.textContent = `Button: ${submitButton.textContent.trim()}`;
        formContent.push(submitDiv);
      }
    }

    const columnContent = [];
    if (headingText) {
      const headingElement = document.createElement('h3');
      headingElement.textContent = headingText;
      columnContent.push(headingElement);
    }
    if (listItems.length > 0) {
      columnContent.push(...listItems);
    }
    if (paragraphs.length > 0) {
      columnContent.push(...paragraphs);
    }
    if (formContent.length > 0) {
      columnContent.push(...formContent);
    }

    return columnContent.length > 0 ? [columnContent] : null; // Returns null for empty content
  };

  const columns = Array.from(element.querySelectorAll('.elementor-column'));
  const parsedColumns = columns.map(parseColumn).filter(Boolean); // Filters out empty columns

  const headerRow = ['Columns'];

  const tableData = [headerRow, ...parsedColumns];

  const newTable = WebImporter.DOMUtils.createTable(tableData, document);

  element.replaceWith(newTable);
}