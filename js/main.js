/* ════════════════════════════════════════════════════
   UNDANGAN DIGITAL — main.js  (Phase 3)
   ════════════════════════════════════════════════════ */

'use strict';


/* ── Particle System ────────────────────────────────── */

class GhibliParticles {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx    = canvas.getContext('2d');
    this.pool   = [];
    this.raf    = null;
    this.W = this.H = 0;
    this.scrollY = 0;
    this.pageH   = 1;
    this.isMain  = false; // true after invitation opened
    this._onResize = () => this._resize();
    this._onScroll = () => {
      this.scrollY = window.scrollY || 0;
      this.pageH = Math.max(1, document.body.scrollHeight - window.innerHeight);
    };
    window.addEventListener('resize', this._onResize);
    window.addEventListener('scroll', this._onScroll, { passive: true });
    this._resize();
    this._populateCover();
    this._tick();
  }

  _resize() {
    this.W = this.canvas.width  = window.innerWidth;
    this.H = this.canvas.height = window.innerHeight;
  }

  // Scroll progress 0–1 through the page
  get progress() {
    return this.isMain ? Math.min(1, this.scrollY / this.pageH) : 0;
  }

  // ── Petal (cherry blossom) ───────────────────────
  _makePetal() {
    const pinks = [[232, 180, 184], [240, 190, 195], [220, 160, 170], [235, 200, 200]];
    return {
      type: 'petal',
      x: Math.random() * this.W,
      y: -10 - Math.random() * this.H * 0.3,
      size: Math.random() * 5 + 3,
      alpha: Math.random() * 0.18 + 0.06,
      vy: Math.random() * 0.4 + 0.15,
      vx: Math.random() * 0.3 - 0.05,
      rot: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.02,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: Math.random() * 0.015 + 0.008,
      color: pinks[Math.floor(Math.random() * pinks.length)],
    };
  }

  // ── Leaf ─────────────────────────────────────────
  _makeLeaf() {
    const greens = [[139, 168, 136], [120, 150, 110], [160, 180, 140], [100, 140, 100]];
    return {
      type: 'leaf',
      x: Math.random() * this.W,
      y: -10 - Math.random() * this.H * 0.2,
      size: Math.random() * 7 + 4,
      alpha: Math.random() * 0.14 + 0.04,
      vy: Math.random() * 0.3 + 0.1,
      vx: Math.random() * 0.2 + 0.05,
      rot: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.015,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: Math.random() * 0.01 + 0.005,
      color: greens[Math.floor(Math.random() * greens.length)],
    };
  }

  // ── Golden Dust Mote ─────────────────────────────
  _makeDust() {
    return {
      type: 'dust',
      x: Math.random() * this.W,
      y: Math.random() * this.H,
      r: Math.random() * 1.2 + 0.3,
      alpha: Math.random() * 0.15 + 0.04,
      vy: -(Math.random() * 0.15 + 0.03),
      vx: (Math.random() - 0.5) * 0.1,
      phase: Math.random() * Math.PI * 2,
      freq: Math.random() * 0.015 + 0.005,
      color: [196, 170, 110],
    };
  }

  // ── Firefly ──────────────────────────────────────
  _makeFirefly() {
    return {
      type: 'firefly',
      x: Math.random() * this.W,
      y: Math.random() * this.H,
      r: Math.random() * 2 + 1,
      alpha: 0,
      maxAlpha: Math.random() * 0.35 + 0.1,
      vy: (Math.random() - 0.5) * 0.15,
      vx: (Math.random() - 0.5) * 0.2,
      phase: Math.random() * Math.PI * 2,
      freq: Math.random() * 0.02 + 0.008,
      color: [232, 208, 110],
      glowSize: Math.random() * 6 + 3,
    };
  }

  // ── Lantern Glow ─────────────────────────────────
  _makeLantern() {
    return {
      type: 'lantern',
      x: Math.random() * this.W,
      y: Math.random() * this.H,
      r: Math.random() * 4 + 3,
      alpha: 0,
      maxAlpha: Math.random() * 0.08 + 0.03,
      vy: -(Math.random() * 0.08 + 0.02),
      vx: (Math.random() - 0.5) * 0.05,
      phase: Math.random() * Math.PI * 2,
      freq: Math.random() * 0.008 + 0.003,
      color: [232, 200, 120],
      glowSize: Math.random() * 15 + 8,
    };
  }

  _populateCover() {
    const isMobile = this.W < 600;
    const petalCount = isMobile ? 12 : 22;
    const leafCount  = isMobile ? 4 : 8;
    for (let i = 0; i < petalCount; i++) {
      const p = this._makePetal();
      p.y = Math.random() * this.H; // spread initially
      this.pool.push(p);
    }
    for (let i = 0; i < leafCount; i++) {
      const l = this._makeLeaf();
      l.y = Math.random() * this.H;
      this.pool.push(l);
    }
  }

  switchToMain() {
    this.isMain = true;
    this.pool = [];
    this._onScroll();
    const isMobile = this.W < 600;
    // Populate all types — visibility controlled by scroll progress
    const counts = isMobile
      ? { petal: 8, leaf: 3, dust: 10, firefly: 12, lantern: 3 }
      : { petal: 16, leaf: 6, dust: 18, firefly: 22, lantern: 5 };

    for (let i = 0; i < counts.petal; i++) { const p = this._makePetal(); p.y = Math.random() * this.H; this.pool.push(p); }
    for (let i = 0; i < counts.leaf; i++) { const l = this._makeLeaf(); l.y = Math.random() * this.H; this.pool.push(l); }
    for (let i = 0; i < counts.dust; i++) this.pool.push(this._makeDust());
    for (let i = 0; i < counts.firefly; i++) this.pool.push(this._makeFirefly());
    for (let i = 0; i < counts.lantern; i++) this.pool.push(this._makeLantern());
  }

  _drawPetal(ctx, p) {
    const prog = this.progress;
    // Fade out petals after 40% scroll
    const vis = Math.max(0, 1 - prog * 2.5);
    if (vis <= 0) return;

    p.wobble += p.wobbleSpeed;
    p.rot += p.rotSpeed;
    p.y += p.vy;
    p.x += p.vx + Math.sin(p.wobble) * 0.4;
    if (p.y > this.H + 10) { p.y = -10; p.x = Math.random() * this.W; }
    if (p.x > this.W + 10) p.x = -10;
    if (p.x < -10) p.x = this.W + 10;

    const a = p.alpha * vis;
    const [r, g, b] = p.color;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.beginPath();
    // Petal shape
    ctx.moveTo(0, -p.size);
    ctx.bezierCurveTo(p.size * 0.6, -p.size * 0.6, p.size * 0.6, p.size * 0.3, 0, p.size * 0.5);
    ctx.bezierCurveTo(-p.size * 0.6, p.size * 0.3, -p.size * 0.6, -p.size * 0.6, 0, -p.size);
    ctx.fillStyle = `rgba(${r},${g},${b},${a.toFixed(3)})`;
    ctx.fill();
    ctx.restore();
  }

  _drawLeaf(ctx, p) {
    const prog = this.progress;
    const vis = Math.max(0, 1 - prog * 2.2);
    if (vis <= 0) return;

    p.wobble += p.wobbleSpeed;
    p.rot += p.rotSpeed;
    p.y += p.vy;
    p.x += p.vx + Math.sin(p.wobble) * 0.3;
    if (p.y > this.H + 10) { p.y = -10; p.x = Math.random() * this.W; }

    const a = p.alpha * vis;
    const [r, g, b] = p.color;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.beginPath();
    // Leaf shape
    ctx.moveTo(0, -p.size);
    ctx.bezierCurveTo(p.size * 0.8, -p.size * 0.3, p.size * 0.5, p.size * 0.6, 0, p.size);
    ctx.bezierCurveTo(-p.size * 0.5, p.size * 0.6, -p.size * 0.8, -p.size * 0.3, 0, -p.size);
    ctx.fillStyle = `rgba(${r},${g},${b},${a.toFixed(3)})`;
    ctx.fill();
    // Leaf vein
    ctx.beginPath();
    ctx.moveTo(0, -p.size * 0.8);
    ctx.lineTo(0, p.size * 0.8);
    ctx.strokeStyle = `rgba(${r-20},${g-20},${b-20},${(a * 0.5).toFixed(3)})`;
    ctx.lineWidth = 0.3;
    ctx.stroke();
    ctx.restore();
  }

  _drawDust(ctx, p) {
    const prog = this.progress;
    // Dust visible 15%–65% scroll
    const vis = prog < 0.15 ? (prog / 0.15) : prog > 0.65 ? Math.max(0, 1 - (prog - 0.65) / 0.2) : 1;
    if (vis <= 0) return;

    p.phase += p.freq;
    p.y += p.vy;
    p.x += p.vx;
    if (p.y < -4) { p.y = this.H + 4; p.x = Math.random() * this.W; }
    if (p.x < -4) p.x = this.W + 4;
    if (p.x > this.W + 4) p.x = -4;

    const a = p.alpha * vis * (0.4 + 0.6 * Math.abs(Math.sin(p.phase)));
    const [r, g, b] = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${r},${g},${b},${a.toFixed(3)})`;
    ctx.fill();
  }

  _drawFirefly(ctx, p) {
    const prog = this.progress;
    // Fireflies visible after 40% scroll
    const vis = prog < 0.4 ? 0 : Math.min(1, (prog - 0.4) / 0.2);
    if (vis <= 0) { p.alpha = 0; return; }

    p.phase += p.freq;
    p.y += p.vy;
    p.x += p.vx + Math.sin(p.phase * 3) * 0.1;
    if (p.y < -10 || p.y > this.H + 10) { p.vy *= -1; }
    if (p.x < -10 || p.x > this.W + 10) { p.vx *= -1; }

    // Pulse alpha
    const pulse = 0.5 + 0.5 * Math.sin(p.phase);
    p.alpha = p.maxAlpha * vis * pulse;

    const [r, g, b] = p.color;
    // Glow
    const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.glowSize);
    grad.addColorStop(0, `rgba(${r},${g},${b},${(p.alpha * 0.4).toFixed(3)})`);
    grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.glowSize, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();
    // Core
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${r},${g},${b},${p.alpha.toFixed(3)})`;
    ctx.fill();
  }

  _drawLantern(ctx, p) {
    const prog = this.progress;
    // Lanterns visible after 60%
    const vis = prog < 0.6 ? 0 : Math.min(1, (prog - 0.6) / 0.2);
    if (vis <= 0) { p.alpha = 0; return; }

    p.phase += p.freq;
    p.y += p.vy;
    p.x += p.vx;
    if (p.y < -20) { p.y = this.H + 20; p.x = Math.random() * this.W; }

    const pulse = 0.7 + 0.3 * Math.sin(p.phase);
    p.alpha = p.maxAlpha * vis * pulse;

    const [r, g, b] = p.color;
    const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.glowSize);
    grad.addColorStop(0, `rgba(${r},${g},${b},${(p.alpha * 0.6).toFixed(3)})`);
    grad.addColorStop(0.5, `rgba(${r},${g},${b},${(p.alpha * 0.2).toFixed(3)})`);
    grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.glowSize, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();
  }

  _tick() {
    const { ctx, W, H } = this;
    ctx.clearRect(0, 0, W, H);
    for (const p of this.pool) {
      switch (p.type) {
        case 'petal':   this._drawPetal(ctx, p);   break;
        case 'leaf':    this._drawLeaf(ctx, p);    break;
        case 'dust':    this._drawDust(ctx, p);    break;
        case 'firefly': this._drawFirefly(ctx, p); break;
        case 'lantern': this._drawLantern(ctx, p); break;
      }
    }
    this.raf = requestAnimationFrame(() => this._tick());
  }

  destroy() {
    cancelAnimationFrame(this.raf);
    window.removeEventListener('resize', this._onResize);
    window.removeEventListener('scroll', this._onScroll);
  }
}


