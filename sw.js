// Wobble World service worker — the app opens instantly and works offline.
//
// Pages (HTML) are network-first: a fresh copy wins when the device is online, and the
// cached copy is the offline fallback. That way a bad deploy heals itself on the next
// visit instead of being pinned in the cache forever. Everything else is cache-first.
const CACHE = 'wobble-world-v6';
const PAGES = ['./', './index.html', './privacy.html', './terms.html'];
const ASSETS = [...PAGES, './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS).catch(() => {})));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});

const isPage = req => req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html');

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const sameOrigin = e.request.url.startsWith(self.location.origin);

  if (isPage(e.request)) {
    e.respondWith(
      fetch(e.request)
        .then(res => {
          if (res.ok && sameOrigin) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); }
          return res;
        })
        .catch(() => caches.match(e.request).then(hit => hit || caches.match('./index.html')))
    );
    return;
  }

  e.respondWith(caches.match(e.request).then(hit => hit || fetch(e.request).then(res => {
    if (res.ok && (sameOrigin || e.request.url.includes('fonts.g'))) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); }
    return res;
  }).catch(() => hit)));
});
