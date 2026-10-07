document.addEventListener('DOMContentLoaded', () => {
  if (!document.getElementById('camera-detail-content')) return;

  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  const allCameras = window.appData.cameras;
  const camera = allCameras.find(c => c.id === id) || allCameras[0]; // fallback to first

  // Update meta tags dynamically
  document.title = `${camera.name} Review & Specs | Frameline`;
  
  const content = document.getElementById('camera-detail-content');
  
  content.innerHTML = `
    <section class="hero" style="min-height:60vh; display:flex; align-items:center;">
      <div class="hero-bg" style="background-image: url('${camera.image}'); opacity:0.3"></div>
      <div class="container hero-content">
        <span style="color:var(--c-accent); text-transform:uppercase; letter-spacing:0.1em; font-weight:600; display:block; margin-bottom:var(--sp-2)">In-Depth Review</span>
        <h1 class="animate-up">${camera.name}</h1>
        <p class="animate-up delay-1 subtext">The complete breakdown of specs, scores, and real-world performance.</p>
        <div class="animate-up delay-2" style="display:flex; gap:var(--sp-2); justify-content:center; align-items:center;">
          <a href="#verdict" class="btn btn-secondary">Read Verdict</a>
          <a href="https://example.com/buy" target="_blank" rel="sponsored noopener" class="btn btn-primary" data-affiliate="true" data-product-id="${camera.id}" data-placement="detail-hero">Check price ($${camera.price})</a>
        </div>
      </div>
    </section>

    <section class="container" style="display:grid; grid-template-columns: 1fr 300px; gap:var(--sp-8); align-items:start;">
      <div class="main-content">
        
        <h2>At a Glance</h2>
        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:var(--sp-4); margin-bottom:var(--sp-6)">
          <div style="background:var(--c-secondary); padding:var(--sp-4); border-radius:var(--radius); border:1px solid var(--c-border)">
            <h3 style="color:var(--c-accent); text-align:left; font-size:1.125rem"><i class="ph ph-check-circle"></i> Pros</h3>
            <ul style="list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:8px">
              ${camera.pros.map(p => `<li><i class="ph ph-check" style="color:#28a745; margin-right:8px"></i>${p}</li>`).join('')}
            </ul>
          </div>
          <div style="background:var(--c-secondary); padding:var(--sp-4); border-radius:var(--radius); border:1px solid var(--c-border)">
            <h3 style="color:var(--c-accent); text-align:left; font-size:1.125rem"><i class="ph ph-x-circle"></i> Cons</h3>
            <ul style="list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:8px">
              ${camera.cons.map(c => `<li><i class="ph ph-x" style="color:#ff4d4d; margin-right:8px"></i>${c}</li>`).join('')}
            </ul>
          </div>
        </div>

        <h2 id="verdict">The Verdict</h2>
        <div style="background:#151515; padding:var(--sp-4); border-left:4px solid var(--c-accent); margin-bottom:var(--sp-6)">
          <p style="font-size:1.125rem; font-style:italic">${camera.verdict}</p>
          <div style="margin-top:var(--sp-3); font-size:0.875rem; color:var(--c-text-muted)">
            <span>Reviewed by <strong>Sarah Jenkins</strong></span> • <span>Updated: Oct 2023</span>
          </div>
        </div>

        <h2>Key Specifications</h2>
        <table class="matrix-table" style="margin-bottom:var(--sp-6); width:100%; min-width:100%;">
          <tbody>
            <tr><td style="text-align:left; font-weight:600; width:40%; background:var(--c-secondary)">Sensor</td><td class="tabular">${camera.specs.sensorSize} ${camera.specs.resolution}</td></tr>
            <tr><td style="text-align:left; font-weight:600; background:var(--c-secondary)">Video</td><td class="tabular">${camera.specs.maxVideo} (${camera.specs.codecs})</td></tr>
            <tr><td style="text-align:left; font-weight:600; background:var(--c-secondary)">Stabilization</td><td class="tabular">${camera.specs.stabilizationType} (${camera.specs.ratedStops})</td></tr>
            <tr><td style="text-align:left; font-weight:600; background:var(--c-secondary)">Autofocus</td><td class="tabular">${camera.specs.afSystem}</td></tr>
            <tr><td style="text-align:left; font-weight:600; background:var(--c-secondary)">Weight</td><td class="tabular">${camera.specs.weight}</td></tr>
          </tbody>
        </table>
        
      </div>
      
      <aside class="sidebar">
        <div style="background:var(--c-secondary); padding:var(--sp-4); border-radius:var(--radius); border:1px solid var(--c-border); position:sticky; top:100px;">
          <h3 style="margin-bottom:var(--sp-2)">Video Scorecard</h3>
          <p style="font-size:0.75rem; color:var(--c-text-muted); margin-bottom:var(--sp-4); text-align:center;"><a href="about.html#methodology" style="text-decoration:underline">How we score (Editorial /10)</a></p>
          
          ${Object.entries(camera.scores).map(([key, val]) => `
            <div style="margin-bottom:var(--sp-2)">
              <div style="display:flex; justify-content:space-between; font-size:0.875rem; margin-bottom:4px; text-transform:capitalize">
                <span>${key.replace(/([A-Z])/g, ' $1').trim()}</span>
                <span class="tabular" style="font-weight:700">${val}/10</span>
              </div>
              <div style="width:100%; height:6px; background:var(--c-primary); border-radius:3px; overflow:hidden">
                <div style="width:${val*10}%; height:100%; background:var(--c-accent);"></div>
              </div>
            </div>
          `).join('')}
          
          <div style="margin-top:var(--sp-4); text-align:center">
             <a href="https://example.com/buy" target="_blank" rel="sponsored noopener" class="btn btn-primary" style="width:100%" data-affiliate="true" data-product-id="${camera.id}" data-placement="detail-sidebar">Check price</a>
             <p class="disclosure">Affiliate link</p>
          </div>
        </div>
      </aside>
    </section>
  `;

  // Provide data to reviews script
  window.currentCameraId = camera.id;
});