/* ── Ripple ─────────────────────────────────────────── */

function spawnRipple(btn, e) {
  const rect = btn.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height) * 2.2;
  const el   = document.createElement('span');
  el.style.cssText = [
    'position:absolute',
    `width:${size}px`, `height:${size}px`,
    `left:${(e.clientX - rect.left) - size / 2}px`,
    `top:${(e.clientY - rect.top) - size / 2}px`,
    'border-radius:50%', 'background:rgba(255,255,255,0.25)',
    'transform:scale(0)', 'animation:rippleAnim 0.65s ease-out forwards',
    'pointer-events:none', 'z-index:2',
  ].join(';');
  btn.appendChild(el);
  el.addEventListener('animationend', () => el.remove());
}


/* ── Guest Name ─────────────────────────────────────── */

function resolveGuestName() {
  try {
    const raw = new URLSearchParams(window.location.search).get('to');
    return raw ? decodeURIComponent(raw.replace(/\+/g, ' ')).trim() : null;
  } catch { return null; }
}


/* ── Config Renderer ────────────────────────────────── */

function renderConfig() {
  const w = WEDDING;

  /* Cover */
  document.getElementById('nameGroom').textContent     = w.groom;
  document.getElementById('nameBride').textContent     = w.bride;
  document.getElementById('coverDate').setAttribute('datetime', w.dateISO);
  document.getElementById('coverDayName').textContent  = w.dayName;
  document.getElementById('coverDateFull').textContent = w.dateFull;
  document.getElementById('btnOpen').setAttribute(
    'aria-label', `Buka undangan pernikahan ${w.groom} dan ${w.bride}`
  );

  /* Meta */
  const title = `Undangan Pernikahan — ${w.groom} & ${w.bride}`;
  document.title = title;
  document.getElementById('ogTitle').setAttribute('content', title);
  document.getElementById('metaDesc').setAttribute(
    'content', `Undangan Pernikahan ${w.groom} & ${w.bride} — ${w.dateFull}, ${w.venueCity}.`
  );
  document.getElementById('ogDesc').setAttribute(
    'content', `Dengan penuh kebahagiaan, kami mengundang Anda untuk hadir dalam pernikahan ${w.groom} & ${w.bride}.`
  );

  /* Couple section */
  document.getElementById('profileGroom').textContent = w.groom;
  document.getElementById('profileBride').textContent = w.bride;
  const gpEl = document.getElementById('profileGroomParents');
  const bpEl = document.getElementById('profileBrideParents');
  if (w.groomParents) { gpEl.textContent = w.groomParents; } else { gpEl.hidden = true; }
  if (w.brideParents) { bpEl.textContent = w.brideParents; } else { bpEl.hidden = true; }

  /* Events */
  const dateLabel = `${w.dayName}, ${w.dateFull}`;
  document.getElementById('akadTime').textContent     = w.akad.time;
  document.getElementById('akadDate').textContent     = dateLabel;
  document.getElementById('akadVenue').textContent    = w.akad.venue;
  document.getElementById('akadAddress').textContent  = w.akad.address;
  document.getElementById('akadMaps').href            = w.akad.mapsUrl || w.mapsUrl;
  document.getElementById('resepsiTime').textContent    = w.resepsi.time;
  document.getElementById('resepsiDate').textContent    = dateLabel;
  document.getElementById('resepsiVenue').textContent   = w.resepsi.venue;
  document.getElementById('resepsiAddress').textContent = w.resepsi.address;
  document.getElementById('resepsiMaps').href           = w.resepsi.mapsUrl || w.mapsUrl;

  /* Footer */
  const footerEl = document.getElementById('footerNames');
  footerEl.innerHTML = `<span class="footer-name">${escapeHtml(w.groom)}</span><span class="footer-amp">&</span><span class="footer-name">${escapeHtml(w.bride)}</span>`;
}


