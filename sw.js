const CACHE_NAME = "hit-kat-v2-5";
const CORE_ASSETS = ["./", "./index.html", "./manifest.json", "./icons/icon-192.png", "./icons/icon-512.png", "./icons/apple-touch-icon.png"];
self.addEventListener("install", event => { event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(CORE_ASSETS)).then(() => self.skipWaiting())); });
self.addEventListener("activate", event => { event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith("hit-kat-") && key !== CACHE_NAME).map(key => caches.delete(key)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", event => { const req = event.request; if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) return; event.respondWith(caches.match(req).then(cached => cached || fetch(req).then(res => { if (res && res.ok) { const copy = res.clone(); caches.open(CACHE_NAME).then(cache => cache.put(req, copy)); } return res; }).catch(() => caches.match("./index.html")))); });
