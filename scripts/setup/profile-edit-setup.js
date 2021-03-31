// FOR PROFILE IMAGE
var PROFILEIMAGE;
var BUTTONFILEPROFILEMAGE;
var img;
var SHOWPROFILEDIALOGUPLOAD;
var HIDEPROFILEDIALOGUPLOAD;
// FOR COVER IMAGE
var COVERIMAGE;
var BUTTONFILECOVERIMAGE;
var IMGCOVER;
var SHOWCOVERDIALOGUPLOAD;
var HIDECOVERDIALOGUPLOAD;
var nm;
var name;
var stat;
var lc;
var jn;
var ws;
var lk;
var STORE;
function EDITPROFILE() {
    setTimeout(() => {
        fn.load('edit-profile.html');
    }, 0000);
    setTimeout(() => {
        SHOWPROFILEDIALOGUPLOAD;
        HIDEPROFILEDIALOGUPLOAD;
        SHOWCOVERDIALOGUPLOAD;
        HIDECOVERDIALOGUPLOAD;
        STORE;
        //Create Elements
        stat = document.getElementById('statu');
        lc = document.getElementById('lc');
        jn = document.getElementById('jn');
        ws = document.getElementById('ws');
        lk = document.getElementById('lk');

        firebase.database().ref('Users').on('value', function(check) {
            var a = check.child(firebase.auth().currentUser.uid).child('User/About/Authentic').exists();
            if(a) {
                firebase.database().ref('Users/' + firebase.auth().currentUser.uid + "/User/About/Authentic").on('child_added',
                function(YOURNAME){
                    document.getElementById('NONAMENOW').innerHTML = "<b><span style=\"color: #fff\">Your current name</span></b><br />" + YOURNAME.key + "";
                    document.getElementById('IDSTORE').innerHTML = "<ons-button modifier=\"noshadow\" style=\"color: #3498DB;background-color: #fff\" onclick=\"STORE()\">Create</ons-button>&nbsp&nbsp&nbsp&nbsp&nbsp<ons-button modifier=\"noshadow\" style=\"color: #3498DB;background-color: #fff\" onclick=\"SEETIMELINEREADY(), SEEABOUTINTIMELINE(), fn.load('see-profile.html')\">Cancel</ons-button>";
                    name = YOURNAME.key;
                });
            } else {
                setTimeout(() => {
                    document.getElementById('IDSTORE').innerHTML = "<ons-button modifier=\"noshadow\" style=\"color: #3498DB;background-color: #fff\" onclick=\"STOREX()\">Create</ons-button>&nbsp&nbsp&nbsp&nbsp&nbsp<ons-button modifier=\"noshadow\" style=\"color: #3498DB;background-color: #fff\" onclick=\"fn.load('homes.html'), SEEPOSTINFEED(), PULLTOREFRESH()\">Cancel</ons-button>";
                }, 0000);
                setTimeout(() => {
                    document.getElementById('NONAMENOW').innerHTML = "<b><span style=\"color: #fff\">Your name</span></b><ons-input id=\"nm\" modifier=\"underbar\" maxlength=\"20\" placeholder=\"Your name?\" value=\"\" float></ons-input>";
                }, 1000);
                setTimeout(() => {
                    nm = document.getElementById('nm');
                }, 2000);
            }
        });

    }, 1000);
}
SHOWPROFILEDIALOGUPLOAD = function () {
    var dialog = document.getElementById('SHOWPROFILEDIALOGUPLOAD-DIALOG');

    if (dialog) {
        dialog.show();
    } else {
        ons.createElement('SHOWPROFILEDIALOGUPLOAD.html', {
                append: true
            })
            .then(function (dialog) {
                dialog.show();
                PROFILEIMAGE = document.getElementById('PROFILEIMAGE');
                BUTTONFILEPROFILEMAGE = document.getElementById('BUTTONFILEPROFILEMAGE');
                img = document.getElementById('img');
                //Listent for file selection
                BUTTONFILEPROFILEMAGE.addEventListener('change', function (e) {
                    // Get file
                    var file = e.target.files[0];
                    // Create a storage ref
                    var storageRef = firebase.storage().ref('Users/' + firebase.auth().currentUser.uid + '/Images/Profile_Images/' + file.name);
                    // Upload file
                    var task = storageRef.put(file);
                    // Update progress bar
                    task.on('state_changed',
                        function progress(snapshot) {
                            var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                            PROFILEIMAGE.value = percentage;
                        },
                        function error(err) {
                            console.log(err);
                        },
                        function complete() {
                            storageRef.getDownloadURL().then(function (url) {
                                img.src = url;
                                BUTTONFILEPROFILEMAGE = "";
                            })
                        }
                    );
                });
            });
    }
};

