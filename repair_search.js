let repairData = [];

// 读取 Repair.csv
fetch('Repair.csv')
  .then(response => response.text())
  .then(text => {
    const lines = text.split('\n');
    const headers = lines[0].split(',');

    for (let i = 1; i < lines.length; i++) {
      const row = lines[i].trim();
      if (!row) continue;

      const values = row.split(',');
      let item = {};

      headers.forEach((h, index) => {
        item[h.trim()] = values[index] ? values[index].trim() : '';
      });

      repairData.push(item);
    }
  });

// 搜索维修能力
function searchRepair() {
  const input = document.getElementById('repairInput').value.toUpperCase();
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

  let html = '<table border="1" cellpadding="6" cellspacing="0">';
  html += '<tr>';

  Object.keys(results[0]).forEach(key => {
    html += `<th>${key}</th>`;
  });

  html += '</tr>';

  results.forEach(row => {
    html += '<tr>';
    Object.values(row).forEach(val => {
      html += `<td>${val}</td>`;
    });
    html += '</tr>';
  });

  html += '</table>';
  resultBox.innerHTML = html;
}
