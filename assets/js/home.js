document.addEventListener('DOMContentLoaded', () => {
  initCountUp();
  initHeroTilt();
  initExposureLab();
  initSpecDuel();
});

/* ---------- Hero stats count-up ---------- */
function initCountUp() {
  const els = document.querySelectorAll('[data-count]');
  const run = (el) => {
    const target = Number(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const start = performance.now();
    const dur = 1600;
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      el.textContent = Math.round(target * eased).toLocaleString() + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  setTimeout(() => els.forEach(run), 500);
}

/* ---------- Hero viewfinder tilts toward the cursor ---------- */
function initHeroTilt() {
  const vf = document.getElementById('hero-viewfinder');
  const hero = document.querySelector('.home-hero');
  if (!vf || !hero || window.matchMedia('(max-width: 1024px)').matches) return;
  hero.addEventListener('pointermove', (e) => {
    const r = hero.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    vf.style.setProperty('--ry', `${-6 + x * 10}deg`);
    vf.style.setProperty('--rx', `${3 - y * 8}deg`);
  });
  hero.addEventListener('pointerleave', () => {
    vf.style.removeProperty('--ry');
    vf.style.removeProperty('--rx');
  });
}

/* ---------- Exposure Lab ---------- */
function initExposureLab() {
  const apEl = document.getElementById('ap');
  if (!apEl) return;
  const shEl = document.getElementById('sh');
  const isoEl = document.getElementById('iso');

  const APERTURES = [1.4, 2, 2.8, 4, 5.6, 8, 11, 16];
  const SHUTTERS = [
    [1 / 4000, '1/4000'], [1 / 2000, '1/2000'], [1 / 1000, '1/1000'], [1 / 500, '1/500'],
    [1 / 250, '1/250'], [1 / 125, '1/125'], [1 / 60, '1/60'], [1 / 30, '1/30'],
    [1 / 15, '1/15'], [1 / 8, '1/8'], [1 / 4, '1/4']
  ];
  const ISOS = [100, 200, 400, 800, 1600, 3200, 6400, 12800];
  // Light level of the demo scene (EV100). Default settings meter to ~0.
  const SCENE_EV = 10;

  const PRESETS = {
    portrait: { ap: 0, sh: 3, iso: 0 },   // f/1.4 1/500 ISO100
    landscape: { ap: 5, sh: 8, iso: 0 },  // f/8 1/15 ISO100
    action: { ap: 3, sh: 1, iso: 5 },     // f/4 1/2000 ISO3200
    motion: { ap: 7, sh: 10, iso: 0 }     // f/16 1/4 ISO100
  };

  const scene = document.getElementById('lab-scene');
  const bg = document.getElementById('lab-bg');
  const noise = document.getElementById('lab-noise');
  const blurNode = document.getElementById('motion-blur-node');
  const needle = document.getElementById('meter-needle');
  const status = document.getElementById('meter-status');
  const clip = document.getElementById('lab-clip');
  const tags = document.getElementById('lab-tags');
  const presetBtns = document.querySelectorAll('[data-preset]');

  noise.style.backgroundImage = `url(${makeNoise(220)})`;

  const setFill = (el) => {
    const pct = ((el.value - el.min) / (el.max - el.min)) * 100;
    el.style.setProperty('--fill', `${pct}%`);
  };

  const fmtEv = (v) => (v > 0 ? '+' : '') + v.toFixed(1);

  function update() {
    const N = APERTURES[apEl.value];
    const [t, tLabel] = SHUTTERS[shEl.value];
    const iso = ISOS[isoEl.value];

    // Positive = overexposed
    const settingEv = Math.log2((N * N) / t) - Math.log2(iso / 100);
    const stops = Math.max(-4, Math.min(4, SCENE_EV - settingEv));

    // Depth of field: wider aperture → blurrier background
    const dof = Math.max(0, Math.min(14, 22 / N - 1.3));
    // Motion blur from slow shutter (horizontal)
    const motion = Math.max(0, Math.min(22, t * 240 - 1.5));
    // Grain from ISO
    const grain = Math.max(0, Math.log2(iso / 100)) / 7;
    const brightness = Math.max(0.12, Math.min(2.6, Math.pow(2, stops * 0.55)));

    bg.style.filter = `blur(${dof.toFixed(1)}px)`;
    blurNode.setAttribute('stdDeviation', `${motion.toFixed(1)} 0`);
    scene.style.filter = `${motion > 0.2 ? 'url(#motion-blur) ' : ''}brightness(${brightness.toFixed(2)}) contrast(${(1 + Math.max(0, stops) * 0.06).toFixed(2)}) saturate(${(1 - grain * 0.25).toFixed(2)})`;
    noise.style.opacity = (grain * 0.75).toFixed(2);

    // Readouts
    document.getElementById('ap-val').textContent = `f/${N}`;
    document.getElementById('sh-val').textContent = tLabel;
    document.getElementById('iso-val').textContent = iso;
    document.getElementById('ro-ap').textContent = N;
    document.getElementById('ro-sh').textContent = tLabel;
    document.getElementById('ro-iso').textContent = iso;
    document.getElementById('ro-ev').textContent = fmtEv(stops);

    document.getElementById('ap-hint').textContent =
      N <= 2 ? 'Razor-thin focus, dreamy bokeh.' : N <= 4 ? 'Moderate background blur.' : N <= 8 ? 'Most of the scene in focus.' : 'Front-to-back sharpness.';
    document.getElementById('sh-hint').textContent =
      t <= 1 / 1000 ? 'Freezes fast action mid-air.' : t <= 1 / 125 ? 'Freezes walking subjects.' : t <= 1 / 30 ? 'Handheld blur risk — steady hands.' : 'Tripod territory: silky motion.';
    document.getElementById('iso-hint').textContent =
      iso <= 200 ? 'Cleanest possible files.' : iso <= 1600 ? 'Clean on modern sensors.' : iso <= 6400 ? 'Visible grain, still usable.' : 'Heavy grain — low-light only.';

    // Meter
    const clamped = Math.max(-3, Math.min(3, stops));
    needle.style.left = `${((clamped + 3) / 6) * 100}%`;
    const off = Math.abs(stops) > 1;
    needle.classList.toggle('warn', off);
    clip.classList.toggle('show', stops > 1.5);
    clip.textContent = stops > 1.5 ? 'HIGHLIGHTS CLIPPING' : '';
    if (Math.abs(stops) <= 0.34) status.innerHTML = 'Balanced exposure <span>— nicely done.</span>';
    else if (stops > 0) status.innerHTML = `${fmtEv(stops)} EV over <span>— stop down, speed up or lower ISO.</span>`;
    else status.innerHTML = `${fmtEv(stops)} EV under <span>— open up, slow down or raise ISO.</span>`;

    // Effect tags
    const out = [];
    if (N <= 2) out.push(['Creamy bokeh']);
    if (N >= 8) out.push(['Deep focus']);
    if (t <= 1 / 1000) out.push(['Frozen motion']);
    if (t >= 1 / 30) out.push(['Motion blur', true]);
    if (iso <= 400) out.push(['Clean files']);
    if (iso >= 3200) out.push(['Visible grain', true]);
    if (iso >= 3200) out.push(['Best low-light pick: Lumia R9']);
    else if (t <= 1 / 1000) out.push(['Best AF for this: Aero X5']);
    else if (N >= 8) out.push(['Best for landscapes: Vertex D8']);
    tags.innerHTML = out.map(([txt, warn]) => `<span class="tag${warn ? ' warn' : ''}">${txt}</span>`).join('');

    [apEl, shEl, isoEl].forEach(setFill);
  }

  const clearPreset = () => presetBtns.forEach(b => b.setAttribute('aria-pressed', 'false'));

  [apEl, shEl, isoEl].forEach(el => el.addEventListener('input', () => { clearPreset(); update(); }));

  presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const p = PRESETS[btn.dataset.preset];
      apEl.value = p.ap; shEl.value = p.sh; isoEl.value = p.iso;
      clearPreset();
      btn.setAttribute('aria-pressed', 'true');
      update();
    });
  });

  update();
}

