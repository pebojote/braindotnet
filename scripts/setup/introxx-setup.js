// INDEX
// FIREBASE AUTHENTICATION
// LOGIN IS DEFINE AND READY TO EXECUTE
// LISTEN TO STATUS OF USER IF HE/SHE IS LOGIN OR NOT.
var LOGINEMAIL;
var LOGINPASSWORD;
var LOGIN;
var LOGOUT
var SIGNUP;
var SIGNUPEMAIL;
var SIGNUPPASSWORD;
var GOTOHOMES;
firebase.auth().onAuthStateChanged(USER => {
    if (USER) {
        showModal();

        function showModal() {
            var modal = document.querySelector('ons-modal');
            modal.show();
            setTimeout(function () {
                modal.hide();
            }, 12000);
        }
        console.log('USER IS ACTIVE');
        setTimeout(() => {
            fn.load('homes.html');
            SEEPOSTINFEED();
            PULLTOREFRESH();
            /**
             WHEN YOU LOGIN. YOUR ADD FRIENDS LIST WILL ALWAYS GOING TO BE UPDATED AS ALWAYS
             **/
            firebase.database().ref('Users')
                .on('child_added', function (UIDS) {
                    firebase.database().ref('Users').child(UIDS.key)
                        .child('User/People/Add/People')
                        .on('child_added', function (checked) {
                            firebase.database().ref('Users/' + firebase.auth().currentUser.uid)
                                .child('User/About/Authentic').on('child_added', function (myname) {
                                    if (myname.key == checked.key) {

                                    } else {
                                        firebase.database().ref('Users/' + firebase.auth().currentUser.uid)
                                            .child('User/People/Add/People').child(checked.key).set(checked.val());
                                    }
                                });
                        });
                });
            setTimeout(() => {
                firebase.database().ref('Users').on('value', function (check) {
                    var a = check.child(firebase.auth().currentUser.uid).exists();
                    if (a) {} else {
                        var b;
                        setTimeout(() => {
                            b = document.getElementById('EDITPROFILEFIRST')
                        }, 0000);
                        setTimeout(() => {
                            b.innerHTML = "<div style=\"text-align: center; margin-top: 20%\"><p><img src=\"https://img.icons8.com/color/96/000000/gender-neutral-user.png\"></p><p><ons-button style=\"background-color: #3498DB;color: #fff\" onclick=\"EDITPROFILE()\"><b>CREATE NEW PROFILE</b></ons-button></p></div>";
                        }, 1000);
                    }
                });
            }, 0000);
        }, 10000);
    } else {
        console.log('USER IS NOT ACTIVE');
        setTimeout(() => {
            window.fn = {};
            window.fn.open = function () {
                var menu = document.getElementById('menu');
                menu.open();
            };
            try {
                window.fn.load = function (page) {
                    var content = document.getElementById('content');
                    var menu = document.getElementById('menu');
                    content.load(page).then(menu.close.bind(menu));
                }
                throw 'Error filtered';
            } catch (error) {
                console.log(error);
            }
        }, 5000);
        setTimeout(() => {
            fn.load('OVERVIEW.html');
        }, 10000);
    }
});

function OVERVIEW() {
    fn.load('OVERVIEW.html');
    setTimeout(() => {
        INSTALLNOW();
    }, 5000);
    SIGNUP;
}

function LOGINPAGE() {
    fn.load('LOGIN.html');
    LOGINEMAIL = document.getElementById('LOGINEMAIL');
    LOGINPASSWORD = document.getElementById('LOGINPASSWORD');
    LOGIN;
    SIGNUP;
}

function RESETPASSWORD() {
    fn.load('RESETPASSWORD.html');
}

function RESETPASSWORDNOW() {
    var auth = firebase.auth();
    var EMAILVAL = document.getElementById("RESETEMAILPASSWORD").value;
    var emailAddress = EMAILVAL;

    auth.sendPasswordResetEmail(emailAddress).then(function () {
        // Email sent.
        ons.notification.confirm('Email sent to ' + EMAILVAL + ". Please check your email.");
    }).catch(function (error) {
        // An error happened.
        ons.notification.alert(error);
        console.log(error);
    });
}

