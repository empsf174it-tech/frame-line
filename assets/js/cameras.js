document.addEventListener('DOMContentLoaded', () => {
  if (!document.getElementById('cameras-grid')) return;

  const cameras = window.appData.cameras;
  let filteredCameras = [...cameras];
  let compareList = loadCompareList();

  const grid = document.getElementById('cameras-grid');
  const typeFilter = document.getElementById('filter-type');
  const sortSelect = document.getElementById('sort-cameras');
  const compareTray = document.getElementById('compare-tray');
  const trayItems = document.getElementById('tray-items');

  // Handle URL params for type filtering (e.g. ?type=mirrorless)
  const urlParams = new URLSearchParams(window.location.search);
  const initialType = urlParams.get('type');
  if (initialType && typeFilter) {
    typeFilter.value = initialType.charAt(0).toUpperCase() + initialType.slice(1);
  }

  function renderCameras() {
    grid.innerHTML = '';
    
    if (filteredCameras.length === 0) {
      grid.innerHTML = '<div class="no-results" style="grid-column: 1/-1; text-align: center; padding: var(--sp-6) 0;"><h3>No cameras found</h3><p>Try adjusting your filters.</p></div>';
      return;
    }

    filteredCameras.forEach(cam => {
      const isChecked = compareList.includes(cam.id) ? 'checked' : '';
      const card = document.createElement('article');
      card.className = 'card';
      card.innerHTML = `
        <div class="card-img-wrap">
          <a href="camera-detail.html?id=${cam.id}">
            <img src="${cam.image}" alt="${cam.name}" loading="lazy">
          </a>
        </div>
        <div class="card-content">
          <h3 class="card-title"><a href="camera-detail.html?id=${cam.id}">${cam.name}</a></h3>
          <div class="card-meta">
            <span><i class="ph ph-star-fill" style="color:var(--c-accent)"></i> ${cam.rating} (${cam.reviewsCount})</span>
            <span>${cam.type}</span>
          </div>
          <div class="card-price tabular">$${cam.price}</div>
          <div class="card-footer">
            <a href="https://example.com/buy" target="_blank" rel="sponsored noopener" class="btn btn-primary" data-affiliate="true" data-product-id="${cam.id}" data-placement="card">Check price</a>
            <label class="compare-checkbox-label">
              <input type="checkbox" class="compare-cb" value="${cam.id}" ${isChecked}> Add to compare
            </label>
          </div>
        </div>
      `;
      grid.appendChild(card);
    });

    attachCompareListeners();
  }

  function applyFilters() {
    filteredCameras = [...cameras];
    
    if (typeFilter && typeFilter.value !== 'all') {
      filteredCameras = filteredCameras.filter(c => c.type === typeFilter.value);
    }
    
    if (sortSelect) {
      const sort = sortSelect.value;
      if (sort === 'price-low') {
        filteredCameras.sort((a, b) => a.price - b.price);
      } else if (sort === 'price-high') {
        filteredCameras.sort((a, b) => b.price - a.price);
      } else if (sort === 'rating') {
        filteredCameras.sort((a, b) => b.rating - a.rating);
      }
    }
    
    renderCameras();
  }

  if (typeFilter) typeFilter.addEventListener('change', applyFilters);
  if (sortSelect) sortSelect.addEventListener('change', applyFilters);

  function attachCompareListeners() {
    const checkboxes = document.querySelectorAll('.compare-cb');
    checkboxes.forEach(cb => {
      cb.addEventListener('change', (e) => {
        const id = e.target.value;
        if (e.target.checked) {
          if (compareList.length >= 4) {
            e.target.checked = false;
            alert('You can only compare up to 4 cameras at once.');
            return;
          }
          if (!compareList.includes(id)) compareList.push(id);
        } else {
          compareList = compareList.filter(cId => cId !== id);
        }
        saveCompareList();
        updateCompareTray();
      });
    });
  }

  function updateCompareTray() {
    if (compareList.length > 0) {
      compareTray.classList.add('active');
      trayItems.innerHTML = '';
      compareList.forEach(id => {
        const cam = cameras.find(c => c.id === id);
        if (cam) {
          const item = document.createElement('div');
          item.className = 'tray-item';
          item.innerHTML = `<span>${cam.name}</span> <button data-id="${cam.id}"><i class="ph ph-x"></i></button>`;
          trayItems.appendChild(item);
        }
      });
      
      const removeBtns = trayItems.querySelectorAll('button');
      removeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          const id = e.currentTarget.getAttribute('data-id');
          compareList = compareList.filter(cId => cId !== id);
          saveCompareList();
          updateCompareTray();
          renderCameras(); // update checkboxes
        });
      });
    } else {
      compareTray.classList.remove('active');
    }
  }

  function saveCompareList() {
    try {
      sessionStorage.setItem('frameline_compare', JSON.stringify(compareList));
    } catch(e) { console.error('SessionStorage error', e); }
  }

  function loadCompareList() {
    try {
      const stored = sessionStorage.getItem('frameline_compare');
      return stored ? JSON.parse(stored) : [];
    } catch(e) { return []; }
  }

  applyFilters();
  updateCompareTray();
});