function makeNoise(size) {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d');
  const img = ctx.createImageData(size, size);
  for (let i = 0; i < img.data.length; i += 4) {
    const v = Math.random() * 255;
    img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
    img.data[i + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
  return c.toDataURL();
}

/* ---------- Spec Duel (radar) ---------- */
function initSpecDuel() {
  const svg = document.getElementById('radar');
  if (!svg || !window.appData) return;
  const cams = window.appData.cameras;
  const NS = 'http://www.w3.org/2000/svg';
  const AXES = [
    ['imageQuality', 'Image'],
    ['video', 'Video'],
    ['autofocus', 'Autofocus'],
    ['handling', 'Handling'],
    ['value', 'Value']
  ];
  const R = 120;
  let a = cams[0].id;
  let b = cams[1].id;

  const pt = (i, r) => {
    const ang = -Math.PI / 2 + (i * 2 * Math.PI) / AXES.length;
    return [Math.cos(ang) * r, Math.sin(ang) * r];
  };
  const el = (tag, attrs) => {
    const n = document.createElementNS(NS, tag);
    Object.entries(attrs).forEach(([k, v]) => n.setAttribute(k, v));
    return n;
  };

  // Static grid
  [0.25, 0.5, 0.75, 1].forEach(f => {
    svg.appendChild(el('polygon', { class: 'grid-ring', points: AXES.map((_, i) => pt(i, R * f).join(',')).join(' ') }));
  });
  AXES.forEach(([, label], i) => {
    const [x, y] = pt(i, R);
    svg.appendChild(el('line', { class: 'axis', x1: 0, y1: 0, x2: x, y2: y }));
    const [lx, ly] = pt(i, R + 26);
    const t = el('text', { class: 'label', x: lx, y: ly + 4, 'text-anchor': Math.abs(lx) < 5 ? 'middle' : lx > 0 ? 'start' : 'end' });
    t.textContent = label;
    svg.appendChild(t);
  });
  const polyB = el('polygon', { class: 'poly poly-b', points: AXES.map(() => '0,0').join(' ') });
  const polyA = el('polygon', { class: 'poly poly-a', points: AXES.map(() => '0,0').join(' ') });
  svg.appendChild(polyB);
  svg.appendChild(polyA);

  const pointsFor = (cam) => AXES.map(([k], i) => pt(i, (cam.scores[k] / 10) * R).map(n => n.toFixed(1)).join(',')).join(' ');
  const avg = (cam) => AXES.reduce((s, [k]) => s + cam.scores[k], 0) / AXES.length;

  function renderPickers() {
    [['pick-a', 'a'], ['pick-b', 'b']].forEach(([id, side]) => {
      const wrap = document.getElementById(id);
      const current = side === 'a' ? a : b;
      const other = side === 'a' ? b : a;
      wrap.innerHTML = cams.map(c =>
        `<button class="chip" data-id="${c.id}" aria-pressed="${c.id === current}" ${c.id === other ? 'disabled style="opacity:.35;cursor:not-allowed"' : ''}>${c.name.replace(/ (Cinema|Mirrorless|Pro)$/, '')}</button>`
      ).join('');
      wrap.querySelectorAll('button:not([disabled])').forEach(btn => {
        btn.addEventListener('click', () => {
          if (side === 'a') a = btn.dataset.id; else b = btn.dataset.id;
          render();
        });
      });
    });
  }

  function render() {
    const A = cams.find(c => c.id === a);
    const B = cams.find(c => c.id === b);
    renderPickers();
    // Animate polygons via a rAF tween of their points
    tweenPoly(polyA, pointsFor(A));
    tweenPoly(polyB, pointsFor(B));

    document.getElementById('legend-a').textContent = A.name;
    document.getElementById('legend-b').textContent = B.name;
    document.getElementById('duel-a-name').textContent = `${A.name.split(' ')[0]} avg score`;
    document.getElementById('duel-a-avg').textContent = `${avg(A).toFixed(1)} vs ${avg(B).toFixed(1)}`;

    const num = (s) => parseFloat(String(s).replace(/[^\d.]/g, ''));
    const rows = [
      ['Price', `$${A.price.toLocaleString()}`, `$${B.price.toLocaleString()}`, A.price < B.price ? 'a' : A.price > B.price ? 'b' : ''],
      ['Sensor', A.specs.sensorSize, B.specs.sensorSize, ''],
      ['Resolution', A.specs.resolution, B.specs.resolution, num(A.specs.resolution) > num(B.specs.resolution) ? 'a' : num(A.specs.resolution) < num(B.specs.resolution) ? 'b' : ''],
      ['Max video', A.specs.maxVideo, B.specs.maxVideo, ''],
      ['Weight', A.specs.weight, B.specs.weight, num(A.specs.weight) < num(B.specs.weight) ? 'a' : num(A.specs.weight) > num(B.specs.weight) ? 'b' : ''],
      ['User rating', `${A.rating} ★`, `${B.rating} ★`, A.rating > B.rating ? 'a' : A.rating < B.rating ? 'b' : '']
    ];
    document.getElementById('duel-table').innerHTML = rows.map(([k, va, vb, w]) =>
      `<tr><th scope="row">${k}</th><td class="a${w === 'a' ? ' win' : ''}">${va}</td><td class="b${w === 'b' ? ' win' : ''}">${vb}</td></tr>`
    ).join('');
  }

  function tweenPoly(poly, target) {
    const from = poly.getAttribute('points').split(' ').map(p => p.split(',').map(Number));
    const to = target.split(' ').map(p => p.split(',').map(Number));
    const start = performance.now();
    const dur = 700;
    cancelAnimationFrame(poly._raf);
    const step = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const e = 1 - Math.pow(1 - p, 3);
      poly.setAttribute('points', from.map(([x, y], i) => `${(x + (to[i][0] - x) * e).toFixed(1)},${(y + (to[i][1] - y) * e).toFixed(1)}`).join(' '));
      if (p < 1) poly._raf = requestAnimationFrame(step);
    };
    poly._raf = requestAnimationFrame(step);
  }

  document.getElementById('duel-compare').addEventListener('click', () => {
    try { sessionStorage.setItem('frameline_compare', JSON.stringify([a, b])); } catch (e) { /* storage unavailable */ }
  });

  // Draw once the section scrolls into view so the polygons grow in
  const io = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) { render(); io.disconnect(); }
  }, { threshold: 0.3 });
  io.observe(svg);
  renderPickers();
}
