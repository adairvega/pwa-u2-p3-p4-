const CACHE_NAME = 'cache-v1';

const CACHE_STATIC_NAME = 'static-v1';
const CACHE_DYNAMIC_NAME = 'dynamic-v1';
const CACHE_INMUTABLE_NAME = 'inmutable-v1';

function cleanCache(cacheName, sizeItems) {
    caches.open(cacheName)
    .then(cache => {
        cache.keys().then(keys => {
            console.log(keys);
            if (keys.length >= sizeItems) {
                cache.delete(keys[0]).then( () => {
                    cleanCache(cacheName, sizeItems);
                });
            }
        });
    });
}

self.addEventListener('install', e => {
    // 20213-PWA-U2-P5
   const promesaCache = caches.open(CACHE_STATIC_NAME)
    .then(cache => {
        return cache.addAll([
            '/',
            '/index.html',
            '/css/page.css',
            '/img/mx-tl.jpg',
            '/js/app.js',
            '/pages/view-offline.html'
        ]
        );
    });

    const promInmutable = caches.open(CACHE_INMUTABLE_NAME)
    .then(cacheInmutable => {
        return cacheInmutable.addAll([
            'https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css',
        ]);
    });


    e.waitUntil(Promise.all([promesaCache, promInmutable]));
});

self.addEventListener('activate', (event) => {
    const resDelCache = caches.keys().then(keys => {
        keys.forEach(key => {
            if (key !== CACHE_STATIC_NAME && key.includes('static')) {
                return caches.delete(key);
            }
        });
    });
    event.waitUntil(resDelCache);
});

self.addEventListener('fetch', (event) => {
    //2.- Cache with network fallback
    //Primero busca en cache y si no lo encuentra, va a la red
    const respuestaCache = caches.match(event.request)
    .then(resp => {
        if (resp) {
            return resp;
        }
        console.log('No está en cache', event.request.url);

        return fetch(event.request)
        .then(respNet => {
            caches.open(CACHE_DYNAMIC_NAME)
            .then(cache => {
                cache.put(event.request, respNet).then( () => {
                    cleanCache(CACHE_DYNAMIC_NAME, 5);
                });
            });
            return respNet.clone();
        })
        .catch((err)=>{
            console.log('Error al solicitar el recurso');
            if (event.request.headers.get('accept').includes('text/html')) {
                return caches.match('/pages/view-offline.html');
            }
            if(event.request.url.includes('.jpg') || event.request.url.includes('.png') || event.request.url.includes('.jpeg')){
                return caches.match('/img/broken.png')
            }
        });
    });

    event.respondWith(respuestaCache);

    //1.- Only cache
    // event.respondWith(caches.match(event.request));

    // 3.- Network with cache fallback
    // const respuesta = fetch(event.request).then(res => {

    //     if (!res) {
    //         return caches.match(event.request);
    //     }
        
    //     caches.open(CACHE_DYNAMIC_NAME)
    //     .then(cache => {
    //         cache.put(event.request, res);
    //         cleanCache(CACHE_DYNAMIC_NAME, 5);
    //     });
    //     return res.clone();
    // }).catch(error => {
    //     return caches.match(event.request);
    // });

    // event.respondWith(respuesta);

});