document.addEventListener('DOMContentLoaded', () => {
  const recommenderForm = document.getElementById('recommender-form');
  const resultsContainer = document.getElementById('recommender-results');
  
  if (!recommenderForm || !resultsContainer) return;

  // Check URL params for deep-link pre-selection
  const urlParams = new URLSearchParams(window.location.search);
  const initialUseCase = urlParams.get('useCase');
  if (initialUseCase) {
    const radio = document.querySelector(`input[name="useCase"][value="${initialUseCase}"]`);
    if (radio) radio.checked = true;
  }

  recommenderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(recommenderForm);
    const useCase = formData.get('useCase');
    const budget = parseFloat(formData.get('budget'));
    
    if (isNaN(budget) || budget <= 0) {
      alert('Please enter a valid budget.');
      return;
    }

    // Weighting logic (simplified demo)
    const cameras = window.appData.cameras;
    let scoredCameras = cameras.map(cam => {
      let score = 0;
      let note = '';
      
      // Base case match
      if (cam.useCases.includes(useCase)) {
        score += 50;
      }

      // Budget check
      if (cam.price <= budget) {
        score += 30;
      } else {
        score -= 50; // heavily penalize over budget
      }

      // Generate dynamic note
      if (score >= 60) {
        note = `Perfect fit for ${useCase}ing. Fits your $${budget} budget perfectly with its $${cam.price} price tag.`;
      } else if (cam.price > budget) {
        note = `Slightly over your budget of $${budget}, but highly recommended for ${useCase}.`;
      } else {
        note = `A solid option within budget, though better suited for other styles.`;
      }

      return { ...cam, matchScore: Math.max(0, score), note };
    });

    // Sort by score
    scoredCameras.sort((a, b) => b.matchScore - a.matchScore);
    
    // Filter to positive matches
    const topMatches = scoredCameras.filter(c => c.matchScore > 0).slice(0, 3);
    
    renderResults(topMatches);
  });

  function renderResults(matches) {
    if (matches.length === 0) {
      resultsContainer.innerHTML = `<div style="text-align:center; padding:var(--sp-6) 0;">
        <h3>No exact matches found</h3>
        <p>Try increasing your budget or changing your primary use case.</p>
      </div>`;
      return;
    }

    let html = '<h2 class="rec-results-title">Your Top Matches</h2><div class="rec-results">';
    
    matches.forEach((cam, idx) => {
      const isTop = idx === 0;
      const badge = isTop ? `<span class="rec-badge">#1 Recommendation</span>` : '';
      
      html += `
        <div class="rec-card${isTop ? ' is-top' : ''}">
          <div class="rec-card-img">
            <img src="${cam.image}" alt="${cam.name}" loading="lazy">
          </div>
          <div class="rec-card-body">
            ${badge}
            <h3><a href="camera-detail.html?id=${cam.id}">${cam.name}</a></h3>
            <div class="rec-price tabular">$${cam.price}</div>
            <p class="rec-note"><em>Why it fits:</em> ${cam.note}</p>
            <div class="rec-meta">
              <span class="rec-score"><i class="ph ph-target"></i> Match Score: ${cam.matchScore}/100</span>
              <a href="https://example.com/buy" target="_blank" rel="sponsored noopener" class="btn btn-primary rec-buy" data-affiliate="true" data-product-id="${cam.id}" data-placement="recommender">Check price</a>
            </div>
          </div>
        </div>
      `;
    });
    
    html += '</div>';
    html += '<p class="disclosure" style="margin-top:var(--sp-4); text-align:center">Editorial guidance based on placeholder demo data.</p>';
    
    resultsContainer.innerHTML = html;
    resultsContainer.scrollIntoView({ behavior: 'smooth' });
  }
});