HIDEPROFILEDIALOGUPLOAD = function (id) {
    document
        .getElementById(id)
        .hide();
};

SHOWCOVERDIALOGUPLOAD = function () {
    var dialog = document.getElementById('SHOWCOVERDIALOGUPLOAD-DIALOG');

    if (dialog) {
        dialog.show();
    } else {
        ons.createElement('SHOWCOVERDIALOGUPLOAD.html', {
                append: true
            })
            .then(function (dialog) {
                dialog.show();
                COVERIMAGE = document.getElementById('COVERIMAGE');
                BUTTONFILECOVERIMAGE = document.getElementById('BUTTONFILECOVERIMAGE');
                IMGCOVER = document.getElementById("IMGCOVER");
                //Listent for file selection
                BUTTONFILECOVERIMAGE.addEventListener('change', function (e) {
                    // Get file
                    var file = e.target.files[0];
                    // Create a storage ref
                    var storageRef = firebase.storage().ref('Users/' + firebase.auth().currentUser.uid + '/Images/Cover_Images/' + file.name);
                    // Upload file
                    var task = storageRef.put(file);
                    // Update progress bar
                    task.on('state_changed',
                        function progress(snapshot) {
                            var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                            COVERIMAGE.value = percentage;
                        },
                        function error(err) {
                            console.log(err);
                        },
                        function complete() {
                            storageRef.getDownloadURL().then(function (url) {
                                IMGCOVER.src = url;
                                BUTTONFILECOVERIMAGE = "";
                            })
                        }
                    );
                });
            });
    }
};

