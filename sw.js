/* ════════════════════════════════════════════════════
   Service Worker — Cache-first for static assets
   ════════════════════════════════════════════════════ */

const CACHE_NAME = 'undangan-v13';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/css/main.css',
  '/js/gsap.min.js',
  '/js/config.js',
  '/js/main.js',
  '/assets/bg/bg-cover.webp',
  '/assets/bg/bg-couple.webp',
  '/assets/bg/bg-events.webp',
  '/assets/bg/bg-night.webp',
  '/assets/gallery/foto-1.webp',
  '/assets/gallery/foto-2.webp',
  '/assets/gallery/foto-3.webp',
  '/assets/gallery/foto-4.webp',
  '/assets/gallery/foto-5.webp',
  '/assets/music/perfect.mp3',
  '/assets/og-image.jpg',
];

// Pre-cache static assets on install
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Clean old caches on activate
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// Cache-first for static, network-first for API
self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);

  // Skip non-GET and Supabase API calls
  if (e.request.method !== 'GET' || url.hostname.includes('supabase')) {
    return;
  }

  // Google Fonts — cache-first
  if (url.hostname.includes('fonts.googleapis.com') || url.hostname.includes('fonts.gstatic.com')) {
    e.respondWith(
      caches.match(e.request).then(cached => cached || fetch(e.request).then(res => {
        const clone = res.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone));
        return res;
      }))
    );
    return;
  }

  // Static assets — cache-first, fallback to network
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(res => {
        if (res.ok && url.origin === self.location.origin) {
          const clone = res.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(e.request, clone));
        }
        return res;
      });
    })
  );
});