/* ── Gallery Renderer ───────────────────────────────── */

function renderGallery() {
  const grid   = document.getElementById('galleryGrid');
  if (!grid) return;
  const photos = (WEDDING.gallery || []).slice(0, 5);
  const count  = 5;

  for (let i = 0; i < count; i++) {
    const src = photos[i] || null;
    const fig = document.createElement('figure');
    fig.className = 'gallery-item reveal';
    fig.style.setProperty('--reveal-delay', `${i * 0.1}s`);
    fig.setAttribute('role', 'listitem');
    fig.setAttribute('aria-label', `Foto ${i + 1}`);

    if (src) {
      const img = document.createElement('img');
      img.src    = src;
      img.alt    = `Foto pre-wedding ${i + 1}`;
      img.loading = 'lazy';
      img.addEventListener('load',  () => img.classList.add('loaded'));
      img.addEventListener('error', () => img.remove()); // fall through to placeholder
      fig.appendChild(img);
    }

    const ph = document.createElement('div');
    ph.className = 'gallery-placeholder';
    ph.setAttribute('aria-hidden', 'true');
    fig.appendChild(ph);

    grid.appendChild(fig);
  }
}


/* ── Gift Renderer ──────────────────────────────────── */

function formatAccountNumber(num) {
  return String(num).replace(/\D/g, '').replace(/(.{4})(?=.)/g, '$1 ');
}

