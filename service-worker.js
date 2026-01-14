// service-worker.js - VERSÃO UNIVERSAL
const CACHE_NAME = 'dashboard-v1';
const urlsToCache = ['/', '/index.html'];

self.addEventListener('install', event => {
  console.log('🔄 Service Worker instalando...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('📦 Cache aberto');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  console.log('✅ Service Worker ativado');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('🗑️ Removendo cache antigo:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  // Para Power BI, NÃO fazer cache - apenas passar adiante
  if (event.request.url.includes('powerbi.com')) {
    event.respondWith(fetch(event.request));
    return;
  }
  
  // Para arquivos locais, usar cache
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
