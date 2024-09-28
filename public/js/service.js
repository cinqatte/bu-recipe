const CACHE_NAME = 'v1';
const CACHE_ASSETS = [
    '/css/style.css',
    '/icon/favicon.ico',
    '/icon/icon-32x32.png',
    '/icon/icon-192x192.png',
    '/image/logo.png',
    '/js/script.js',
    '/index.html',

    '/__/firebase/10.13.2/firebase-app-compat.js',
    '/__/firebase/10.13.2/firebase-auth-compat.js',
    '/__/firebase/10.13.2/firebase-database-compat.js',
    '/__/firebase/10.13.2/firebase-storage-compat.js',
    '/__/firebase/init.js'
];


self.addEventListener('install', (event) => {
    console.log('service worker: installing...');
    event,waitUtil(
        caches.open(CACHE_NAME)
        .then((cache) => {
            console.log('service worker: caching files');
            return cache.addAll(CACHE_ASSETS);
        })
    )
});

self.addEventListener('activate', (event) => {
    console.log('service worker: activating...');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log('service worker: removing old cache', cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    console.log('service worker: fetching ', event.request.url);
    event.respondWith(
        caches.match(event.request)
        .then((response) => {
            return response || fetch(event.request);
        })
    );
});