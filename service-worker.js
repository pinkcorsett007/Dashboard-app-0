// service-worker.js - MÍNIMO FUNCIONAL
console.log('Service Worker carregado!');

self.addEventListener('install', event => {
  console.log('📦 Service Worker instalado');
  self.skipWaiting(); // Ativar imediatamente
});

self.addEventListener('activate', event => {
  console.log('🚀 Service Worker ativo');
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  // NÃO FAZER CACHE - apenas passa tudo adiante
  event.respondWith(fetch(event.request));
});
