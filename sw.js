const CACHENAME = 'cache_v1'
const cacheUrls = ['/offline/view.html', '/offline/style.css', '/offline/map.png']

self.addEventListener('install', function (ev) {
  caches.open(CACHENAME)
    .then(function (cache) {
      return cache.addAll(
        cacheUrls
      );
    })
});

self.addEventListener('activate', function (ev) {
  ev.waitUntil(
    caches.keys().then(function (cachesNames) {
      Promise.all(
        cachesNames.map(function (cacheName) {
          if (CACHENAME !== cacheName) {
            return caches.delete(cacheName);
          }
        })
      )
    }).then(function () {
      console.log('V2 now ready to handle fetches!');
    })
  );
});

self.addEventListener('fetch', function (ev) {
  ev.respondWith(
    caches.match(ev.request)
    .then(function (response) {
      if (response) {
        console.log('cache response')
        return response
      }
      return fetch(ev.request)
    }).catch(function () {
      if (ev.request.mode == 'navigate') {
        return caches.match('/offline/view.html');
      }
    })
  );
});