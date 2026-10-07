document.addEventListener('DOMContentLoaded', () => {
  const galleryImgs = document.querySelectorAll('.gallery-img');
  if (galleryImgs.length === 0) return;

  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-modal', 'true');
  lightbox.setAttribute('aria-label', 'Image Gallery Lightbox');
  
  lightbox.innerHTML = `
    <button class="lightbox-close" aria-label="Close lightbox"><i class="ph ph-x"></i></button>
    <div class="lightbox-content">
      <button class="lightbox-prev" aria-label="Previous image"><i class="ph ph-caret-left"></i></button>
      <img class="lightbox-img" src="" alt="">
      <button class="lightbox-next" aria-label="Next image"><i class="ph ph-caret-right"></i></button>
      <div class="lightbox-caption"></div>
    </div>
  `;
  document.body.appendChild(lightbox);

  const imgEl = lightbox.querySelector('.lightbox-img');
  const captionEl = lightbox.querySelector('.lightbox-caption');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');
  
  let currentIndex = 0;
  const images = Array.from(galleryImgs).map(img => ({
    src: img.getAttribute('src'),
    alt: img.getAttribute('alt'),
    caption: img.getAttribute('data-caption') || ''
  }));

  const updateLightbox = () => {
    imgEl.src = images[currentIndex].src;
    imgEl.alt = images[currentIndex].alt;
    captionEl.textContent = images[currentIndex].caption;
  };

  const openLightbox = (index) => {
    currentIndex = index;
    updateLightbox();
    lightbox.classList.add('active');
    closeBtn.focus();
  };

  const closeLightbox = () => {
    lightbox.classList.remove('active');
  };

  const nextImg = () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateLightbox();
  };

  const prevImg = () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateLightbox();
  };

  galleryImgs.forEach((img, idx) => {
    img.addEventListener('click', () => openLightbox(idx));
    img.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(idx);
      }
    });
  });

  closeBtn.addEventListener('click', closeLightbox);
  nextBtn.addEventListener('click', nextImg);
  prevBtn.addEventListener('click', prevImg);

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImg();
    if (e.key === 'ArrowLeft') prevImg();
  });
});
