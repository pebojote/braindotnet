// USERS WILL VISIT MESSAGE SECTION
var USERDATABASE = firebase.database().ref('Users');
var MESSAGETHREADS;

function VISITMESSAGE() {
    setTimeout(() => {
        MESSAGETHREADS = document.getElementById('MESSAGETHREADSRESULTS');
    }, 0);
    setTimeout(() => {
        // THIS WILL REMOVE THE BADGE
        var USERBADGE = firebase.database().ref().child('Users');
        var USERBADGES = USERBADGE.child(firebase.auth().currentUser.uid).child('User/Notification/Message/Badges');
        USERBADGES.child('Badge').remove();
        console.log('REACHED!');
        USERDATABASE.on('child_added', function (UID) {
            firebase.database()
            USERDATABASE.child(firebase.auth().currentUser.uid + '/User/About/Authentic')
                .on('child_added', function (YOURNAME) {
                    console.log('REACHED!');
                    if (UID.key == firebase.auth().currentUser.uid) {
                        USERDATABASE.child(firebase.auth().currentUser.uid + '/User/Message/' + YOURNAME.key).remove();
                        console.log('REACHED!');
                    } else {
                        USERDATABASE.child(UID.key + '/User/Message/' + YOURNAME.key + '/Threads').orderByChild('Thread')
                            .on('child_added', function (THREAD) {
                                console.log('REACHED!');
                                var span = document.createElement('span');
                                var item = document.createElement('span');
                                item.innerHTML = THREAD.val();
                                MESSAGETHREADS.appendChild(span);
                                span.appendChild(item);
                                console.log('REACHED!');
                            })
                    }

                })
        })
    }, 1000);
}


var PERSONVALUE = document.getElementById('PERSONVALUE');
var MESSAGEVALUE = document.getElementById('MESSAGEVALUE');

function NEWMESSAGE() {
    setTimeout(() => {
        PERSONVALUE = document.getElementById('PERSONVALUE');
        MESSAGEVALUE = document.getElementById('MESSAGEVALUE');
    }, 0000);
}

