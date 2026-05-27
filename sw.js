const CACHE_NAME = "jssupervise-clean-final3";
const APP_SHELL = [
  "https://jslametpbi.github.io/JSSupervise/",
  "https://jslametpbi.github.io/JSSupervise/index.html",
  "https://jslametpbi.github.io/JSSupervise/manifest.json",
  "https://jslametpbi.github.io/JSSupervise/icons/icon-192.png",
  "https://jslametpbi.github.io/JSSupervise/icons/icon-512.png",
  "https://jslametpbi.github.io/JSSupervise/icons/maskable-192.png",
  "https://jslametpbi.github.io/JSSupervise/icons/maskable-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request).catch(() => caches.match("https://jslametpbi.github.io/JSSupervise/index.html")))
  );
});
