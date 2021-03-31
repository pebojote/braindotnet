// FOR NOTIFICATION
var USERDATABASE = firebase.database().ref('Users');
var NOTIFICATIONS;

function NOTIFICATION() {
    setTimeout(() => {
        NOTIFICATIONS = document.getElementById('NOTIFICATIONRESULTS');
    }, 0000);
    setTimeout(() => {
        var USERBADGE = firebase.database().ref().child('Users');
        var USERBADGES = USERBADGE.child(firebase.auth().currentUser.uid).child('User/Notification/Notification/Badges');
        USERBADGES.child('Badge').remove();
        firebase.database().ref().child('Users').child(firebase.auth().currentUser.uid)
            .child('User/Notification/Notification/Badges').on('child_removed', function (oldChildSnapshot) {
                'Badge' == oldChildSnapshot.key;
            });
        firebase.database().ref('Users').child(firebase.auth().currentUser.uid)
            .child('User/Notification/Notification/Thread').on('child_added', function (NOTIFICATION) {
                var span = document.createElement('span');
                var item = document.createElement('span');
                item.innerHTML = NOTIFICATION.val();
                NOTIFICATIONS.appendChild(span);
                span.appendChild(item);
            })
    }, 1000);
}

// FOR MESSAGE NOTIFICATION
var NOTIFICATIONBADGE;
var MESSAGENOTIFICATIONBADGE;
        firebase.auth().onAuthStateChanged(USER => {
            if(USER) {
                setTimeout(() => {
                    NOTIFICATIONBADGE = document.getElementById('NOTIFICATIONBADGE');
                    MESSAGENOTIFICATIONBADGE = document.getElementById('MESSAGENOTIFICATIONBADGE');
                    firebase.database().ref('Users').child(firebase.auth().currentUser.uid)
                        .child('User/Notification/Message/Badges').orderByKey().equalTo('Badge').on('child_added', function (BADGE) {
                            console.log(BADGE.val());
                            MESSAGENOTIFICATIONBADGE.innerHTML = BADGE.val();
                        })
                        firebase.database().ref('Users').child(firebase.auth().currentUser.uid)
                            .child('User/Notification/Notification/Badges').orderByKey()
                            .equalTo('Badge').on('child_added', function (BADGE) {
                                console.log(BADGE.val());
                                NOTIFICATIONBADGE.innerHTML = BADGE.val();
                            })
                }, 1000);
            }
        })

function DELNOTI() {
    fn.load('notifications.html');
    NOTIFICATION();
    USERDATABASE.child(firebase.auth().currentUser.uid + '/User/Notification/Notification').remove();
}