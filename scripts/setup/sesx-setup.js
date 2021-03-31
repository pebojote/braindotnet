// TO SEE ACTIVE USERS
var VISITPROFILE;
var ACTIVEUSERS;
var CURRENTUSERUID;

function SEEACTIVEUSERS() {
    setTimeout(() => {
        fn.load('see-active.html');
    }, 0000);
    setTimeout(() => {
        VISITPROFILE;
        ACTIVEUSERS = document.getElementById('ACTIVEUSERS');
    }, 1000);
    setTimeout(() => {
        // RETRIEVE THE VALUE AT THE SAME TIME
        firebase.database().ref('Users')
            .child(firebase.auth().currentUser.uid)
            .child('User/People/Active/Friends').on('child_added',
                function (RETRIEVEACTIVE) {
                    var SPAN = document.createElement('span');
                    var ITEM = document.createElement('span');
                    ITEM.innerHTML = RETRIEVEACTIVE.val();
                    SPAN.appendChild(ITEM);
                    ACTIVEUSERS.appendChild(SPAN);
                })
    }, 2000);
}
firebase.auth().onAuthStateChanged(ACTIVEUSER => {
    if (ACTIVEUSER) {
        CURRENTUSERUID = firebase.auth().currentUser.uid;
        // CHECK IF YOU ARE IN THE FRIENDS LIST
        firebase.database().ref('Users')
            .on('child_added', function (UIDs) {
                firebase.database().ref('Users').child(UIDs.key)
                    .child('User/About/Authentic').on('child_added', function (ALLNAMEKEY) {
                        firebase.database().ref('Users').child(UIDs.key)
                            .child('User/People/').child(ALLNAMEKEY.key)
                            .child('Friends').on('child_added', function (NAMEKEY) {
                                firebase.database().ref('Users').child(firebase.auth().currentUser.uid)
                                    .child('User/About/Authentic').orderByKey().on('child_added', function (YOURNAME) {
                                        if (YOURNAME.key == NAMEKEY.key) {
                                            firebase.database().ref('Users')
                                                .child(firebase.auth().currentUser.uid)
                                                .child('User/People').child(YOURNAME.key)
                                                .child('Friends').on('child_added',
                                                    function (FRIENDSKEY) {
                                                        firebase.database().ref('Users').child(UIDs.key)
                                                            .child('User/About/Authentic').child(FRIENDSKEY.key)
                                                            .child('UID').on('child_added', function (FRIENDSUIDS) {
                                                                firebase.database().ref('Users').child(FRIENDSUIDS.key)
                                                                    .child('User/About/Authentic').on('child_added',
                                                                        function (THEIRNAMES) {
                                                                            firebase.database().ref('Users').child(FRIENDSUIDS.key)
                                                                                .child('User/People').child(THEIRNAMES.key)
                                                                                .child('Friends').orderByKey().equalTo(YOURNAME.key).on('child_added',
                                                                                    function (YOURACTIVEVAL) {
                                                                                        firebase.database().ref('Users').child(FRIENDSUIDS.key)
                                                                                            .child('User/People/Active/Friends').child(YOURNAME.key).set(YOURACTIVEVAL.val());
                                                                                    })
                                                                        })
                                                            })
                                                    })
                                        }
                                    })
                            })
                    })
            })
    } else {
        if (CURRENTUSERUID) {
            firebase.database().ref('Users').child(CURRENTUSERUID)
                .child('User/About/Authentic').on('child_added', function (YOURNAME) {
                    firebase.database().ref('Users').child(CURRENTUSERUID)
                        .child('User/People').child(YOURNAME.key).child('Friends')
                        .on('child_added', function (FRIENDSNAMEKEY) {
                            firebase.database().ref('Users').on('child_added',
                                function (UIDs) {
                                    firebase.database().ref('Users').child(UIDs.key)
                                        .child('User/About/Authentic').child(FRIENDSNAMEKEY.key)
                                        .child('UID').on('child_added', function (FRIENDSUIDS) {
                                            var USERACTIVE = firebase.database().ref().child('Users');
                                            var USERACTIVES = USERACTIVE.child(FRIENDSUIDS.key).child('User/People/Active/Friends');
                                            USERACTIVES.child(YOURNAME.key).remove();
                                        })
                                })
                        })
                })
        }
    }
})
// Retrieve data
var USERDATABASE = firebase.database().ref('Users');
var USERAUTH = firebase.auth();
// Create element for user
var MESSAGEUSERS;
var USERID;
var ADDPOSTINSEARCH;
var USERDATABASEYOURNAME;
var USERDATABASECOVER;
var USERDATABASEIMAGE;
var USERDATABASENAME;
var USERDATABASESTAT;
var USERDATABASELOCATION;
var USERDATABASEJOINED;
var USERDATABASESUBJECT;
var USERDATABASESOCIALLINK;
var USERDATABASEFRIENDS;
var USERDATABASEUSERPOST;
VISITPROFILE = function (key) {
    setTimeout(() => {
        firebase.database().ref('Users')
            .child(firebase.auth().currentUser.uid)
            .child('User/About/Authentic')
            .on('child_added', function (YOURNAMEKEY) {
                if (YOURNAMEKEY.key == key) {
                    fn.load('see-profile.html');
                    SEETIMELINEREADY();
                    SEEABOUTINTIMELINE();
                    DEFINELOGOUT();
                } else {
                    fn.load('SEARCH-RESULTS.html');
                    console.log('THIS');
                    setTimeout(() => {
                        // SEARCH AGAIN
                        USERS = document.getElementById('USERS');
                        // THIS WILL CREATE AN MESSAGE BUTTON
                        MESSAGEUSERS = document.getElementById('MESSAGEUSER');
                        var SENDMESSAGE = document.createElement('ons-button');
                        SENDMESSAGE.setAttribute('style', 'color: #3498DB;background-color: #fff');
                        SENDMESSAGE.setAttribute('modifier', 'large');
                        SENDMESSAGE.setAttribute('onclick', 'MESSAGEVISITUSER("' + key + '")');
                        var S1 = document.createElement('span');
                        S1.setAttribute('style', 'vertical-align:middle');
                        S1.innerText = 'MESSAGE';
                        var S2 = document.createElement('span');
                        var IMG = document.createElement('img');
                        IMG.setAttribute('style', 'vertical-align:middle');
                        IMG.setAttribute('src', 'https://img.icons8.com/color/38/000000/paper-plane.png');
                        S2.appendChild(IMG);
                        SENDMESSAGE.appendChild(S1);
                        SENDMESSAGE.appendChild(S2);
                        MESSAGEUSERS.appendChild(SENDMESSAGE);
                        // THIS WILL CREATE ADD BUTTON IF
                        USERDATABASE.child(firebase.auth().currentUser.uid)
                            .child('User/About/Authentic').on('child_added',
                                function (NAMEKEY) {
                                    USERDATABASE.child(firebase.auth().currentUser.uid)
                                        .child('User/People').child(NAMEKEY.key)
                                        .on('value', function (CHECKFRIENDS) {
                                            var a = CHECKFRIENDS.child('Friends/' + key).exists() // TRUE
                                            if (a) {
                                                USERID = document.getElementById('USERID');
                                                var ADDBUTTON = document.createElement('ons-button');
                                                ADDBUTTON.setAttribute('style', 'color: #3498DB;background-color: #fff');
                                                ADDBUTTON.setAttribute('modifier', 'large');
                                                ADDBUTTON.setAttribute('onclick', 'UNFRIENDZ("' + key + '")');
                                                var S1 = document.createElement('span');
                                                S1.setAttribute('style', 'vertical-align:middle');
                                                S1.innerText = 'FRIENDS';
                                                var S2 = document.createElement('span');
                                                var IMG = document.createElement('img');
                                                IMG.setAttribute('style', 'vertical-align:middle');
                                                IMG.setAttribute('src', 'https://img.icons8.com/color/38/000000/user-group-man-woman.png');
                                                S2.appendChild(IMG);
                                                ADDBUTTON.appendChild(S1);
                                                ADDBUTTON.appendChild(S2);
                                                USERID.appendChild(ADDBUTTON);
                                                
                                                // CREATE ADD POST BUTTON
                                                ADDPOSTINSEARCH = document.getElementById('ADDPOSTINSEARCH');
                                                var ONSFAB = document.createElement('ons-fab');
                                                ONSFAB.setAttribute('style', 'background-color: #3498DB;color: #fff');
                                                ONSFAB.setAttribute('position', 'bottom center');
                                                ONSFAB.setAttribute('onclick', 'FRIENDSPOSTS("' + key + '")');
                                                var ONSICON = document.createElement('ons-icon');
                                                ONSICON.setAttribute('icon', 'md-plus');
                                                ONSFAB.appendChild(ONSICON);
                                                ADDPOSTINSEARCH.appendChild(ONSFAB);
                                            } else {
                                                USERID = document.getElementById('USERID');
                                                var ADDBUTTON = document.createElement('ons-button');
                                                ADDBUTTON.setAttribute('style', 'color: #3498DB;background-color: #fff');
                                                ADDBUTTON.setAttribute('modifier', 'large');
                                                ADDBUTTON.setAttribute('onclick', 'FRIENDZ("' + key + '")');
                                                var S1 = document.createElement('span');
                                                S1.setAttribute('style', 'vertical-align:middle');
                                                S1.innerText = 'ADD FRIEND';
                                                var S2 = document.createElement('span');
                                                var IMG = document.createElement('img');
                                                IMG.setAttribute('style', 'vertical-align:middle');
                                                IMG.setAttribute('src', 'https://img.icons8.com/color/38/000000/add-user-male.png');
                                                S2.appendChild(IMG);
                                                ADDBUTTON.appendChild(S1);
                                                ADDBUTTON.appendChild(S2);
                                                USERID.appendChild(ADDBUTTON);
                                            }
                                        })
                                })
                        USERDATABASEYOURNAME = document.getElementById('USERBANNERNAME');
                        USERDATABASECOVER = document.getElementById('USERCOVER');
                        USERDATABASEIMAGE = document.getElementById('USERIMAGE');
                        USERDATABASENAME = document.getElementById('USERNAME');
                        USERDATABASESTAT = document.getElementById('USERSTAT');
                        USERDATABASELOCATION = document.getElementById('USERLOCATION');
                        USERDATABASEJOINED = document.getElementById('USERJOINED');
                        USERDATABASESUBJECT = document.getElementById('USERSUBJECT');
                        USERDATABASESOCIALLINK = document.getElementById('USERLINK');
                        USERDATABASEFRIENDS = document.getElementById('USERFRIENDS');
                        USERDATABASEUSERPOST = document.getElementById('USERPOST');
                    }, 2000);
                    setTimeout(() => {
                        // Call database
                        firebase.database().ref('Users').on('child_added',
                            function (UIDs) {
                                firebase.database().ref('Users').child(UIDs.key)
                                    .child('User/About/Authentic').child(key).child('UID').on('child_added',
                                        function (USERUID) {
                                            // Retrieve data
                                            USERDATABASE.child(USERUID.key)
                                                .child('User').child('About').orderByKey()
                                                .equalTo('Cover').on('child_added',
                                                    function (snapshot) {
                                                        USERDATABASECOVER.src = snapshot.val();
                                                    });
                                            USERDATABASE.child(USERUID.key)
                                                .child('User').child('About').orderByKey()
                                                .equalTo('Image').on('child_added',
                                                    function (snapshot) {
                                                        USERDATABASEIMAGE.src = snapshot.val();
                                                    });
                                            USERDATABASE.child(USERUID.key)
                                                .child('User').child('About').orderByKey()
                                                .equalTo('Name').on('child_added',
                                                    function (snapshot) {
                                                        USERDATABASENAME.innerText = snapshot.val();
                                                    });
                                            USERDATABASE.child(USERUID.key)
                                                .child('User').child('About').orderByKey()
                                                .equalTo('Rank').on('child_added',
                                                    function (snapshot) {
                                                        USERDATABASESTAT.innerText = snapshot.val();
                                                    });
                                            USERDATABASE.child(USERUID.key)
                                                .child('User').child('About').orderByKey()
                                                .equalTo('Name').on('child_added',
                                                    function (snapshot) {
                                                        var totalWords = snapshot.val();
                                                        var firstWord = totalWords.replace(/ .*/,'');
                                                        USERDATABASEYOURNAME.innerText = firstWord;
                                                    });
                                            USERDATABASE.child(USERUID.key)
                                                .child('User').child('About').orderByKey()
                                                .equalTo('Location').on('child_added',
                                                    function (snapshot) {
                                                        USERDATABASELOCATION.innerText = snapshot.val();
                                                    });
                                            USERDATABASE.child(USERUID.key)
                                                .child('User').child('About').orderByKey()
                                                .equalTo('Joined').on('child_added',
                                                    function (snapshot) {
                                                        USERDATABASEJOINED.innerText = snapshot.val();
                                                    });
                                            USERDATABASE.child(USERUID.key)
                                                .child('User').child('About').orderByKey()
                                                .equalTo('Subject').on('child_added',
                                                    function (snapshot) {
                                                        USERDATABASESUBJECT.innerText = snapshot.val();
                                                    });
                                            USERDATABASE.child(USERUID.key)
                                                .child('User').child('About').orderByKey()
                                                .equalTo('SocialLink').on('child_added',
                                                    function (snapshot) {
                                                        USERDATABASESOCIALLINK.innerText = snapshot.val();
                                                    });
                                            USERDATABASE.child(USERUID.key)
                                                .child('User').child('People').child(key)
                                                .child('Friends').on('child_added',
                                                    function (USERFRIENDS) {
                                                        var SPAN = document.createElement('span');
                                                        var ITEM = document.createElement('span');
                                                        ITEM.innerHTML = USERFRIENDS.val();
                                                        SPAN.appendChild(ITEM);
                                                        USERDATABASEFRIENDS.appendChild(SPAN);
                                                    });
                                            USERDATABASE.child(USERUID.key)
                                                .child('User').child('Post/Timeline')
                                                .child(key).on('child_added',
                                                    function (USERPOST) {
                                                        var SPAN = document.createElement('span');
                                                        var ITEM = document.createElement('span');
                                                        ITEM.innerHTML = USERPOST.val();
                                                        SPAN.appendChild(ITEM);
                                                        USERDATABASEUSERPOST.appendChild(SPAN);
                                                    });
                                        })
                            })
                    }, 3000);
                }
            })
    }, 0000);
}