function renderGift() {
  const container = document.getElementById('giftCards');
  if (!container) return;
  const accounts = WEDDING.bankAccounts || [];

  if (!accounts.length) {
    container.closest('.gift-section').hidden = true;
    return;
  }

  accounts.forEach((acc, i) => {
    const card = document.createElement('div');
    card.className = 'gift-card reveal';
    card.style.setProperty('--reveal-delay', `${i * 0.15}s`);

    card.innerHTML = `
      <p class="gift-bank">${acc.bank}</p>
      <div class="gift-divider" aria-hidden="true"></div>
      <p class="gift-number">${formatAccountNumber(acc.accountNumber)}</p>
      <p class="gift-name">a.n. ${acc.accountName}</p>
      <button
        class="gift-copy-btn"
        type="button"
        data-copy="${acc.accountNumber}"
        aria-label="Salin nomor rekening ${acc.bank} atas nama ${acc.accountName}">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
             stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
        </svg>
        Salin Rekening
      </button>
    `;
    container.appendChild(card);
  });
}


/* ── Copy to Clipboard + Toast ──────────────────────── */

let toastTimer = null;

function showCopyToast(message = 'Berhasil Disalin') {
  let toast = document.querySelector('.copy-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'copy-toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    document.body.appendChild(toast);
  }
  toast.textContent = message;

  clearTimeout(toastTimer);
  toast.classList.remove('show');

  // Force reflow for re-trigger
  toast.offsetHeight; // eslint-disable-line no-unused-expressions
  toast.classList.add('show');

  toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}

