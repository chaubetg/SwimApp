const CACHE = 'pacer-swimapp-v1';
const CORE = ['./index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png'];
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()).catch(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.map((k) => (k === CACHE ? null : caches.delete(k))))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const accept = req.headers.get('accept') || '';
  const isHTML = req.mode === 'navigate' || accept.includes('text/html');
  if (isHTML) {
    e.respondWith(fetch(req).then((res) => { const c = res.clone(); caches.open(CACHE).then((x) => x.put(req, c)); return res; })
      .catch(() => caches.match(req).then((h) => h || caches.match('./index.html'))));
  } else {
    e.respondWith(caches.match(req).then((h) => h || fetch(req).then((res) => {
      try { const c = res.clone(); caches.open(CACHE).then((x) => x.put(req, c)); } catch (_) {}
      return res;
    }).catch(() => h)));
  }
});