// OPTION TO ADD OR UNFRIEND THE USERS
// OPTION TO ADD USER
function FRIENDZ(key) {
    setTimeout(() => {
        setTimeout(() => {
            // THIS WILL SYNCH ADD BUTTON IF
            ons.notification.confirm('You are now friends with ' + key + "!");
            USERID.style.display = 'none';
            setTimeout(() => {
                firebase.database().ref().child('Users').child(firebase.auth().currentUser.uid)
                    .child('User/People/Add/People').orderByKey().equalTo(key).on('child_added', function (snapshot) {
                        // THIS WILL ADD USERS TO FRIENDS LIST
                        USERDATABASE.child(firebase.auth().currentUser.uid)
                            .child('User').child('About').orderByKey().equalTo('Name')
                            .on('child_added', function (USERNAME) {
                                firebase.database().ref().child('Users').child(firebase.auth().currentUser.uid)
                                    .child('User').child('People').child(USERNAME.val()).child('Friends').child(key).set(snapshot.val());

                            })
                    })
                firebase.database().ref('Users').on('child_added', function (UIDs) {
                    firebase.database().ref('Users').child(UIDs.key).child('User/About/Authentic')
                        .child(key).child('UID').on('child_added', function (USERUIDs) {
                            // THIS WILL NOTIFY USERS THAT YOU ADD THEM
                            USERDATABASE.child(firebase.auth().currentUser.uid)
                                .child('User').child('About').orderByKey()
                                .equalTo('Image').on('child_added',
                                    function (USERIMAGE) {
                                        var LOCALONE;
                                        var list = document.createElement('ons-list');
                                        list.setAttribute('modifier', 'inset');
                                        // Name
                                        var item0;
                                        item0 = document.createElement('ons-list-item');
                                        var div = document.createElement("div");
                                        div.setAttribute("class", "left");
                                        var srx = document.createElement("img");
                                        srx.setAttribute("class", "list-item__thumbnail");
                                        srx.src = USERIMAGE.val();
                                        item0.appendChild(div);
                                        div.appendChild(srx);

                                        USERDATABASE.child(firebase.auth()
                                                .currentUser.uid).child('User')
                                            .child('About').orderByKey()
                                            .equalTo('Name').on('child_added',
                                                function (USERNAME) {
                                                    var div = document.createElement("div");
                                                    div.setAttribute("class", "center");
                                                    var srx = document.createElement('span');
                                                    srx.setAttribute("class", "list-item__title");
                                                    srx.innerText = USERNAME.val();
                                                    var srxx = document.createElement("span");
                                                    srxx.setAttribute("class", "list-item__subtitle");
                                                    srxx.innerText = USERNAME.val() + " added you.";
                                                    item0.appendChild(div);
                                                    div.appendChild(srx);
                                                    div.appendChild(srxx);
                                                    // Append All
                                                    list.appendChild(item0);
                                                    LOCALONE = list.outerHTML;
                                                    firebase.database().ref('Users').child(USERUIDs.key).child('User')
                                                        .child('Notification/Notification/Thread').push(LOCALONE);
                                                    // THIS WILL ADD A BADGE TO USER
                                                    var SMALL = document.createElement('small');
                                                    var SMALLSPAN = document.createElement('span');
                                                    SMALLSPAN.setAttribute('style', 'position: absolute;top: -10px;right: -10px;padding: 5px 10px;border-radius: 50%;background-color: red;color: white');
                                                    SMALLSPAN.innerText = '+';
                                                    SMALL.appendChild(SMALLSPAN);
                                                    var BADGE = SMALL.outerHTML;
                                                    firebase.database().ref('Users').child(USERUIDs.key).child('User')
                                                        .child('Notification/Notification/Badges/Badge').set(BADGE);
                                                });
                                    });
                        });
                });
                // SHARE YOUR POST TO YOUR FRIENDS IF YOU ADD THEM
                firebase.database().ref('Users').child(firebase.auth().currentUser.uid)
                    .child('User/About/Authentic').on('child_added',
                        function (YOURNAME) {
                            firebase.database().ref('Users').child(firebase.auth().currentUser.uid)
                                .child('User/People').child(YOURNAME.key).child('Friends')
                                .on('value', function (YOURFRIENDSKEYS) {
                                    var a = YOURFRIENDSKEYS.exists();
                                    if (a) {
                                        firebase.database().ref('Users').child(firebase.auth().currentUser.uid)
                                            .child('User/People').child(YOURNAME.key).child('Friends')
                                            .on('child_added', function (YOURFRIENDSKEY) {
                                                firebase.database().ref('Users').on('child_added',
                                                    function (UIDS) {
                                                        firebase.database().ref('Users').child(UIDS.key)
                                                            .child('User/About/Authentic').child(YOURFRIENDSKEY.key)
                                                            .child('UID').on('child_added', function (FRIENDSUIDS) {
                                                                firebase.database().ref('Users').child(firebase.auth().currentUser.uid)
                                                                    .child('User/Post/Timeline').child(YOURNAME.key)
                                                                    .on('value', function (CHECKPOSTS) {
                                                                        var b = CHECKPOSTS.exists();
                                                                        if (b) {
                                                                            firebase.database().ref('Users').child(firebase.auth().currentUser.uid)
                                                                                .child('User/Post/Timeline').child(YOURNAME.key)
                                                                                .on('child_added', function (POSTS) {
                                                                                    firebase.database().ref('Users').child(FRIENDSUIDS.key)
                                                                                        .child('User/Post/Feed').child(YOURFRIENDSKEY.key).child(POSTS.key).set(POSTS.val());
                                                                                })
                                                                        }
                                                                    })
                                                            });
                                                    });
                                            });
                                    };
                                });
                        });
            }, 1000);
        }, 0000);

    }, 0000);
};

