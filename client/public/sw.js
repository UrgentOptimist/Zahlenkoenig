const CACHE_NAME = 'zahlenkoenig-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json'
];

// Installation des Service Workers
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

// Aktivierung des Service Workers
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event - Cache First Strategy
self.addEventListener('fetch', event => {
  // Nur GET Requests cachen
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Wenn im Cache, Cache zurückgeben
        if (response) {
          return response;
        }

        // Ansonsten vom Netzwerk abrufen
        return fetch(event.request).then(response => {
          // Nur erfolgreiche Responses cachen
          if (!response || response.status !== 200 || response.type === 'error') {
            return response;
          }

          // Response klonen, da Streams nur einmal gelesen werden können
          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });

          return response;
        });
      })
      .catch(() => {
        // Offline Fallback
        return new Response('Offline - App ist im Offline-Modus verfügbar', {
          status: 503,
          statusText: 'Service Unavailable',
          headers: new Headers({
            'Content-Type': 'text/plain'
          })
        });
      })
  );
});