function setupCopyButtons() {
  document.getElementById('giftCards')?.addEventListener('click', async (e) => {
    const btn = e.target.closest('.gift-copy-btn');
    if (!btn) return;

    const text = btn.dataset.copy;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Fallback for browsers without Clipboard API
      const ta = Object.assign(document.createElement('textarea'), {
        value: text,
        style: 'position:absolute;left:-9999px;opacity:0;',
      });
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
    }

    btn.classList.add('copied');
    setTimeout(() => btn.classList.remove('copied'), 1600);
    showCopyToast('Berhasil Disalin ✓');
  });
}


/* ── Scroll Animations ──────────────────────────────── */

function setupScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -28px 0px' }
  );
  document.querySelectorAll('#main .reveal').forEach((el) => observer.observe(el));

  // Also observe sections and cards for stagger animations
  document.querySelectorAll('#main .inv-section, #main .event-card, #main .gift-card, #main .countdown').forEach((el) => observer.observe(el));
}


/* ── Countdown ──────────────────────────────────────── */

function startCountdown() {
  const target = new Date(WEDDING.countdownISO).getTime();
  const cdEl   = document.getElementById('countdown');
  const doneEl = document.getElementById('countdownDone');
  const els    = {
    days:  document.getElementById('cdDays'),
    hours: document.getElementById('cdHours'),
    mins:  document.getElementById('cdMins'),
    secs:  document.getElementById('cdSecs'),
  };

  const pad = (n) => String(Math.max(0, n)).padStart(2, '0');

  function tick(el, value) {
    if (el.textContent === value) return;
    el.textContent = value;
    el.classList.remove('cd-tick');
    el.offsetHeight; // eslint-disable-line no-unused-expressions
    el.classList.add('cd-tick');
    el.addEventListener('animationend', () => el.classList.remove('cd-tick'), { once: true });
  }

  function update() {
    const diff = target - Date.now();
    if (diff <= 0) {
      cdEl.hidden = true;
      doneEl.removeAttribute('hidden');
      return;
    }
    tick(els.days,  pad(Math.floor(diff / 86400000)));
    tick(els.hours, pad(Math.floor((diff % 86400000) / 3600000)));
    tick(els.mins,  pad(Math.floor((diff % 3600000) / 60000)));
    tick(els.secs,  pad(Math.floor((diff % 60000) / 1000)));
  }

  update();
  setInterval(update, 1000);
}


/* ── RSVP Form ──────────────────────────────────────── */

function setupRSVP(reloadWishes) {
  const form    = document.getElementById('rsvpForm');
  const success = document.getElementById('rsvpSuccess');
  const errorEl = document.getElementById('rsvpError');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (errorEl) errorEl.hidden = true;

    const name       = document.getElementById('rsvpName').value.trim();
    const attendance = form.querySelector('input[name="attendance"]:checked')?.value;
    const message    = document.getElementById('rsvpMessage').value.trim();

    if (!name) { document.getElementById('rsvpName').focus(); return; }

    const submitBtn = form.querySelector('.btn-submit');
    submitBtn.disabled = true;
    submitBtn.querySelector('.btn-label').textContent = 'Mengirim…';

    try {
      const res = await fetch(`${SUPABASE.url}/rest/v1/rsvp`, {
        method: 'POST',
        headers: {
          'Content-Type':  'application/json',
          'apikey':        SUPABASE.key,
          'Authorization': `Bearer ${SUPABASE.key}`,
          'Prefer':        'return=minimal',
        },
        body: JSON.stringify({
          name,
          attendance: attendance || 'hadir',
          message:    message || null,
        }),
      });

      if (!res.ok) throw new Error(res.statusText);

      form.hidden = true;
      success.removeAttribute('hidden');
      if (reloadWishes) reloadWishes();
    } catch {
      submitBtn.disabled = false;
      submitBtn.querySelector('.btn-label').textContent = 'Kirim';
      if (errorEl) {
        errorEl.hidden = false;
        errorEl.textContent = 'Gagal mengirim. Silakan coba lagi.';
      }
    }
  });
}


/* ── Wishes List ───────────────────────────────────── */