// OPTION TO UNFRIEND USER
function UNFRIENDZ(key) {
    firebase.auth().onAuthStateChanged(USER => {
        if (USER) {
            // THIS WILL SYNCH ADD BUTTON IF\
            ons.notification.confirm('You unfriend with ' + key + "!");
            USERID.style.display = 'none';
            USERDATABASE.child(firebase.auth().currentUser.uid)
                .child('User/About/Authentic').on('child_added',
                    function (NAMEKEY) {
                        var USERBADGE = firebase.database().ref().child('Users');
                        var USERBADGES = USERBADGE.child(firebase.auth().currentUser.uid).child('User/People').child(NAMEKEY.key).child('Friends');
                        USERBADGES.child(key).remove();
                        ons.notification.confirm('You are not friends with ' + key + '!');
                    })
        }
    })
}

// OPTION TO MESSAGE THE USER
var CHATUSERNAME;
var MESSAGECLICKRESULTS;
var DELMESSAGE;
var REPLYVALUE;

function MESSAGEVISITUSER(key) {
    setTimeout(() => {
        fn.load("click-message.html");
        console.log('REACHED!');
    }, 0000);
    setTimeout(() => {
        USERDATABASE.on('child_added', function (UIDs) {
            console.log('REACHED!');
            USERDATABASE.child(firebase.auth().currentUser.uid + '/User/About/Authentic').on('child_added', function (YOURNAME) {
                USERDATABASE.child(UIDs.key + '/User/About/Authentic/' + key + '/UID').orderByKey().on('child_added', function (USERUID) {
                    USERDATABASE.child(USERUID.key + '/User/Message/' + YOURNAME.key + '/Message').on('child_added', function (message) {
                        console.log('REACHED!');
                        var span = document.createElement('span');
                        var item = document.createElement('span');
                        item.innerHTML = message.val();
                        MESSAGECLICKRESULTS = document.getElementById('MESSAGECLICKRESULTS');
                        MESSAGECLICKRESULTS.appendChild(span);
                        span.appendChild(item);
                        console.log('REACHED!');
                    })
                })


            })
        })
    }, 1000);
    setTimeout(() => {
        CHATUSERNAME = key;
        document.getElementById('USERNAME').innerText = key;
        REPLYVALUE = document.getElementById('REPLYVALUE');

        DELMESSAGE = document.getElementById('DELMESSAGE');
        }, 0020);
    setTimeout(() => {
        var SPAN = document.createElement('span');
        SPAN.setAttribute('onclick', 'DELMESH("' + key + '")');
        var IMG = document.createElement('img');
        IMG.setAttribute('src', 'https://img.icons8.com/color/38/000000/waste.png');
        IMG.setAttribute('style', 'vertical-align:middle');
        SPAN.appendChild(IMG);
        DELMESSAGE.appendChild(SPAN);
    }, 0030);
    
}

