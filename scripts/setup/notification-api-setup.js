// NOTIFICATION API

function NOTIFICATIONAPI() {
    Notification.requestPermission(
        function (status) {
            console.log('Notification permission status:', status);
            displayNotification();
        }
    )

    function displayNotification() {
        if (Notification.permission === 'granted') {
            navigator.serviceWorker.getRegistration()
                .then(function (reg) {
                    const title = 'Braindotnet';
                    const options = {
                        icon: 'images/logo.png',
                        body: 'Welcome to Braindotnet.\n',
                        badge: 'images/icons-192.png',
                        actions: [
                            {
                                action: 'close',
                                title: 'Cancel'
                            }
                        ],
                        vibrate: [100, 50, 100],
                        sound: 'musics/jinsang.mp3',
                        timestamp: Date.parse('01 Jan 2000 00:00:00'),
                        tag: 'renotify',
                        renotify: true,
                        silent: false,
                        requireInteraction: true,
                        tag: 'data-notification',
                        data: { primaryKey: 1 }
                    };
                    if ('actions' in Notification.prototype) {
                        // Action buttons are supported.
                        console.log('Button is available');
                    } else {
                        // Action buttons are NOT supported.
                        console.log('Action Button Not Supported');
                    }
                    reg.showNotification(title, options);
                });
        }
    }
}


// PUSH API
/*
// Retrieve Firebase Messaging object.
const messaging = firebase.messaging();
// Add the public key generated from the console here.
messaging.usePublicVapidKey(
    "BD1HD8_4LJpodWGgOSCCC4d0S1cq88_Wzu3vyx3C4wQ46zB9lxzOT1r54zENJhFXLLZhZZkim3KEtv3LEk3omHs"
);
*/