function setupWishes() {
  const container = document.getElementById('wishesItems');
  const loadMoreBtn = document.getElementById('wishesLoadMore');
  if (!container) return;

  let offset = 0;
  const limit = 10;

  function renderSkeleton() {
    for (let i = 0; i < 3; i++) {
      const el = document.createElement('div');
      el.className = 'wish-skeleton';
      el.innerHTML = '<div class="skel-line"></div><div class="skel-line"></div>';
      container.appendChild(el);
    }
  }

  function clearSkeleton() {
    container.querySelectorAll('.wish-skeleton').forEach(el => el.remove());
  }

  function renderWish(w) {
    const card = document.createElement('div');
    card.className = 'wish-card';

    const badgeClass = w.attendance === 'hadir' ? 'wish-badge wish-badge--hadir' : 'wish-badge';
    const badgeText = w.attendance === 'hadir' ? 'Hadir' : 'Tidak Hadir';

    card.innerHTML = `
      <div class="wish-header">
        <span class="wish-name">${escapeHtml(w.name)}</span>
        <span class="${badgeClass}">${badgeText}</span>
      </div>
      ${w.message ? `<p class="wish-message">${escapeHtml(w.message)}</p>` : ''}
    `;
    container.appendChild(card);
  }

  async function loadWishes(append) {
    if (!append) {
      container.innerHTML = '';
      renderSkeleton();
    }

    try {
      const res = await fetch(
        `${SUPABASE.url}/rest/v1/rsvp?select=name,attendance,message&order=created_at.desc&offset=${offset}&limit=${limit}`,
        {
          headers: {
            'apikey': SUPABASE.key,
            'Authorization': `Bearer ${SUPABASE.key}`,
          },
        }
      );

      if (!res.ok) throw new Error(res.statusText);
      const data = await res.json();

      clearSkeleton();

      if (!data.length && offset === 0) {
        container.innerHTML = '<p class="wish-empty">Jadilah yang pertama mengirim ucapan.</p>';
        return;
      }

      data.forEach(renderWish);

      if (data.length >= limit) {
        offset += limit;
        loadMoreBtn.removeAttribute('hidden');
      } else {
        loadMoreBtn.hidden = true;
      }
    } catch {
      clearSkeleton();
      if (offset === 0) {
        container.innerHTML = '<p class="wish-empty">Belum ada ucapan.</p>';
      }
    }
  }

  loadMoreBtn.addEventListener('click', () => loadWishes(true));

  // Expose reload for after RSVP submit
  return () => { offset = 0; loadWishes(false); };
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}


/* ── Floating Navigation ────────────────────────────── */

function setupFloatNav() {
  const navEl    = document.getElementById('floatNav');
  const navItems = navEl.querySelectorAll('.nav-item');
  navEl.removeAttribute('hidden');

  // Smooth scroll on click
  navItems.forEach((item) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById(item.dataset.target);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // Active section tracking
  const sectionIds = ['sec-couple', 'sec-events', 'sec-gallery', 'sec-rsvp'];

  const setActive = (id) => {
    navItems.forEach((item) =>
      item.classList.toggle('is-active', item.dataset.target === id)
    );
  };

  setActive('sec-couple'); // default on open

  const sectionObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    },
    { rootMargin: '-25% 0px -65% 0px', threshold: 0 }
  );

  sectionIds.forEach((id) => {
    const el = document.getElementById(id);
    if (el) sectionObs.observe(el);
  });
}


/* ── Audio ──────────────────────────────────────────── */

function setupAudio() {
  if (!WEDDING.audioSrc) return null;

  const audio    = document.getElementById('bgAudio');
  const musicBtn = document.getElementById('musicBtn');
  audio.src = WEDDING.audioSrc;
  musicBtn.removeAttribute('hidden');

  function setPlaying(state) {
    musicBtn.classList.toggle('playing', state);
    musicBtn.setAttribute('aria-label', state ? 'Pause musik' : 'Putar musik');
  }

  musicBtn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play().catch(() => {});
      setPlaying(true);
    } else {
      audio.pause();
      setPlaying(false);
    }
  });

  // Return auto-play trigger for invitation open
  return () => audio.play().then(() => setPlaying(true)).catch(() => {});
}



/* ── Lightbox ──────────────────────────────────────── */

