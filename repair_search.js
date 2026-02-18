/*************************************************
 * Repair Capability Search
 * Data source: Repair.csv
 * Feature:
 *  - Search by PN
 *  - Display full CSV fields
 *  - Add "Request Quote" button per result
 *************************************************/

let repairData = [];

/* ===== Load Repair.csv ===== */
fetch('Repair.csv')
  .then(response => response.text())
  .then(text => {
    const lines = text.split('\n');
    if (lines.length < 2) return;

    const headers = lines[0].split(',').map(h => h.trim());

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const values = line.split(',');
      let item = {};

      headers.forEach((header, index) => {
        item[header] = values[index] ? values[index].trim() : '';
      });

      repairData.push(item);
    }
  })
  .catch(err => {
    console.error('Failed to load Repair.csv', err);
  });

/* ===== Search Repair Capability ===== */
function searchRepair() {
  const input = document
    .getElementById('repairInput')
    .value
    .trim()
    .toUpperCase();

  const resultBox = document.getElementById('repairResult');
  resultBox.innerHTML = '';

  if (!input) {
    resultBox.innerHTML = '<p>Please enter a PN.</p>';
    return;
  }

  const results = repairData.filter(item =>
    item.PN && item.PN.toUpperCase().includes(input)
  );

  if (results.length === 0) {
    resultBox.innerHTML = '<p>No repair capability found.</p>';
    return;
  }

  /* ===== Build Result Table ===== */
  let html = '<table border="1" cellpadding="6" cellspacing="0">';
  html += '<tr>';

  // CSV headers
  Object.keys(results[0]).forEach(key => {
    html += `<th>${key}</th>`;
  });

  // Extra action column
  html += '<th>Quote</th>';
  html += '</tr>';

  // Table rows
  results.forEach(row => {
    html += '<tr>';

    Object.keys(row).forEach(key => {
      html += `<td>${row[key]}</td>`;
    });

    // Quote button (use PN)
    html += `
      <td>
        <button
          class="quote-btn"
          onclick="requestQuote('${row.PN}')">
          Request Quote
        </button>
      </td>
    `;

    html += '</tr>';
  });

  html += '</table>';
  resultBox.innerHTML = html;
}

/* ===== Request Quote (Email) ===== */
function requestQuote(pn) {
  const subject = `Repair Quote Request - ${pn}`;

  const body =
    `Hello Long Avionic Team,%0D%0A%0D%0A` +
    `I would like to request a repair quotation.%0D%0A%0D%0A` +
    `Part Number: ${pn}%0D%0A` +
    `Quantity:%0D%0A` +
    `Fault Description:%0D%0A%0D%0A` +
    `Company Name:%0D%0A` +
    `Contact Name:%0D%0A` +
    `Email:%0D%0A%0D%0A` +
    `Thank you.`;

  window.location.href =
    `mailto:longavionic@gmail.com?subject=${subject}&body=${body}`;
}
