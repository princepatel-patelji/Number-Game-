const CACHE_NAME = 'prince-game-cache-v2';
const urlsToCache = [
  './index.html',
  './manifest.json'
];

// 1. App install hone par files ko cache (save) karta hai
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
  // Force activate the new service worker immediately
  self.skipWaiting(); 
});

// 2. NAYA CODE: Purane Cache ko automatically delete karega
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('Purana Cache Delete Kiya:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// 3. Offline hone par saved files dikhata hai
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});