function setupLightbox() {
  const lightbox  = document.getElementById('lightbox');
  const lbImg     = document.getElementById('lightboxImg');
  const counter   = document.getElementById('lightboxCounter');
  const closeBtn  = lightbox.querySelector('.lightbox-close');
  const prevBtn   = lightbox.querySelector('.lightbox-prev');
  const nextBtn   = lightbox.querySelector('.lightbox-next');
  const photos    = (WEDDING.gallery || []).slice(0, 5);
  let current     = 0;

  function show(index) {
    current = index;
    lbImg.classList.remove('lb-loaded');
    lbImg.src = photos[index];
    lbImg.onload = () => lbImg.classList.add('lb-loaded');
    counter.textContent = `${index + 1} / ${photos.length}`;
    prevBtn.style.visibility = index === 0 ? 'hidden' : 'visible';
    nextBtn.style.visibility = index === photos.length - 1 ? 'hidden' : 'visible';
  }

  function open(index) {
    show(index);
    lightbox.removeAttribute('hidden');
    lightbox.setAttribute('aria-hidden', 'false');
    lightbox.classList.remove('is-closing');
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function close() {
    lightbox.classList.remove('is-open');
    lightbox.classList.add('is-closing');
    setTimeout(() => {
      lightbox.hidden = true;
      lightbox.setAttribute('aria-hidden', 'true');
      lightbox.classList.remove('is-closing');
      document.body.style.overflow = 'auto';
      document.body.style.overflowX = 'hidden';
    }, 300);
  }

  // Click gallery items to open
  document.getElementById('galleryGrid')?.addEventListener('click', (e) => {
    const item = e.target.closest('.gallery-item');
    if (!item) return;
    const items = [...document.querySelectorAll('.gallery-item')];
    const idx = items.indexOf(item);
    if (idx >= 0 && photos[idx]) open(idx);
  });

  closeBtn.addEventListener('click', close);
  lightbox.querySelector('.lightbox-backdrop').addEventListener('click', close);
  prevBtn.addEventListener('click', () => { if (current > 0) show(current - 1); });
  nextBtn.addEventListener('click', () => { if (current < photos.length - 1) show(current + 1); });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (lightbox.hidden) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft' && current > 0) show(current - 1);
    if (e.key === 'ArrowRight' && current < photos.length - 1) show(current + 1);
  });

  // Swipe support for mobile
  let touchStartX = 0;
  lightbox.addEventListener('touchstart', (e) => { touchStartX = e.changedTouches[0].clientX; }, { passive: true });
  lightbox.addEventListener('touchend', (e) => {
    const diff = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(diff) > 50) {
      if (diff > 0 && current > 0) show(current - 1);
      if (diff < 0 && current < photos.length - 1) show(current + 1);
    }
  });
}


/* ── Dark Mode ─────────────────────────────────────── */

function setupDarkMode() {
  const btn = document.getElementById('themeBtn');
  const saved = localStorage.getItem('theme');

  function apply(theme, animate) {
    if (animate) {
      document.documentElement.classList.add('theme-transitioning');
      setTimeout(() => document.documentElement.classList.remove('theme-transitioning'), 600);
    }
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    btn.setAttribute('aria-label', theme === 'dark' ? 'Mode terang' : 'Mode gelap');
  }

  // Initialize from saved preference or system preference
  if (saved) {
    apply(saved);
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    apply('dark');
  }

  btn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    apply(current === 'dark' ? 'light' : 'dark', true);
  });
}


/* ── Floating Ambient Ornaments ─────────────────────── */

function spawnFloatingOrnaments() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // Ghibli nature shapes
  const leaf = '<svg viewBox="0 0 20 20" fill="none"><path d="M10 2C14 5 16 10 10 18C4 10 6 5 10 2Z" stroke="currentColor" stroke-width="0.6" fill="currentColor" opacity="0.3"/><path d="M10 4L10 16" stroke="currentColor" stroke-width="0.3" opacity="0.4"/></svg>';
  const petal = '<svg viewBox="0 0 16 16" fill="none"><path d="M8 1C11 4 12 8 8 15C4 8 5 4 8 1Z" fill="currentColor" opacity="0.25"/></svg>';
  const dot = '<svg viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="2.5" fill="currentColor" opacity="0.4"/></svg>';
  const firefly = '<svg viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="2" fill="currentColor" opacity="0.5"/><circle cx="8" cy="8" r="5" fill="currentColor" opacity="0.08"/></svg>';

  const isMobile = window.innerWidth < 600;

  const map = [
    ['sec-couple', [
      { svg: leaf, sz: 18, t: '12%', l: '6%', a: 'floatA', d: '7s', dl: '0s', o: 0.12, clr: '#8BA888' },
      { svg: petal, sz: 12, t: '55%', r: '8%', a: 'floatB', d: '6s', dl: '1s', o: 0.15, clr: '#E8B4B8' },
      { svg: leaf, sz: 14, b: '18%', l: '10%', a: 'floatC', d: '8s', dl: '2s', o: 0.1, clr: '#8BA888' },
    ]],
    ['sec-events', [
      { svg: petal, sz: 10, t: '18%', r: '10%', a: 'floatA', d: '5.5s', dl: '0.5s', o: 0.12, clr: '#E8B4B8' },
      { svg: leaf, sz: 16, b: '22%', l: '5%', a: 'floatB', d: '7s', dl: '1.5s', o: 0.1, clr: '#8BA888' },
    ]],
    ['sec-gallery', [
      { svg: dot, sz: 10, t: '8%', r: '4%', a: 'floatC', d: '6.5s', dl: '0s', o: 0.12, clr: '#C4915E' },
      { svg: firefly, sz: 12, b: '15%', l: '6%', a: 'floatA', d: '5s', dl: '2s', o: 0.2, clr: '#E8D06E' },
    ]],
    ['sec-gift', [
      { svg: firefly, sz: 14, t: '15%', l: '8%', a: 'floatB', d: '6s', dl: '0s', o: 0.2, clr: '#E8C878' },
      { svg: firefly, sz: 10, b: '18%', r: '7%', a: 'floatC', d: '7.5s', dl: '1s', o: 0.18, clr: '#E8D06E' },
    ]],
    ['sec-rsvp', [
      { svg: firefly, sz: 13, t: '10%', r: '9%', a: 'floatA', d: '6.5s', dl: '0.5s', o: 0.2, clr: '#E8C878' },
      { svg: firefly, sz: 10, b: '28%', l: '10%', a: 'floatB', d: '5.5s', dl: '1.5s', o: 0.18, clr: '#F0D888' },
    ]],
  ];

  map.forEach(([id, items]) => {
    const sec = document.getElementById(id);
    if (!sec) return;
    items.forEach((item, i) => {
      if (isMobile && i > 0) return;
      const el = document.createElement('div');
      el.className = 'floating-ornament';
      el.setAttribute('aria-hidden', 'true');
      el.innerHTML = item.svg;
      const s = el.style;
      s.width = item.sz + 'px';
      s.height = item.sz + 'px';
      s.opacity = item.o;
      s.color = item.clr || 'currentColor';
      s.animation = `${item.a} ${item.d} ease-in-out ${item.dl} infinite`;
      if (item.t) s.top = item.t;
      if (item.b) s.bottom = item.b;
      if (item.l) s.left = item.l;
      if (item.r) s.right = item.r;
      sec.appendChild(el);
    });
  });
}