function BUTTONSEND() {
    setTimeout(() => {
        fn.load('messages.html');
        VISITMESSAGE();
    }, 0000);
    console.group('REACHED!');
    firebase.auth().onAuthStateChanged(USER => {
        if (USER) {
            console.log('REACHED!');
            var GETPERSON = PERSONVALUE.value;

            function FIRSTLETTERCAPITAL(str) {
                return str.replace(/\w\S*/g, function (txt) {
                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                });
            }
            console.log(FIRSTLETTERCAPITAL(GETPERSON));
            GETPERSON = FIRSTLETTERCAPITAL(GETPERSON);
            var GETMESSAGE = MESSAGEVALUE.value;
            firebase.database().ref('Users')
                .on('child_added', function (UIDs) {
                    console.log('REACHED!');
                    firebase.database().ref('Users').child(UIDs.key)
                        .child('User/About/Authentic').on('child_added',
                            function (ALLNAME) {
                                console.log('REACHED!');
                                if (GETPERSON == ALLNAME.key) {
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
                                                                                AI.setAttribute('class', 'fa fa-eye');
                                                                                SEEBUTTON.appendChild(AI);

                                                                                var DELBUTTON = document.createElement('ons-button');
                                                                                DELBUTTON.setAttribute('style', 'background-color: #3498DB;color: #fff;border: 1px solid #fff');
                                                                                DELBUTTON.setAttribute("onclick", "DELMESSAGE('" + ALLNAME.key + "')");
                                                                                DELBUTTON.setAttribute('modifier', 'large');
                                                                                var BI = document.createElement('i');
                                                                                BI.setAttribute('class', 'fa fa-trash');
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
                                                                                AI.setAttribute('class', 'fa fa-eye');
                                                                                SEEBUTTON.appendChild(AI);

                                                                                var DELBUTTON = document.createElement('ons-button');
                                                                                DELBUTTON.setAttribute('style', 'background-color: #3498DB;color: #fff;border: 1px solid #fff');
                                                                                DELBUTTON.setAttribute("onclick", "DELMESSAGE('" + MYNAME.key + "')");
                                                                                DELBUTTON.setAttribute('modifier', 'large');
                                                                                var BI = document.createElement('i');
                                                                                BI.setAttribute('class', 'fa fa-trash');
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
}

// CLICK MESSAGE
// USERS WILL VISIT MESSAGE SECTION
var CHATUSERNAME;
var USERSNAMEBANNER;
var MESSAGECLICKRESULTS;
var DELMESSAGE;
var REPLYVALUE;
var SHOWSEND;
var HIDESEND;


function MESSAGECLICK(key) {
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
                DELMESSAGE = document.getElementById('DELMESSAGE');
                console.log('REACHED!');
            }, 1000);
            setTimeout(() => {
                SHOWSEND;
                HIDESEND;
                console.log('REACHED!');
                firebase.database().ref('Users')
                    .on('child_added',
                        function (UIDs) {
                            console.log('REACHED!');
                            USERDATABASE.child(firebase.auth().currentUser.uid + '/User/About/Authentic')
                                .on('child_added', function (YOURNAME) {
                                    console.log('REACHED!');
                                    USERDATABASE.child(UIDs.key + '/User/About/Authentic/' + key + '/UID').on('child_added', function (USERUID) {
                                        USERDATABASE.child(USERUID.key + '/User/Message/' + YOURNAME.key + '/Message')
                                            .on('child_added', function (message) {
                                                console.log('REACHED!');
                                                var span = document.createElement('span');
                                                var item = document.createElement('span');
                                                item.innerHTML = message.val();
                                                MESSAGECLICKRESULTS.appendChild(span);
                                                span.appendChild(item);
                                            })
                                    })


                                })
                        })

                var SPAN = document.createElement('span');
                SPAN.setAttribute('onclick', 'DELMESH("' + key + '")');
                var IMG = document.createElement('img');
                IMG.setAttribute('src', 'https://img.icons8.com/color/38/000000/waste.png');
                IMG.setAttribute('style', 'vertical-align:middle');
                SPAN.appendChild(IMG);
                DELMESSAGE.appendChild(SPAN);
            }, 2000);

        }, 1000);
        console.log('REACHED!');
    }, 0000);
}

SHOWSEND = function () {
    var dialog = document.getElementById('SEND-DIALOG');

    if (dialog) {
        dialog.show();
    } else {
        ons.createElement('SENDDIALOG.html', {
                append: true
            })
            .then(function (dialog) {
                dialog.show();
                // CONVERSATION
                REPLYVALUE = document.getElementById('REPLYVALUE');
            });
    }
};

HIDESEND = function (id) {
    document
        .getElementById(id)
        .hide();
};

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

// DELETE THREAD

function DELMESSAGE(delkey) {
    document.getElementById(delkey).style.display = "none";
    firebase.database()
        .ref('Users').on('child_added', function (UIDS) {
            firebase.database()
                .ref('Users/' + UIDS.key + '/User/About/Authentic/' + delkey + '/UID')
                .on('child_added', function (USERUID) {
                    firebase.database()
                        .ref('Users/' + firebase.auth().currentUser.uid + '/User/About/Authentic')
                        .on('child_added', function (MYNAME) {
                            firebase.database()
                                .ref('Users/' + USERUID.key + '/User/Message/' + MYNAME.key).remove();
                            firebase.database()
                                .ref('Users/' + firebase.auth().currentUser.uid + '/User/Message/' + delkey).remove();
                        })
                })
        })
}

// DELETE MESSAGE

function DELMESH(delkey) {
    setTimeout(() => {
        USERDATABASE.on('child_added', function (UIDS) {
            console.log('REACHED!');
            USERDATABASE.child(UIDS.key + '/User/About/Authentic/' + delkey + '/UID').on('child_added', function (USERUID) {
                console.log('REACHED!');
                USERDATABASE.child(firebase.auth().currentUser.uid + '/User/About/Authentic').on('child_added', function (MYNAME) {
                    console.log('REACHED!');
                    USERDATABASE.child(USERUID.key + '/User/Message/' + MYNAME.key + '/Message').remove();
                    fn.load('messages.html');
                    VISITMESSAGE();
                    console.log('REACHED!');
                });
            });
        });
    }, 0000);
}