       /*     // THIS WILL UPDATES YOUR FRIENDS LIST IF YOUR FRIENDS UPDATED THEIR ACCOUNT EVERYTIME YOU OPEN YOUR ACCOUNT
            setTimeout(() => {
                firebase.auth().onAuthStateChanged(USER => {
                    if (USER) {
                        setTimeout(() => {
                            firebase.database().ref('Users').child(firebase.auth().currentUser.uid)
                                .child('User/People/Add/People').on('child_added',
                                    function (FRIENDSUPDATES) {
                                        firebase.database().ref('Users').child(firebase.auth().currentUser.uid)
                                            .child('User/About/Authentic').on('child_added',
                                                function (YOURNAME) {
                                                    firebase.database().ref('Users').child(firebase.auth().currentUser.uid)
                                                        .child('User/People').child(YOURNAME.key).child('Friends').on('child_added',
                                                            function (FRIENDSUPDATED) {
                                                                if (FRIENDSUPDATES.key == FRIENDSUPDATED.key) {
                                                                    firebase.database().ref().child('Users').child(firebase.auth().currentUser.uid)
                                                                        .child('User/People/Find/People').orderByKey().equalTo(FRIENDSUPDATES.key).on('child_added', function (snapshot) {
                                                                            firebase.database().ref().child('Users').child(firebase.auth().currentUser.uid)
                                                                                .child('User').child('People').child(YOURNAME.key).child('Friends').child(FRIENDSUPDATES.key).set(snapshot.val());
                                                                            var USERREFERENCE = firebase.database().ref().child('Users');
                                                                            var USERREFERENCES = USERREFERENCE.child(firebase.auth().currentUser.uid).child('User/People/Add/People');
                                                                            USERREFERENCES.child(FRIENDSUPDATES.key).remove();
                                                                            firebase.database().ref().child('Users').child(firebase.auth().currentUser.uid)
                                                                                .child('User/People/Add/People').on('child_removed', function (oldChildSnapshot) {
                                                                                    FRIENDSUPDATES.key == oldChildSnapshot.key;
                                                                                });
                                                                        })
                                                                } else {
                                                                    // DO NOTHING
                                                                }
                                                            })
                                                })
                                    })
                        }, 0000);
                    } else {
                        //
                    }
                })
            }, 0000)*/


       var EXPLOREFRIENDS;

       function ADDFRIENDSNOW() {
           setTimeout(() => {
               fn.load('addfriends.html');
           }, 0000);
           setTimeout(() => {
               firebase.database().ref('Users')
                   .child(firebase.auth().currentUser.uid)
                   .child('User/About/Authentic').on('child_added',
                       function (MYNAME) {
                           firebase.database().ref('Users')
                               .child(firebase.auth().currentUser.uid)
                               .child('User/People/' + MYNAME.key).child('Friends').on('value',
                                   function (YOURFRIENDSNAME) {
                                       var a = YOURFRIENDSNAME.exists();
                                       if (a) {
                                           firebase.database().ref('Users')
                                               .child(firebase.auth().currentUser.uid)
                                               .child('User/People/' + MYNAME.key).child('Friends')
                                               .on('child_added', function (YOURFRIENDSNAME) {
                                                   // CONDITION
                                                   firebase.database().ref('Users')
                                                       .child(firebase.auth().currentUser.uid)
                                                       .child('User/People/Add/People').on('child_added',
                                                           function (addthispeople) {
                                                               if (addthispeople.val() == YOURFRIENDSNAME.val()) {
                                                                // DO NOTHINGS
                                                               } else {
                                                                   EXPLOREFRIENDS = document.getElementById('EXPLOREFRIENDS');
                                                                   if (EXPLOREFRIENDS) {
                                                                       var SPAN = document.createElement('span');
                                                                       var ITEM = document.createElement('span');
                                                                       ITEM.innerHTML = addthispeople.val();
                                                                       SPAN.appendChild(ITEM);
                                                                       EXPLOREFRIENDS.appendChild(SPAN);
                                                                   }
                                                               }
                                                           })
                                               })
                                       }
                                       if (a != true) {
                                           firebase.database().ref('Users')
                                               .child(firebase.auth().currentUser.uid)
                                               .child('User/People/Add/People').on('child_added',
                                                   function (addthispeople) {
                                                       console.log({
                                                           addthispeople
                                                       });
                                                       EXPLOREFRIENDS = document.getElementById('EXPLOREFRIENDS');
                                                       if (EXPLOREFRIENDS) {
                                                           var SPAN = document.createElement('span');
                                                           var ITEM = document.createElement('span');
                                                           ITEM.innerHTML = addthispeople.val();
                                                           SPAN.appendChild(ITEM);
                                                           EXPLOREFRIENDS.appendChild(SPAN);
                                                       }
                                                   })
                                       }
                                   })
                       })
           }, 2000);
       }

       var EXPLOREMYFRIENDS;

       function SHOWMYFRIENDS() {
           setTimeout(() => {
               fn.load('myfriends.html');
           }, 0000);
           setTimeout(() => {
               EXPLOREMYFRIENDS = document.getElementById('EXPLOREMYFRIENDS');
           }, 1000);
           setTimeout(() => {
               firebase.database().ref('Users')
                   .child(firebase.auth().currentUser.uid)
                   .child('User/About/Authentic').on('child_added',
                       function (MYNAME) {
                           firebase.database().ref('Users')
                               .child(firebase.auth().currentUser.uid)
                               .child('User/People/' + MYNAME.key).child('Friends').on('value',
                                   function (YOURFRIENDSNAME) {
                                       var a = YOURFRIENDSNAME.exists();
                                       if (a) {
                                           firebase.database().ref('Users')
                                               .child(firebase.auth().currentUser.uid)
                                               .child('User/People/' + MYNAME.key).child('Friends').on('child_added',
                                                   function (YOURFRIENDSNAMEVAL) {

                                                       var SPAN = document.createElement('span');
                                                       var ITEM = document.createElement('span');
                                                       ITEM.innerHTML = YOURFRIENDSNAMEVAL.val();
                                                       SPAN.appendChild(ITEM);
                                                       EXPLOREMYFRIENDS.appendChild(SPAN);
                                                   })
                                       } else {

                                       }
                                   })
                       })
           }, 2000);
       }