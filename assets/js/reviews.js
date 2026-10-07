document.addEventListener('DOMContentLoaded', () => {
  if (!document.getElementById('reviews-container')) return;

  const reviewsContainer = document.getElementById('reviews-container');
  // Wait slightly to ensure detail.js has set window.currentCameraId
  setTimeout(() => {
    const cameraId = window.currentCameraId;
    const allReviews = window.appData.reviews;
    let cameraReviews = allReviews.filter(r => r.cameraId === cameraId);
    
    if (cameraReviews.length === 0) {
      reviewsContainer.innerHTML = '<p style="text-align:center">No verified reviews yet for this camera.</p>';
      return;
    }

    renderReviews(cameraReviews);
  }, 100);

  function renderReviews(reviews) {
    const avg = (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length).toFixed(1);
    
    let html = `
      <div style="display:grid; grid-template-columns: 300px 1fr; gap:var(--sp-6); margin-top:var(--sp-4)">
        <div class="rating-summary" style="background:var(--c-secondary); padding:var(--sp-4); border-radius:var(--radius); text-align:center;">
          <div class="tabular" style="font-size:3rem; font-weight:700; line-height:1; color:var(--c-accent)">${avg}</div>
          <div style="margin:var(--sp-1) 0; color:var(--c-accent)"><i class="ph ph-star-fill"></i><i class="ph ph-star-fill"></i><i class="ph ph-star-fill"></i><i class="ph ph-star-fill"></i><i class="ph-fill ph-star-half"></i></div>
          <p style="font-size:0.875rem; color:var(--c-text-muted)">Based on ${reviews.length} user reviews</p>
        </div>
        
        <div class="review-list" style="display:flex; flex-direction:column; gap:var(--sp-4)">
    `;

    reviews.forEach(r => {
      let stars = '';
      for(let i=0; i<5; i++) {
        stars += i < r.rating ? '<i class="ph ph-star-fill" style="color:var(--c-accent)"></i>' : '<i class="ph ph-star" style="color:var(--c-text-muted)"></i>';
      }
      
      const badge = r.verified ? `<span aria-label="Verified owner" style="background:#151515; color:#28a745; font-size:0.75rem; padding:2px 6px; border-radius:12px; margin-left:8px"><i class="ph ph-check-circle"></i> Verified</span>` : '';

      html += `
        <article style="border-bottom:1px solid var(--c-border); padding-bottom:var(--sp-4)">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:var(--sp-2)">
            <div>
              <div style="margin-bottom:4px">${stars}</div>
              <h4 style="margin:0; text-align:left; font-size:1.125rem">${r.title}</h4>
            </div>
            <div style="font-size:0.875rem; color:var(--c-text-muted); text-align:right">
              ${r.date}
            </div>
          </div>
          <p style="font-size:0.95rem; margin-bottom:var(--sp-2)">${r.body}</p>
          <div style="font-size:0.875rem; color:var(--c-text-muted); display:flex; align-items:center;">
            <strong>${r.author}</strong> ${badge}
          </div>
        </article>
      `;
    });

    html += `</div></div>`;
    reviewsContainer.innerHTML = html;
  }
});
