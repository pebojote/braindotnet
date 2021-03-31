if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('/sw.js').then(function (registration) {
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
            setTimeout(() => {
                NOTIFICATIONAPI();
            }, 5000);
        }, function (err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}

var CACHE_NAME = 'braindotnet-cache-v1';
var urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json',
    '/videos/MemoryofaWoman.mp4',
    '/scripts/index.js',
    '/scripts/platformOverrides.js',
    '/scripts/setup/about-xx-setup.js',
    '/scripts/setup/installed.js',
    '/scripts/setup/chat-setup.js',
    '/scripts/setup/fsd-setup.js',
    '/scripts/setup/homex-setup.js',
    '/scripts/setup/introx-setup.js',
    '/scripts/setup/introxx-setup.js',
    '/scripts/setup/notify-setup.js',
    '/scripts/setup/onsenx-setup.js',
    '/scripts/setup/onsenxx-setup.js',
    '/scripts/setup/opened-setup.js',
    '/scripts/setup/pisted-feed-setup.js',
    '/scripts/setup/post-fed-setup.js',
    '/scripts/setup/post-timeline-setup.js',
    '/scripts/setup/profile-edit-setup.js',
    '/scripts/setup/search-people-setup.js',
    '/scripts/setup/selct-setup.js',
    '/scripts/setup/sesx-setup.js',
    '/scripts/onsen/onsenui.min.js',
    'scripts/setup/notification-api-setup.js',
    '/scripts/jquery/jquery-2.1.3.min.js',
    '/scripts/firebase/firebase-app.js',
    '/scripts/firebase/firebase-auth.js',
    '/scripts/firebase/firebase-database.js',
    '/scripts/firebase/firebase-sdk.js',
    '/scripts/firebase/firebase-storage.js',
    '/platform/android.html',
    '/platform/desktop.html',
    '/platform/ios.html',
    '/musics/jinsang.mp3',
    '/images/edison.jpg',
    '/images/favicon.ico',
    '/images/logo.png',
    '/images/metag.png',
    '/images/nointernet.png',
    '/images/icons-192.png',
    '/images/icons-512.png',
    '/images/art1.jpg',
    '/images/person1.jpg',
    '/images/person2.png',
    '/images/person3.jpg',
    '/css/progress.css',
    '/css/splashscreen.css',
    '/css/onsenui.css',
    '/css/onsen-css-components.min.css',
    '/css/font_awesome/css/font-awesome.css',
    '/css/font_awesome/css/font-awesome.min.css',
    '/css/font_awesome/fonts/font-googleapis.css',
    '/css/font_awesome/fonts/fontawesome-webfont.eot',
    '/css/font_awesome/fonts/fontawesome-webfont.svg',
    '/css/font_awesome/fonts/fontawesome-webfont.ttf',
    '/css/font_awesome/fonts/fontawesome-webfont.woff',
    '/css/font_awesome/fonts/fontawesome-webfont.woff2',
    '/css/font_awesome/fonts/FontAwesome.otf',
    '/404/index.html',
    '/404/script.js',
    '/404/style.css'
];

self.addEventListener('install', function (event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                // Cache hit - return response
                if (response) {
                    return response;
                }

                return fetch(event.request).then(
                    function (response) {
                        // Check if we received a valid response
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // IMPORTANT: Clone the response. A response is a stream
                        // and because we want the browser to consume the response
                        // as well as the cache consuming the response, we need
                        // to clone it so we have two streams.
                        var responseToCache = response.clone();

                        caches.open(CACHE_NAME)
                            .then(function (cache) {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    }
                );
            })
    );
});

self.addEventListener('activate', function (event) {

    var cacheWhitelist = ['pages-cache-v1', 'blog-posts-cache-v1'];

    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// NOTIFICATION API
self.onnotificationclick = function (e) {
    var notification = e.notification;
    var action = e.action;
    if (action === 'close') {
        notification.close();
        console.log('Close');
    } else {
        e.waitUntil(clients.openWindow('https://google.com'));
        console.log('Open');
    }
};
self.onnotificationclose = function (e) {
    console.log('notification close');
    var notification = e.notification;
    var primaryKey = notification.data.primaryKey;
    console.log('Close notification: ' + primaryKey);
};