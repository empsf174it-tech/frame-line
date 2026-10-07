document.addEventListener('DOMContentLoaded', () => {
  if (!document.getElementById('compare-matrix')) return;

  const compareContainer = document.getElementById('compare-matrix');
  const allCameras = window.appData.cameras;
  
  let compareList = [];
  try {
    const stored = sessionStorage.getItem('frameline_compare');
    if (stored) compareList = JSON.parse(stored);
  } catch(e) { console.error(e); }

  if (compareList.length < 2) {
    compareContainer.innerHTML = `
      <div style="text-align: center; padding: var(--sp-6) 0;">
        <h3>Not enough cameras to compare</h3>
        <p>Please select at least 2 cameras from the <a href="cameras.html">Cameras hub</a>.</p>
        <a href="cameras.html" class="btn btn-primary" style="margin-top: var(--sp-3)">Go to Cameras</a>
      </div>
    `;
    return;
  }

  // Cap at 4
  const camerasToCompare = compareList.slice(0, 4).map(id => allCameras.find(c => c.id === id)).filter(Boolean);
  
  renderMatrix(camerasToCompare);

  function renderMatrix(cameras) {
    let html = `
      <div class="matrix-container">
        <table class="matrix-table">
          <thead>
            <tr>
              <th>Feature</th>
    `;
    
    cameras.forEach(cam => {
      let highlight = '';
      if (cam.scores.value >= 9.5) highlight = '<div class="matrix-highlight">Best Value</div>';
      else if (cam.scores.imageQuality >= 9.5 && cam.scores.video >= 9.5) highlight = '<div class="matrix-highlight">Best Overall</div>';

      html += `
        <th>
          ${highlight}
          <div><img src="${cam.image}" alt="${cam.name}" style="width:100px; height:auto; margin:0 auto var(--sp-1) auto; border-radius:var(--radius)"></div>
          <div style="font-size:1.125rem; font-family:var(--font-heading)">${cam.name}</div>
          <div class="tabular" style="color:var(--c-accent); margin-bottom:var(--sp-2)">$${cam.price}</div>
          <a href="https://example.com/buy" target="_blank" rel="sponsored noopener" class="btn btn-primary" style="padding: 4px 12px; font-size: 0.75rem;" data-affiliate="true" data-product-id="${cam.id}" data-placement="matrix">Check price</a>
        </th>
      `;
    });
    
    html += `</tr></thead><tbody>`;

    // Helper for rows
    const renderRow = (label, key, isNested = true) => {
      let row = `<tr><td>${label}</td>`;
      cameras.forEach(cam => {
        const val = isNested ? cam.specs[key] : cam[key];
        row += `<td class="tabular">${val}</td>`;
      });
      row += `</tr>`;
      return row;
    };

    html += `<tr class="matrix-group-row"><td colspan="${cameras.length + 1}">Sensor</td></tr>`;
    html += renderRow('Size', 'sensorSize');
    html += renderRow('Resolution', 'resolution');
    
    html += `<tr class="matrix-group-row"><td colspan="${cameras.length + 1}">Video</td></tr>`;
    html += renderRow('Max Resolution', 'maxVideo');
    html += renderRow('Codecs', 'codecs');
    html += renderRow('Log Profile', 'logProfile');

    html += `<tr class="matrix-group-row"><td colspan="${cameras.length + 1}">Stabilization</td></tr>`;
    html += renderRow('Type', 'stabilizationType');
    html += renderRow('Rated Stops', 'ratedStops');

    html += `<tr class="matrix-group-row"><td colspan="${cameras.length + 1}">Autofocus</td></tr>`;
    html += renderRow('System', 'afSystem');
    html += renderRow('Subject Detection', 'subjectDetection');

    html += `<tr class="matrix-group-row"><td colspan="${cameras.length + 1}">Handling</td></tr>`;
    html += renderRow('Viewfinder', 'viewfinder');
    html += renderRow('Screen', 'screen');
    html += renderRow('Card Slots', 'cardSlots');
    html += renderRow('Ports', 'ports');
    html += renderRow('Battery Life', 'batteryLife');
    html += renderRow('Weight', 'weight');

    html += `</tbody></table></div>`;
    
    // Add disclosure above matrix
    const disclosure = `<p class="disclosure" style="text-align:right; margin-bottom:var(--sp-2)">* Affiliate links. Prices and specs are placeholder data.</p>`;
    
    compareContainer.innerHTML = disclosure + html;
  }
});
