    // FIREBASE DATABASE
    // Create for use
    // Create reference for user
    var USERDATABASE = firebase.database().ref().child('Users');
    // Create element for user
    var USERDATABASEYOURNAME;
    var USERDATABASECOVER;
    var USERDATABASEIMAGE;
    var USERDATABASENAME;
    var USERDATABASESTAT;
    var USERDATABASELOCATION;
    var USERDATABASEJOINED;
    var USERDATABASESUBJECT;
    var USERDATABASESOCIALLINK;

    function SEEABOUTINTIMELINE() {
        setTimeout(() => {
            USERDATABASEYOURNAME = document.getElementById('NM');
            USERDATABASECOVER = document.getElementById('COVER');
            USERDATABASEIMAGE = document.getElementById('img');
            USERDATABASENAME = document.getElementById('nm');
            USERDATABASESTAT = document.getElementById('stt');
            USERDATABASELOCATION = document.getElementById('lc');
            USERDATABASEJOINED = document.getElementById('jn');
            USERDATABASESUBJECT = document.getElementById('ws');
            USERDATABASESOCIALLINK = document.getElementById('lk');
        }, 0000);
        setTimeout(() => {
            // Add a realtime listener user
            // Retrieve data
            USERDATABASE.child(firebase.auth().currentUser.uid)
                .child('User').child('About').orderByKey()
                .equalTo('Cover').on('child_added',
                    function (snapshot) {
                        USERDATABASECOVER.src = snapshot.val();
                    });
            USERDATABASE.child(firebase.auth().currentUser.uid)
                .child('User').child('About').orderByKey()
                .equalTo('Image').on('child_added',
                    function (snapshot) {
                        USERDATABASEIMAGE.src = snapshot.val();
                    });
            USERDATABASE.child(firebase.auth().currentUser.uid)
                .child('User').child('About').orderByKey()
                .equalTo('Name').on('child_added',
                    function (snapshot) {
                        USERDATABASENAME.innerText = snapshot.val();
                    });
            USERDATABASE.child(firebase.auth().currentUser.uid)
                .child('User').child('About').orderByKey()
                .equalTo('Rank').on('child_added',
                    function (snapshot) {
                        USERDATABASESTAT.innerText = snapshot.val();
                    });
            USERDATABASE.child(firebase.auth().currentUser.uid)
                .child('User').child('About').orderByKey()
                .equalTo('Name').on('child_added',
                    function (snapshot) {
                        
                        var totalWords = snapshot.val();
                        var firstWord = totalWords.replace(/ .*/,'');
                        USERDATABASEYOURNAME.innerText = firstWord;
                    });
            USERDATABASE.child(firebase.auth().currentUser.uid)
                .child('User').child('About').orderByKey()
                .equalTo('Location').on('child_added',
                    function (snapshot) {
                        USERDATABASELOCATION.innerText = snapshot.val();
                    });
            USERDATABASE.child(firebase.auth().currentUser.uid)
                .child('User').child('About').orderByKey()
                .equalTo('Joined').on('child_added',
                    function (snapshot) {
                        USERDATABASEJOINED.innerText = snapshot.val();
                    });
            USERDATABASE.child(firebase.auth().currentUser.uid)
                .child('User').child('About').orderByKey()
                .equalTo('Subject').on('child_added',
                    function (snapshot) {
                        USERDATABASESUBJECT.innerText = snapshot.val();
                    });
            USERDATABASE.child(firebase.auth().currentUser.uid)
                .child('User').child('About').orderByKey()
                .equalTo('SocialLink').on('child_added',
                    function (snapshot) {
                        USERDATABASESOCIALLINK.innerText = snapshot.val();
                    });
        }, 1000);
    }

    // OPTION TO VISIT YOUR FRIENDS
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


    function VISITPROFILE(key) {
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
                        setTimeout(() => {
                            // SEARCH AGAIN
                            USERS = document.getElementById('USERS');
                            // THIS WILL CREATE AN MESSAGE BUTTON
                            MESSAGEUSERS = document.getElementById('MESSAGEUSER');
                            var SENDMESSAGE = document.createElement('ons-button');
                            SENDMESSAGE.setAttribute('style', 'color: #3498DB;background-color: #fff');
                            SENDMESSAGE.setAttribute('modifier', 'large');
                            SENDMESSAGE.setAttribute('onclick', 'MESSAGEVISITUSER("' + key + '")');
                            var I = document.createElement('i');
                            I.setAttribute('class', 'fa fa-send');
                            SENDMESSAGE.innerText = 'message';
                            MESSAGEUSERS.appendChild(SENDMESSAGE);
                            SENDMESSAGE.appendChild(I);
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
                                                    ADDBUTTON.setAttribute('onclick', 'UNFRIENDS("' + key + '")');
                                                    ADDBUTTON.innerText = 'FRIENDS';
                                                    var I = document.createElement('i');
                                                    I.setAttribute('class', 'fa fa-user');
                                                    ADDBUTTON.appendChild(I);
                                                    USERID.appendChild(ADDBUTTON);
                                                    // CREATE ADD POST BUTTON
                                                    ADDPOSTINSEARCH = document.getElementById('ADDPOSTINSEARCH');
                                                    var ONSFAB = document.createElement('ons-fab');
                                                    ONSFAB.setAttribute('style', 'background-color: #3498DB;color: #fff');
                                                    ONSFAB.setAttribute('position', 'bottom right');
                                                    ONSFAB.setAttribute('onclick', 'FRIENDSPOSTS("' + key + '")');
                                                    var ONSICON = document.createElement('ons-icon');
                                                    ONSICON.setAttribute('icon', 'md-plus');
                                                    ONSFAB.appendChild(ONSICON);
                                                    ADDPOSTINSEARCH.appendChild(ONSFAB);
                                                } else {
                                                    USERID = document.getElementById('USERID');
                                                    var UNFRIENDADDBUTTON = document.createElement('ons-button');
                                                    UNFRIENDADDBUTTON.setAttribute('style', 'color: #3498DB;background-color: #fff');
                                                    UNFRIENDADDBUTTON.setAttribute('modifier', 'large');
                                                    UNFRIENDADDBUTTON.setAttribute('onclick', 'FRIENDS("' + key + '")');
                                                    UNFRIENDADDBUTTON.innerText = 'ADD FRIEND';
                                                    var I = document.createElement('i');
                                                    I.setAttribute('class', 'fa fa-user-plus');
                                                    UNFRIENDADDBUTTON.appendChild(I);
                                                    USERID.appendChild(UNFRIENDADDBUTTON);
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
                                                            USERDATABASEYOURNAME.innerText = snapshot.val();
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
    function FRIENDS(key) {
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
    function UNFRIENDS(key) {
        // THIS WILL SYNCH ADD BUTTON IF
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

    // POST TO YOUR FRIEND
    // ENABLE DATABASE REFERENCE
    var USERDATABASE = firebase.database().ref().child('Users');
    // GLOBAL SCOPE TO SEE SHARED IF FUNCTION SEE READY HAS BEEN CLICK
    var SHAREDONTIMELINE;
    // GLOBAL SCOPE TO SEE SEE FRENDS IF FUNCTION SEE READY HAS BEEN CLICK
    var SEEFRIENDS;
    var key;
    var TEXTVALUE;
    var SHARETEXT;
    var IMGLIST;
    var STORAGELINK;

    function JUSTUPLOADXX(dialog) {
        setTimeout(() => {
            fn.load('JUSTUPLOAD.html');
            HIDEFRIENDSPOST(dialog);
        }, 0000);
        setTimeout(() => {
            document.getElementById('JUSTBACK').innerHTML = "<ons-back-button style=\"color: #fff\" onclick=\"VISITPROFILE('" + key + "')\">BACK</ons-back-button>";
            var JUSTINPUT = document.getElementById('JUSTINPUT');
            var JUSTBUTTON = document.getElementById('JUSTBUTTON');

            var a = document.createElement('ons-input');
            a.setAttribute('style', 'width:100%');
            a.setAttribute('id', 'FRIENDSTEXT');
            a.setAttribute('value', '');
            a.setAttribute('placeholder', 'What are you thinking?');

            var b = document.createElement('ons-button');
            b.setAttribute('id', 'SHAREFRIENDSTEXT');
            b.setAttribute('modifier', 'noshadow');
            b.setAttribute('style', 'width:100%;background-color:#3498DB;color:#fff');
            b.innerHTML = '<b>POST MESSAGE</b>';

            JUSTINPUT.appendChild(a);
            JUSTBUTTON.appendChild(b);
        }, 1000);
        setTimeout(() => {
            TEXTVALUE = document.getElementById('FRIENDSTEXT');
            SHARETEXT = document.getElementById('SHAREFRIENDSTEXT');
            SHARETEXT.addEventListener('click', SHAREFRIENDSTEXT);
        }, 1001);
    }

    function IMAGEUPLOADXX(dialog) {
        setTimeout(() => {
            fn.load('IMAGEUPLOAD.html');
            HIDEFRIENDSPOST(dialog);
        }, 0000);
        setTimeout(() => {
            document.getElementById('IMAGEBACK').innerHTML = "<ons-back-button style=\"color: #fff\" onclick=\"VISITPROFILE('" + key + "')\">BACK</ons-back-button>";
            var IMAGEINPUT = document.getElementById('IMAGEINPUT');
            var IMAGEBUTTON = document.getElementById('IMAGEBUTTON');

            var a = document.createElement('ons-input');
            a.setAttribute('style', 'width:100%');
            a.setAttribute('id', 'FRIENDSTEXT');
            a.setAttribute('value', '');
            a.setAttribute('placeholder', 'Share what you know about your photos and image?');

            var b = document.createElement('ons-button');
            b.setAttribute('id', 'SHAREFRIENDSTEXT');
            b.setAttribute('modifier', 'noshadow');
            b.setAttribute('style', 'width:100%;background-color:#3498DB;color:#fff');
            b.innerHTML = '<b>POST PHOTO AND IMAGE</b>';

            IMAGEINPUT.appendChild(a);
            IMAGEBUTTON.appendChild(b);
        }, 1000);
        setTimeout(() => {
            TEXTVALUE = document.getElementById('FRIENDSTEXT');
            SHARETEXT = document.getElementById('SHAREFRIENDSTEXT');
            SHARETEXT.addEventListener('click', SHAREFRIENDSTEXT);
        }, 1001);
        setTimeout(() => {
            var BUTTONFILEIMAGE = document.getElementById('BUTTONFILEIMAGE');

            BUTTONFILEIMAGE.addEventListener('change', function (e) {
                // Get file and caption
                if (e.target.files[0].size > 200000) {
                    ons.notification.alert('This file is too big! Exceeds to 200KB. Use at below 200KB.');
                } else {
                    var file = e.target.files[0];
                    // Create a storage ref
                    var storageRef = firebase.storage()
                        .ref('Users/' + firebase.auth().currentUser.uid + '/image_post/' + file.name);
                    // Upload the file
                    var task = storageRef.put(file);
                    // Update progress bar
                    task.on('state_changed',
                        function progress() {

                        },
                        function error(err) {
                            console.log(err.message);
                        },
                        function complete() {
                            ons.notification.confirm('Upload successful! Share what you know about your photo or image or post it directly.');
                            // Retrieve data from user
                            storageRef.getDownloadURL().then(function (url) {
                                // Save data
                                IMGLIST = document.createElement('ons-list-item');
                                var div = document.createElement("div");
                                var stx = document.createElement("img");
                                stx.setAttribute("style", "width: 100%");
                                stx.src = url;
                                IMGLIST.appendChild(div);
                                div.appendChild(stx);
                                BUTTONFILEIMAGE.value = "";
                                if (url) {
                                    STORAGELINK = file.name;
                                }
                            });
                        }
                    );

                }
            });
        }, 1002);
    }
    var VIDEOLIST;

    function VIDEOUPLOADXX(dialog) {
        setTimeout(() => {
            fn.load('VIDEOUPLOAD.html');
            HIDEFRIENDSPOST(dialog);
        }, 0000);
        setTimeout(() => {
            document.getElementById('VIDEOBACK').innerHTML = "<ons-back-button style=\"color: #fff\" onclick=\"VISITPROFILE('" + key + "')\">BACK</ons-back-button>";
            var VIDEOINPUT = document.getElementById('VIDEOINPUT');
            var VIDEOBUTTON = document.getElementById('VIDEOBUTTON');

            var a = document.createElement('ons-input');
            a.setAttribute('style', 'width:100%');
            a.setAttribute('id', 'FRIENDSTEXT');
            a.setAttribute('value', '');
            a.setAttribute('placeholder', 'Share what you know about your video and stream?');

            var b = document.createElement('ons-button');
            b.setAttribute('id', 'SHAREFRIENDSTEXT');
            b.setAttribute('modifier', 'noshadow');
            b.setAttribute('style', 'width:100%;background-color:#3498DB;color:#fff');
            b.innerHTML = '<b>POST VIDEO AND STREAM</b>';

            VIDEOINPUT.appendChild(a);
            VIDEOBUTTON.appendChild(b);
        }, 1000);
        setTimeout(() => {
            TEXTVALUE = document.getElementById('FRIENDSTEXT');
            SHARETEXT = document.getElementById('SHAREFRIENDSTEXT');
            SHARETEXT.addEventListener('click', SHAREFRIENDSTEXT);
        }, 1001);
        setTimeout(() => {
            var BUTTONFILEVIDEO = document.getElementById('BUTTONFILEVIDEO');

            BUTTONFILEVIDEO.addEventListener('change', function (e) {
                // Get file and caption
                if (e.target.files[0].size > 5e+6) {
                    ons.notification.alert('This file is too big! Exceeds to 5MB. Use below 5MB.');
                    e.value = "";
                } else {
                    var file = e.target.files[0];
                    // Create a storage ref
                    var storageRef = firebase.storage()
                        .ref('Users/' + firebase.auth().currentUser.uid + '/video_post/' + file.name);
                    // Upload the file
                    var task = storageRef.put(file);
                    // Update progress bar
                    task.on('state_changed',
                        function progress() {

                        },
                        function error(err) {
                            console.log(err.message);
                        },
                        function complete() {
                            ons.notification.confirm('Upload successful! Share what you know about your videos or post it directly.');
                            // Retrieve data from user
                            storageRef.getDownloadURL().then(function (url) {
                                // Save data
                                VIDEOLIST = document.createElement('ons-list-item');
                                var div = document.createElement("div");
                                var stx = document.createElement("video");
                                stx.setAttribute("style", "width: 100%");
                                stx.setAttribute('controls');
                                var VIDEOSOURCE = document.createElement('source');
                                VIDEOSOURCE.src = url;
                                VIDEOSOURCE.setAttribute('type', 'video/mp4');
                                VIDEOLIST.appendChild(div);
                                div.appendChild(stx);
                                stx.appendChild(VIDEOSOURCE);
                                BUTTONFILEVIDEO.value = "";
                                if (url) {
                                    STORAGELINK = file.name;
                                }
                            });
                        }
                    );
                }
            });
        }, 1002);
    }
    var AUDIOLIST;

    function AUDIOUPLOADXX(dialog) {
        setTimeout(() => {
            fn.load('AUDIOUPLOAD.html');
            HIDEFRIENDSPOST(dialog);
        }, 0000);
        setTimeout(() => {
            document.getElementById('AUDIOBACK').innerHTML = "<ons-back-button style=\"color: #fff\" onclick=\"VISITPROFILE('" + key + "')\">BACK</ons-back-button>";
            var AUDIOINPUT = document.getElementById('AUDIOINPUT');
            var AUDIOBUTTON = document.getElementById('AUDIOBUTTON');

            var a = document.createElement('ons-input');
            a.setAttribute('style', 'width:100%');
            a.setAttribute('id', 'FRIENDSTEXT');
            a.setAttribute('value', '');
            a.setAttribute('placeholder', 'Share what you know about your music and audio?');

            var b = document.createElement('ons-button');
            b.setAttribute('id', 'SHAREFRIENDSTEXT');
            b.setAttribute('modifier', 'noshadow');
            b.setAttribute('style', 'width:100%;background-color:#3498DB;color:#fff');
            b.innerHTML = '<b>POST MUSIC AND AUDIO</b>';

            AUDIOINPUT.appendChild(a);
            AUDIOBUTTON.appendChild(b);
        }, 1000);
        setTimeout(() => {
            TEXTVALUE = document.getElementById('FRIENDSTEXT');
            SHARETEXT = document.getElementById('SHAREFRIENDSTEXT');
            SHARETEXT.addEventListener('click', SHAREFRIENDSTEXT);
        }, 1001);
        setTimeout(() => {
            var BUTTONFILEAUDIO = document.getElementById('BUTTONFILEAUDIO');

            BUTTONFILEAUDIO.addEventListener('change', function (e) {
                // Get file and caption
                if (e.target.files[0].size > 5e+6) {
                    ons.notification.alert('This file is too big! Exceeds to 5MB. Use below 5MB.');
                    e.value = "";
                } else {
                    var file = e.target.files[0];
                    // Create a storage ref
                    var storageRef = firebase.storage()
                        .ref('Users/' + firebase.auth().currentUser.uid + '/audio_post/' + file.name);
                    // Upload the file
                    var task = storageRef.put(file);
                    // Update progress bar
                    task.on('state_changed',
                        function progress() {

                        },
                        function error(err) {
                            console.log(err.message);
                        },
                        function complete() {
                            ons.notification.confirm('Upload successful! Share what you know about your audio or music or post it directly.');
                            // Retrieve data from user
                            storageRef.getDownloadURL().then(function (url) {
                                // Save data
                                AUDIOLIST = document.createElement('ons-list-item');
                                var div = document.createElement("div");
                                var stx = document.createElement("audio");
                                stx.setAttribute('controls');
                                var AUDIOSOURCE = document.createElement('source');
                                AUDIOSOURCE.src = url;
                                AUDIOSOURCE.setAttribute('type', 'audio/mp3');
                                AUDIOLIST.appendChild(div);
                                div.appendChild(stx);
                                stx.appendChild(AUDIOSOURCE);
                                BUTTONFILEAUDIO.value = "";
                                if (url) {
                                    STORAGELINK = file.name;
                                }
                            });
                        }
                    );
                }
            });
        }, 1002);
    }
    var DOCUMENTLIST;

    function DOCUMENTUPLOADXX(dialog) {
        setTimeout(() => {
            fn.load('DOCUMENTUPLOAD.html');
            HIDEFRIENDSPOST(dialog);
        }, 0000);
        setTimeout(() => {
            document.getElementById('DOCUMENTBACK').innerHTML = "<ons-back-button style=\"color: #fff\" onclick=\"VISITPROFILE('" + key + "')\">BACK</ons-back-button>";
            var DOCUMENTINPUT = document.getElementById('DOCUMENTINPUT');
            var DOCUMENTBUTTON = document.getElementById('DOCUMENTBUTTON');

            var a = document.createElement('ons-input');
            a.setAttribute('style', 'width:100%');
            a.setAttribute('id', 'FRIENDSTEXT');
            a.setAttribute('value', '');
            a.setAttribute('placeholder', 'Headlines');

            var b = document.createElement('ons-button');
            b.setAttribute('id', 'SHAREFRIENDSTEXT');
            b.setAttribute('modifier', 'noshadow');
            b.setAttribute('style', 'width:100%;background-color:#3498DB;color:#fff');
            b.innerHTML = '<b>POST DOCUMENTS</b>';

            DOCUMENTINPUT.appendChild(a);
            DOCUMENTBUTTON.appendChild(b);
        }, 1000);
        setTimeout(() => {
            TEXTVALUE = document.getElementById('FRIENDSTEXT');
            SHARETEXT = document.getElementById('SHAREFRIENDSTEXT');
            SHARETEXT.addEventListener('click', SHAREFRIENDSTEXT);
        }, 1001);
        setTimeout(() => {
            var BUTTONFILEDOCUMENT = document.getElementById('BUTTONFILEDOCUMENT');

            BUTTONFILEDOCUMENT.addEventListener('change', function (e) {
                // Get file and caption
                if (e.target.files[0].size > 1000000) {
                    ons.notification.alert('This file is too big! Exceeds 1MB. Use below 1MB.');
                    e.value = "";
                } else {
                    var file = e.target.files[0];
                    // Create a storage ref
                    var storageRef = firebase.storage()
                        .ref('Users/' + firebase.auth().currentUser.uid + '/document_post/' + file.name);
                    // Upload the file
                    var task = storageRef.put(file);
                    // Update progress bar
                    task.on('state_changed',
                        function progress() {

                        },
                        function error(err) {
                            console.log(err.message);
                        },
                        function complete() {
                            ons.notification.confirm('Upload successful! Share what you know about your document or post it directly.');
                            // Retrieve data from user
                            storageRef.getDownloadURL().then(function (url) {
                                // Save data
                                var DOCUMENTDESCRIPTION = document.getElementById('DOCUMENTDESCRIPTION').value;
                                var DOCUMENTURL = document.getElementById('DOCUMENTURL').value;
                                // Save data
                                function formatDate(date) {
                                    var monthNames = [
                                        "January", "February", "March",
                                        "April", "May", "June", "July",
                                        "August", "September", "October",
                                        "November", "December"
                                    ];

                                    var day = date.getDate();
                                    var monthIndex = date.getMonth();
                                    var year = date.getFullYear();

                                    return day + ' ' + monthNames[monthIndex] + ' ' + year;
                                }

                                var TIME = formatDate(new Date());
                                DOCUMENTLIST = document.createElement('ons-list-item');
                                DOCUMENTLIST.setAttribute('expandable');
                                var LI1 = document.createElement('p');
                                LI1.innerHTML = "<span><img style=\"vertical-align:middle\" src=\"https://img.icons8.com/color/38/000000/copy.png\"></span><span style=\"vertical-align:middle;color:#3498DB;font-size:100%\"><b><small>Documents</small></b></span>&nbspin&nbsp<b>" + TIME + "</b>";
                                DOCUMENTLIST.appendChild(LI1);
                                var div = document.createElement('div');
                                div.setAttribute('class', 'expandable-content');

                                var L = document.createElement('ons-list');

                                var UL1 = document.createElement('ons-list-item');
                                UL1.innerText = DOCUMENTDESCRIPTION;

                                var UL2 = document.createElement('ons-list-item');
                                UL2.innerHTML = "<span onclick=\"window.open('" + url + "', '_blank', 'location=yes')\"><img style=\"vertical-align:middle\" src=\"https://img.icons8.com/color/38/000000/link.png\"></span><span style=\"vertical-align:middle;color:#3498DB\"><b><small>&nbspLink</small></b></span>";

                                var UL3 = document.createElement('ons-list-item');
                                UL3.innerHTML = "<b style=\"color:#3498DB\"><small onclick=\"window.open('" + DOCUMENTURL + "', '_blank', 'location=yes')\">" + DOCUMENTURL + "</small></b>";

                                var UL4 = document.createElement('ons-list-item');

                                var iframe = document.createElement("iframe");
                                iframe.setAttribute("width", "100%");
                                iframe.setAttribute("height", "500px");
                                iframe.setAttribute("scrolling", "yes");
                                iframe.src = url;
                                UL4.appendChild(iframe);

                                L.appendChild(UL1);
                                L.appendChild(UL2);
                                L.appendChild(UL3);
                                L.appendChild(UL4);

                                DOCUMENTLIST.appendChild(div);
                                div.appendChild(L);
                                BUTTONFILEDOCUMENT.value = "";
                                if (url) {
                                    STORAGELINK = file.name;
                                }
                            });
                        }
                    );
                }
            });
        }, 1002);
    }
    var ZIPLIST;

    function ZIPUPLOADXX(dialog) {
        setTimeout(() => {
            fn.load('ZIPUPLOAD.html');
            HIDEFRIENDSPOST(dialog);
        }, 0000);
        setTimeout(() => {
            document.getElementById('ZIPBACK').innerHTML = "<ons-back-button style=\"color: #fff\" onclick=\"VISITPROFILE('" + key + "')\">BACK</ons-back-button>";
            var ZIPINPUT = document.getElementById('ZIPINPUT');
            var ZIPBUTTON = document.getElementById('ZIPBUTTON');

            var a = document.createElement('ons-input');
            a.setAttribute('style', 'width:100%');
            a.setAttribute('id', 'FRIENDSTEXT');
            a.setAttribute('value', '');
            a.setAttribute('placeholder', 'Share what you know about your download?');

            var b = document.createElement('ons-button');
            b.setAttribute('id', 'SHAREFRIENDSTEXT');
            b.setAttribute('modifier', 'noshadow');
            b.setAttribute('style', 'width:100%;background-color:#3498DB;color:#fff');
            b.innerHTML = '<b>POST DOWNLOAD</b>';

            ZIPINPUT.appendChild(a);
            ZIPBUTTON.appendChild(b);
        }, 1000);
        setTimeout(() => {
            TEXTVALUE = document.getElementById('FRIENDSTEXT');
            SHARETEXT = document.getElementById('SHAREFRIENDSTEXT');
            SHARETEXT.addEventListener('click', SHAREFRIENDSTEXT);
        }, 1001);
        setTimeout(() => {
            var BUTTONFILEZIP = document.getElementById('BUTTONFILEZIP');
           
            BUTTONFILEZIP.addEventListener('change', function (e) {
                // Get file and caption
                if (e.target.files[0].size > 1000000) {
                    ons.notification.alert('This file is too big. Exceeds to 1MB. Use below 1MB.')
                    e.value = "";
                } else {
                    var file = e.target.files[0];
                    // Create a storage ref
                    var storageRef = firebase.storage()
                        .ref('Users/' + firebase.auth().currentUser.uid + '/zip_post/' + file.name);
                    // Upload the file
                    var task = storageRef.put(file);
                    // Update progress bar
                    task.on('state_changed',
                        function progress() {
                            
                        },
                        function error(err) {
                            console.log(err.message);
                        },
                        function complete() {
                            ons.notification.confirm('Upload successful! Share what you know about your zip or post it directly.');
                            // Retrieve data from user
                            storageRef.getDownloadURL().then(function (url) {
                                // Save data
                                ZIPLIST = document.createElement('ons-list-item');
                                var div = document.createElement("div");
                                var DOWNLOADBUTTON = document.createElement('ons-button');
                                DOWNLOADBUTTON.setAttribute('style', 'background-color: #3498DB');
                                DOWNLOADBUTTON.setAttribute('modifier', 'large');
                                DOWNLOADBUTTON.setAttribute('type', 'submit');
                                DOWNLOADBUTTON.setAttribute('onclick', 'window.open("' + url + '", "_blank", "location=yes")');
                                DOWNLOADBUTTON.innerHTML = "<span><img style=\"vertical-align:middle\" src=\"https://img.icons8.com/color/38/000000/downloads.png\"></span>&nbsp";
                                DOWNLOADBUTTON.appendChild(document.createTextNode(file.name));
                                ZIPLIST.appendChild(div);
                                div.appendChild(DOWNLOADBUTTON);
                                BUTTONFILEZIP.value = "";
                                if (url) {
                                    STORAGELINK = file.name;
                                }
                            });
                        }
                    );
                }
            });
        }, 1002);
    }

    var ADSLIST;

    function ADSUPLOADXX(dialog) {
        setTimeout(() => {
            fn.load('ADSUPLOAD.html');
            HIDEFRIENDSPOST(dialog);
        }, 0000);
        setTimeout(() => {
            document.getElementById('ADSBACK').innerHTML = "<ons-back-button style=\"color: #fff\" onclick=\"VISITPROFILE('" + key + "')\">BACK</ons-back-button>";
           var ADSINPUT = document.getElementById('ADSINPUT');
           var ADSBUTTON = document.getElementById('ADSBUTTON');

           var a = document.createElement('ons-input');
           a.setAttribute('style', 'width:100%');
           a.setAttribute('id', 'FRIENDSTEXT');
           a.setAttribute('value', '');
           a.setAttribute('placeholder', 'Headlines');

           var b = document.createElement('ons-button');
           b.setAttribute('id', 'SHAREFRIENDSTEXT');
           b.setAttribute('modifier', 'noshadow');
           b.setAttribute('style', 'width:100%;background-color:#3498DB;color:#fff');
           b.innerHTML = '<b>POST ADVERSTISEMENT</b>';

           ADSINPUT.appendChild(a);
           ADSBUTTON.appendChild(b);

           document.getElementById('ADSSELECT').innerHTML = "<img onclick=\"IMAGESELECTEDXX()\" src=\"https://img.icons8.com/color/158/000000/xlarge-icons.png\"><img onclick=\"VIDEOSELECTEDXX()\" src=\"https://img.icons8.com/color/158/000000/tv-show.png\">";

        }, 1000);
        setTimeout(() => {
            TEXTVALUE = document.getElementById('FRIENDSTEXT');
            SHARETEXT = document.getElementById('SHAREFRIENDSTEXT');
            SHARETEXT.addEventListener('click', SHAREFRIENDSTEXT);
        }, 1001);
    }

    function IMAGESELECTEDXX() {
        var ADSDESCRIPTION = document.getElementById('ADSDESCRIPTION').value;
        var ADSLINK = document.getElementById('ADSLINK').value;
        document.getElementById('SELECTEDVIDEO').style.display = 'none';
        document.getElementById('SELECTEDIMAGE').style.display = 'block';
        var SELECTEDIMAGE = document.getElementById('SELECTEDIMAGE');

        var c = document.createElement('p');

        var e = document.createElement('ons-input');
        e.setAttribute('type', 'file');
        e.setAttribute('value', 'upload');
        e.setAttribute('id', 'BUTTONFILEADS');

        c.appendChild(e);

        SELECTEDIMAGE.appendChild(c);

        var BUTTONFILEADS = document.getElementById('BUTTONFILEADS');

        BUTTONFILEADS.addEventListener('change', function (e) {
            // Get file and caption
            if (e.target.files[0].size > 10000000) {
                ons.notification.alert('This file is too big. Exceeds to 10MB. Use below 10MB.');
                e.value = "";
            } else {
                var file = e.target.files[0];
                // Create a storage ref
                var storageRef = firebase.storage()
                    .ref('Users/' + firebase.auth().currentUser.uid + '/ads_post/' + file.name);
                // Upload the file
                var task = storageRef.put(file);
                // Update progress bar
                task.on('state_changed',
                    function progress() {

                    },
                    function error(err) {
                        console.log(err.message);
                    },
                    function complete() {
                        ons.notification.confirm('Upload successful! Share what you know about your Ads or post it directly.');
                        // Retrieve data from user
                        storageRef.getDownloadURL().then(function (url) {
                            // Save data
                            function formatDate(date) {
                                var monthNames = [
                                    "January", "February", "March",
                                    "April", "May", "June", "July",
                                    "August", "September", "October",
                                    "November", "December"
                                ];

                                var day = date.getDate();
                                var monthIndex = date.getMonth();
                                var year = date.getFullYear();

                                return day + ' ' + monthNames[monthIndex] + ' ' + year;
                            }

                            var TIME = formatDate(new Date());
                            ADSLIST = document.createElement('ons-list-item');
                            ADSLIST.setAttribute('expandable');
                            var LI1 = document.createElement('p');
                            LI1.innerHTML = "<span><img style=\"vertical-align:middle\" src=\"https://img.icons8.com/color/38/000000/open-in-window.png\"></span><span style=\"vertical-align:middle;color:#3498DB;font-size:100%\"><b><small>Advertisement</small></b></span>&nbspin&nbsp<b>" + TIME + "</b>";
                            ADSLIST.appendChild(LI1);
                            var div = document.createElement('div');
                            div.setAttribute('class', 'expandable-content');

                            var L = document.createElement('ons-list');

                            var UL1 = document.createElement('ons-list-item');
                            UL1.innerText = ADSDESCRIPTION;

                            var UL2 = document.createElement('ons-list-item');
                            UL2.innerHTML = "<span onclick=\"window.open('" + ADSLINK + "', '_blank', 'location=yes')\"><img style=\"vertical-align:middle\" src=\"https://img.icons8.com/color/38/000000/link.png\"></span><span style=\"vertical-align:middle;color:#3498DB\"><b><small>&nbspLink</small></b></span>";

                            var UL3 = document.createElement('ons-list-item');
                            UL3.innerHTML = "<b style=\"color:#3498DB\"><small onclick=\"window.open('" + ADSLINK + "', '_blank', 'location=yes')\">" + ADSLINK + "</small></b>";

                            var UL4 = document.createElement('ons-list-item');

                            var image = document.createElement("img");
                            image.setAttribute("style", "width: 100%");
                            image.src = url;
                            UL4.appendChild(image);

                            L.appendChild(UL1);
                            L.appendChild(UL2);
                            L.appendChild(UL3);
                            L.appendChild(UL4);

                            ADSLIST.appendChild(div);
                            div.appendChild(L);
                            BUTTONFILEADS.value = "";
                            if (url) {
                                STORAGELINK = file.name;
                            }
                        });
                    }
                );
            }
        });
    }
function VIDEOSELECTEDXX() {
    var ADSDESCRIPTION = document.getElementById('ADSDESCRIPTION').value;
    var ADSLINK = document.getElementById('ADSLINK').value;
    document.getElementById('SELECTEDIMAGE').style.display = 'none';
    document.getElementById('SELECTEDVIDEO').style.display = 'block';
    var SELECTEDVIDEO = document.getElementById('SELECTEDVIDEO');

    var c = document.createElement('p');
    var d = document.createElement('progress');
    d.setAttribute('value', 0);
    d.setAttribute('max', 100);
    d.setAttribute('id', 'ADSUPLOADER');

    var e = document.createElement('ons-input');
    e.setAttribute('type', 'file');
    e.setAttribute('value', 'upload');
    e.setAttribute('id', 'BUTTONFILEADS');

    c.appendChild(d);
    c.appendChild(e);

    SELECTEDVIDEO.appendChild(c);

    var BUTTONFILEADS = document.getElementById('BUTTONFILEADS');
    
    BUTTONFILEADS.addEventListener('change', function (e) {
        // Get file and caption
        if (e.target.files[0].size > 10000000) {
            ons.notification.alert('This file is too big. Exceeds to 10MB. Use below 10MB.');
            e.value = "";
        } else {
            var file = e.target.files[0];
            // Create a storage ref
            var storageRef = firebase.storage()
                .ref('Users/' + firebase.auth().currentUser.uid + '/ads_post/' + file.name);
            // Upload the file
            var task = storageRef.put(file);
            // Update progress bar
            task.on('state_changed',
                function progress() {
                    
                },
                function error(err) {
                    console.log(err.message);
                },
                function complete() {
                    ons.notification.confirm('Upload successful! Share what you know about your Ads or post it directly.');
                    // Retrieve data from user
                    storageRef.getDownloadURL().then(function (url) {
                        // Save data
                        function formatDate(date) {
                            var monthNames = [
                                "January", "February", "March",
                                "April", "May", "June", "July",
                                "August", "September", "October",
                                "November", "December"
                            ];

                            var day = date.getDate();
                            var monthIndex = date.getMonth();
                            var year = date.getFullYear();

                            return day + ' ' + monthNames[monthIndex] + ' ' + year;
                        }

                        var TIME = formatDate(new Date());
                        ADSLIST = document.createElement('ons-list-item');
                        ADSLIST.setAttribute('expandable');
                        var LI1 = document.createElement('p');
                        LI1.innerHTML = "<span><img style=\"vertical-align:middle\" src=\"https://img.icons8.com/color/38/000000/open-in-window.png\"></span><span style=\"vertical-align:middle;color:#3498DB;font-size:100%\"><b><small>Advertisement</small></b></span>&nbspin&nbsp<b>" + TIME + "</b>";
                        ADSLIST.appendChild(LI1);
                        var div = document.createElement('div');
                        div.setAttribute('class', 'expandable-content');

                        var L = document.createElement('ons-list');
                        var UL1 = document.createElement('ons-list-item');
                        UL1.innerText = ADSDESCRIPTION;

                        var UL2 = document.createElement('ons-list-item');
                        UL2.innerHTML = "<span onclick=\"window.open('" + ADSLINK + "', '_blank', 'location=yes')\"><img style=\"vertical-align:middle\" src=\"https://img.icons8.com/color/38/000000/link.png\"></span><span style=\"vertical-align:middle;color:#3498DB\"><b><small>&nbspLink</small></b></span>";

                        var UL3 = document.createElement('ons-list-item');
                        UL3.innerHTML = "<b style=\"color:#3498DB\"><small onclick=\"window.open('" + ADSLINK + "', '_blank', 'location=yes')\">" + ADSLINK + "</small></b>";

                        var UL4 = document.createElement('ons-list-item');

                        var video = document.createElement("video");
                        video.setAttribute("style", "width: 100%");
                        video.setAttribute('controls');
                        var source = document.createElement('source');
                        source.src = url;
                        source.setAttribute('type', 'video/mp4');
                        video.appendChild(source);
                        UL4.appendChild(video);

                        L.appendChild(UL1);
                        L.appendChild(UL2);
                        L.appendChild(UL3);
                        L.appendChild(UL4);

                        ADSLIST.appendChild(div);
                        div.appendChild(L);
                        BUTTONFILEADS.value = "";
                        if (url) {
                            STORAGELINK = file.name;
                        }
                    });
                }
            );
        }
    });
}

    var JOBLIST;

    function JOBUPLOADXX(dialog) {
        setTimeout(() => {
            fn.load('JOBUPLOAD.html');
            HIDEFRIENDSPOST(dialog);
        }, 0000);
        setTimeout(() => {
            document.getElementById('JOBBACK').innerHTML = "<ons-back-button style=\"color: #fff\" onclick=\"VISITPROFILE('" + key + "')\">BACK</ons-back-button>";
            var JOBINPUT = document.getElementById('JOBINPUT');
            var JOBBUTTON = document.getElementById('JOBBUTTON');

            var a = document.createElement('ons-input');
            a.setAttribute('style', 'width:100%');
            a.setAttribute('id', 'FRIENDSTEXT');
            a.setAttribute('value', '');
            a.setAttribute('placeholder', 'Headline');

            var b = document.createElement('ons-button');
            b.setAttribute('id', 'SHAREFRIENDSTEXT');
            b.setAttribute('modifier', 'noshadow');
            b.setAttribute('style', 'width:100%;background-color:#3498DB;color:#fff');
            b.innerHTML = '<b>POST JOB</b>';

            JOBINPUT.appendChild(a);
            JOBBUTTON.appendChild(b);
        }, 1000);
        setTimeout(() => {
            TEXTVALUE = document.getElementById('FRIENDSTEXT');
            SHARETEXT = document.getElementById('SHAREFRIENDSTEXT');
            SHARETEXT.addEventListener('click', SHAREFRIENDSTEXT);
        }, 1001);
        setTimeout(() => {
            var BUTTONFILEJOB = document.getElementById('BUTTONFILEJOB');

            BUTTONFILEJOB.addEventListener('change', function (e) {
                // Get file and caption
                if (e.target.files[0].size > 200000) {
                    ons.notification.alert('This file is too big. Exceeds to 200KB. Use below 200KB.')
                    e.value = "";
                } else {
                    var file = e.target.files[0];
                    // Create a storage ref
                    var storageRef = firebase.storage()
                        .ref('Users/' + firebase.auth().currentUser.uid + '/job_post/' + file.name);
                    // Upload the file
                    var task = storageRef.put(file);
                    // Update progress bar
                    task.on('state_changed',
                        function progress() {

                        },
                        function error(err) {
                            console.log(err.message);
                        },
                        function complete() {
                            ons.notification.confirm('Upload successful! Share what you know about your job or post it directly.');
                            // Retrieve data from user
                            storageRef.getDownloadURL().then(function (url) {
                                // Save data
                                function formatDate(date) {
                                    var monthNames = [
                                        "January", "February", "March",
                                        "April", "May", "June", "July",
                                        "August", "September", "October",
                                        "November", "December"
                                    ];

                                    var day = date.getDate();
                                    var monthIndex = date.getMonth();
                                    var year = date.getFullYear();

                                    return day + ' ' + monthNames[monthIndex] + ' ' + year;
                                }

                                var TIME = formatDate(new Date());
                                var JOBDESCRIPTION = document.getElementById('JOBDESCRIPTION').value;
                                var JOBLINK = document.getElementById('JOBLINK').value;
                                JOBLIST = document.createElement('ons-list-item');
                                JOBLIST.setAttribute('expandable');
                                var LI1 = document.createElement('p');
                                LI1.innerHTML = "<span><img style=\"vertical-align:middle\" src=\"https://img.icons8.com/color/38/000000/find-matching-job.png\"></span><span style=\"vertical-align:middle;color:#3498DB;font-size:100%\"><b><small>Job & Opportunity</small></b></span>&nbspin&nbsp<b>" + TIME + "</b>";
                                JOBLIST.appendChild(LI1);
                                var div = document.createElement('div');
                                div.setAttribute('class', 'expandable-content');

                                var L = document.createElement('ons-list');
                                var UL1 = document.createElement('ons-list-item');
                                UL1.innerText = JOBDESCRIPTION;

                                var UL2 = document.createElement('ons-list-item');
                                UL2.innerHTML = "<span onclick=\"window.open('" + JOBLINK + "', '_blank', 'location=yes')\"><img style=\"vertical-align:middle\" src=\"https://img.icons8.com/color/38/000000/link.png\"></span><span style=\"vertical-align:middle;color:#3498DB\"><b><small>&nbspLink</small></b></span>";

                                var UL3 = document.createElement('ons-list-item');
                                UL3.innerHTML = "<b style=\"color:#3498DB\"><small onclick=\"window.open('" + JOBLINK + "', '_blank', 'location=yes')\">" + JOBLINK + "</small></b>";

                                var UL4 = document.createElement('ons-list-item');

                                var image = document.createElement("img");
                                image.setAttribute("style", "width: 100%");
                                image.src = url;
                                UL4.appendChild(image);

                                L.appendChild(UL1);
                                L.appendChild(UL2);
                                L.appendChild(UL3);
                                L.appendChild(UL4);

                                JOBLIST.appendChild(div);
                                div.appendChild(L);
                                BUTTONFILEJOB.value = "";
                                if (url) {
                                    STORAGELINK = file.name;
                                }
                            });
                        }
                    );
                }
            });
        }, 1002);
    }

    function HOWTOUPLOADXX(dialog) {
        setTimeout(() => {
            fn.load('HOWTOUPLOAD.html');
            HIDEFRIENDSPOST(dialog);
        }, 0000);
        setTimeout(() => {
            document.getElementById('HOWTOBACK').innerHTML = "<ons-back-button style=\"color: #fff\" onclick=\"VISITPROFILE('" + key + "')\">BACK</ons-back-button>";
            var HOWTOINPUT = document.getElementById('HOWTOINPUT');
            var HOWTOCONFIRMBUTTON = document.getElementById('HOWTOCONFIRMBUTTON');
            var HOWTOBUTTON = document.getElementById('HOWTOBUTTON');

            var a = document.createElement('ons-input');
            a.setAttribute('style', 'width:100%');
            a.setAttribute('id', 'FRIENDSTEXT');
            a.setAttribute('value', '');
            a.setAttribute('placeholder', 'How To: \"Your title here\"');

            var b = document.createElement('ons-button');
            b.setAttribute('onclick', 'SELECTED7XX()');
            b.setAttribute('modifier', 'noshadow');
            b.setAttribute('style', 'width:100%;background-color:#3498DB;color:#fff');
            b.innerHTML = '<b>CONFIRM</b>';

            var c = document.createElement('ons-button');
            c.setAttribute('id', 'SHAREFRIENDSTEXT');
            c.setAttribute('modifier', 'noshadow');
            c.setAttribute('style', 'width:100%;background-color:#3498DB;color:#fff');
            c.innerHTML = '<b>POST HOW TO EVERYTHING</b>';

            HOWTOINPUT.appendChild(a);
            HOWTOCONFIRMBUTTON.appendChild(b);
            HOWTOBUTTON.appendChild(c);

            // IMAGE
            document.getElementById("HOWTOIMG1").innerHTML = '<img style="width:100%;height:100%" onclick="SELECTED1XX()" id="SL1" src="https://img.icons8.com/color/158/000000/add-image.png">';
            document.getElementById("HOWTOIMG2").innerHTML = '<img style="width:100%;height:100%" onclick="SELECTED2XX()" id="SL2" src="https://img.icons8.com/color/158/000000/add-image.png">';
            document.getElementById("HOWTOIMG3").innerHTML = '<img style="width:100%;height:100%" onclick="SELECTED3XX()" id="SL3" src="https://img.icons8.com/color/158/000000/add-image.png">';
            document.getElementById("HOWTOIMG4").innerHTML = '<img style="width:100%;height:100%" onclick="SELECTED4XX()" id="SL4" src="https://img.icons8.com/color/158/000000/add-image.png">';
            document.getElementById("HOWTOIMG5").innerHTML = '<img style="width:100%;height:100%" onclick="SELECTED5XX()" id="SL5" src="https://img.icons8.com/color/158/000000/add-image.png">';
            document.getElementById("HOWTOIMG6").innerHTML = '<img style="width:100%;height:100%" onclick="SELECTED6XX()" id="SL6" src="https://img.icons8.com/color/158/000000/add-image.png">';
        }, 1000);
        setTimeout(() => {
            TEXTVALUE = document.getElementById('FRIENDSTEXT');
            SHARETEXT = document.getElementById('SHAREFRIENDSTEXT');
            SHARETEXT.addEventListener('click', SHAREFRIENDSTEXT);
        }, 1001);
    }

    var LX1;
    var LX2;
    var LX3;
    var LX4;
    var LX5;
    var LX6;
    var HOWTODESCRIPTION1;
    var HOWTODESCRIPTION2;
    var HOWTODESCRIPTION3;
    var HOWTODESCRIPTION4;
    var HOWTODESCRIPTION5;

    function SELECTED1XX() {
        HOWTODESCRIPTION1 = document.getElementById('HOWTODESCRIPTION1').value;
        var SELECTEDIMAGE1 = document.getElementById('SELECTEDIMAGE1');

        var c = document.createElement('p');
        var e = document.createElement('ons-input');
        e.setAttribute('type', 'file');
        e.setAttribute('value', 'upload');
        e.setAttribute('id', 'BUTTONFILEHOWTO1');

        c.appendChild(e);

        SELECTEDIMAGE1.appendChild(c);

        var BUTTONFILEHOWTO1 = document.getElementById('BUTTONFILEHOWTO1');

        BUTTONFILEHOWTO1.addEventListener('change', function (e) {
            // Get file and caption
            if (e.target.files[0].size > 200000) {
                ons.notification.alert('This file is too big. Exceeds to 200KB. Use below 200KB.');
                e.value = "";
            } else {
                var file = e.target.files[0];
                // Create a storage ref
                var storageRef = firebase.storage()
                    .ref('Users/' + firebase.auth().currentUser.uid + '/howto_post/' + file.name);
                // Upload the file
                var task = storageRef.put(file);
                // Update progress bar
                task.on('state_changed',
                    function progress() {

                    },
                    function error(err) {
                        console.log(err.message);
                    },
                    function complete() {
                        ons.notification.confirm('Upload successful!');
                        // Retrieve data from user
                        storageRef.getDownloadURL().then(function (url) {
                            document.getElementById('SL1').src = url;
                            // Save data
                            LX1 = url;

                            BUTTONFILEHOWTO1.value = "";
                            if (url) {
                                STORAGELINK = file.name;
                            }
                        });
                    }
                );
            }
        });
    }

    function SELECTED2X() {
        HOWTODESCRIPTION2 = document.getElementById('HOWTODESCRIPTION2').value;
        var SELECTEDIMAGE2 = document.getElementById('SELECTEDIMAGE2');

        var c = document.createElement('p');
        var e = document.createElement('ons-input');
        e.setAttribute('type', 'file');
        e.setAttribute('value', 'upload');
        e.setAttribute('id', 'BUTTONFILEHOWTO2');

        c.appendChild(e);

        SELECTEDIMAGE2.appendChild(c);

        var BUTTONFILEHOWTO2 = document.getElementById('BUTTONFILEHOWTO2');

        BUTTONFILEHOWTO2.addEventListener('change', function (e) {
            // Get file and caption
            if (e.target.files[0].size > 200000) {
                ons.notification.alert('This file is too big. Exceeds to 200KB. Use below 200KB.');
                e.value = "";
            } else {
                var file = e.target.files[0];
                // Create a storage ref
                var storageRef = firebase.storage()
                    .ref('Users/' + firebase.auth().currentUser.uid + '/howto_post/' + file.name);
                // Upload the file
                var task = storageRef.put(file);
                // Update progress bar
                task.on('state_changed',
                    function progress() {

                    },
                    function error(err) {
                        console.log(err.message);
                    },
                    function complete() {
                        ons.notification.confirm('Upload successful!');
                        // Retrieve data from user
                        storageRef.getDownloadURL().then(function (url) {
                            document.getElementById('SL2').src = url;
                            // Save data

                            LX2 = url;

                            BUTTONFILEHOWTO2.value = "";
                            if (url) {
                                STORAGELINK = file.name;
                            }
                        });
                    }
                );
            }
        });
    }

    function SELECTED3X() {
        HOWTODESCRIPTION3 = document.getElementById('HOWTODESCRIPTION3').value;
        var SELECTEDIMAGE3 = document.getElementById('SELECTEDIMAGE3');

        var c = document.createElement('p');
        var e = document.createElement('ons-input');
        e.setAttribute('type', 'file');
        e.setAttribute('value', 'upload');
        e.setAttribute('id', 'BUTTONFILEHOWTO3');

        c.appendChild(e);

        SELECTEDIMAGE3.appendChild(c);

        var BUTTONFILEHOWTO3 = document.getElementById('BUTTONFILEHOWTO3');

        BUTTONFILEHOWTO3.addEventListener('change', function (e) {
            // Get file and caption
            if (e.target.files[0].size > 200000) {
                ons.notification.alert('This file is too big. Exceeds to 200KB. Use below 200KB.');
                e.value = "";
            } else {
                var file = e.target.files[0];
                // Create a storage ref
                var storageRef = firebase.storage()
                    .ref('Users/' + firebase.auth().currentUser.uid + '/howto_post/' + file.name);
                // Upload the file
                var task = storageRef.put(file);
                // Update progress bar
                task.on('state_changed',
                    function progress() {

                    },
                    function error(err) {
                        console.log(err.message);
                    },
                    function complete() {
                        ons.notification.confirm('Upload successful!');
                        // Retrieve data from user
                        storageRef.getDownloadURL().then(function (url) {
                            document.getElementById('SL3').src = url;
                            // Save data
                            LX3 = url;

                            BUTTONFILEHOWTO3.value = "";
                            if (url) {
                                STORAGELINK = file.name;
                            }
                        });
                    }
                );
            }
        });
    }

    function SELECTED4X() {
        HOWTODESCRIPTION4 = document.getElementById('HOWTODESCRIPTION4').value;
        var SELECTEDIMAGE4 = document.getElementById('SELECTEDIMAGE4');

        var c = document.createElement('p');
        var e = document.createElement('ons-input');
        e.setAttribute('type', 'file');
        e.setAttribute('value', 'upload');
        e.setAttribute('id', 'BUTTONFILEHOWTO4');

        c.appendChild(e);

        SELECTEDIMAGE4.appendChild(c);

        var BUTTONFILEHOWTO4 = document.getElementById('BUTTONFILEHOWTO4');

        BUTTONFILEHOWTO4.addEventListener('change', function (e) {
            // Get file and caption
            if (e.target.files[0].size > 200000) {
                ons.notification.alert('This file is too big. Exceeds to 200KB. Use below 200KB.');
                e.value = "";
            } else {
                var file = e.target.files[0];
                // Create a storage ref
                var storageRef = firebase.storage()
                    .ref('Users/' + firebase.auth().currentUser.uid + '/howto_post/' + file.name);
                // Upload the file
                var task = storageRef.put(file);
                // Update progress bar
                task.on('state_changed',
                    function progress() {

                    },
                    function error(err) {
                        console.log(err.message);
                    },
                    function complete() {
                        ons.notification.confirm('Upload successful!');
                        // Retrieve data from user
                        storageRef.getDownloadURL().then(function (url) {
                            document.getElementById('SL4').src = url;
                            // Save data

                            LX4 = url;

                            BUTTONFILEHOWTO4.value = "";
                            if (url) {
                                STORAGELINK = file.name;
                            }
                        });
                    }
                );
            }
        });
    }

    var HOWTOLIST;

    function SELECTED5X() {
        HOWTODESCRIPTION5 = document.getElementById('HOWTODESCRIPTION5').value;
        var SELECTEDIMAGE5 = document.getElementById('SELECTEDIMAGE5');

        var c = document.createElement('p');
        var e = document.createElement('ons-input');
        e.setAttribute('type', 'file');
        e.setAttribute('value', 'upload');
        e.setAttribute('id', 'BUTTONFILEHOWTO5');

        c.appendChild(e);

        SELECTEDIMAGE5.appendChild(c);

        var BUTTONFILEHOWTO5 = document.getElementById('BUTTONFILEHOWTO5');

        BUTTONFILEHOWTO5.addEventListener('change', function (e) {
            // Get file and caption
            if (e.target.files[0].size > 200000) {
                ons.notification.alert('This file is too big. Exceeds to 200KB. Use below 200KB.');
                e.value = "";
            } else {
                var file = e.target.files[0];
                // Create a storage ref
                var storageRef = firebase.storage()
                    .ref('Users/' + firebase.auth().currentUser.uid + '/howto_post/' + file.name);
                // Upload the file
                var task = storageRef.put(file);
                // Update progress bar
                task.on('state_changed',
                    function progress() {

                    },
                    function error(err) {
                        console.log(err.message);
                    },
                    function complete() {
                        ons.notification.confirm('Upload successful! Share what you know about your How To Everything.');
                        // Retrieve data from user
                        storageRef.getDownloadURL().then(function (url) {
                            document.getElementById('SL5').src = url;
                            // Save data
                            LX5 = url;

                            BUTTONFILEHOWTO5.value = "";
                            if (url) {
                                STORAGELINK = file.name;
                            }
                        });
                    }
                );
            }
        });
    }

    function SELECTED6X() {
        var SELECTEDIMAGE6 = document.getElementById('SELECTEDIMAGE6');

        var c = document.createElement('p');
        var e = document.createElement('ons-input');
        e.setAttribute('type', 'file');
        e.setAttribute('value', 'upload');
        e.setAttribute('id', 'BUTTONFILEHOWTO6');

        c.appendChild(e);

        SELECTEDIMAGE6.appendChild(c);

        var BUTTONFILEHOWTO6 = document.getElementById('BUTTONFILEHOWTO6');

        BUTTONFILEHOWTO6.addEventListener('change', function (e) {
            // Get file and caption
            if (e.target.files[0].size > 200000) {
                ons.notification.alert('This file is too big. Exceeds to 200KB. Use below 200KB.');
                e.value = "";
            } else {
                var file = e.target.files[0];
                // Create a storage ref
                var storageRef = firebase.storage()
                    .ref('Users/' + firebase.auth().currentUser.uid + '/howto_post/' + file.name);
                // Upload the file
                var task = storageRef.put(file);
                // Update progress bar
                task.on('state_changed',
                    function progress() {

                    },
                    function error(err) {
                        console.log(err.message);
                    },
                    function complete() {
                        ons.notification.confirm('Upload successful!');
                        // Retrieve data from user
                        storageRef.getDownloadURL().then(function (url) {
                            document.getElementById('SL6').src = url;
                            // Save data

                            LX6 = url;

                            BUTTONFILEHOWTO6.value = "";
                            if (url) {
                                STORAGELINK = file.name;
                            }
                        });
                    }
                );
            }
        });
    }


    function SELECTED7X() {
        var L = document.createElement('ons-list');

        var UL1 = document.createElement('ons-list-item');
        UL1.innerText = HOWTODESCRIPTION1;
        var UL2 = document.createElement('ons-list-item');
        var image1 = document.createElement("img");
        image1.setAttribute("style", "width: 100%");
        image1.src = LX1;
        UL2.appendChild(image1);

        var UL3 = document.createElement('ons-list-item');
        UL3.innerText = HOWTODESCRIPTION2;
        var UL4 = document.createElement('ons-list-item');
        var image2 = document.createElement("img");
        image2.setAttribute("style", "width: 100%");
        image2.src = LX2;
        UL4.appendChild(image2);

        var UL5 = document.createElement('ons-list-item');
        UL5.innerText = HOWTODESCRIPTION3;
        var UL6 = document.createElement('ons-list-item');
        var image3 = document.createElement("img");
        image3.setAttribute("style", "width: 100%");
        image3.src = LX3;
        UL6.appendChild(image3);

        var UL7 = document.createElement('ons-list-item');
        UL7.innerText = HOWTODESCRIPTION4;
        var UL8 = document.createElement('ons-list-item');
        var image4 = document.createElement("img");
        image4.setAttribute("style", "width: 100%");
        image4.src = LX4;
        UL8.appendChild(image4);

        var UL9 = document.createElement('ons-list-item');
        UL9.innerText = HOWTODESCRIPTION5;
        var UL10 = document.createElement('ons-list-item');
        var image5 = document.createElement("img");
        image5.setAttribute("style", "width: 100%");
        image5.src = LX5;
        UL10.appendChild(image5);

        var UL11 = document.createElement('ons-list-item');
        var image6 = document.createElement("img");
        image6.setAttribute("style", "width: 100%");
        image6.src = LX6;
        UL11.appendChild(image6);

        L.appendChild(UL1);
        L.appendChild(UL2);
        L.appendChild(UL3);
        L.appendChild(UL4);
        L.appendChild(UL5);
        L.appendChild(UL6);
        L.appendChild(UL7);
        L.appendChild(UL8);
        L.appendChild(UL9);
        L.appendChild(UL10);
        L.appendChild(UL11);

        function formatDate(date) {
            var monthNames = [
                "January", "February", "March",
                "April", "May", "June", "July",
                "August", "September", "October",
                "November", "December"
            ];

            var day = date.getDate();
            var monthIndex = date.getMonth();
            var year = date.getFullYear();

            return day + ' ' + monthNames[monthIndex] + ' ' + year;
        }

        var TIME = formatDate(new Date());

        HOWTOLIST = document.createElement('ons-list');
        var LISTITEM1 = document.createElement('ons-list-item');
        LISTITEM1.innerHTML = "<span><img style=\"vertical-align:middle\" src=\"https://img.icons8.com/color/38/000000/hammer.png\"></span><span style=\"vertical-align:middle;color:#3498DB;font-size:100%\"><b><small>How To Everything</small></b></span>&nbspin&nbsp<b>" + TIME + "</b>";
        var LISTITEM2 = document.createElement('ons-list-item');
        LISTITEM2.setAttribute('expandable');
        var XL = L.outerHTML;
        LISTITEM2.innerHTML = "<div class=\"left\"></div><div class=\"center\"></div><div class=\"right\"></div><div class=\"expandable-content\">" + XL + "</div>";
        HOWTOLIST.appendChild(LISTITEM1);
        HOWTOLIST.appendChild(LISTITEM2);
        ons.notification.confirm('Done!');
    }
// DONATE

var DONATELIST;
    function DONATEUPLOADXX(dialog) {
        setTimeout(() => {
            fn.load('DONATEUPLOAD.html');
            HIDEFRIENDSPOST(dialog);
        }, 0000);
        setTimeout(() => {
            document.getElementById('DONATEBACK').innerHTML = "<ons-back-button style=\"color: #fff\" onclick=\"VISITPROFILE('" + key + "')\">BACK</ons-back-button>";

            var DONATEINPUT = document.getElementById('DONATEINPUT');
            var DONATEBUTTON = document.getElementById('DONATEBUTTON');

            var a = document.createElement('ons-input');
            a.setAttribute('style', 'width:100%');
            a.setAttribute('id', 'FRIENDSTEXT');
            a.setAttribute('value', '');
            a.setAttribute('placeholder', 'Title');

            var b = document.createElement('ons-button');
            b.setAttribute('id', 'SHAREFRIENDSTEXT');
            b.setAttribute('modifier', 'noshadow');
            b.setAttribute('style', 'width:100%;background-color:#3498DB;color:#fff');
            b.innerHTML = '<b>POST DONATION AND CHARITY</b>';

            DONATEINPUT.appendChild(a);
            DONATEBUTTON.appendChild(b);
        }, 1000);
        setTimeout(() => {
            TEXTVALUE = document.getElementById('FRIENDSTEXT');
            SHARETEXT = document.getElementById('SHAREFRIENDSTEXT');
            SHARETEXT.addEventListener('click', SHAREFRIENDSTEXT);
        }, 1001);
        setTimeout(() => {
            var BUTTONFILEDONATE = document.getElementById('BUTTONFILEDONATE');

            BUTTONFILEDONATE.addEventListener('change', function (e) {
                // Get file and caption
                if (e.target.files[0].size > 200000) {
                    ons.notification.alert('This file is too big! Exceeds to 200KB. Use at below 200KB.');
                } else {
                    var file = e.target.files[0];
                    // Create a storage ref
                    var storageRef = firebase.storage()
                        .ref('Users/' + firebase.auth().currentUser.uid + '/donate_post/' + file.name);
                    // Upload the file
                    var task = storageRef.put(file);
                    // Update progress bar
                    task.on('state_changed',
                        function progress() {
                            // EMPTY
                        },
                        function error(err) {
                            console.log(err.message);
                        },
                        function complete() {
                            ons.notification.confirm('Upload successful! Share what you know about your donation and charity.');
                            // Retrieve data from user
                            storageRef.getDownloadURL().then(function (url) {
                                var DONATEDESCRIPTION = document.getElementById('DONATEDESCRIPTION').value;
                                var DONATELINK = document.getElementById('DONATELINK').value;

                                function formatDate(date) {
                                    var monthNames = [
                                        "January", "February", "March",
                                        "April", "May", "June", "July",
                                        "August", "September", "October",
                                        "November", "December"
                                    ];

                                    var day = date.getDate();
                                    var monthIndex = date.getMonth();
                                    var year = date.getFullYear();

                                    return day + ' ' + monthNames[monthIndex] + ' ' + year;
                                }

                                var TIME = formatDate(new Date());
                                DONATELIST = document.createElement('ons-list-item');
                                DONATELIST.setAttribute('expandable');
                                var LI1 = document.createElement('p');
                                LI1.innerHTML = "<span><img style=\"vertical-align:middle\" src=\"https://img.icons8.com/color/38/000000/trust.png\"></span><span style=\"vertical-align:middle;color:#3498DB;font-size:100%\"><b><small>Donation & Charity</small></b></span>&nbspin&nbsp<b>" + TIME + "</b>";
                                DONATELIST.appendChild(LI1);
                                var div = document.createElement('div');
                                div.setAttribute('class', 'expandable-content');

                                var L = document.createElement('ons-list');
                                var UL1 = document.createElement('ons-list-item');
                                UL1.innerText = DONATEDESCRIPTION;

                                var UL2 = document.createElement('ons-list-item');
                                UL2.innerHTML = "<span onclick=\"window.open('" + DONATELINK + "', '_blank', 'location=yes')\"><img style=\"vertical-align:middle\" src=\"https://img.icons8.com/color/38/000000/link.png\"></span><span style=\"vertical-align:middle;color:#3498DB\"><b><small>&nbspLink</small></b></span>";

                                var UL3 = document.createElement('ons-list-item');
                                UL3.innerHTML = "<b style=\"color:#3498DB\"><small onclick=\"window.open('" + DONATELINK + "', '_blank', 'location=yes')\">" + DONATELINK + "</small></b>";

                                var UL4 = document.createElement('ons-list-item');

                                var image = document.createElement("img");
                                image.setAttribute("style", "width: 100%");
                                image.src = url;
                                UL4.appendChild(image);

                                L.appendChild(UL1);
                                L.appendChild(UL2);
                                L.appendChild(UL3);
                                L.appendChild(UL4);

                                DONATELIST.appendChild(div);
                                div.appendChild(L);
                                BUTTONFILEDONATE.value = "";
                                if (url) {
                                    STORAGELINK = file.name;
                                }
                            });
                        }
                    );

                }
            });
        }, 1002);
    }

    var EVENTLIST;

    function EVENTUPLOADXX(dialog) {
        setTimeout(() => {
            fn.load("EVENTUPLOAD.html");
            HIDEFRIENDSPOST(dialog);
        }, 0000);
        setTimeout(() => {
           document.getElementById('EVENTBACK').innerHTML = "<ons-back-button style=\"color: #fff\" onclick=\"VISITPROFILE('" + key + "')\">BACK</ons-back-button>";

            var EVENTINPUT = document.getElementById("EVENTINPUT");
            var EVENTBUTTON = document.getElementById("EVENTBUTTON");

            var a = document.createElement("ons-input");
            a.setAttribute("style", "width:100%");
            a.setAttribute("id", "FRIENDSTEXT");
            a.setAttribute("value", "");
            a.setAttribute("placeholder", "Title");

            var b = document.createElement("ons-button");
            b.setAttribute("id", "SHAREFRIENDSTEXT");
            b.setAttribute("modifier", "noshadow");
            b.setAttribute("style", "width:100%;background-color:#3498DB;color:#fff");
            b.innerHTML = "<b>POST EVENT AND OCCASION</b>";

            EVENTINPUT.appendChild(a);
            EVENTBUTTON.appendChild(b);
        }, 1000);
        setTimeout(() => {
            TEXTVALUE = document.getElementById('FRIENDSTEXT');
            SHARETEXT = document.getElementById('SHAREFRIENDSTEXT');
            SHARETEXT.addEventListener('click', SHAREFRIENDSTEXT);
        }, 1001);
        setTimeout(() => {
            var BUTTONFILEEVENT = document.getElementById("BUTTONFILEEVENT");

            BUTTONFILEEVENT.addEventListener("change", function (e) {
                // Get file and caption
                if (e.target.files[0].size > 200000) {
                    ons.notification.alert(
                        "This file is too big! Exceeds to 200KB. Use at below 200KB."
                    );
                } else {
                    var file = e.target.files[0];
                    // Create a storage ref
                    var storageRef = firebase
                        .storage()
                        .ref(
                            "Users/" +
                            firebase.auth().currentUser.uid +
                            "/event_post/" +
                            file.name
                        );
                    // Upload the file
                    var task = storageRef.put(file);
                    // Update progress bar
                    task.on(
                        "state_changed",
                        function progress() {
                            // EMPTY
                        },
                        function error(err) {
                            console.log(err.message);
                        },
                        function complete() {
                            ons.notification.confirm(
                                "Upload successful! Share what you know about your event and donation."
                            );
                            // Retrieve data from user
                            storageRef.getDownloadURL().then(function (url) {
                                var EVENTDESCRIPTION = document.getElementById(
                                    "EVENTDESCRIPTION"
                                ).value;
                                var EVENTLINK = document.getElementById("EVENTLINK").value;

                                function formatDate(date) {
                                    var monthNames = [
                                        "January",
                                        "February",
                                        "March",
                                        "April",
                                        "May",
                                        "June",
                                        "July",
                                        "August",
                                        "September",
                                        "October",
                                        "November",
                                        "December"
                                    ];

                                    var day = date.getDate();
                                    var monthIndex = date.getMonth();
                                    var year = date.getFullYear();

                                    return day + " " + monthNames[monthIndex] + " " + year;
                                }

                                var TIME = formatDate(new Date());
                                EVENTLIST = document.createElement("ons-list-item");
                                EVENTLIST.setAttribute("expandable");
                                var LI1 = document.createElement("p");
                                LI1.innerHTML =
                                    '<span><img style="vertical-align:middle" src="https://img.icons8.com/color/38/000000/overtime.png"></span><span style="vertical-align:middle;color:#3498DB;font-size:100%"><b><small>Event & Occasion</small></b></span>&nbspin&nbsp<b>' +
                                    TIME +
                                    "</b>";
                                EVENTLIST.appendChild(LI1);
                                var div = document.createElement("div");
                                div.setAttribute("class", "expandable-content");

                                var L = document.createElement("ons-list");
                                var UL1 = document.createElement("ons-list-item");
                                UL1.innerText = EVENTDESCRIPTION;

                                var UL2 = document.createElement("ons-list-item");
                                UL2.innerHTML =
                                    "<span onclick=\"window.open('" +
                                    EVENTLINK +
                                    '\', \'_blank\', \'location=yes\')"><img style="vertical-align:middle" src="https://img.icons8.com/color/38/000000/link.png"></span><span style="vertical-align:middle;color:#3498DB"><b><small>&nbspLink</small></b></span>';

                                var UL3 = document.createElement("ons-list-item");
                                UL3.innerHTML =
                                    '<b style="color:#3498DB"><small onclick="window.open(\'' +
                                    EVENTLINK +
                                    "', '_blank', 'location=yes')\">" +
                                    EVENTLINK +
                                    "</small></b>";

                                var UL4 = document.createElement("ons-list-item");

                                var image = document.createElement("img");
                                image.setAttribute("style", "width: 100%");
                                image.src = url;
                                UL4.appendChild(image);

                                L.appendChild(UL1);
                                L.appendChild(UL2);
                                L.appendChild(UL3);
                                L.appendChild(UL4);

                                EVENTLIST.appendChild(div);
                                div.appendChild(L);
                                BUTTONFILEEVENT.value = "";
                                if (url) {
                                    STORAGELINK = file.name;
                                }
                            });
                        }
                    );
                }
            });
        }, 1002);
    }

    var MARKETLIST;

    function MARKETUPLOADXX(dialog) {
        setTimeout(() => {
            fn.load("MARKETUPLOAD.html");
            HIDEFRIENDSPOST(dialog);
        }, 0000);
        setTimeout(() => {
            document.getElementById('HOWTOBACK').innerHTML = "<ons-back-button style=\"color: #fff\" onclick=\"VISITPROFILE('" + key + "')\">BACK</ons-back-button>";

            var MARKETINPUT = document.getElementById("MARKETINPUT");
            var MARKETBUTTON = document.getElementById("MARKETBUTTON");

            var a = document.createElement("ons-input");
            a.setAttribute("style", "width:100%");
            a.setAttribute("id", "FRIENDSTEXT");
            a.setAttribute("value", "");
            a.setAttribute("placeholder", "Title");

            var b = document.createElement("ons-button");
            b.setAttribute("id", "SHAREFRIENDSTEXT");
            b.setAttribute("modifier", "noshadow");
            b.setAttribute("style", "width:100%;background-color:#3498DB;color:#fff");
            b.innerHTML = "<b>POST MARKET AND PRODUCT</b>";

            MARKETINPUT.appendChild(a);
            MARKETBUTTON.appendChild(b);
        }, 1000);
        setTimeout(() => {
            TEXTVALUE = document.getElementById('FRIENDSTEXT');
            SHARETEXT = document.getElementById('SHAREFRIENDSTEXT');
            SHARETEXT.addEventListener('click', SHAREFRIENDSTEXT);
        }, 1001);
        setTimeout(() => {
            var BUTTONFILEMARKET = document.getElementById("BUTTONFILEMARKET");

            BUTTONFILEMARKET.addEventListener("change", function (e) {
                // Get file and caption
                if (e.target.files[0].size > 200000) {
                    ons.notification.alert(
                        "This file is too big! Exceeds to 200KB. Use at below 200KB."
                    );
                } else {
                    var file = e.target.files[0];
                    // Create a storage ref
                    var storageRef = firebase
                        .storage()
                        .ref(
                            "Users/" +
                            firebase.auth().currentUser.uid +
                            "/market_post/" +
                            file.name
                        );
                    // Upload the file
                    var task = storageRef.put(file);
                    // Update progress bar
                    task.on(
                        "state_changed",
                        function progress() {
                            // EMPTY
                        },
                        function error(err) {
                            console.log(err.message);
                        },
                        function complete() {
                            ons.notification.confirm(
                                "Upload successful! Share what you know about your market and product."
                            );
                            // Retrieve data from user
                            storageRef.getDownloadURL().then(function (url) {
                                var MARKETDESCRIPTION = document.getElementById(
                                    "MARKETDESCRIPTION"
                                ).value;
                                var MARKETLINK = document.getElementById("MARKETLINK").value;

                                function formatDate(date) {
                                    var monthNames = [
                                        "January",
                                        "February",
                                        "March",
                                        "April",
                                        "May",
                                        "June",
                                        "July",
                                        "August",
                                        "September",
                                        "October",
                                        "November",
                                        "December"
                                    ];

                                    var day = date.getDate();
                                    var monthIndex = date.getMonth();
                                    var year = date.getFullYear();

                                    return day + " " + monthNames[monthIndex] + " " + year;
                                }

                                var TIME = formatDate(new Date());
                                MARKETLIST = document.createElement("ons-list-item");
                                MARKETLIST.setAttribute("expandable");
                                var LI1 = document.createElement("p");
                                LI1.innerHTML =
                                    '<span><img style="vertical-align:middle" src="https://img.icons8.com/color/38/000000/shop.png"></span><span style="vertical-align:middle;color:#3498DB;font-size:100%"><b><small>Market & Product</small></b></span>&nbspin&nbsp<b>' +
                                    TIME +
                                    "</b>";
                                MARKETLIST.appendChild(LI1);
                                var div = document.createElement("div");
                                div.setAttribute("class", "expandable-content");

                                var L = document.createElement("ons-list");
                                var UL1 = document.createElement("ons-list-item");
                                UL1.innerText = MARKETDESCRIPTION;

                                var UL2 = document.createElement("ons-list-item");
                                UL2.innerHTML =
                                    "<span onclick=\"window.open('" +
                                    MARKETLINK +
                                    '\', \'_blank\', \'location=yes\')"><img style="vertical-align:middle" src="https://img.icons8.com/color/38/000000/link.png"></span><span style="vertical-align:middle;color:#3498DB"><b><small>&nbspLink</small></b></span>';

                                var UL3 = document.createElement("ons-list-item");
                                UL3.innerHTML =
                                    '<b style="color:#3498DB"><small onclick="window.open(\'' +
                                    MARKETLINK +
                                    "', '_blank', 'location=yes')\">" +
                                    MARKETLINK +
                                    "</small></b>";

                                var UL4 = document.createElement("ons-list-item");

                                var image = document.createElement("img");
                                image.setAttribute("style", "width: 100%");
                                image.src = url;
                                UL4.appendChild(image);

                                L.appendChild(UL1);
                                L.appendChild(UL2);
                                L.appendChild(UL3);
                                L.appendChild(UL4);

                                MARKETLIST.appendChild(div);
                                div.appendChild(L);
                                BUTTONFILEMARKET.value = "";
                                if (url) {
                                    STORAGELINK = file.name;
                                }
                            });
                        }
                    );
                }
            });
        }, 1002);
    }

    var FRIENDSPOSTS = function (keys) {
        key = keys;
        var dialog = document.getElementById('FRIENDSPOST-DIALOG');

        if (dialog) {
            dialog.show();
        } else {
            ons.createElement('FRIENDSPOST.html', {
                    append: true
                })
                .then(function (dialog) {
                    dialog.show();
                });
        }
    };

    var HIDEFRIENDSPOST = function (id) {
        document
            .getElementById(id)
            .hide();
    };

    function SHAREFRIENDSTEXT() {
        console.group('SHARING YOUR POST PROCESSING ...');
        console.log('THERE IS USER!');

        var VALUE = TEXTVALUE.value;
        // Retrieve data from user
        var a;
        USERDATABASE.child(firebase.auth().currentUser.uid + '/User/About/Authentic').on('child_added', function (YOURNAME) {
            a = USERDATABASE.child(firebase.auth().currentUser.uid + '/User/Post/Timeline/' + YOURNAME.key).push().getKey();
        })
        console.log('YOU IMAGE PROCESSING ...');
        USERDATABASE.child(firebase.auth().currentUser.uid)
            .child('User').child('About').orderByKey()
            .equalTo('Image').on('child_added',
                function (YOURIMAGE) {
                    console.log('RETRIEVING YOUR IMAGE IS SUCCESSGUL!');
                    var LOCALONE;
                    var list = document.createElement('ons-list');
                    list.setAttribute('style', 'border: 1px solid #3498DB');
                    list.setAttribute('id', a);
                    // Name
                    var item0;
                    item0 = document.createElement('ons-list-item');
                    var div = document.createElement("div");
                    div.setAttribute("class", "left");
                    var srx = document.createElement("img");
                    srx.setAttribute("class", "list-item__thumbnail");
                    srx.src = YOURIMAGE.val();
                    item0.appendChild(div);
                    div.appendChild(srx);
                    console.log('USER NAME IS  RETRIEVING ....');

                    USERDATABASE.child(firebase.auth()
                            .currentUser.uid).child('User')
                        .child('About').orderByKey()
                        .equalTo('Name').on('child_added',
                            function (YOURNAME) {
                                USERDATABASE.child(firebase.auth()
                                        .currentUser.uid).child('User')
                                    .child('About').orderByKey()
                                    .equalTo('Rank').on('child_added',
                                        function (rank) {
                                            console.log('RETRIEVING YOUR NAME IS SUCCESSFUL!');
                                            var div = document.createElement("div");
                                            div.setAttribute("class", "center");
                                            div.setAttribute("onclick", "GOTOTHISUSER('" + YOURNAME.val() + "')");
                                            var srx = document.createElement('span');
                                            srx.setAttribute("class", "list-item__title");
                                            srx.innerHTML = " From: <b>" + YOURNAME.val() + "</b><br />TO: <b>" + key + "</b>";
                                            var srxx = document.createElement("span");
                                            srxx.setAttribute("class", "list-item__subtitle");
                                            srxx.innerText = rank.val();
                                            item0.appendChild(div);
                                            div.appendChild(srx);
                                            div.appendChild(srxx);
                                        })
                            });
                    USERDATABASE.child(firebase.auth().currentUser.uid).child('User')
                        .child('About').orderByKey().equalTo('Name').on('child_added',
                            function (YOURNAMEVAL) {
                                var item1 = document.createElement('ons-list-item');
                                var div1 = document.createElement("div");
                                div1.innerText = VALUE;
                                var item2 = document.createElement('ons-list-item');
                                var div2 = document.createElement("div");
                                div2.setAttribute('class', 'left');
                                var ONSBUTTON1 = document.createElement('ons-button');
                                ONSBUTTON1.setAttribute('style', 'background-color: #3498DB;border: 1px solid #fff');
                                ONSBUTTON1.setAttribute('onclick', 'LIKE("' + a + '")');
                                var L = document.createElement('i');
                                L.setAttribute('class', 'fa fa-heart fa-2x');
                                L.setAttribute('style', 'color: #fff;border: 1px solid #3498DB');
                                ONSBUTTON1.appendChild(L);
                                var ONSBUTTON2 = document.createElement('ons-button');
                                ONSBUTTON2.setAttribute('style', 'background-color: #3498DB;border: 1px solid #fff');
                                ONSBUTTON2.setAttribute('onclick', 'COMMENTAREA("' + a + '")');
                                var I = document.createElement('i');
                                I.setAttribute('class', 'fa fa-comment fa-2x');
                                I.setAttribute('style', 'color: #fff;border: 1px solid #3498DB');
                                ONSBUTTON2.appendChild(I);
                                var ONSBUTTON3 = document.createElement('ons-button');
                                ONSBUTTON3.setAttribute('style', 'background-color: #3498DB;border: 1px solid #fff');
                                ONSBUTTON3.setAttribute("onclick", "SHARE('" + a + "')");
                                var S = document.createElement('i');
                                S.setAttribute('class', 'fa fa-share fa-2x');
                                S.setAttribute("style", "color: #fff;border: 1px solid #3498DB");
                                ONSBUTTON3.appendChild(S);
                                item1.appendChild(div1);
                                // TRASH BUTTON
                                var ONSBUTTON4 = document.createElement('ons-button');
                                ONSBUTTON4.setAttribute('style', 'background-color: #3498DB;border: 1px solid #fff');
                                if (STORAGELINK) {
                                    ONSBUTTON4.setAttribute('onclick', 'DELPOST("' + firebase.auth().currentUser.uid + '","' + STORAGELINK + '","' + a + '")');
                                } else {
                                    ONSBUTTON4.setAttribute('onclick', 'DELPOSTX("' + firebase.auth().currentUser.uid + '","' + a + '")');
                                }
                                var D = document.createElement('i');
                                D.setAttribute('class', 'fa fa-trash fa-2x');
                                D.setAttribute("style", "color: #fff;border: 1px solid #3498DB");
                                ONSBUTTON4.appendChild(D);

                                // Append All
                                list.appendChild(item0);
                                list.appendChild(item1);
                                if (IMGLIST) {
                                    list.appendChild(IMGLIST);
                                }
                                if (VIDEOLIST) {
                                    list.appendChild(VIDEOLIST);
                                }
                                if (AUDIOLIST) {
                                    list.appendChild(AUDIOLIST);
                                }
                                if (DOCUMENTLIST) {
                                    list.appendChild(DOCUMENTLIST);
                                }
                                if (ZIPLIST) {
                                    list.appendChild(ZIPLIST);
                                }
                                if (ADSLIST) {
                                    list.appendChild(ADSLIST);
                                }
                                if (JOBLIST) {
                                    list.appendChild(JOBLIST);
                                }
                                if (HOWTOLIST) {
                                    list.appendChild(HOWTOLIST);
                                }

                                if (DONATELIST) {
                                    list.appendChild(DONATELIST);
                                }
                                if (EVENTLIST) {
                                    list.appendChild(EVENTLIST);
                                }
                                if (MARKETLIST) {
                                    list.appendChild(MARKETLIST);
                                }
                                list.appendChild(item2);
                                item2.appendChild(div2);
                                div2.appendChild(ONSBUTTON1);
                                div2.appendChild(ONSBUTTON2);
                                div2.appendChild(ONSBUTTON3);
                                div2.appendChild(ONSBUTTON4);
                                LOCALONE = list.outerHTML;

                                if (IMGLIST) {
                                    // POST TO YOU
                                    USERDATABASE.child(firebase.auth().currentUser.uid)
                                        .child('User/Post/Other/Image').child(a).set(LOCALONE);
                                }
                                if (VIDEOLIST) {
                                    // POST TO YOU
                                    USERDATABASE.child(firebase.auth().currentUser.uid)
                                        .child('User/Post/Other/Video').child(a).set(LOCALONE);
                                }
                                if (AUDIOLIST) {
                                    // POST TO YOU
                                    USERDATABASE.child(firebase.auth().currentUser.uid)
                                        .child('User/Post/Other/Audio').child(a).set(LOCALONE);
                                }
                                if (DOCUMENTLIST) {
                                    // POST TO YOU
                                    USERDATABASE.child(firebase.auth().currentUser.uid)
                                        .child('User/Post/Other/Document').child(a).set(LOCALONE);
                                }
                                if (ZIPLIST) {
                                    // POST TO YOU
                                    USERDATABASE.child(firebase.auth().currentUser.uid)
                                        .child('User/Post/Other/Zip').child(a).set(LOCALONE);
                                }
                                if (ADSLIST) {
                                    // POST TO YOU
                                    USERDATABASE.child(firebase.auth().currentUser.uid)
                                        .child('User/Post/Other/Ads').child(a).set(LOCALONE);
                                }
                                if (JOBLIST) {
                                    // POST TO YOU
                                    USERDATABASE.child(firebase.auth().currentUser.uid)
                                        .child('User/Post/Other/Job').child(a).set(LOCALONE);
                                }
                                if (HOWTOLIST) {
                                    // POST TO YOU
                                    USERDATABASE.child(firebase.auth().currentUser.uid)
                                        .child('User/Post/Other/HowTo').child(a).set(LOCALONE);
                                }
                                if (DONATELIST) {
                                    // POST TO YOU
                                    USERDATABASE.child(firebase.auth().currentUser.uid)
                                        .child('User/Post/Other/Donate').child(a).set(LOCALONE);
                                }
                                if (EVENTLIST) {
                                    // POST TO YOU
                                    USERDATABASE.child(firebase.auth().currentUser.uid)
                                        .child('User/Post/Other/Event').child(a).set(LOCALONE);
                                }
                                if (MARKETLIST) {
                                    // POST TO YOU
                                    USERDATABASE.child(firebase.auth().currentUser.uid)
                                        .child('User/Post/Other/Market').child(a).set(LOCALONE);
                                }
                                console.log('POSTING TO YOUR TIMELINE SUCCESSFUL!');
                                //POST TO YOUR FRIENDS ...
                                firebase.database().ref('Users').child(firebase.auth().currentUser.uid)
                                    .child('User/About/Authentic').on('child_added',
                                        function (YOURNAME) {
                                            firebase.database().ref('Users').child(firebase.auth().currentUser.uid)
                                                .child('User/People').child(YOURNAME.key).child('Friends')
                                                .on('value', function (YOURFRIENDSKEY) {
                                                    var b = YOURFRIENDSKEY.exists();
                                                    if (b) {
                                                        firebase.database().ref('Users').child(firebase.auth().currentUser.uid)
                                                            .child('User/People').child(YOURNAME.key).child('Friends')
                                                            .on('child_added', function (YOURFRIENDSKEY) {
                                                                firebase.database().ref('Users').on('child_added',
                                                                    function (UIDS) {
                                                                        firebase.database().ref('Users').child(UIDS.key)
                                                                            .child('User/About/Authentic').child(YOURFRIENDSKEY.key)
                                                                            .child('UID').on('child_added', function (FRIENDSUIDS) {
                                                                                USERDATABASE.child(FRIENDSUIDS.key + '/User/Post/Timeline/' + YOURFRIENDSKEY.key).child(a).set(LOCALONE);
                                                                                USERDATABASE.child(firebase.auth().currentUser.uid + '/User/Post/Feed/' + YOURNAME.key).child(a).set(LOCALONE);
                                                                                /* STORE THE FILES TO IN THE DATABASE TO SEPARATE AND
                                                                                    RETRIEVE BY USERS IN SPECIFIC ORDER*/
                                                                                if (IMGLIST) {
                                                                                    // POST TO FRIENDS
                                                                                    firebase.database().ref('Users').child(FRIENDSUIDS.key)
                                                                                        .child('User/Post/Other/Image').child(a).set(LOCALONE);
                                                                                }
                                                                                if (VIDEOLIST) {
                                                                                    // POST TO FRIENDS
                                                                                    firebase.database().ref('Users').child(FRIENDSUIDS.key)
                                                                                        .child('User/Post/Other/Video').child(a).set(LOCALONE);
                                                                                }
                                                                                if (AUDIOLIST) {
                                                                                    // POST TO FRIENDS
                                                                                    firebase.database().ref('Users').child(FRIENDSUIDS.key)
                                                                                        .child('User/Post/Other/Audio').child(a).set(LOCALONE);
                                                                                }
                                                                                if (DOCUMENTLIST) {
                                                                                    // POST TO FRIENDS
                                                                                    firebase.database().ref('Users').child(FRIENDSUIDS.key)
                                                                                        .child('User/Post/Other/Document').child(a).set(LOCALONE);
                                                                                }
                                                                                if (ZIPLIST) {
                                                                                    // POST TO FRIENDS
                                                                                    firebase.database().ref('Users').child(FRIENDSUIDS.key)
                                                                                        .child('User/Post/Other/Zip').child(a).set(LOCALONE);
                                                                                }
                                                                                if (ADSLIST) {
                                                                                    // POST TO FRIENDS
                                                                                    firebase.database().ref('Users').child(FRIENDSUIDS.key)
                                                                                        .child('User/Post/Other/Ads').child(a).set(LOCALONE);
                                                                                }
                                                                                if (JOBLIST) {
                                                                                    // POST TO YOU
                                                                                    // POST TO FRIENDS
                                                                                    firebase.database().ref('Users').child(FRIENDSUIDS.key)
                                                                                        .child('User/Post/Other/Job').child(a).set(LOCALONE);
                                                                                }

                                                                                if (HOWTOLIST) {
                                                                                    // POST TO YOU
                                                                                    // POST TO FRIENDS
                                                                                    firebase.database().ref('Users').child(FRIENDSUIDS.key)
                                                                                        .child('User/Post/Other/HowTo').child(a).set(LOCALONE);
                                                                                }
                                                                                if (DONATELIST) {
                                                                                    // POST TO YOU
                                                                                    // POST TO FRIENDS
                                                                                    firebase.database().ref('Users').child(FRIENDSUIDS.key)
                                                                                        .child('User/Post/Other/Donate').child(a).set(LOCALONE);
                                                                                }
                                                                                if (EVENTLIST) {
                                                                                    // POST TO YOU
                                                                                    // POST TO FRIENDS
                                                                                    firebase.database().ref('Users').child(FRIENDSUIDS.key)
                                                                                        .child('User/Post/Other/Event').child(a).set(LOCALONE);
                                                                                }
                                                                                if (MARKETLIST) {
                                                                                    // POST TO YOU
                                                                                    // POST TO FRIENDS
                                                                                    firebase.database().ref('Users').child(FRIENDSUIDS.key)
                                                                                        .child('User/Post/Other/Market').child(a).set(LOCALONE);
                                                                                }
                                                                                // EMPTY THE VARIABLE
                                                                                if (IMGLIST) {
                                                                                    IMGLIST = null;
                                                                                }
                                                                                if (VIDEOLIST) {
                                                                                    VIDEOLIST = null;
                                                                                }
                                                                                if (AUDIOLIST) {
                                                                                    AUDIOLIST = null;
                                                                                }
                                                                                if (DOCUMENTLIST) {
                                                                                    DOCUMENTLIST = null;
                                                                                }
                                                                                if (ZIPLIST) {
                                                                                    ZIPLIST = null;
                                                                                }
                                                                                if (ADSLIST) {
                                                                                    ADSLIST = null;
                                                                                }
                                                                                if (JOBLIST) {
                                                                                    JOBLIST = null;
                                                                                }

                                                                                if (HOWTOLIST) {
                                                                                    HOWTOLIST = null;
                                                                                }
                                                                                if (DONATELIST) {
                                                                                    DONATELIST = null;
                                                                                }
                                                                                if (EVENTLIST) {
                                                                                    EVENTLIST = null;
                                                                                }
                                                                                if (MARKETLIST) {
                                                                                    MARKETLIST = null;
                                                                                }
                                                                                if (STORAGELINK) {
                                                                                    STORAGELINK = null;
                                                                                }
                                                                                if (a) {
                                                                                    a = null;
                                                                                }
                                                                                if (VALUE) {
                                                                                    VALUE = null;
                                                                                }
                                                                                VISITPROFILE(key);
                                                                            })
                                                                    })
                                                            })
                                                    } else {
                                                        // EMPTY THE VARIABLE
                                                        if (IMGLIST) {
                                                            IMGLIST = null;
                                                        }
                                                        if (VIDEOLIST) {
                                                            VIDEOLIST = null;
                                                        }
                                                        if (AUDIOLIST) {
                                                            AUDIOLIST = null;
                                                        }
                                                        if (DOCUMENTLIST) {
                                                            DOCUMENTLIST = null;
                                                        }
                                                        if (ZIPLIST) {
                                                            ZIPLIST = null;
                                                        }
                                                        if (ADSLIST) {
                                                            ADSLIST = null;
                                                        }
                                                        if (JOBLIST) {
                                                            JOBLIST = null;
                                                        }

                                                        if (HOWTOLIST) {
                                                            HOWTOLIST = null;
                                                        }
                                                        if (DONATELIST) {
                                                            DONATELIST = null;
                                                        }
                                                        if (EVENTLIST) {
                                                            EVENTLIST = null;
                                                        }
                                                        if (MARKETLIST) {
                                                            MARKETLIST = null;
                                                        }
                                                        if (STORAGELINK) {
                                                            STORAGELINK = null;
                                                        }
                                                        if (a) {
                                                            a = null;
                                                        }
                                                        if (VALUE) {
                                                            VALUE = null;
                                                        }
                                                        VISITPROFILE(key);
                                                    }
                                                })
                                        })
                            })
                })


    }

    // OPTION TO MESSAGE THE USER
    var CHATUSERNAME;
    var USERSNAMEBANNER;
    var MESSAGECLICKRESULTS;
    var REPLYVALUE;

    function MESSAGEVISITUSER(key) {
        setTimeout(() => {
            CHATUSERNAME = key;
            setTimeout(() => {
                setTimeout(() => {
                    fn.load("click-message.html");
                    console.log('REACHED!');
                }, 0000);
                setTimeout(() => {
                    USERSNAMEBANNER = document.getElementById('USERNAME').innerText = key;
                    MESSAGECLICKRESULTS = document.getElementById('MESSAGECLICKRESULTS');
                    REPLYVALUE = document.getElementById('REPLYVALUE');
                    console.log('REACHED!');
                }, 1000);
                setTimeout(() => {
                    console.log('REACHED!');
                    firebase.database().ref('Users')
                        .on('child_added',
                            function (UIDs) {
                                console.log('REACHED!');
                                firebase.database().ref('Users')
                                    .child(firebase.auth().currentUser.uid).child('User')
                                    .child('About/Authentic').orderByKey().on('child_added',
                                        function (YOURNAME) {
                                            console.log(YOURNAME.key);
                                            console.log('REACHED!');
                                            firebase.database().ref('Users').child(UIDs.key)
                                                .child('User/About/Authentic').child(key)
                                                .child('UID').orderByKey().on('child_added', function (USERUID) {
                                                    console.log(USERUID.key);
                                                    firebase.database().ref().child('Users')
                                                        .child(USERUID.key).child('User/Message')
                                                        .child(YOURNAME.key).child('Message').orderByKey()
                                                        .on('child_added', function (message) {
                                                            console.log('REACHED!');
                                                            var span = document.createElement('span');
                                                            var item = document.createElement('span');
                                                            item.innerHTML = message.val();
                                                            MESSAGECLICKRESULTS.appendChild(span);
                                                            span.appendChild(item);
                                                            console.log('REACHED!');
                                                        })
                                                })


                                        })

                            })
                }, 2000);

            }, 1000);
            console.log('REACHED!');
        }, 0000);
    }

    // REPLY TO USERS
    function REPLY() {
        setTimeout(() => {
            console.group('REACHED!');
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

        }, 1000);
    }

    function GOTOTHISUSER(key) {
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
                        console.log('REACHED!');
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
                            firebase.auth().onAuthStateChanged(USERS => {
                                if (USERS) {
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
                                                            ADDBUTTON.setAttribute('onclick', 'UNFRIEND("' + key + '")');
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
                                                            ADDBUTTON.setAttribute('onclick', 'FRIEND("' + key + '")');
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
                                }
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
                                                            var firstWord = totalWords.replace(/ .*/, '');
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
    /*
        // SEE YOUR PICTURES, VIDEOS, MUSIC, ETC.
        function SEEMYIMAGE() {
            setTimeout(() => {
                fn.load('SEEMYDATA.html');
            }, 0000);
            var x, y, z, SEEMYDATARESULTS;
            setTimeout(() => {
                x = document.getElementById('BACKTOYOURTIMELINE');
                y = document.getElementById('GIVETITLE');
                z = document.getElementById('WHATISTHIS');
                SEEMYDATARESULTS = document.getElementById('SEEMYDATARESULTS');
            }, 0010);
            setTimeout(() => {
                x.innerHTML = "<ons-toolbar-button><ons-back-button style=\"color: #fff\" onclick=\"fn.load('see-profile.html'), SEETIMELINEREADY(), SEEABOUTINTIMELINE(), DEFINELOGOUT()\" > BACK</ons-back-button></ons-toolbar-button>";
                y.innerHTML = "<b>Photos & Images</b>";
                z.innerHTML = "<span><img onclick=\"SEEMYIMAGE()\" style=\"vertical-align:middle\" src=\"https://img.icons8.com/color/38/000000/picture.png\"></span>";
            }, 0020);
            var post = firebase.storage().ref('Users/' + firebase.auth().currentUser.uid + '/image_post');
            post.getDownloadURL().then(function (url) {
                // Save data
                var IMGLIST = document.createElement('ons-list');
                var IMGLISTITEM = document.createElement('ons-list-item');
                var DIV = document.createElement("div");
                DIV.setAttribute('class', 'left');
                var IMG = document.createElement("img");
                IMG.setAttribute("style", "width: 50%;height: 50%");
                IMG.src = url;
                SEEMYDATARESULTS.appendChild(IMGLIST);
                IMGLIST.appendChild(IMGLISTITEM);
                IMGLISTITEM.appendChild(DIV);
                DIV.appendChild(IMG);
            });
        }
        */