HIDECOVERDIALOGUPLOAD = function (id) {
    document
        .getElementById(id)
        .hide();
};
//Add storing event
STORE = function () {
    setTimeout(() => {
        //Local variable
        if(nm){
            name = nm.value;
        }
        var statuz = stat.value;
        var lcn = lc.value;
        var jnd = jn.value;
        var wst = ws.value;
        var lkn = lk.value;
        var uimg = img.src;
        var COVER = IMGCOVER.src;
        //Save data

        // Create element to enable user fin
        var list0 = document.createElement('ons-list');
        list0.setAttribute('onclick', 'VISITPROFILE("' + name + '")');
        list0.setAttribute('modifier', 'inset');
        list0.setAttribute('style', 'background-color: #3498DB');
        // Name & Image
        var list1 = document.createElement('ons-list-item');
        var div1 = document.createElement('div');
        div1.setAttribute('class', 'left');
        var imgs = document.createElement('img');
        imgs.setAttribute('class', 'list-item__thumbnail');
        imgs.src = uimg;
        var div2 = document.createElement('div');
        div2.setAttribute('class', 'center');
        var span1 = document.createElement('span');
        span1.setAttribute('class', 'list-item__title');
        var p1 = document.createElement('p');
        p1.setAttribute('style', 'color: #fff');
        p1.innerText = name;
        var span2 = document.createElement('span');
        span2.setAttribute('class', 'list-item__subtitle');
        span2.setAttribute('style', 'color: #fff');
        span2.innerText = statuz;
        list1.appendChild(div1);
        list1.appendChild(div2);
        div1.appendChild(imgs);
        div2.appendChild(span1);
        span1.appendChild(p1);
        div2.appendChild(span2);
        // Append all
        list0.appendChild(list1);
        // Outer HTML
        var PEOPLEELEMENT = list0.outerHTML;
        firebase.database().ref('Users').on('child_added', function (snapshot) {
            if (firebase.auth().currentUser.uid == snapshot.key) {
                // YOUR FRIENDS CAN RECIEVE AN UPDATE OF YOURS IN THEIR FRIENDS LIST
                firebase.database().ref('Users').child(firebase.auth().currentUser.uid)
                    .child('User/About/Authentic').on('child_added', function (YOURNAME) {
                        firebase.database().ref('Users').child(firebase.auth().currentUser.uid)
                            .child('User/People').child(YOURNAME.key).child('Friends')
                            .on('child_added', function (YOURFRIENDSNAME) {
                                firebase.database().ref('Users').on('child_added',
                                    function (UIDS) {
                                        firebase.database().ref('Users').child(UIDS.key)
                                            .child('User/About/Authentic').child(YOURFRIENDSNAME.key)
                                            .child('UID').on('child_added',
                                                function (YOURFRIENDSUIDS) {
                                                    firebase.database().ref('Users').child(YOURFRIENDSUIDS.key)
                                                        .child('User/People').child(YOURFRIENDSNAME.key)
                                                        .child('Friends').child(YOURNAME.key).set(PEOPLEELEMENT);
                                                });
                                    });
                            });
                    });
            } else {
                // YOU CAN UPDATE YOUR PUBLIC INFO
                firebase.database().ref().child('Users')
                    .child(snapshot.key)
                    .child('User').child('People').child('Add')
                    .child('People').child(name).set(PEOPLEELEMENT);
            }
        });
        // Set About user
        firebase.database().ref('Users').child(firebase.auth().currentUser.uid).child('User/About').set({
            Cover: COVER,
            Image: uimg,
            Name: name,
            Rank: statuz,
            Location: lcn,
            Joined: jnd,
            Subject: wst,
            SocialLink: lkn
        });
        firebase.database().ref().child('Users').child(firebase.auth().currentUser
            .uid).child('User').child('About').child('Authentic').child(name).child('UID').child(firebase.auth().currentUser.uid).set({
            UIDS: firebase.auth().currentUser.uid
        });
        firebase.database().ref().child('Users').child(firebase.auth().currentUser
            .uid).child('User').child('About').child('Authentic').child(name).child('Email').child('Email').set({
            Email: firebase.auth().currentUser.email
        });
    }, 0000);
    setTimeout(() => {
        console.log('PROFILE EDITED SUCCESSFUL');
        // ADD PEOPLE TO YOUR ADD DATABASE PEOPLE DATABASE
        firebase.database().ref('Users')
            .on('child_added', function (UIDS) {
                firebase.database().ref('Users')
                    .child(UIDS.key).child('User/People/Add/People')
                    .on('child_added', function (NEWFRIENDS) {
                        firebase.database().ref('Users')
                            .child(firebase.auth().currentUser.uid)
                            .child('User/About/Authentic')
                            .on('child_added', function (YOURNAME) {
                                if (YOURNAME.key == NEWFRIENDS.key) {

                                } else {
                                    firebase.database().ref('Users')
                                        .child(firebase.auth().currentUser.uid)
                                        .child('User/People/Add/People').child(NEWFRIENDS.key)
                                        .set(NEWFRIENDS.val());
                                }
                            })
                    })
            })
        fn.load('see-profile.html');
        SEETIMELINEREADY();
        SEEABOUTINTIMELINE();
        DEFINELOGOUT();
    }, 1000);
}

