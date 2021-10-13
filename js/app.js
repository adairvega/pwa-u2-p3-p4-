if (navigator.serviceWorker) {
    navigator.serviceWorker.register('/sw.js')
}

// if (window.caches) {
//     console.log("Tenemos caches");

//     caches.open('prueba');
//     caches.open('prueba v2');

//     caches.has('prueba')
//     .then(result => {
//         console.log(result);
//     });

//     caches.open('cache-v1')
//     .then((cache) => {
//         // cache.add('index.html');

//         cache.addAll(
//             ['/index.html',
//             '/css/page.css',
//             '/img/mx-tl.jpg',
//             'https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css',]
//         ).then(()=>{
//             // cache.delete('/css/page.css');
//             cache.put('index.html', new Response('Actualizando desde cache'));
//         });

//         cache.match('index.html')
//         .then((res) => {
//             res.text().then((text) => {console.log(text);});
//             console.log(res);
//         });

//     });
// }