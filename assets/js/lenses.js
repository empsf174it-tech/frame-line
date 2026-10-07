document.addEventListener('DOMContentLoaded', () => {
  if (!document.getElementById('lenses-grid')) return;

  const lenses = window.appData.lenses;
  const grid = document.getElementById('lenses-grid');
  
  // Render Grid
  lenses.forEach(lens => {
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <div class="card-img-wrap" style="aspect-ratio: 1/1; cursor:pointer" data-id="${lens.id}">
        <img src="${lens.image}" alt="${lens.name}" loading="lazy">
      </div>
      <div class="card-content">
        <h3 class="card-title" style="cursor:pointer" data-id="${lens.id}">${lens.name}</h3>
        <div class="card-meta">
          <span>${lens.mount}</span>
          <span>${lens.category}</span>
        </div>
        <div class="card-price tabular">$${lens.price}</div>
        <div class="card-footer">
          <button class="btn btn-secondary view-lens-btn" data-id="${lens.id}" style="width:100%; margin-bottom:8px">View Details</button>
          <a href="https://example.com/buy" target="_blank" rel="sponsored noopener" class="btn btn-primary" style="width:100%" data-affiliate="true" data-product-id="${lens.id}" data-placement="lens-card">Check price</a>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });

  // Modal logic
  const modal = document.getElementById('lens-modal');
  if (!modal) return;
  const overlay = modal.querySelector('.lightbox');
  const closeBtn = modal.querySelector('.lightbox-close');
  const modalContent = document.getElementById('lens-modal-content');

  const openModal = (id) => {
    const lens = lenses.find(l => l.id === id);
    if (!lens) return;

    modalContent.innerHTML = `
      <div style="background:var(--c-primary); padding:var(--sp-6); border-radius:var(--radius); border:1px solid var(--c-border); max-width:800px; margin:auto; display:grid; grid-template-columns: 1fr 1fr; gap:var(--sp-4);">
        <div>
          <img src="${lens.image}" alt="${lens.name}" style="border-radius:var(--radius); width:100%">
        </div>
        <div>
          <h2 style="text-align:left; margin-bottom:var(--sp-1)">${lens.name}</h2>
          <div style="font-size:1.5rem; color:var(--c-accent); margin-bottom:var(--sp-3)" class="tabular">$${lens.price}</div>
          <p style="margin-bottom:var(--sp-4)">A premium ${lens.category.toLowerCase()} lens for ${lens.mount} cameras, delivering exceptional sharpness and beautiful bokeh.</p>
          
          <ul style="list-style:none; padding:0; margin-bottom:var(--sp-4); display:flex; flex-direction:column; gap:8px">
            <li><strong>Focal Length:</strong> <span class="tabular">${lens.specs.focalLength}</span></li>
            <li><strong>Max Aperture:</strong> <span class="tabular">${lens.specs.maxAperture}</span></li>
            <li><strong>Stabilization:</strong> ${lens.specs.stabilization}</li>
          </ul>

          <a href="https://example.com/buy" target="_blank" rel="sponsored noopener" class="btn btn-primary" style="width:100%" data-affiliate="true" data-product-id="${lens.id}" data-placement="lens-modal">Check price</a>
        </div>
      </div>
    `;
    
    overlay.classList.add('active');
    overlay.setAttribute('aria-hidden', 'false');
    closeBtn.focus();
    
    // Focus trap
    const focusableElements = overlay.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    const first = focusableElements[0];
    const last = focusableElements[focusableElements.length - 1];

    overlay.addEventListener('keydown', function(e) {
      if (e.key === 'Tab') {
        if (e.shiftKey) { 
          if (document.activeElement === first) { e.preventDefault(); last.focus(); }
        } else {
          if (document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
      }
    });
  };

  const closeModal = () => {
    overlay.classList.remove('active');
    overlay.setAttribute('aria-hidden', 'true');
  };

  grid.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-id]:not([data-affiliate])');
    if (trigger) {
      openModal(trigger.getAttribute('data-id'));
    }
  });

  closeBtn.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) closeModal();
  });
});
