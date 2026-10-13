const CACHE_NAME = 'prince-game-cache-v1';
const urlsToCache = [
  './index.html',
  './manifest.json'
];

// App install hone par files ko cache (save) karta hai
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Offline hone par saved files dikhata hai
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});