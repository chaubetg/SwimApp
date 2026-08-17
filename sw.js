// BUMP THIS ON EVERY UPLOAD. The activate handler deletes every cache whose name differs,
// so changing the number is what forces an already-installed PWA to drop the old build.
// Without a bump, a phone can keep serving the previous version for days.
const CACHE = 'split-compass-v66';
const CORE = ['./index.html', './coach.html', './swimmer.html', './manifest.webmanifest', './manifest-start.webmanifest', './manifest-swimmer.webmanifest', './icon-192.png', './icon-512.png'];
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()).catch(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.map((k) => (k === CACHE ? null : caches.delete(k))))).then(() => self.clients.claim()));
});
function fromCache(req) { return caches.match(req).then((h) => h || caches.match('./index.html')); }
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const accept = req.headers.get('accept') || '';
  const isHTML = req.mode === 'navigate' || accept.includes('text/html');
  if (isHTML) {
    // Serve the cached app fast; wait at most ~2.5s for the network (flaky mobile data won't hang
    // the open). The network fetch still runs and refreshes the cache for next launch.
    const net = fetch(req).then((res) => { const c = res.clone(); caches.open(CACHE).then((x) => x.put(req, c)); return res; }).catch(() => fromCache(req));
    const timeout = new Promise((resolve) => setTimeout(() => resolve(fromCache(req)), 2500));
    e.respondWith(Promise.race([net, timeout]));
  } else {
    // Static assets (Tailwind, fonts, icons): cache-first.
    e.respondWith(caches.match(req).then((h) => h || fetch(req).then((res) => {
      try { const c = res.clone(); caches.open(CACHE).then((x) => x.put(req, c)); } catch (_) {}
      return res;
    }).catch(() => h)));
  }
});