/* ── Page Transition ────────────────────────────────── */

function openInvitation({ cover, main, overlay, particles }) {
  const btn = document.getElementById('btnOpen');
  btn.disabled = true;
  btn.setAttribute('aria-busy', 'true');

  // Phase 1: Cover blurs out cinematically
  cover.classList.add('is-leaving');

  // Phase 2: Overlay fades in while cover exits
  setTimeout(() => overlay.classList.add('fade-in'), 400);

  // Phase 3: Switch content once overlay is opaque
  setTimeout(() => {
    cover.setAttribute('aria-hidden', 'true');
    cover.style.display = 'none';

    main.style.display = 'block';
    main.removeAttribute('aria-hidden');
    document.body.style.overflow  = 'auto';
    document.body.style.overflowX = 'hidden';

    main.offsetHeight; // eslint-disable-line no-unused-expressions

    // Move cover action buttons to body so they persist as floating
    const coverActions = document.querySelector('.cover-actions');
    if (coverActions) {
      coverActions.classList.remove('anim-item');
      coverActions.classList.add('cover-actions--floating');
      document.body.appendChild(coverActions);
    }

    setupScrollAnimations();
    startCountdown();
    const reloadWishes = setupWishes();
    setupRSVP(reloadWishes);
    setupFloatNav();
    setupLightbox();
    spawnFloatingOrnaments();
    if (particles) particles.switchToMain();

    // Phase 4: Reveal main content
    overlay.classList.remove('fade-in');
    overlay.classList.add('fade-out');
    setTimeout(() => overlay.classList.remove('fade-out'), 1000);

  }, 1100);
}


/* ── Init ───────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {

  /* Dark mode (before render to avoid flash) */
  setupDarkMode();

  /* Populate all data from config */
  renderConfig();
  renderGallery();
  renderGift();
  setupCopyButtons();

  /* Particles (cover only — destroyed after opening) */
  const particles = new GhibliParticles(document.getElementById('particles'));

  /* Guest name */
  const guestName  = resolveGuestName();
  const guestBlock = document.getElementById('guestBlock');
  if (guestName) {
    document.getElementById('guestName').textContent = guestName;
  } else {
    guestBlock.style.display = 'none';
  }

  /* Audio — auto-play on invitation open */
  const playAudio = setupAudio();

  /* Cover button */
  const cover   = document.getElementById('cover');
  const main    = document.getElementById('main');
  const overlay = document.getElementById('overlay');
  const btn     = document.getElementById('btnOpen');

  btn.addEventListener('click', (e) => {
    spawnRipple(btn, e);
    if (playAudio) playAudio(); // play within user gesture context
    setTimeout(() => openInvitation({ cover, main, overlay, particles }), 120);
  });

  /* Register service worker */
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  }
});