//Add storing event
STOREX = function () {
    setTimeout(() => {
        //Local variable
        if (nm) {
            name = nm.value;
        }
        var statuz = stat.value;
        var lcn = lc.value;
        var jnd = jn.value;
        var wst = ws.value;
        var lkn = lk.value;
        var uimg = img.src;
        var COVER = IMGCOVER.src;
        //Save data

        // Create element to enable user fin
        var list0 = document.createElement('ons-list');
        list0.setAttribute('onclick', 'VISITPROFILE("' + name + '")');
        list0.setAttribute('modifier', 'inset');
        list0.setAttribute('style', 'background-color: #3498DB');
        // Name & Image
        var list1 = document.createElement('ons-list-item');
        var div1 = document.createElement('div');
        div1.setAttribute('class', 'left');
        var imgs = document.createElement('img');
        imgs.setAttribute('class', 'list-item__thumbnail');
        imgs.src = uimg;
        var div2 = document.createElement('div');
        div2.setAttribute('class', 'center');
        var span1 = document.createElement('span');
        span1.setAttribute('class', 'list-item__title');
        var p1 = document.createElement('p');
        p1.setAttribute('style', 'color: #fff');
        p1.innerText = name;
        var span2 = document.createElement('span');
        span2.setAttribute('class', 'list-item__subtitle');
        span2.setAttribute('style', 'color: #fff');
        span2.innerText = statuz;
        list1.appendChild(div1);
        list1.appendChild(div2);
        div1.appendChild(imgs);
        div2.appendChild(span1);
        span1.appendChild(p1);
        div2.appendChild(span2);
        // Append all
        list0.appendChild(list1);
        // Outer HTML
        var PEOPLEELEMENT = list0.outerHTML;
        firebase.database().ref('Users').on('child_added', function (snapshot) {
            if (firebase.auth().currentUser.uid == snapshot.key) {
                // YOUR FRIENDS CAN RECIEVE AN UPDATE OF YOURS IN THEIR FRIENDS LIST
                firebase.database().ref('Users').child(firebase.auth().currentUser.uid)
                    .child('User/About/Authentic').on('child_added', function (YOURNAME) {
                        firebase.database().ref('Users').child(firebase.auth().currentUser.uid)
                            .child('User/People').child(YOURNAME.key).child('Friends')
                            .on('child_added', function (YOURFRIENDSNAME) {
                                firebase.database().ref('Users').on('child_added',
                                    function (UIDS) {
                                        firebase.database().ref('Users').child(UIDS.key)
                                            .child('User/About/Authentic').child(YOURFRIENDSNAME.key)
                                            .child('UID').on('child_added',
                                                function (YOURFRIENDSUIDS) {
                                                    firebase.database().ref('Users').child(YOURFRIENDSUIDS.key)
                                                        .child('User/People').child(YOURFRIENDSNAME.key)
                                                        .child('Friends').child(YOURNAME.key).set(PEOPLEELEMENT);
                                                });
                                    });
                            });
                    });
            } else {
                // YOU CAN UPDATE YOUR PUBLIC INFO
                firebase.database().ref().child('Users')
                    .child(snapshot.key)
                    .child('User').child('People').child('Add')
                    .child('People').child(name).set(PEOPLEELEMENT);
            }
        });
        // Set About user
        firebase.database().ref('Users/' + firebase.auth().currentUser.uid + '/User/About').set({
            Cover: COVER,
            Image: uimg,
            Name: name,
            Rank: statuz,
            Location: lcn,
            Joined: jnd,
            Subject: wst,
            SocialLink: lkn
        });
        firebase.database().ref().child('Users').child(firebase.auth().currentUser
            .uid).child('User').child('About').child('Authentic').child(name).child('UID').child(firebase.auth().currentUser.uid).set({
            UIDS: firebase.auth().currentUser.uid
        });
        firebase.database().ref().child('Users').child(firebase.auth().currentUser
            .uid).child('User').child('About').child('Authentic').child(name).child('Email').child('Email').set({
            Email: firebase.auth().currentUser.email
        });
    }, 0000);
    setTimeout(() => {
        console.log('PROFILE EDITED SUCCESSFUL');
        // ADD PEOPLE TO YOUR ADD DATABASE PEOPLE DATABASE
        firebase.database().ref('Users')
            .on('child_added', function (UIDS) {
                firebase.database().ref('Users')
                    .child(UIDS.key).child('User/People/Add/People')
                    .on('child_added', function (NEWFRIENDS) {
                        firebase.database().ref('Users')
                            .child(firebase.auth().currentUser.uid)
                            .child('User/About/Authentic')
                            .on('child_added', function (YOURNAME) {
                                if (YOURNAME.key == NEWFRIENDS.key) {

                                } else {
                                    firebase.database().ref('Users')
                                        .child(firebase.auth().currentUser.uid)
                                        .child('User/People/Add/People').child(NEWFRIENDS.key)
                                        .set(NEWFRIENDS.val());
                                }
                            });
                    });
            });
        ADDFRIENDSNOW();
    }, 1000);
}