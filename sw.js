const CACHE_NAME = "hit-kat-v3-3";
const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.json",
  "./illustrations/clamshell-left.jpg",
  "./illustrations/clamshell-right.jpg",
  "./illustrations/crunch.jpg",
  "./illustrations/dumbbell-bench-press.jpg",
  "./illustrations/dumbbell-row.jpg",
  "./illustrations/glute-bridge.jpg",
  "./illustrations/glute-kickback-left.jpg",
  "./illustrations/glute-kickback-right.jpg",
  "./illustrations/lateral-raise.jpg",
  "./illustrations/lying-leg-raise.jpg",
  "./illustrations/plank.jpg",
  "./illustrations/reverse-lunge-left.jpg",
  "./illustrations/reverse-lunge-right.jpg",
  "./illustrations/romanian-deadlift.jpg",
  "./illustrations/side-plank-left.jpg",
  "./illustrations/side-plank-right.jpg",
  "./illustrations/squat-band.jpg",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/apple-touch-icon.png"
];
self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", event => {
  const req = event.request;
  if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) return;
  event.respondWith(caches.match(req).then(cached => cached || fetch(req).then(response => {
    if (response && response.ok) caches.open(CACHE_NAME).then(cache => cache.put(req, response.clone()));
    return response;
  }).catch(() => caches.match("./index.html"))));
});