function SHOW() {
    var x = document.getElementById("LOGINPASSWORD");
    x.setAttribute('type', 'text');
}

function HIDE() {
    var x = document.getElementById("LOGINPASSWORD");
    x.setAttribute('type', 'password');
}

function SHOWPASSWORD() {
    var x = document.getElementById("LOGINPASSWORD");
    if (x.type === "password") {
        SHOW();
    } else {
        HIDE();
    }
}

LOGIN = function () {
    showModal();

    function showModal() {
        var modal = document.querySelector('ons-modal');
        modal.show();
        setTimeout(function () {
            modal.hide();
        }, 15000);
    }
    var EMAIL = document.getElementById('LOGINEMAIL').value;
    var PASSWORD = document.getElementById('LOGINPASSWORD').value;
    //  GET EMAIL AND PASSWORD
    var AUTH = firebase.auth();
    //  SIGNIN
    var PROMISE = AUTH.signInWithEmailAndPassword(EMAIL, PASSWORD);
    PROMISE.catch(e => ons.notification.alert(e.message));
}
//SIGN UP IS DEFINE AND READY TO EXECUTE

SIGNUP = function () {
    setTimeout(() => {
        fn.load('SIGNUP.html');
        ons.notification.confirm(
            'Please read our terms of service and privacy guidelines first before signing up.'
        );
    }, 0000);
    setTimeout(() => {
        SIGNUPEMAIL = document.getElementById('SIGNUPEMAIL');
        SIGNUPPASSWORD = document.getElementById('SIGNUPPASSWORD');
        GOTOHOMES;
    }, 1000);
}

function WHYEMAIL() {
    var dialog = document.getElementById('WHYEMAIL-DIALOG');

    if (dialog) {
        dialog.show();
    } else {
        ons.createElement('WHYEMAIL.html', {
                append: true
            })
            .then(function (dialog) {
                dialog.show();
            });
    }
};

function HIDEWHYEMAIL(id) {
    document
        .getElementById(id)
        .hide();
};

GOTOHOMES = function () {
    //Get email and password
    //TODO: CHECK FOR REAL EMAIL
    showModal();

    function showModal() {
        var modal = document.querySelector('ons-modal');
        modal.show();
        setTimeout(function () {
            modal.hide();
        }, 15000);
    }
    var EMAIL = SIGNUPEMAIL.value;
    var PASS = SIGNUPPASSWORD.value;
    var AUTH = firebase.auth();
    //Sign in
    var PROMISE = AUTH.createUserWithEmailAndPassword(EMAIL, PASS);
    PROMISE.catch(e => ons.notification.alert(e.message));
}

var checkBox;
var CONFIRMORNOT;

function REQUESTPOPUP() {
    var dialog = document.getElementById('REQUESTPOPUP-DIALOG');

    if (dialog) {
        dialog.show();
    } else {
        ons.createElement('REQUESTPOPUP.html', {
                append: true
            })
            .then(function (dialog) {
                dialog.show();
                console.log('TODO:');
                checkBox = document.getElementById("NOTIFYME");
                CONFIRMORNOT = document.getElementById('CONFIRMORNOT');
                CONFIRMORNOT.innerHTML = "<ons-button modifier=\"large\" style=\"background-color: #fff;color: #3498DB\" onclick=\"HIDEREQUESTPOPUP(\'REQUESTPOPUP-DIALOG\')\">Close</ons-button>";
            });
    }
};

function HIDEREQUESTPOPUP(id) {
    document
        .getElementById(id)
        .hide();
    console.log('TODO:');
};