// REPLY TO USERS
function REPLY() {
    setTimeout(() => {
        console.group('REACHED!');
        firebase.auth().onAuthStateChanged(USER => {
            if (USER) {
                console.log('REACHED!');
                var GETMESSAGE = REPLYVALUE.value;
                firebase.database().ref('Users')
                    .on('child_added', function (UIDs) {
                        console.log('REACHED!');
                        firebase.database().ref('Users').child(UIDs.key)
                            .child('User/About/Authentic').on('child_added',
                                function (ALLNAME) {
                                    console.log('REACHED!');
                                    if (CHATUSERNAME == ALLNAME.key) {
                                        // THIS WILL ADD A BADGE TO USER
                                        var SMALL = document.createElement('small');
                                        var SMALLSPAN = document.createElement('span');
                                        SMALLSPAN.setAttribute('style', 'position: absolute;top: -10px;right: -10px;padding: 5px 10px;border-radius: 50%;background-color: red;color: white');
                                        SMALLSPAN.innerText = '+';
                                        SMALL.appendChild(SMALLSPAN);
                                        var BADGE = SMALL.outerHTML;
                                        firebase.database().ref('Users').on('child_added',
                                            function (UIDs) {
                                                firebase.database().ref('Users').child(UIDs.key)
                                                    .child('User/About/Authentic').child(ALLNAME.key)
                                                    .child('UID').on('child_added',
                                                        function (USERUIDs) {
                                                            firebase.database().ref('Users').child(USERUIDs.key).child('User')
                                                                .child('Notification/Message/Badges/Badge').set(BADGE);
                                                        })
                                            })
                                        console.log('WORKING ...');
                                        firebase.database().ref('Users').child(UIDs.key)
                                            .child('User/About/Authentic').child(ALLNAME.key)
                                            .child('UID').on('child_added',
                                                function (USERUID) {
                                                    console.log('REACHED!');
                                                    // ACCESS USER DATABASE
                                                    firebase.database().ref('Users').child(firebase.auth().currentUser.uid)
                                                        .child('User/About/Authentic')
                                                        .on('child_added', function (MYNAME) {
                                                            console.log('REACHED!');
                                                            // MESSAGE TO OTHER DATABASE
                                                            firebase.database().ref('Users').child(firebase.auth().currentUser.uid)
                                                                .child('User').child('About').orderByKey()
                                                                .equalTo('Image').on('child_added',
                                                                    function (USERIMAGE) {
                                                                        console.log('REACHED!');
                                                                        var LOCALONE;
                                                                        var list = document.createElement('ons-list');
                                                                        list.setAttribute('modifier', 'inset');
                                                                        // Name
                                                                        var item0;
                                                                        item0 = document.createElement('ons-list-item');
                                                                        var div = document.createElement("div");
                                                                        div.setAttribute("class", "left");
                                                                        var srx = document.createElement("img");
                                                                        srx.setAttribute("class", "list-item__thumbnail");
                                                                        srx.src = USERIMAGE.val();
                                                                        item0.appendChild(div);
                                                                        div.appendChild(srx);

                                                                        firebase.database().ref('Users').child(firebase.auth()
                                                                                .currentUser.uid).child('User')
                                                                            .child('About').orderByKey()
                                                                            .equalTo('Name').on('child_added',
                                                                                function (USERNAME) {
                                                                                    console.log('REACHED!');
                                                                                    var div = document.createElement("div");
                                                                                    div.setAttribute("class", "center");
                                                                                    var srx = document.createElement('span');
                                                                                    srx.setAttribute("class", "list-item__title");
                                                                                    srx.innerText = USERNAME.val();
                                                                                    var srxx = document.createElement("span");
                                                                                    srxx.setAttribute("class", "list-item__subtitle");
                                                                                    srxx.innerText = MYNAME.key + " messaged sent.";
                                                                                    var item1;
                                                                                    item1 = document.createElement('ons-list-item');
                                                                                    item1.innerText = GETMESSAGE;
                                                                                    item0.appendChild(div);
                                                                                    div.appendChild(srx);
                                                                                    div.appendChild(srxx);
                                                                                    // Append All
                                                                                    list.appendChild(item0);
                                                                                    list.appendChild(item1);
                                                                                    LOCALONE = list.outerHTML;
                                                                                    console.log('REACHED!');
                                                                                    firebase.database().ref('Users').child(USERUID.key)
                                                                                        .child('User/Message').child(MYNAME.key)
                                                                                        .child('Message').push(LOCALONE);
                                                                                    console.log('REACHED!');
                                                                                })
                                                                    })
                                                            //THREAD TO OTHER USER
                                                            firebase.database().ref('Users').child(firebase.auth().currentUser.uid)
                                                                .child('User').child('About').orderByKey()
                                                                .equalTo('Image').on('child_added',
                                                                    function (USERIMAGE) {
                                                                        console.log('REACHED!');
                                                                        var LOCALONE;
                                                                        var list = document.createElement('ons-list');
                                                                        list.setAttribute('modifier', 'inset');
                                                                        list.setAttribute('id', ALLNAME.key);
                                                                        // Name
                                                                        var item0;
                                                                        item0 = document.createElement('ons-list-item');
                                                                        var div = document.createElement("div");
                                                                        div.setAttribute("class", "left");
                                                                        var srx = document.createElement("img");
                                                                        srx.setAttribute("class", "list-item__thumbnail");
                                                                        srx.src = USERIMAGE.val();
                                                                        item0.appendChild(div);
                                                                        div.appendChild(srx);

                                                                        firebase.database().ref('Users').child(firebase.auth()
                                                                                .currentUser.uid).child('User')
                                                                            .child('About').orderByKey()
                                                                            .equalTo('Name').on('child_added',
                                                                                function (USERNAME) {
                                                                                    console.log('REACHED!');
                                                                                    var div = document.createElement("div");
                                                                                    div.setAttribute("class", "center");
                                                                                    var srx = document.createElement('span');
                                                                                    srx.setAttribute("class", "list-item__title");
                                                                                    srx.innerText = USERNAME.val();
                                                                                    var srxx = document.createElement("span");
                                                                                    srxx.setAttribute("class", "list-item__subtitle");
                                                                                    srxx.innerText = MYNAME.key + " message sent.";
                                                                                    var item1 = document.createElement('ons-list-item');
                                                                                    var div1 = document.createElement("div");
                                                                                    div1.setAttribute("class", "center");

                                                                                    var SEEBUTTON = document.createElement('ons-button');
                                                                                    SEEBUTTON.setAttribute('style', 'background-color: #3498DB;color: #fff;border: 1px solid #fff');
                                                                                    SEEBUTTON.setAttribute("onclick", "MESSAGECLICK('" + ALLNAME.key + "')");
                                                                                    SEEBUTTON.setAttribute('modifier', 'large');
                                                                                    var AI = document.createElement('i');
                                                                                    AI.setAttribute('class', 'fa fa-eye fa-1lg');
                                                                                    SEEBUTTON.appendChild(AI);

                                                                                    var DELBUTTON = document.createElement('ons-button');
                                                                                    DELBUTTON.setAttribute('style', 'background-color: #3498DB;color: #fff;border: 1px solid #fff');
                                                                                    DELBUTTON.setAttribute("onclick", "DELMESSAGE('" + ALLNAME.key + "')");
                                                                                    DELBUTTON.setAttribute('modifier', 'large');
                                                                                    var BI = document.createElement('i');
                                                                                    BI.setAttribute('class', 'fa fa-trash fa-1lg');
                                                                                    DELBUTTON.appendChild(BI);

                                                                                    item0.appendChild(div);
                                                                                    div.appendChild(srx);
                                                                                    div.appendChild(srxx);

                                                                                    item1.appendChild(div1);
                                                                                    div1.appendChild(SEEBUTTON);
                                                                                    div1.appendChild(DELBUTTON);
                                                                                    // Append All
                                                                                    list.appendChild(item0);
                                                                                    list.appendChild(item1);
                                                                                    LOCALONE = list.outerHTML;
                                                                                    console.log('REACHED!');
                                                                                    firebase.database().ref('Users').child(USERUID.key)
                                                                                        .child('User/Message').child(MYNAME.key)
                                                                                        .child('Threads').child('Thread').set(LOCALONE);
                                                                                    console.log('REACHED!');
                                                                                })
                                                                    })
                                                            // MESSAGE TO YOUR DATABASE
                                                            firebase.database().ref('Users').child(firebase.auth().currentUser.uid)
                                                                .child('User').child('About').orderByKey()
                                                                .equalTo('Image').on('child_added',
                                                                    function (USERIMAGE) {
                                                                        console.log('REACHED!');
                                                                        var LOCALONE;
                                                                        var list = document.createElement('ons-list');
                                                                        list.setAttribute('modifier', 'inset');
                                                                        // Name
                                                                        var item0;
                                                                        item0 = document.createElement('ons-list-item');
                                                                        var div = document.createElement("div");
                                                                        div.setAttribute("class", "left");
                                                                        var srx = document.createElement("img");
                                                                        srx.setAttribute("class", "list-item__thumbnail");
                                                                        srx.src = USERIMAGE.val();
                                                                        item0.appendChild(div);
                                                                        div.appendChild(srx);

                                                                        firebase.database().ref('Users').child(firebase.auth()
                                                                                .currentUser.uid).child('User')
                                                                            .child('About').orderByKey()
                                                                            .equalTo('Name').on('child_added',
                                                                                function (USERNAME) {
                                                                                    console.log('REACHED!');
                                                                                    var div = document.createElement("div");
                                                                                    div.setAttribute("class", "center");
                                                                                    var srx = document.createElement('span');
                                                                                    srx.setAttribute("class", "list-item__title");
                                                                                    srx.innerText = USERNAME.val();
                                                                                    var srxx = document.createElement("span");
                                                                                    srxx.setAttribute("class", "list-item__subtitle");
                                                                                    srxx.innerText = MYNAME.key + " messaged you.";
                                                                                    var item1;
                                                                                    item1 = document.createElement('ons-list-item');
                                                                                    item1.innerText = GETMESSAGE;
                                                                                    item0.appendChild(div);
                                                                                    div.appendChild(srx);
                                                                                    div.appendChild(srxx);
                                                                                    // Append All
                                                                                    list.appendChild(item0);
                                                                                    list.appendChild(item1);
                                                                                    LOCALONE = list.outerHTML;
                                                                                    console.log('REACHED!');
                                                                                    firebase.database().ref('Users').child(firebase.auth().currentUser.uid)
                                                                                        .child('User/Message').child(ALLNAME.key)
                                                                                        .child('Message').push(LOCALONE);
                                                                                    console.log('REACHED!');
                                                                                })
                                                                    })
                                                            // THREAD TO YOUR DATABASE
                                                            firebase.database().ref('Users').child(firebase.auth().currentUser.uid)
                                                                .child('User').child('About').orderByKey()
                                                                .equalTo('Image').on('child_added',
                                                                    function (USERIMAGE) {
                                                                        console.log('REACHED!');
                                                                        var LOCALONE;
                                                                        var list = document.createElement('ons-list');
                                                                        list.setAttribute('modifier', 'inset');
                                                                        list.setAttribute('id', MYNAME.key);
                                                                        // Name
                                                                        var item0;
                                                                        item0 = document.createElement('ons-list-item');
                                                                        var div = document.createElement("div");
                                                                        div.setAttribute("class", "left");
                                                                        var srx = document.createElement("img");
                                                                        srx.setAttribute("class", "list-item__thumbnail");
                                                                        srx.src = USERIMAGE.val();
                                                                        item0.appendChild(div);
                                                                        div.appendChild(srx);

                                                                        firebase.database().ref('Users').child(firebase.auth()
                                                                                .currentUser.uid).child('User')
                                                                            .child('About').orderByKey()
                                                                            .equalTo('Name').on('child_added',
                                                                                function (USERNAME) {
                                                                                    console.log('REACHED!');
                                                                                    var div = document.createElement("div");
                                                                                    div.setAttribute("class", "center");
                                                                                    var srx = document.createElement('span');
                                                                                    srx.setAttribute("class", "list-item__title");
                                                                                    srx.innerText = USERNAME.val();
                                                                                    var srxx = document.createElement("span");
                                                                                    srxx.setAttribute("class", "list-item__subtitle");
                                                                                    srxx.innerText = MYNAME.key + " message you.";
                                                                                    var item1 = document.createElement('ons-list-item');
                                                                                    var div1 = document.createElement("div");
                                                                                    div1.setAttribute("class", "center");

                                                                                    var SEEBUTTON = document.createElement('ons-button');
                                                                                    SEEBUTTON.setAttribute('style', 'background-color: #3498DB;color: #fff;border: 1px solid #fff');
                                                                                    SEEBUTTON.setAttribute("onclick", "MESSAGECLICK('" + MYNAME.key + "')");
                                                                                    SEEBUTTON.setAttribute('modifier', 'large');
                                                                                    var AI = document.createElement('i');
                                                                                    AI.setAttribute('class', 'fa fa-eye fa-1lg');
                                                                                    SEEBUTTON.appendChild(AI);

                                                                                    var DELBUTTON = document.createElement('ons-button');
                                                                                    DELBUTTON.setAttribute('style', 'background-color: #3498DB;color: #fff;border: 1px solid #fff');
                                                                                    DELBUTTON.setAttribute("onclick", "DELMESSAGE('" + MYNAME.key + "')");
                                                                                    DELBUTTON.setAttribute('modifier', 'large');
                                                                                    var BI = document.createElement('i');
                                                                                    BI.setAttribute('class', 'fa fa-trash fa-1lg');
                                                                                    DELBUTTON.appendChild(BI);

                                                                                    item0.appendChild(div);
                                                                                    div.appendChild(srx);
                                                                                    div.appendChild(srxx);

                                                                                    item1.appendChild(div1);
                                                                                    div1.appendChild(SEEBUTTON);
                                                                                    div1.appendChild(DELBUTTON);
                                                                                    // Append All
                                                                                    list.appendChild(item0);
                                                                                    list.appendChild(item1);
                                                                                    LOCALONE = list.outerHTML;
                                                                                    console.log('REACHED!');
                                                                                    firebase.database().ref('Users').child(firebase.auth().currentUser.uid)
                                                                                        .child('User/Message').child(ALLNAME.key)
                                                                                        .child('Threads').child('Thread').set(LOCALONE);
                                                                                    console.log('REACHED!');
                                                                                })
                                                                    })
                                                        })
                                                })
                                    } else {
                                        console.log(ALLNAME.key);
                                    }
                                })
                    })
            }
        })
    }, 1000);
}