// AgriFarm PWA Service Worker
const CACHE_NAME = 'agrifarm-v1.0.0';
const STATIC_CACHE = 'agrifarm-static-v1.0.0';
const DYNAMIC_CACHE = 'agrifarm-dynamic-v1.0.0';

// Files to cache for offline functionality
const STATIC_FILES = [
  '/',
  '/index.html',
  '/login.html',
  '/styles.css',
  '/script.js',
  '/auth.js',
  '/translations.js',
  '/demo-data.js',
  '/manifest.json',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
];

// Install event - cache static files
self.addEventListener('install', event => {
  console.log('🔧 AgriFarm PWA: Service Worker installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        console.log('📦 AgriFarm PWA: Caching static files...');
        return cache.addAll(STATIC_FILES);
      })
      .then(() => {
        console.log('✅ AgriFarm PWA: Static files cached successfully');
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('❌ AgriFarm PWA: Failed to cache static files:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('🚀 AgriFarm PWA: Service Worker activating...');
  
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('🗑️ AgriFarm PWA: Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('✅ AgriFarm PWA: Service Worker activated');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Handle different types of requests
  if (request.destination === 'document') {
    // Handle page requests
    event.respondWith(
      caches.match(request)
        .then(response => {
          if (response) {
            console.log('📄 AgriFarm PWA: Serving page from cache:', url.pathname);
            return response;
          }
          
          return fetch(request)
            .then(response => {
              // Cache successful responses
              if (response.status === 200) {
                const responseClone = response.clone();
                caches.open(DYNAMIC_CACHE)
                  .then(cache => {
                    cache.put(request, responseClone);
                  });
              }
              return response;
            })
            .catch(() => {
              // Fallback to offline page
              if (url.pathname === '/') {
                return caches.match('/index.html');
              }
              return new Response('Offline - Please check your internet connection', {
                status: 503,
                statusText: 'Service Unavailable',
                headers: new Headers({
                  'Content-Type': 'text/plain'
                })
              });
            });
        })
    );
  } else if (request.destination === 'style' || 
             request.destination === 'script' || 
             request.destination === 'image') {
    // Handle static assets
    event.respondWith(
      caches.match(request)
        .then(response => {
          if (response) {
            console.log('📦 AgriFarm PWA: Serving asset from cache:', url.pathname);
            return response;
          }
          
          return fetch(request)
            .then(response => {
              if (response.status === 200) {
                const responseClone = response.clone();
                caches.open(DYNAMIC_CACHE)
                  .then(cache => {
                    cache.put(request, responseClone);
                  });
              }
              return response;
            })
            .catch(() => {
              // Return a fallback for images
              if (request.destination === 'image') {
                return new Response('', {
                  status: 404,
                  statusText: 'Not Found'
                });
              }
              throw new Error('Network request failed');
            });
        })
    );
  } else if (url.hostname === 'api.openweathermap.org') {
    // Handle weather API requests with caching
    event.respondWith(
      caches.match(request)
        .then(response => {
          if (response) {
            console.log('🌤️ AgriFarm PWA: Serving weather data from cache');
            return response;
          }
          
          return fetch(request)
            .then(response => {
              if (response.status === 200) {
                const responseClone = response.clone();
                caches.open(DYNAMIC_CACHE)
                  .then(cache => {
                    cache.put(request, responseClone);
                  });
              }
              return response;
            })
            .catch(() => {
              // Return cached weather data or fallback
              return caches.match(request)
                .then(response => {
                  if (response) {
                    return response;
                  }
                  // Return mock weather data
                  return new Response(JSON.stringify({
                    main: { temp: 25, humidity: 60 },
                    wind: { speed: 5 },
                    weather: [{ main: 'Clear', description: 'clear sky' }]
                  }), {
                    headers: { 'Content-Type': 'application/json' }
                  });
                });
            });
        })
    );
  }
});

// Background sync for offline actions
self.addEventListener('sync', event => {
  console.log('🔄 AgriFarm PWA: Background sync triggered');
  
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Handle any pending offline actions
      handleBackgroundSync()
    );
  }
});

// Push notifications
self.addEventListener('push', event => {
  console.log('📱 AgriFarm PWA: Push notification received');
  
  const options = {
    body: event.data ? event.data.text() : 'New update available for AgriFarm',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Open AgriFarm',
        icon: '/icons/icon-72x72.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/icons/icon-72x72.png'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('AgriFarm Update', options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', event => {
  console.log('🔔 AgriFarm PWA: Notification clicked');
  
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Helper function for background sync
async function handleBackgroundSync() {
  try {
    // Handle any pending offline data sync
    console.log('🔄 AgriFarm PWA: Processing background sync...');
    
    // You can add specific sync logic here
    // For example, sync soil analysis data, weather preferences, etc.
    
    console.log('✅ AgriFarm PWA: Background sync completed');
  } catch (error) {
    console.error('❌ AgriFarm PWA: Background sync failed:', error);
  }
}

// Message handler for communication with main thread
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME });
  }
});

console.log('🌾 AgriFarm PWA: Service Worker loaded successfully');
