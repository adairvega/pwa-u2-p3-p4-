self.addEventListener('install', () => {
    console.log('SW: Instalado');
});

self.addEventListener('fetch', e => {
    // const respOff = new Response(`
    //     Bienvenido a la página Offline

    //     Para poder usar la app necesitas conexión a Internet.
    // `);
    
    // const respOffHtml = new Response(`
    //     <!DOCTYPE html>
    //     <html lang="en">
    //     <head>
    //         <meta charset="UTF-8">
    //         <meta http-equiv="X-UA-Compatible" content="IE=edge">
    //         <meta name="viewport" content="width=device-width, initial-scale=1.0">
    //         <title>Mi PWA | Caches</title>
    //     </head>
    //     <body>
    //     </body>
    //         <h1>Bienvenido a la página Offline</h1>
    //         <p>Para poder usar la app necesitas conexión a Internet</p>
    //     </html>
    // `,{
    //     headers: {
    //         'Content-Type': 'text/html'
    //     }
    // });

    const respOffFile = fetch('pages/view-offline.html');

    const resp = fetch(e.request)
    .catch( () => {
        console.log("Error en la petición")
        return respOffFile;
    });

    // console.log(e.request.url);
    e.respondWith(resp);
});