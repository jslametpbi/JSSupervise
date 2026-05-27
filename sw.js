const CACHE_NAME = "jssupervise-pwa-v2";
const APP_SHELL = [
  "/JSSupervise/",
  "/JSSupervise/index.html",
  "/JSSupervise/manifest.webmanifest",
  "/JSSupervise/icons/icon-192.png",
  "/JSSupervise/icons/icon-512.png",
  "/JSSupervise/icons/maskable-192.png",
  "/JSSupervise/icons/maskable-512.png"
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
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request).catch(() => caches.match("/JSSupervise/index.html"));
    })
  );
});
