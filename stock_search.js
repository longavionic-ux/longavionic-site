/****************************************
 * Stock / Inventory Search
 * Data source: stock.csv
 ****************************************/

let stockData = [];

// Load stock.csv
fetch('stock.csv')
  .then(res => res.text())
  .then(text => {
    const lines = text.split('\n');
    if (lines.length < 2) return;

    const headers = lines[0].split(',').map(h => h.trim());

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const values = line.split(',');
      let item = {};

      headers.forEach((h, idx) => {
        item[h] = values[idx] ? values[idx].trim() : '';
      });

      stockData.push(item);
    }
  });

// Search inventory
function searchStock() {
  const input = document
    .getElementById('inventoryInput')
    .value
    .trim()
    .toUpperCase();

  const box = document.getElementById('inventoryResult');
  box.innerHTML = '';

  if (!input) {
    box.innerHTML = '<p>Please enter PN or description.</p>';
    return;
  }

  const results = stockData.filter(item =>
    (item.PN && item.PN.toUpperCase().includes(input)) ||
    (item.Description && item.Description.toUpperCase().includes(input))
  );

  if (results.length === 0) {
    box.innerHTML = '<p>No inventory found.</p>';
    return;
  }

  renderStockTable(results);
}

// Render table with RFQ
function renderStockTable(data) {
  const box = document.getElementById('inventoryResult');
  let html = '<table><tr>';

  Object.keys(data[0]).forEach(key => {
    html += `<th>${key}</th>`;
  });

  html += '<th>RFQ</th></tr>';

  data.forEach(row => {
    html += '<tr>';

    Object.keys(row).forEach(key => {
      html += `<td>${row[key]}</td>`;
    });

    const pn = row.PN || '';
    const condition = row.Condition || '';
    const qty = row.Qty || row.Quantity || '';

    html += `
      <td>
        <button class="quote-btn"
          onclick="requestStockQuote('${pn}','${condition}','${qty}')">
          Request Quote
        </button>
      </td>
    `;

    html += '</tr>';
  });

  html += '</table>';
  box.innerHTML = html;
}

// RFQ email
function requestStockQuote(pn, condition, qty) {
  const subject = `Stock RFQ - ${pn}`;

  const body =
    `Hello Long Avionic Team,%0D%0A%0D%0A` +
    `I would like to request a quotation for the following stock item:%0D%0A%0D%0A` +
    `Part Number: ${pn}%0D%0A` +
    `Condition: ${condition}%0D%0A` +
    `Quantity Available: ${qty}%0D%0A%0D%0A` +
    `Requested Quantity:%0D%0A` +
    `Target Price:%0D%0A%0D%0A` +
    `Company Name:%0D%0A` +
    `Contact Name:%0D%0A` +
    `Email:%0D%0A%0D%0A` +
    `Thank you.`;

  window.location.href =
    `mailto:longavionic@gmail.com?subject=${subject}&body=${body}`;
}
