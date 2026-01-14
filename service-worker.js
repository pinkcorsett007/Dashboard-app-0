// service-worker.js - versão SIMPLES que funciona
const CACHE_NAME = 'dashboard-v1';

self.addEventListener('install', event => {
  console.log('Service Worker instalado!');
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  console.log('Service Worker ativado!');
});

self.addEventListener('fetch', event => {
  // Apenas passa as requisições, sem cache
  event.respondWith(fetch(event.request));
});
