const CACHE_NAME = 'heritage-quest-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/api.js',
  '/js/i18n.js',
  '/js/audio.js',
  '/js/map.js',
  '/js/qrScanner.js',
  '/js/certificate.js',
  '/js/questBuilder.js',
  '/js/aiAssistant.js',
  '/js/app.js'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (e) => {
  // Network first, falling back to cache
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
