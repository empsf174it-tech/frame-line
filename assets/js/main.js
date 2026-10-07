document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initAffiliateTracking();
  initNavScroll();
  initReveal();
  initCardSpotlight();
  initActiveNav();
  initBackToTop();
});

// Highlight the current page in the desktop nav and the mobile drawer
function initActiveNav() {
  const page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  const current = page === 'camera-detail.html' ? 'cameras.html' : page;
  document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
    const target = (link.getAttribute('href') || '').split(/[?#]/)[0].toLowerCase();
    const isActive = target === current;
    link.classList.toggle('active', isActive);
    if (isActive) link.setAttribute('aria-current', 'page');
  });
  if (current === 'cameras.html') {
    document.querySelectorAll('.mobile-dropdown-btn').forEach(btn => btn.classList.add('active'));
  }
}

function initBackToTop() {
  const btn = document.createElement('button');
  btn.className = 'back-to-top';
  btn.type = 'button';
  btn.setAttribute('aria-label', 'Back to top');
  btn.innerHTML = '<i class="ph ph-arrow-up"></i>';
  document.body.appendChild(btn);
  const update = () => btn.classList.toggle('show', window.scrollY > 400);
  update();
  window.addEventListener('scroll', update, { passive: true });
  btn.addEventListener('click', () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  });
}

function initNavScroll() {
  const nav = document.querySelector('.navbar');
  if (!nav) return;
  const update = () => nav.classList.toggle('scrolled', window.scrollY > 12);
  update();
  window.addEventListener('scroll', update, { passive: true });
}

function initReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;
  if (!('IntersectionObserver' in window)) {
    items.forEach(el => el.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  items.forEach(el => io.observe(el));
}

// Soft gold spotlight that follows the cursor across cards
function initCardSpotlight() {
  document.addEventListener('pointermove', (e) => {
    const card = e.target.closest && e.target.closest('.card');
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    card.style.setProperty('--my', `${e.clientY - rect.top}px`);
  });
}

function initNavbar() {
  const hamburger = document.querySelector('.hamburger');
  const drawer = document.querySelector('.mobile-drawer');
  const overlay = document.querySelector('.mobile-overlay');
  const closeBtn = document.querySelector('.close-btn');

  if (hamburger && drawer && overlay && closeBtn) {
    const toggleDrawer = () => {
      const isOpen = drawer.classList.contains('open');
      if (isOpen) {
        drawer.classList.remove('open');
        overlay.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      } else {
        drawer.classList.add('open');
        overlay.classList.add('open');
        hamburger.setAttribute('aria-expanded', 'true');
      }
    };

    hamburger.addEventListener('click', toggleDrawer);
    closeBtn.addEventListener('click', toggleDrawer);
    overlay.addEventListener('click', toggleDrawer);

    // Mobile accordions
    const dropdownBtns = document.querySelectorAll('.mobile-dropdown-btn');
    dropdownBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const menu = btn.nextElementSibling;
        const isExpanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', !isExpanded);
        menu.classList.toggle('open');
      });
    });
  }
}

function initAffiliateTracking() {
  window.dataLayer = window.dataLayer || [];
  
  document.body.addEventListener('click', (e) => {
    const affiliateBtn = e.target.closest('[data-affiliate="true"]');
    if (affiliateBtn) {
      const productId = affiliateBtn.getAttribute('data-product-id');
      const merchant = affiliateBtn.getAttribute('data-merchant');
      const placement = affiliateBtn.getAttribute('data-placement');
      
      window.dataLayer.push({
        event: 'affiliate_click',
        product_id: productId,
        merchant: merchant,
        placement: placement,
        timestamp: new Date().toISOString()
      });
    }
  });
}