function CLICKNOTIFYME() {
    // Get the checkbox
    checkBox = document.getElementById("NOTIFYME");

    // If the checkbox is checked, display the output text
    if (checkBox.hasAttribute('checked')) {
        checkBox.removeAttribute('checked');
        CONFIRMORNOT.innerHTML = "<ons-button modifier=\"large\" style=\"background-color: #fff;color: #3498DB\" onclick=\"HIDEREQUESTPOPUP(\'REQUESTPOPUP-DIALOG\')\">Close</ons-button>";
        console.log('Uncheck');
    } else {
        checkBox.setAttribute('checked');
        if ('serviceWorker' in navigator) {
            NOTIFICATIONAPI();

            function NOTIFICATIONAPI() {
                Notification.requestPermission(
                    function (status) {
                        console.log('Notification permission status:', status);
                        displayNotification();
                    }
                )

                function displayNotification() {
                    if (Notification.permission === 'granted') {
                        CONFIRMORNOT.innerHTML = "<ons-button modifier=\"large\" style=\"background-color: #fff;color: #3498DB\" onclick=\"HIDEREQUESTPOPUP(\'REQUESTPOPUP-DIALOG\'), GOTOHOMES()\">Confirm</ons-button>";
                        console.log('Check');
                        navigator.serviceWorker.getRegistration()
                            .then(function (reg) {
                                const title = 'Braindotnet';
                                const options = {
                                    icon: 'images/logo.png',
                                    body: 'Braindotnet is an app that allows to socialize.\nSecond line of body text :)',
                                    badge: 'images/icons-192.png',
                                    image: 'images/art1.jpg',
                                    actions: [{
                                            action: 'open',
                                            title: 'Install',
                                            icon: 'images/logo.png'
                                        },
                                        {
                                            action: 'close',
                                            title: 'Cancel',
                                            icon: 'images/logo.png'
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
                                    data: {
                                        primaryKey: 1
                                    }
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
                    if (Notification.permission === 'default') {
                        checkBox.removeAttribute('checked');
                        ons.notification.confirm('Please choose whether allow or block');
                        CONFIRMORNOT.innerHTML = "<ons-button modifier=\"large\" style=\"background-color: #fff;color: #3498DB\" onclick=\"HIDEREQUESTPOPUP(\'REQUESTPOPUP-DIALOG\')\">Close</ons-button>";
                        console.log('Uncheck');
                    } 
                    if (Notification.permission === 'denied') {
                        ons.notification.confirm('You chose block but you can enable the notification again if you want in the setting to be notified');
                        CONFIRMORNOT.innerHTML = "<ons-button modifier=\"large\" style=\"background-color: #fff;color: #3498DB\" onclick=\"HIDEREQUESTPOPUP(\'REQUESTPOPUP-DIALOG\'), GOTOHOMES()\">Confirm</ons-button>";
                        console.log('Check');
                    }
                }
            }
        }
    }
}

// DEFINE THE LOGOUT ONCLICK
function DEFINELOGOUT() {
    LOGOUT;
}
// LOGOUT IS DEFINE AND READY TO EXECUTE
LOGOUT = function () {
    showModal();

    function showModal() {
        var modal = document.querySelector('ons-modal');
        modal.show();
        setTimeout(function () {
            modal.hide();
        }, 12000);
    }
    firebase.auth().signOut();
}


// VERSION SETUP

function VERSIONSETUP() {
    var dialog = document.getElementById('VERSIONSETUP-DIALOG');

    if (dialog) {
        dialog.show();
    } else {
        ons.createElement('VERSIONSETUP.html', {
                append: true
            })
            .then(function (dialog) {
                dialog.show();
            });
    }
};

function HIDEVERSIONSETUP(id) {
    document
        .getElementById(id)
        .hide();
};

// SUGGEST EDIT

function SUGGESTEDIT() {
    var RECIPIENTEMAIL = document.getElementById('RECIPIENTEMAIL').value;
    var RECIPIENTMESSAGE = document.getElementById('RECIPIENTMESSAGE').value;
    var link = "mailto:pebojot.edison@gmail.com" +
        "?cc=" + RECIPIENTEMAIL +
        "&subject=" + encodeURIComponent("Suggest Edit") +
        "&body=" + encodeURIComponent(RECIPIENTMESSAGE);

    window.location.href = link;
    setTimeout(() => {
        ons.notification.confirm('Suggesstion successfully sent!');
    }, 1000);

}

// COPYRIGHT SETUP

function COPYRIGHTSETUP() {
    var dialog = document.getElementById('COPYRIGHTSETUP-DIALOG');

    if (dialog) {
        dialog.show();
    } else {
        ons.createElement('COPYRIGHTSETUP.html', {
                append: true
            })
            .then(function (dialog) {
                dialog.show();
            });
    }
};

function HIDECOPYRIGHTSETUP(id) {
    document
        .getElementById(id)
        .hide();
};