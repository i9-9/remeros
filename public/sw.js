const STATIC_CACHE = 'remeros-static-v1';
const DYNAMIC_CACHE = 'remeros-dynamic-v1';

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/logo/logo_remeros.svg',
  '/logo/logo_portland.svg',
  '/images/hero.jpg',
  '/images/hero_mobile.jpg'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  
  if (request.method !== 'GET') return;
  
  event.respondWith(
    caches.match(request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(request)
          .then((networkResponse) => {
            if (networkResponse.ok) {
              const cache = caches.open(DYNAMIC_CACHE);
              cache.then((c) => c.put(request, networkResponse.clone()));
            }
            return networkResponse;
          });
      })
  );
}); 