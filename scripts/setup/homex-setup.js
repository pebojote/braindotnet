var USERDATABASE = firebase.database().ref('Users');
// LIKE
var LIKEKEY;
var LIKEPOSTINFO;
var LIKERESULTS;
var LIKEBUTTON;

function LIKE(key) {
    setTimeout(() => {
        LIKEKEY = key;
        fn.load('LIKEAREA.html');
    }, 0000);
    setTimeout(() => {
        LIKEPOSTINFO = document.getElementById('LIKEPOSTINFO');
        LIKERESULTS = document.getElementById('LIKERESULTS');
        LIKEBUTTON = document.getElementById("LIKEBUTTON");
    }, 1000);
    setTimeout(() => {
        // THIS WILL RERTRIEVE THE POST TO PUT IN THE LIKE AREA
        firebase.database().ref('Users')
            .child(firebase.auth().currentUser.uid)
            .child('User/About/Authentic')
            .on('child_added', function (MYNAME) {
                USERDATABASE.child(firebase.auth().currentUser.uid)
                    .child('User/Post/Timeline')
                    .child(MYNAME.key).orderByKey().equalTo(key)
                    .on('child_added', function (RETRIEVELIKEPOSTINFO) {
                        // RETRIEVE THE POST IN YOUR TIMELINE
                        var SPAN = document.createElement('span');
                        var ITEM = document.createElement('span');
                        ITEM.innerHTML = RETRIEVELIKEPOSTINFO.val();
                        SPAN.appendChild(ITEM);
                        LIKEPOSTINFO.appendChild(SPAN);
                    });
                // RETRIEVE THE POST IN YOUR FEED
                USERDATABASE.child(firebase.auth().currentUser.uid)
                    .child('User/Post/Feed')
                    .child(MYNAME.key).orderByKey().equalTo(key)
                    .on('child_added', function (RETRIEVELIKEPOSTINFO) {
                        var SPAN = document.createElement('span');
                        var ITEM = document.createElement('span');
                        ITEM.innerHTML = RETRIEVELIKEPOSTINFO.val();
                        SPAN.appendChild(ITEM);
                        LIKEPOSTINFO.appendChild(SPAN);
                    });
            });
    }, 2000);
    setTimeout(() => {
        // THIS WILL GET THE NUMBER OF LIKES
        USERDATABASE.child(firebase.auth().currentUser.uid)
            .child('User/Post/Like').child(key)
            .on('value', function (SEELIKEINYOURSELF) {
                var VOTES = SEELIKEINYOURSELF.numChildren();
                document.getElementById('LIKEPOSTNUMBER').innerHTML = "<ons-list modifier=\"inset\" style=\"border: 1px solid white\"><ons-list-item><span><img style=\"vertical-align:middle\" src=\"https://img.icons8.com/color/38/000000/hearts.png\"></span><span style=\"vertical-align:middle;color: #3498DB\"><b>" + VOTES + " Likes</b></span></ons-list-item></ons-list>";
                console.log(VOTES);
            });
    }, 3000);
    setTimeout(() => {
        // THIS WILL RETRIEVE COMMENT IN YOUR FRINEDS
        USERDATABASE.child(firebase.auth().currentUser.uid)
            .child('User/Post/Like').child(key)
            .on('child_added', function (SEELIKEINYOURSELF) {
                var SPAN = document.createElement('span');
                var ITEM = document.createElement('span');
                ITEM.innerHTML = SEELIKEINYOURSELF.val();
                SPAN.appendChild(ITEM);
                LIKERESULTS.appendChild(SPAN);
            });
    }, 4000);
    setTimeout(() => {
        USERDATABASE.child(firebase.auth().currentUser.uid)
            .child('User/About/Authentic')
            .on('child_added', function (MYNAME) {
                USERDATABASE.child(firebase.auth().currentUser.uid + "/User/Post").on("value", function (check) {
                    console.log('REACHED');
                    var EXISTS = check.child("Like").child(key).child(MYNAME.key).exists();
                    if (EXISTS) {
                        // RED BUTTON
                        var ONSFAB = document.createElement('ons-fab');
                        ONSFAB.setAttribute('onclick', 'SHOWUNLIKELIKEPOST()');
                        ONSFAB.setAttribute('style', 'background-color: #3498DB; color: #fff');
                        ONSFAB.setAttribute('position', 'bottom center');
                        var SPAN = document.createElement('span');
                        var IMG = document.createElement('img');
                        IMG.setAttribute('style', 'vertical-align: middle');
                        IMG.setAttribute('src', 'https://img.icons8.com/color/38/000000/hearts.png');
                        ONSFAB.appendChild(SPAN);
                        SPAN.appendChild(IMG);
                        LIKEBUTTON.appendChild(ONSFAB);
                    } else {
                        // WHITE BUTTON
                        var ONSFAB = document.createElement('ons-fab');
                        ONSFAB.setAttribute('onclick', 'SHOWLIKEPOST()');
                        ONSFAB.setAttribute('style', 'background-color: #3498DB; color: #fff');
                        ONSFAB.setAttribute('position', 'bottom center');
                        var SPAN = document.createElement('span');
                        var IMG = document.createElement('img');
                        IMG.setAttribute('style', 'vertical-align: middle');
                        IMG.setAttribute('src', 'https://img.icons8.com/color/38/000000/like.png');
                        ONSFAB.appendChild(SPAN);
                        SPAN.appendChild(IMG);
                        LIKEBUTTON.appendChild(ONSFAB);
                    }
                });
            });
    }, 5000);

}

function SHOWLIKEPOST() {
    USERDATABASE.child(firebase.auth().currentUser.uid)
        .child('User/About/Authentic')
        .on('child_added', function (MYNAME) {
            USERDATABASE.child(firebase.auth().currentUser.uid)
                .child('User/People').child(MYNAME.key)
                .child('Friends').on('child_added',
                    function (MYFRIENDSNAME) {
                        USERDATABASE.on('child_added', function (UIDS) {
                            USERDATABASE.child(UIDS.key).child('User/About/Authentic')
                                .child(MYFRIENDSNAME.key).child('UID')
                                .on('child_added', function (FRIENDSUIDS) {
                                    USERDATABASE.child(firebase.auth().currentUser.uid)
                                        .child('User').child('About').orderByKey()
                                        .equalTo('Image').on('child_added',
                                            function (YOURIMAGE) {
                                                var LOCALONE;
                                                var list = document.createElement('ons-list');
                                                list.setAttribute('id', firebase.auth().currentUser.uid);
                                                list.setAttribute('modifier', 'inset');
                                                list.setAttribute('style', 'background-color: #3498DB;color: #fff');
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
                                                USERDATABASE.child(firebase.auth()
                                                        .currentUser.uid).child('User')
                                                    .child('About').orderByKey()
                                                    .equalTo('Name').on('child_added',
                                                        function (YOURNAMEVAL) {
                                                            USERDATABASE.child(firebase.auth()
                                                                    .currentUser.uid).child('User')
                                                                .child('About').orderByKey()
                                                                .equalTo('Rank').on('child_added',
                                                                    function (rank) {
                                                                        var div = document.createElement("div");
                                                                        div.setAttribute("class", "center");
                                                                        div.setAttribute("onclick", "GOTOTHISUSER('" + YOURNAMEVAL.val() + "')");
                                                                        var srx = document.createElement('span');
                                                                        srx.setAttribute('style', 'color:#fff');
                                                                        srx.setAttribute("class", "list-item__title");
                                                                        srx.innerHTML = "<b>" + YOURNAMEVAL.val() + "</b>";
                                                                        var srxx = document.createElement("span");
                                                                        srxx.setAttribute('style', 'color:#fff');
                                                                        srxx.setAttribute("class", "list-item__subtitle");
                                                                        srxx.innerHTML = "<b>" + rank.val() + "</b>";
                                                                        item0.appendChild(div);
                                                                        div.appendChild(srx);
                                                                        div.appendChild(srxx);
                                                                        // ANOTHER ONS LIST ITEM
                                                                        list.appendChild(item0);
                                                                        LOCALONE = list.outerHTML;
                                                                        // PUSH THE COMMENT TO YOUR FRIENDS
                                                                        USERDATABASE.child(FRIENDSUIDS.key)
                                                                            .child('User/Post/Like')
                                                                            .child(LIKEKEY).child(YOURNAMEVAL.val()).set(LOCALONE);

                                                                        USERDATABASE.child(firebase.auth().currentUser.uid)
                                                                            .child('User/Post/Like')
                                                                            .child(LIKEKEY).child(YOURNAMEVAL.val()).set(LOCALONE);
                                                                    });
                                                        });
                                            });
                                });
                        });
                    });
        });
}

function SHOWUNLIKELIKEPOST() {
    USERDATABASE.child(firebase.auth().currentUser.uid)
        .child('User/About/Authentic')
        .on('child_added', function (MYNAME) {
            document.getElementById(firebase.auth().currentUser.uid).outerHTML = "";
            USERDATABASE.child(firebase.auth().currentUser.uid).child("User/Post/Like").child(LIKEKEY).child(MYNAME.key).remove();
            USERDATABASE.child(firebase.auth().currentUser.uid)
                .child('User/People').child(MYNAME.key)
                .child('Friends').on('child_added',
                    function (MYFRIENDSNAME) {
                        USERDATABASE.on('child_added', function (UIDS) {
                            USERDATABASE.child(UIDS.key).child('User/About/Authentic')
                                .child(MYFRIENDSNAME.key).child('UID')
                                .on('child_added', function (FRIENDSUIDS) {
                                    USERDATABASE.child(FRIENDSUIDS.key).child("User/Post/Like").child(LIKEKEY).child(MYNAME.key).remove();
                                });
                        });
                    });
        });
}

// COMMENT
var COMMENTKEY;
var POSTINFO;
var COMMENTAREANAME;
var COMMENTBUTTON;
var COMMENTAREA = function (key) {
    setTimeout(() => {
        COMMENTKEY = key;
        fn.load('COMMENTAREA.html');
    }, 0000);
    setTimeout(() => {
        POSTINFO = document.getElementById('POSTINFO');
        COMMENTAREANAME = document.getElementById('commentresults');
        COMMENTBUTTON = document.getElementById("COMMENTBUTTON");
    }, 1000);
    setTimeout(() => {
        // THIS WILL RERTRIEVE THE POST TO PUT INT HE COMMENT AREA
        firebase.database().ref('Users')
            .child(firebase.auth().currentUser.uid)
            .child('User/About/Authentic')
            .on('child_added', function (MYNAME) {
                USERDATABASE.child(firebase.auth().currentUser.uid)
                    .child('User/Post/Timeline')
                    .child(MYNAME.key).orderByKey().equalTo(key)
                    .on('child_added', function (RETRIEVEPOSTINFO) {
                        // RETRIEVE THE POST IN YOUR TIMELINE
                        var SPAN = document.createElement('span');
                        var ITEM = document.createElement('span');
                        ITEM.innerHTML = RETRIEVEPOSTINFO.val();
                        SPAN.appendChild(ITEM);
                        POSTINFO.appendChild(SPAN);
                    });
                // RETRIEVE THE POST IN YOUR FEED
                USERDATABASE.child(firebase.auth().currentUser.uid)
                    .child('User/Post/Feed')
                    .child(MYNAME.key).orderByKey().equalTo(key)
                    .on('child_added', function (RETRIEVEPOSTINFO) {
                        var SPAN = document.createElement('span');
                        var ITEM = document.createElement('span');
                        ITEM.innerHTML = RETRIEVEPOSTINFO.val();
                        SPAN.appendChild(ITEM);
                        POSTINFO.appendChild(SPAN);
                    });
            });
    }, 2000);
    setTimeout(() => {
        // THIS WILL GET THE NUMBER OF COMMENTS
        USERDATABASE.child(firebase.auth().currentUser.uid)
            .child('User/Post/Comment').child(key)
            .on('value', function (SEECOMMENTINYOURSELF) {
                var VOTES = SEECOMMENTINYOURSELF.numChildren();
                document.getElementById('COMMENTPOSTNUMBER').innerHTML = "<ons-list modifier=\"inset\" style=\"border: 1px solid white\"><ons-list-item><span><i style=\"vertical-align:middle;color: #3498DB\" class=\"fa fa-comment fa-2x\"></i></span><span style=\"vertical-align:middle;color: #3498DB\">&nbsp<b>" + VOTES + " Comments</b></span></ons-list-item></ons-list>";
                console.log(VOTES);
            });
    }, 3000);
    setTimeout(() => {
        // THIS WILL RETRIEVE COMMENT IN YOUR FRINEDS
        USERDATABASE.child(firebase.auth().currentUser.uid)
            .child('User/Post/Comment').child(key)
            .on('child_added', function (SEECOMMENTINYOURSELF) {
                var SPAN = document.createElement('span');
                var ITEM = document.createElement('span');
                ITEM.innerHTML = SEECOMMENTINYOURSELF.val();
                SPAN.appendChild(ITEM);
                COMMENTAREANAME.appendChild(SPAN);
            });
    }, 4000);
    setTimeout(() => {
        var ONSFAB = document.createElement('ons-fab');
        ONSFAB.setAttribute('onclick', 'SHOWCOMMENTPOST()');
        ONSFAB.setAttribute('style', 'background-color: #3498DB; color: #fff');
        ONSFAB.setAttribute('position', 'bottom center');
        var SPAN = document.createElement('span');
        var I = document.createElement('i');
        I.setAttribute('style', 'vertical-align: middle');
        I.setAttribute('class', 'fa fa-comment fa-1lg');
        ONSFAB.appendChild(SPAN);
        SPAN.appendChild(I);
        COMMENTBUTTON.appendChild(ONSFAB);
    }, 5000);

}
var COMMENTVALUE;
var SHOWCOMMENTPOST = function () {
    var dialog = document.getElementById('comment-dialog');

    if (dialog) {
        dialog.show();
    } else {
        ons.createElement('commentdialog.html', {
                append: true
            })
            .then(function (dialog) {
                dialog.show();
                // DO SOMETHING HERE
                // DEFING INPUT ID
                COMMENTVALUE = document.getElementById('COMMENTVALUE');

            });
    }
};

var HIDECOMMENTPOST = function (id) {
    document
        .getElementById(id)
        .hide();
    // DEFINE COMMENT RESULTS AGAIN
};

function COMMENTNOW() {
    var COMMENTS = COMMENTVALUE.value;
    firebase.database().ref('Users')
        .child(firebase.auth().currentUser.uid)
        .child('User/About/Authentic')
        .on('child_added', function (MYNAME) {
            firebase.database().ref('Users')
                .child(firebase.auth().currentUser.uid)
                .child('User/People').child(MYNAME.key)
                .child('Friends').on('child_added',
                    function (MYFRIENDSNAME) {
                        firebase.database().ref('Users')
                            .on('child_added', function (UIDS) {
                                firebase.database().ref('Users')
                                    .child(UIDS.key).child('User/About/Authentic')
                                    .child(MYFRIENDSNAME.key).child('UID')
                                    .on('child_added', function (FRIENDSUIDS) {
                                        USERDATABASE.child(firebase.auth().currentUser.uid)
                                            .child('User').child('About').orderByKey()
                                            .equalTo('Image').on('child_added',
                                                function (YOURIMAGE) {
                                                    var LOCALONE;
                                                    var list = document.createElement('ons-list');
                                                    list.setAttribute('modifier', 'inset');
                                                    list.setAttribute('style', 'background-color: #3498DB;color: #fff');
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
                                                    USERDATABASE.child(firebase.auth()
                                                            .currentUser.uid).child('User')
                                                        .child('About').orderByKey()
                                                        .equalTo('Name').on('child_added',
                                                            function (YOURNAMEVAL) {
                                                                USERDATABASE.child(firebase.auth()
                                                                        .currentUser.uid).child('User')
                                                                    .child('About').orderByKey()
                                                                    .equalTo('Rank').on('child_added',
                                                                        function (rank) {
                                                                            var div = document.createElement("div");
                                                                            div.setAttribute("class", "center");
                                                                            div.setAttribute("onclick", "GOTOTHISUSER('" + YOURNAMEVAL.val() + "')");
                                                                            var srx = document.createElement('span');
                                                                            srx.setAttribute('style', 'color:#fff');
                                                                            srx.setAttribute("class", "list-item__title");
                                                                            srx.innerText = YOURNAMEVAL.val();
                                                                            var srxx = document.createElement("span");
                                                                            srxx.setAttribute('style', 'color:#fff');
                                                                            srxx.setAttribute("class", "list-item__subtitle");
                                                                            srxx.innerText = rank.val();
                                                                            item0.appendChild(div);
                                                                            div.appendChild(srx);
                                                                            div.appendChild(srxx);
                                                                            // ANOTHER ONS LIST ITEM
                                                                            var item1 = document.createElement('ons-list-item');
                                                                            var div1 = document.createElement("div");
                                                                            div1.setAttribute('style', 'color:#fff');
                                                                            div1.innerText = COMMENTS;
                                                                            item1.appendChild(div1);
                                                                            list.appendChild(item0);
                                                                            list.appendChild(item1);
                                                                            LOCALONE = list.outerHTML;
                                                                            // PUSH THE COMMENT TO YOUR FRIENDS
                                                                            firebase.database().ref('Users')
                                                                                .child(FRIENDSUIDS.key)
                                                                                .child('User/Post/Comment')
                                                                                .child(COMMENTKEY).push(LOCALONE);
                                                                            firebase.database().ref('Users')
                                                                                .child(firebase.auth().currentUser.uid)
                                                                                .child('User/Post/Comment')
                                                                                .child(COMMENTKEY).push(LOCALONE);
                                                                            // RETRIEVE COMMENT AT THE SAME TIME
                                                                            COMMENTAREA;
                                                                        });
                                                            });
                                                });
                                    });
                            });
                    });
        });
}
// SHARE
var SHAREKEY;
var SHAREPOSTINFO;
var SHARERESULTS;
var SHAREBUTTON;

function SHARE(key) {
    setTimeout(() => {
        SHAREKEY = key;
        fn.load('SHAREAREA.html');
    }, 0000);
    setTimeout(() => {
        SHAREPOSTINFO = document.getElementById('SHAREPOSTINFO');
        SHARERESULTS = document.getElementById('SHARERESULTS');
        SHAREBUTTON = document.getElementById("SHAREBUTTON");
    }, 1000);
    setTimeout(() => {
        // THIS WILL RERTRIEVE THE POST TO PUT INT HE COMMENT AREA
        firebase.database().ref('Users')
            .child(firebase.auth().currentUser.uid)
            .child('User/About/Authentic')
            .on('child_added', function (MYNAME) {
                USERDATABASE.child(firebase.auth().currentUser.uid)
                    .child('User/Post/Timeline')
                    .child(MYNAME.key).orderByKey().equalTo(key)
                    .on('child_added', function (RETRIEVESHAREPOSTINFO) {
                        // RETRIEVE THE POST IN YOUR TIMELINE
                        var SPAN = document.createElement('span');
                        var ITEM = document.createElement('span');
                        ITEM.innerHTML = RETRIEVESHAREPOSTINFO.val();
                        SPAN.appendChild(ITEM);
                        SHAREPOSTINFO.appendChild(SPAN);
                    });
                // RETRIEVE THE POST IN YOUR FEED
                USERDATABASE.child(firebase.auth().currentUser.uid)
                    .child('User/Post/Feed')
                    .child(MYNAME.key).orderByKey().equalTo(key)
                    .on('child_added', function (RETRIEVESHAREPOSTINFO) {
                        var SPAN = document.createElement('span');
                        var ITEM = document.createElement('span');
                        ITEM.innerHTML = RETRIEVESHAREPOSTINFO.val();
                        SPAN.appendChild(ITEM);
                        SHAREPOSTINFO.appendChild(SPAN);
                    });
            });
    }, 2000);
    setTimeout(() => {
        // THIS WILL GET THE NUMBER OF SHARE
        USERDATABASE.child(firebase.auth().currentUser.uid)
            .child('User/Post/Share').child(key)
            .on('value', function (SEESHAREINYOURSELF) {
                var VOTES = SEESHAREINYOURSELF.numChildren();
                document.getElementById('SHAREPOSTNUMBER').innerHTML = "<ons-list modifier=\"inset\" style=\"border: 1px solid white\"><ons-list-item><span><i style=\"vertical-align:middle;color: #3498DB\" class=\"fa fa-share fa-2x\"></i></span><span style=\"vertical-align:middle;color: #3498DB\">&nbsp<b>" + VOTES + " Shares</b></span></ons-list-item></ons-list>";
                console.log(VOTES);
            });
    }, 3000);
    setTimeout(() => {
        // THIS WILL RETRIEVE SHARE IN YOUR FRINEDS
        USERDATABASE.child(firebase.auth().currentUser.uid)
            .child('User/Post/Share').child(key)
            .on('child_added', function (SEESHAREINYOURSELF) {
                var SPAN = document.createElement('span');
                var ITEM = document.createElement('span');
                ITEM.innerHTML = SEESHAREINYOURSELF.val();
                SPAN.appendChild(ITEM);
                SHARERESULTS.appendChild(SPAN);
            });
    }, 4000);
    setTimeout(() => {
        var ONSFAB = document.createElement('ons-fab');
        ONSFAB.setAttribute('onclick', 'SHOWSHAREPOST()');
        ONSFAB.setAttribute('style', 'background-color: #3498DB; color: #fff');
        ONSFAB.setAttribute('position', 'bottom center');
        var SPAN = document.createElement('span');
        var I = document.createElement('i');
        I.setAttribute('style', 'vertical-align: middle');
        I.setAttribute('class', 'fa fa-share fa-1lg');
        ONSFAB.appendChild(SPAN);
        SPAN.appendChild(I);
        SHAREBUTTON.appendChild(ONSFAB);
    }, 5000);
}

var SAYTOSHAREVALUE;

function SHOWSHAREPOST() {
    var dialog = document.getElementById('share-dialog');

    if (dialog) {
        dialog.show();
    } else {
        ons.createElement('shared.html', {
                append: true
            })
            .then(function (dialog) {
                dialog.show();
                console.log('REACHED');
                // DEFINE INPUT VALUE
                SAYTOSHAREVALUE = document.getElementById('SAYTOSHAREVALUE');
            });
    }
}

function HIDESHARE(id) {
    document
        .getElementById(id)
        .hide();
}


function SHARENOW() {
    var POSTVAL;
    USERDATABASE.child(firebase.auth().currentUser.uid).child('User/About/Authentic').on('child_added', function (MYNAME) {
        console.log('REACHED');

        USERDATABASE.child(firebase.auth().currentUser.uid).child('User/Post').on('value', function (check) {
            console.log('REACHED');
            // RETRIEVE THE POST IN YOUR TIMELINE
            var a = check.child('Timeline').child(MYNAME.key).child(SHAREKEY).exists();
            if (a !== null) {
                console.log('REACHED');
                USERDATABASE.child(firebase.auth().currentUser.uid).child('User/Post/Timeline').child(MYNAME.key).orderByKey().equalTo(SHAREKEY).on('child_added', function (checked) {
                    POSTVAL = checked.val();
                    console.log('REACHED');
                    return true;
                });
            }
        });

        // RETRIEVE THE POST IN YOUR FEED
        USERDATABASE.child(firebase.auth().currentUser.uid).child('User/Post').on('value', function (check) {
            console.log('REACHED');
            var b = check.child('Feed').child(MYNAME.key).child(SHAREKEY).exists();
            console.log('REACHED');
            if (b !== null) {
                console.log('REACHED');
                USERDATABASE.child(firebase.auth().currentUser.uid).child('User/Post/Feed').child(MYNAME.key).orderByKey().equalTo(SHAREKEY).on('child_added', function (checked) {
                    POSTVAL = checked.val();
                    console.log('REACHED');
                    return true;
                });
            }
        });
    });
    var SAYSHARE = SAYTOSHAREVALUE.value;
    var a;
    USERDATABASE.child(firebase.auth().currentUser.uid + '/User/About/Authentic').on('child_added', function (YOURNAME) {
        a = USERDATABASE.child(firebase.auth().currentUser.uid)
            .child('User').child('Post').child('Timeline')
            .child(YOURNAME.key).push().getKey();
    });
    USERDATABASE.child(firebase.auth().currentUser.uid)
        .child('User').child('About').orderByKey()
        .equalTo('Image').on('child_added',
            function (YOURIMAGE) {
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
                USERDATABASE.child(firebase.auth()
                        .currentUser.uid).child('User')
                    .child('About').orderByKey()
                    .equalTo('Name').on('child_added',
                        function (YOURNAMEVAL) {
                            USERDATABASE.child(firebase.auth()
                                    .currentUser.uid).child('User')
                                .child('About').orderByKey()
                                .equalTo('Rank').on('child_added',
                                    function (rank) {
                                        var div = document.createElement("div");
                                        div.setAttribute("class", "center");
                                        div.setAttribute("onclick", "GOTOTHISUSER('" + YOURNAMEVAL.val() + "')");
                                        var srx = document.createElement('span');
                                        srx.setAttribute("class", "list-item__title");
                                        srx.innerText = YOURNAMEVAL.val();
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
                            div1.innerText = SAYSHARE;
                            var item3 = document.createElement('ons-list-item');
                            var div3 = document.createElement('div');
                            div3.innerHTML = POSTVAL;
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
                            ONSBUTTON3.setAttribute('onclick', 'SHARE("' + a + '")');
                            var S = document.createElement('i');
                            S.setAttribute('class', 'fa fa-share fa-2x');
                            S.setAttribute("style", "color: #fff;border: 1px solid #3498DB");
                            ONSBUTTON3.appendChild(S);
                            // TRASH BUTTON
                            var ONSBUTTON4 = document.createElement('ons-button');
                            ONSBUTTON4.setAttribute("style", "color: #fff;border: 1px solid #fff;background-color: #3498DB");
                            ONSBUTTON4.setAttribute('onclick', 'DELPOSTX("' + firebase.auth().currentUser.uid + '","' + a + '")');
                            var D = document.createElement('i');
                            D.setAttribute('class', 'fa fa-trash fa-2x');
                            ONSBUTTON4.appendChild(D);
                            item1.appendChild(div1);
                            item3.appendChild(div3);
                            item2.appendChild(div2);
                            div2.appendChild(ONSBUTTON1);
                            div2.appendChild(ONSBUTTON2);
                            div2.appendChild(ONSBUTTON3);
                            div2.appendChild(ONSBUTTON4);
                            list.appendChild(item0);
                            list.appendChild(item1);
                            list.appendChild(item3);
                            list.appendChild(item2);
                            LOCALONE = list.outerHTML;
                            // POST TO YOURSELF
                            USERDATABASE.child(firebase.auth().currentUser.uid + '/User/Post/Timeline/' + YOURNAMEVAL.val()).child(a).set(LOCALONE);
                            //POST TO YOUR FRIENDS ...
                            USERDATABASE.child(firebase.auth().currentUser.uid + '/User/About/Authentic').on('child_added', function (YOURNAME) {
                                USERDATABASE.child(firebase.auth().currentUser.uid + '/User/People/' + YOURNAME.key + '/Friends').on('value', function (YOURFRIENDSKEY) {
                                    var c = YOURFRIENDSKEY.exists();
                                    if (c) {
                                        USERDATABASE.child(firebase.auth().currentUser.uid + '/User/People/' + YOURNAME.key + '/Friends').on('child_added', function (YOURFRIENDSKEY) {
                                            USERDATABASE.on('child_added', function (UIDS) {
                                                USERDATABASE.child(UIDS.key + '/User/About/Authentic/' + YOURFRIENDSKEY.key + '/UID').on('child_added', function (FRIENDSUIDS) {
                                                    USERDATABASE.child(FRIENDSUIDS.key).child('/User/Post/Feed/').child(YOURFRIENDSKEY.key).child(a).set(LOCALONE);
                                                });
                                            });
                                        });
                                    }

                                });
                            });
                        });
            });
    USERDATABASE.child(firebase.auth().currentUser.uid)
        .child('User/About/Authentic')
        .on('child_added', function (MYNAME) {
            USERDATABASE.child(firebase.auth().currentUser.uid)
                .child('User/People').child(MYNAME.key)
                .child('Friends').on('child_added',
                    function (MYFRIENDSNAME) {
                        USERDATABASE.on('child_added', function (UIDS) {
                            firebase.database().ref('Users')
                                .child(UIDS.key).child('User/About/Authentic')
                                .child(MYFRIENDSNAME.key).child('UID')
                                .on('child_added', function (FRIENDSUIDS) {
                                    USERDATABASE.child(firebase.auth().currentUser.uid)
                                        .child('User').child('About').orderByKey()
                                        .equalTo('Image').on('child_added',
                                            function (YOURIMAGE) {
                                                var LOCALONE;
                                                var list = document.createElement('ons-list');
                                                list.setAttribute('modifier', 'inset');
                                                list.setAttribute('style', 'background-color: #3498DB;color: #fff');
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
                                                USERDATABASE.child(firebase.auth()
                                                        .currentUser.uid).child('User')
                                                    .child('About').orderByKey()
                                                    .equalTo('Name').on('child_added',
                                                        function (YOURNAMEVAL) {
                                                            USERDATABASE.child(firebase.auth()
                                                                    .currentUser.uid).child('User')
                                                                .child('About').orderByKey()
                                                                .equalTo('Rank').on('child_added',
                                                                    function (rank) {
                                                                        var div = document.createElement("div");
                                                                        div.setAttribute("class", "center");
                                                                        div.setAttribute("onclick", "GOTOTHISUSER('" + YOURNAMEVAL.val() + "')");
                                                                        var srx = document.createElement('span');
                                                                        srx.setAttribute('style', 'color:#fff');
                                                                        srx.setAttribute("class", "list-item__title");
                                                                        srx.innerHTML = "<b>" + YOURNAMEVAL.val() + "</b>";
                                                                        var srxx = document.createElement("span");
                                                                        srxx.setAttribute('style', 'color:#fff');
                                                                        srxx.setAttribute("class", "list-item__subtitle");
                                                                        srxx.innerHTML = "<b>" + rank.val() + "</b>";
                                                                        item0.appendChild(div);
                                                                        div.appendChild(srx);
                                                                        div.appendChild(srxx);
                                                                        // ANOTHER ONS LIST ITEM
                                                                        list.appendChild(item0);
                                                                        LOCALONE = list.outerHTML;
                                                                        // PUSH THE COMMENT TO YOUR FRIENDS
                                                                        firebase.database().ref('Users')
                                                                            .child(FRIENDSUIDS.key)
                                                                            .child('User/Post/Share')
                                                                            .child(SHAREKEY).push(LOCALONE);
                                                                        firebase.database().ref('Users')
                                                                            .child(firebase.auth().currentUser.uid)
                                                                            .child('User/Post/Share')
                                                                            .child(SHAREKEY).push(LOCALONE);
                                                                    });
                                                        });
                                            });
                                });
                        });
                    });
        });
}

// DELETE POST
function DELPOST(uid, storagelink, postkey) {
    document.getElementById(postkey).style.display = "none";
    // Create a reference to the file to delete
    if (uid == firebase.auth().currentUser.uid) {
        if (storagelink) {
            firebase.storage().ref('Users/' + uid + '/image_post/' + storagelink).delete()
                .then(function () {

                    console.log('Success');
                })
                .catch(function (error) {
                    // A full list of error codes is available at
                    // https://firebase.google.com/docs/storage/web/handle-errors
                    switch (error.code) {
                        case 'storage/object-not-found':
                            // File doesn't exist
                            break;

                        case 'storage/unauthorized':
                            // User doesn't have permission to access the object
                            break;

                        case 'storage/canceled':
                            // User canceled the upload
                            break;



                        case 'storage/unknown':
                            // Unknown error occurred, inspect the server response
                            break;
                    }
                });
            firebase.storage().ref('Users/' + uid + '/video_post/' + storagelink).delete()
                .then(function () {
                    console.log('Success');
                })
                .catch(function (error) {
                    // A full list of error codes is available at
                    // https://firebase.google.com/docs/storage/web/handle-errors
                    switch (error.code) {
                        case 'storage/object-not-found':
                            // File doesn't exist
                            break;

                        case 'storage/unauthorized':
                            // User doesn't have permission to access the object
                            break;

                        case 'storage/canceled':
                            // User canceled the upload
                            break;



                        case 'storage/unknown':
                            // Unknown error occurred, inspect the server response
                            break;
                    }
                });
            firebase.storage().ref('Users/' + uid + '/audio_post/' + storagelink).delete()
                .then(function () {
                    console.log('Success');
                })
                .catch(function (error) {
                    // A full list of error codes is available at
                    // https://firebase.google.com/docs/storage/web/handle-errors
                    switch (error.code) {
                        case 'storage/object-not-found':
                            // File doesn't exist
                            break;

                        case 'storage/unauthorized':
                            // User doesn't have permission to access the object
                            break;

                        case 'storage/canceled':
                            // User canceled the upload
                            break;



                        case 'storage/unknown':
                            // Unknown error occurred, inspect the server response
                            break;
                    }
                });
            firebase.storage().ref('Users/' + uid + '/document_post/' + storagelink).delete()
                .then(function () {
                    console.log('Success');
                })
                .catch(function (error) {
                    // A full list of error codes is available at
                    // https://firebase.google.com/docs/storage/web/handle-errors
                    switch (error.code) {
                        case 'storage/object-not-found':
                            // File doesn't exist
                            break;

                        case 'storage/unauthorized':
                            // User doesn't have permission to access the object
                            break;

                        case 'storage/canceled':
                            // User canceled the upload
                            break;



                        case 'storage/unknown':
                            // Unknown error occurred, inspect the server response
                            break;
                    }
                });
            firebase.storage().ref('Users/' + uid + '/zip_post/' + storagelink).delete()
                .then(function () {
                    console.log('Success');
                })
                .catch(function (error) {
                    // A full list of error codes is available at
                    // https://firebase.google.com/docs/storage/web/handle-errors
                    switch (error.code) {
                        case 'storage/object-not-found':
                            // File doesn't exist
                            break;

                        case 'storage/unauthorized':
                            // User doesn't have permission to access the object
                            break;

                        case 'storage/canceled':
                            // User canceled the upload
                            break;



                        case 'storage/unknown':
                            // Unknown error occurred, inspect the server response
                            break;
                    }
                });
            firebase.storage().ref('Users/' + uid + '/ads_post/' + storagelink).delete()
                .then(function () {
                    console.log('Success');
                })
                .catch(function (error) {
                    // A full list of error codes is available at
                    // https://firebase.google.com/docs/storage/web/handle-errors
                    switch (error.code) {
                        case 'storage/object-not-found':
                            // File doesn't exist
                            break;

                        case 'storage/unauthorized':
                            // User doesn't have permission to access the object
                            break;

                        case 'storage/canceled':
                            // User canceled the upload
                            break;



                        case 'storage/unknown':
                            // Unknown error occurred, inspect the server response
                            break;
                    }
                });
            firebase.storage().ref('Users/' + uid + '/job_post/' + storagelink).delete()
                .then(function () {
                    console.log('Success');
                })
                .catch(function (error) {
                    // A full list of error codes is available at
                    // https://firebase.google.com/docs/storage/web/handle-errors
                    switch (error.code) {
                        case 'storage/object-not-found':
                            // File doesn't exist
                            break;

                        case 'storage/unauthorized':
                            // User doesn't have permission to access the object
                            break;

                        case 'storage/canceled':
                            // User canceled the upload
                            break;



                        case 'storage/unknown':
                            // Unknown error occurred, inspect the server response
                            break;
                    }
                });
            firebase.storage().ref('Users/' + uid + '/howto_post/' + storagelink).delete()
                .then(function () {
                    console.log('Success');
                })
                .catch(function (error) {
                    // A full list of error codes is available at
                    // https://firebase.google.com/docs/storage/web/handle-errors
                    switch (error.code) {
                        case 'storage/object-not-found':
                            // File doesn't exist
                            break;

                        case 'storage/unauthorized':
                            // User doesn't have permission to access the object
                            break;

                        case 'storage/canceled':
                            // User canceled the upload
                            break;



                        case 'storage/unknown':
                            // Unknown error occurred, inspect the server response
                            break;
                    }
                });
            firebase.storage().ref('Users/' + uid + '/donate_post/' + storagelink).delete()
                .then(function () {
                    console.log('Success');
                })
                .catch(function (error) {
                    // A full list of error codes is available at
                    // https://firebase.google.com/docs/storage/web/handle-errors
                    switch (error.code) {
                        case 'storage/object-not-found':
                            // File doesn't exist
                            break;

                        case 'storage/unauthorized':
                            // User doesn't have permission to access the object
                            break;

                        case 'storage/canceled':
                            // User canceled the upload
                            break;



                        case 'storage/unknown':
                            // Unknown error occurred, inspect the server response
                            break;
                    }
                });
            firebase.storage().ref('Users/' + uid + '/event_post/' + storagelink).delete()
                .then(function () {
                    console.log('Success');
                })
                .catch(function (error) {
                    // A full list of error codes is available at
                    // https://firebase.google.com/docs/storage/web/handle-errors
                    switch (error.code) {
                        case 'storage/object-not-found':
                            // File doesn't exist
                            break;

                        case 'storage/unauthorized':
                            // User doesn't have permission to access the object
                            break;

                        case 'storage/canceled':
                            // User canceled the upload
                            break;



                        case 'storage/unknown':
                            // Unknown error occurred, inspect the server response
                            break;
                    }
                });
            firebase.storage().ref('Users/' + uid + '/market_post/' + storagelink).delete()
                .then(function () {
                    console.log('Success');
                })
                .catch(function (error) {
                    // A full list of error codes is available at
                    // https://firebase.google.com/docs/storage/web/handle-errors
                    switch (error.code) {
                        case 'storage/object-not-found':
                            // File doesn't exist
                            break;

                        case 'storage/unauthorized':
                            // User doesn't have permission to access the object
                            break;

                        case 'storage/canceled':
                            // User canceled the upload
                            break;



                        case 'storage/unknown':
                            // Unknown error occurred, inspect the server response
                            break;
                    }
                });
        }
    }
    if (postkey) {
        firebase.database().ref('Users').child(firebase.auth().currentUser.uid)
            .child('User/About/Authentic').on('child_added',
                function (YOURNAME) {
                    firebase.database().ref('Users').child(firebase.auth().currentUser.uid)
                        .child('User/People').on('value', function (YOURFRIENDSKEY) {
                            var a = YOURFRIENDSKEY.child(YOURNAME.key + '/Friends').exists();
                            if (a) {
                                firebase.database().ref('Users').child(firebase.auth().currentUser.uid)
                                    .child('User/People').child(YOURNAME.key).child('Friends')
                                    .on('child_added', function (YOURFRIENDSKEY) {
                                        firebase.database().ref('Users').on('child_added',
                                            function (UIDS) {
                                                firebase.database().ref('Users').child(UIDS.key)
                                                    .child('User/About/Authentic').child(YOURFRIENDSKEY.key)
                                                    .child('UID').on('child_added', function (FRIENDSUIDS) {
                                                        // DELETET FROM FRIENDS FEED
                                                        if (uid == firebase.auth().currentUser.uid) {
                                                            firebase.database().ref('Users').child(FRIENDSUIDS.key)
                                                                .child('User/Post/Feed').child(YOURFRIENDSKEY.key)
                                                                .child(postkey).remove();
                                                            firebase.database().ref('Users').child(FRIENDSUIDS.key)
                                                                .child('User/Post/Timeline').child(YOURFRIENDSKEY.key)
                                                                .child(postkey).remove();
                                                            // LIKES
                                                            firebase.database().ref('Users').child(FRIENDSUIDS.key)
                                                                .child('User/Post/Like')
                                                                .child(postkey).remove();
                                                            // COMMENTS
                                                            firebase.database().ref('Users').child(FRIENDSUIDS.key)
                                                                .child('User/Post/Comment')
                                                                .child(postkey).remove();
                                                            // SHARES
                                                            firebase.database().ref('Users').child(FRIENDSUIDS.key)
                                                                .child('User/Post/Share')
                                                                .child(postkey).remove();
                                                            // DELETE FROME FRIENDS IMAGE DATA
                                                            firebase.database().ref('Users').child(FRIENDSUIDS.key)
                                                                .child('User/Post').on('value', function (CHECK) {
                                                                    var a = CHECK.child('Other/Image/' + postkey).exists();
                                                                    if (a) {
                                                                        firebase.database().ref('Users').child(FRIENDSUIDS.key)
                                                                            .child('User/Post/Other/Image/' + postkey).remove();
                                                                    }
                                                                })
                                                            // DELETE FROM FRIENDS VIDEOS DATA
                                                            firebase.database().ref('Users').child(FRIENDSUIDS.key)
                                                                .child('User/Post').on('value', function (CHECK) {
                                                                    var a = CHECK.child('Other/Video/' + postkey).exists();
                                                                    if (a) {
                                                                        firebase.database().ref('Users/' + FRIENDSUIDS.key)
                                                                            .child('User/Post/Other/Video/' + postkey).remove();
                                                                    }
                                                                })
                                                            // DELETE FROM FRIENDS AUDIO
                                                            firebase.database().ref('Users/' + FRIENDSUIDS.key)
                                                                .child('User/Post').on('value', function (CHECK) {
                                                                    var a = CHECK.child('Other/Audio/ ' + postkey).exists();
                                                                    if (a) {
                                                                        firebase.database().ref('Users/' + FRIENDSUIDS.key)
                                                                            .child('User/Post/Other/Audio/' + postkey).remove();
                                                                    }
                                                                })
                                                            // DELETE FROM FRIENDS DOCUMENT
                                                            firebase.database().ref('Users/' + FRIENDSUIDS.key)
                                                                .child('User/Post').on('value', function (CHECK) {
                                                                    var a = CHECK.child('Other/Document/' + postkey).exists();
                                                                    if (a) {
                                                                        firebase.database().ref('Users/' + FRIENDSUIDS.key)
                                                                            .child('User/Post/Other/Document/' + postkey).remove();
                                                                    }
                                                                })
                                                            // DELETTE FROM FRIENDS ZIP
                                                            firebase.database().ref('Users/' + FRIENDSUIDS.key)
                                                                .child('User/Post').on('value', function (CHECK) {
                                                                    var a = CHECK.child('Other/Zip/' + postkey).exists();
                                                                    if (a) {
                                                                        firebase.database().ref('Users/' + FRIENDSUIDS.key)
                                                                            .child('User/Post/Other/Zip/' + postkey).remove();
                                                                    }
                                                                })
                                                            // DELTE FROM FRIENDS ADDS
                                                            firebase.database().ref('Users/' + FRIENDSUIDS.key)
                                                                .child('User/Post').on('value', function (CHECK) {
                                                                    var a = CHECK.child('Other/Ads/' + postkey).exists();
                                                                    if (a) {
                                                                        firebase.database().ref('Users/' + FRIENDSUIDS.key)
                                                                            .child('User/Post/Other/Ads/' + postkey).remove();
                                                                    }
                                                                });
                                                            // DELTE FROM FRIENDS JOBS
                                                            firebase.database().ref('Users/' + FRIENDSUIDS.key)
                                                                .child('User/Post').on('value', function (CHECK) {
                                                                    var a = CHECK.child('Other/Job/' + postkey).exists();
                                                                    if (a) {
                                                                        firebase.database().ref('Users/' + FRIENDSUIDS.key)
                                                                            .child('User/Post/Other/Job/' + postkey).remove();
                                                                    }
                                                                });
                                                            // DELTE FROM FRIENDS HOWTO
                                                            firebase.database().ref('Users/' + FRIENDSUIDS.key)
                                                                .child('User/Post').on('value', function (CHECK) {
                                                                    var a = CHECK.child('Other/HowTo/' + postkey).exists();
                                                                    if (a) {
                                                                        firebase.database().ref('Users/' + FRIENDSUIDS.key)
                                                                            .child('User/Post/Other/HowTo/' + postkey).remove();
                                                                    }
                                                                });
                                                            // DELTE FROM FRIENDS DONATION
                                                            firebase.database().ref('Users/' + FRIENDSUIDS.key)
                                                                .child('User/Post').on('value', function (CHECK) {
                                                                    var a = CHECK.child('Other/Donate/' + postkey).exists();
                                                                    if (a) {
                                                                        firebase.database().ref('Users/' + FRIENDSUIDS.key)
                                                                            .child('User/Post/Other/Donate/' + postkey).remove();
                                                                    }
                                                                });
                                                            // DELTE FROM FRIENDS EVENT
                                                            firebase.database().ref('Users/' + FRIENDSUIDS.key)
                                                                .child('User/Post').on('value', function (CHECK) {
                                                                    var a = CHECK.child('Other/Event/' + postkey).exists();
                                                                    if (a) {
                                                                        firebase.database().ref('Users/' + FRIENDSUIDS.key)
                                                                            .child('User/Post/Other/Event/' + postkey).remove();
                                                                    }
                                                                });
                                                            // DELTE FROM FRIENDS MARKET
                                                            firebase.database().ref('Users/' + FRIENDSUIDS.key)
                                                                .child('User/Post').on('value', function (CHECK) {
                                                                    var a = CHECK.child('Other/Market/' + postkey).exists();
                                                                    if (a) {
                                                                        firebase.database().ref('Users/' + FRIENDSUIDS.key)
                                                                            .child('User/Post/Other/Market/' + postkey).remove();
                                                                    }
                                                                });
                                                        }

                                                        // DELETE FROMM YOUR DATABASE
                                                        firebase.database().ref('Users')
                                                            .child(firebase.auth().currentUser.uid)
                                                            .child('User/Post/Feed').child(YOURNAME.key)
                                                            .child(postkey).remove();

                                                        firebase.database().ref('Users')
                                                            .child(firebase.auth().currentUser.uid)
                                                            .child('User/Post/Timeline').child(YOURNAME.key)
                                                            .child(postkey).remove();
                                                        // LIKES
                                                        firebase.database().ref('Users').child(firebase.auth().currentUser.uid)
                                                            .child('User/Post/Like')
                                                            .child(postkey).remove();
                                                        // COMMENTS
                                                        firebase.database().ref('Users').child(firebase.auth().currentUser.uid)
                                                            .child('User/Post/Comment')
                                                            .child(postkey).remove();
                                                        // SHARES
                                                        firebase.database().ref('Users').child(firebase.auth().currentUser.uid)
                                                            .child('User/Post/Share')
                                                            .child(postkey).remove();

                                                        firebase.database().ref('Users').child(firebase.auth().currentUser.uid)
                                                            .child('User/Post').on('value', function (CHECK) {
                                                                var a = CHECK.child('Other/Image/' + postkey).exists();
                                                                if (a) {
                                                                    firebase.database().ref('Users').child(firebase.auth().currentUser.uid)
                                                                        .child('User/Post/Other/Image/' + postkey).remove();
                                                                }
                                                            })
                                                        // DELETE FROM FRIENDS VIDEOS DATA
                                                        firebase.database().ref('Users').child(firebase.auth().currentUser.uid)
                                                            .child('User/Post').on('value', function (CHECK) {
                                                                var a = CHECK.child('Other/Video/' + postkey).exists();
                                                                if (a) {
                                                                    firebase.database().ref('Users/' + firebase.auth().currentUser.uid)
                                                                        .child('User/Post/Other/Video/' + postkey).remove();
                                                                }
                                                            })
                                                        // DELETE FROM FRIENDS AUDIO
                                                        firebase.database().ref('Users/' + firebase.auth().currentUser.uid)
                                                            .child('User/Post').on('value', function (CHECK) {
                                                                var a = CHECK.child('Other/Audio/ ' + postkey).exists();
                                                                if (a) {
                                                                    firebase.database().ref('Users/' + firebase.auth().currentUser.uid)
                                                                        .child('User/Post/Other/Audio/' + postkey).remove();
                                                                }
                                                            })
                                                        // DELETE FROM FRIENDS DOCUMENT
                                                        firebase.database().ref('Users/' + firebase.auth().currentUser.uid)
                                                            .child('User/Post').on('value', function (CHECK) {
                                                                var a = CHECK.child('Other/Document/' + postkey).exists();
                                                                if (a) {
                                                                    firebase.database().ref('Users/' + firebase.auth().currentUser.uid)
                                                                        .child('User/Post/Other/Document/' + postkey).remove();
                                                                }
                                                            })
                                                        // DELETTE FROM FRIENDS ZIP
                                                        firebase.database().ref('Users/' + firebase.auth().currentUser.uid)
                                                            .child('User/Post').on('value', function (CHECK) {
                                                                var a = CHECK.child('Other/Zip/' + postkey).exists();
                                                                if (a) {
                                                                    firebase.database().ref('Users/' + firebase.auth().currentUser.uid)
                                                                        .child('User/Post/Other/Zip/' + postkey).remove();
                                                                }
                                                            })
                                                        // DELTE FROM FRIENDS ADDS
                                                        firebase.database().ref('Users/' + firebase.auth().currentUser.uid)
                                                            .child('User/Post').on('value', function (CHECK) {
                                                                var a = CHECK.child('Other/Ads/' + postkey).exists();
                                                                if (a) {
                                                                    firebase.database().ref('Users/' + firebase.auth().currentUser.uid)
                                                                        .child('User/Post/Other/Ads/' + postkey).remove();
                                                                }
                                                            });
                                                        // DELTE FROM FRIENDS JOBS
                                                        firebase.database().ref('Users/' + firebase.auth().currentUser.uid)
                                                            .child('User/Post').on('value', function (CHECK) {
                                                                var a = CHECK.child('Other/Job/' + postkey).exists();
                                                                if (a) {
                                                                    firebase.database().ref('Users/' + firebase.auth().currentUser.uid)
                                                                        .child('User/Post/Other/Job/' + postkey).remove();
                                                                }
                                                            });
                                                        // DELTE FROM FRIENDS HOWTO
                                                        firebase.database().ref('Users/' + firebase.auth().currentUser.uid)
                                                            .child('User/Post').on('value', function (CHECK) {
                                                                var a = CHECK.child('Other/HowTo/' + postkey).exists();
                                                                if (a) {
                                                                    firebase.database().ref('Users/' + firebase.auth().currentUser.uid)
                                                                        .child('User/Post/Other/HowTo/' + postkey).remove();
                                                                }
                                                            });
                                                        // DELTE FROM FRIENDS DONATION
                                                        firebase.database().ref('Users/' + firebase.auth().currentUser.uid)
                                                            .child('User/Post').on('value', function (CHECK) {
                                                                var a = CHECK.child('Other/Donate/' + postkey).exists();
                                                                if (a) {
                                                                    firebase.database().ref('Users/' + firebase.auth().currentUser.uid)
                                                                        .child('User/Post/Other/Donate/' + postkey).remove();
                                                                }
                                                            });
                                                        // DELTE FROM FRIENDS EVENT
                                                        firebase.database().ref('Users/' + firebase.auth().currentUser.uid)
                                                            .child('User/Post').on('value', function (CHECK) {
                                                                var a = CHECK.child('Other/Event/' + postkey).exists();
                                                                if (a) {
                                                                    firebase.database().ref('Users/' + firebase.auth().currentUser.uid)
                                                                        .child('User/Post/Other/Event/' + postkey).remove();
                                                                }
                                                            });
                                                        // DELTE FROM FRIENDS MARKET
                                                        firebase.database().ref('Users/' + firebase.auth().currentUser.uid)
                                                            .child('User/Post').on('value', function (CHECK) {
                                                                var a = CHECK.child('Other/Market/' + postkey).exists();
                                                                if (a) {
                                                                    firebase.database().ref('Users/' + firebase.auth().currentUser.uid)
                                                                        .child('User/Post/Other/Market/' + postkey).remove();
                                                                }
                                                            });
                                                    })
                                            })
                                    })
                            } else {
                                firebase.database().ref('Users')
                                    .child(firebase.auth().currentUser.uid)
                                    .child('User/Post').on('value', function (CHECK) {
                                        var a = CHECK.child('Timeline/' + YOURNAME.key + postkey).exists();
                                        if (a) {
                                            firebase.database().ref('Users')
                                                .child(firebase.auth().currentUser.uid)
                                                .child('User/Post/Timeline').child(YOURNAME.key)
                                                .child(postkey).remove();
                                            // LIKES
                                            firebase.database().ref('Users').child(firebase.auth().currentUser.uid)
                                                .child('User/Post/Like')
                                                .child(postkey).remove();
                                            // COMMENTS
                                            firebase.database().ref('Users').child(firebase.auth().currentUser.uid)
                                                .child('User/Post/Comment')
                                                .child(postkey).remove();
                                            // SHARES
                                            firebase.database().ref('Users').child(firebase.auth().currentUser.uid)
                                                .child('User/Post/Share')
                                                .child(postkey).remove();
                                        }
                                    });
                                firebase.database().ref('Users')
                                    .child(firebase.auth().currentUser.uid)
                                    .child('User/Post/Feed').on('value', function (CHECK) {
                                        var a = CHECK.child('Feed/' + YOURNAME.key + postkey).exists();
                                        if (a) {
                                            firebase.database().ref('Users')
                                                .child(firebase.auth().currentUser.uid)
                                                .child('User/Post/Feed').child(YOURNAME.key)
                                                .child(postkey).remove();
                                            // LIKES
                                            firebase.database().ref('Users').child(firebase.auth().currentUser.uid)
                                                .child('User/Post/Like')
                                                .child(postkey).remove();
                                            // COMMENTS
                                            firebase.database().ref('Users').child(firebase.auth().currentUser.uid)
                                                .child('User/Post/Comment')
                                                .child(postkey).remove();
                                            // SHARES
                                            firebase.database().ref('Users').child(firebase.auth().currentUser.uid)
                                                .child('User/Post/Share')
                                                .child(postkey).remove();
                                        }
                                    });
                                firebase.database().ref('Users').child(firebase.auth().currentUser.uid)
                                    .child('User/Post').on('value', function (CHECK) {
                                        var a = CHECK.child('Other/Image/' + postkey).exists();
                                        if (a) {
                                            firebase.database().ref('Users').child(firebase.auth().currentUser.uid)
                                                .child('User/Post/Other/Image/' + postkey).remove();
                                        }
                                    })
                                // DELETE FROM FRIENDS VIDEOS DATA
                                firebase.database().ref('Users').child(firebase.auth().currentUser.uid)
                                    .child('User/Post').on('value', function (CHECK) {
                                        var a = CHECK.child('Other/Video/' + postkey).exists();
                                        if (a) {
                                            firebase.database().ref('Users/' + firebase.auth().currentUser.uid)
                                                .child('User/Post/Other/Video/' + postkey).remove();
                                        }
                                    })
                                // DELETE FROM FRIENDS AUDIO
                                firebase.database().ref('Users/' + firebase.auth().currentUser.uid)
                                    .child('User/Post').on('value', function (CHECK) {
                                        var a = CHECK.child('Other/Audio/ ' + postkey).exists();
                                        if (a) {
                                            firebase.database().ref('Users/' + firebase.auth().currentUser.uid)
                                                .child('User/Post/Other/Audio/' + postkey).remove();
                                        }
                                    })
                                // DELETE FROM FRIENDS DOCUMENT
                                firebase.database().ref('Users/' + firebase.auth().currentUser.uid)
                                    .child('User/Post').on('value', function (CHECK) {
                                        var a = CHECK.child('Other/Document/' + postkey).exists();
                                        if (a) {
                                            firebase.database().ref('Users/' + firebase.auth().currentUser.uid)
                                                .child('User/Post/Other/Document/' + postkey).remove();
                                        }
                                    })
                                // DELETTE FROM FRIENDS ZIP
                                firebase.database().ref('Users/' + firebase.auth().currentUser.uid)
                                    .child('User/Post').on('value', function (CHECK) {
                                        var a = CHECK.child('Other/Zip/' + postkey).exists();
                                        if (a) {
                                            firebase.database().ref('Users/' + firebase.auth().currentUser.uid)
                                                .child('User/Post/Other/Zip/' + postkey).remove();
                                        }
                                    })
                                // DELTE FROM FRIENDS ADDS
                                firebase.database().ref('Users/' + firebase.auth().currentUser.uid)
                                    .child('User/Post').on('value', function (CHECK) {
                                        var a = CHECK.child('Other/Ads/' + postkey).exists();
                                        if (a) {
                                            firebase.database().ref('Users/' + firebase.auth().currentUser.uid)
                                                .child('User/Post/Other/Ads/' + postkey).remove();
                                        }
                                    });
                                // DELTE FROM FRIENDS JOBS
                                firebase.database().ref('Users/' + firebase.auth().currentUser.uid)
                                    .child('User/Post').on('value', function (CHECK) {
                                        var a = CHECK.child('Other/Job/' + postkey).exists();
                                        if (a) {
                                            firebase.database().ref('Users/' + firebase.auth().currentUser.uid)
                                                .child('User/Post/Other/Job/' + postkey).remove();
                                        }
                                    });
                                // DELTE FROM FRIENDS HOWTO
                                firebase.database().ref('Users/' + firebase.auth().currentUser.uid)
                                    .child('User/Post').on('value', function (CHECK) {
                                        var a = CHECK.child('Other/HowTo/' + postkey).exists();
                                        if (a) {
                                            firebase.database().ref('Users/' + firebase.auth().currentUser.uid)
                                                .child('User/Post/Other/HowTo/' + postkey).remove();
                                        }
                                    });
                                // DELTE FROM FRIENDS DONATION
                                firebase.database().ref('Users/' + firebase.auth().currentUser.uid)
                                    .child('User/Post').on('value', function (CHECK) {
                                        var a = CHECK.child('Other/Donate/' + postkey).exists();
                                        if (a) {
                                            firebase.database().ref('Users/' + firebase.auth().currentUser.uid)
                                                .child('User/Post/Other/Donate/' + postkey).remove();
                                        }
                                    });
                                // DELTE FROM FRIENDS EVENT
                                firebase.database().ref('Users/' + firebase.auth().currentUser.uid)
                                    .child('User/Post').on('value', function (CHECK) {
                                        var a = CHECK.child('Other/Event/' + postkey).exists();
                                        if (a) {
                                            firebase.database().ref('Users/' + firebase.auth().currentUser.uid)
                                                .child('User/Post/Other/Event/' + postkey).remove();
                                        }
                                    });
                                // DELTE FROM FRIENDS MARKET
                                firebase.database().ref('Users/' + firebase.auth().currentUser.uid)
                                    .child('User/Post').on('value', function (CHECK) {
                                        var a = CHECK.child('Other/Market/' + postkey).exists();
                                        if (a) {
                                            firebase.database().ref('Users/' + firebase.auth().currentUser.uid)
                                                .child('User/Post/Other/Market/' + postkey).remove();
                                        }
                                    });
                            }

                        })
                })
    }
}

function DELPOSTX(uid, postkey) {
    document.getElementById(postkey).style.display = "none";
    if (postkey) {
        firebase.database().ref('Users').child(firebase.auth().currentUser.uid)
            .child('User/About/Authentic').on('child_added',
                function (YOURNAME) {
                    firebase.database().ref('Users').child(firebase.auth().currentUser.uid)
                        .child('User/People')
                        .on('value', function (YOURFRIENDSKEY) {
                            var a = YOURFRIENDSKEY.child(YOURNAME.key + '/Friends').exists();
                            if (a) {
                                firebase.database().ref('Users').child(firebase.auth().currentUser.uid)
                                    .child('User/People').child(YOURNAME.key).child('Friends')
                                    .on('child_added', function (YOURFRIENDSKEY) {
                                        firebase.database().ref('Users').on('child_added',
                                            function (UIDS) {
                                                firebase.database().ref('Users').child(UIDS.key)
                                                    .child('User/About/Authentic').child(YOURFRIENDSKEY.key)
                                                    .child('UID').on('child_added', function (FRIENDSUIDS) {
                                                        if (uid == firebase.auth().currentUser.uid) {
                                                            firebase.database().ref('Users').child(FRIENDSUIDS.key)
                                                                .child('User/Post/Feed/' + YOURFRIENDSKEY.key)
                                                                .child(postkey).remove();
                                                            firebase.database().ref('Users').child(FRIENDSUIDS.key)
                                                                .child('User/Post/Timeline/' + YOURFRIENDSKEY.key)
                                                                .child(postkey).remove();
                                                            // LIKES
                                                            firebase.database().ref('Users').child(FRIENDSUIDS.key)
                                                                .child('User/Post/Like')
                                                                .child(postkey).remove();
                                                            // COMMENTS
                                                            firebase.database().ref('Users').child(FRIENDSUIDS.key)
                                                                .child('User/Post/Comment')
                                                                .child(postkey).remove();
                                                            // SHARES
                                                            firebase.database().ref('Users').child(FRIENDSUIDS.key)
                                                                .child('User/Post/Share')
                                                                .child(postkey).remove();
                                                        }

                                                        firebase.database().ref('Users')
                                                            .child(firebase.auth().currentUser.uid)
                                                            .child('User/Post/Feed/' + YOURNAME.key)
                                                            .child(postkey).remove();
                                                        firebase.database().ref('Users')
                                                            .child(firebase.auth().currentUser.uid)
                                                            .child('User/Post/Timeline/' + YOURNAME.key)
                                                            .child(postkey).remove();
                                                        // LIKES
                                                        firebase.database().ref('Users').child(firebase.auth().currentUser.uid)
                                                            .child('User/Post/Like')
                                                            .child(postkey).remove();
                                                        // COMMENTS
                                                        firebase.database().ref('Users').child(firebase.auth().currentUser.uid)
                                                            .child('User/Post/Comment')
                                                            .child(postkey).remove();
                                                        // SHARES
                                                        firebase.database().ref('Users').child(firebase.auth().currentUser.uid)
                                                            .child('User/Post/Share')
                                                            .child(postkey).remove();
                                                    })
                                            })
                                    })
                            } else {
                                firebase.database().ref('Users')
                                    .child(firebase.auth().currentUser.uid)
                                    .child('User/Post').on('value', function (CHECK) {
                                        var a = CHECK.child('Timeline/' + YOURNAME.key + postkey).exists();
                                        if (a) {
                                            firebase.database().ref('Users')
                                                .child(firebase.auth().currentUser.uid)
                                                .child('User/Post/Timeline/' + YOURNAME.key)
                                                .child(postkey).remove();
                                            // LIKES
                                            firebase.database().ref('Users').child(firebase.auth().currentUser.uid)
                                                .child('User/Post/Like')
                                                .child(postkey).remove();
                                            // COMMENTS
                                            firebase.database().ref('Users').child(firebase.auth().currentUser.uid)
                                                .child('User/Post/Comment')
                                                .child(postkey).remove();
                                            // SHARES
                                            firebase.database().ref('Users').child(firebase.auth().currentUser.uid)
                                                .child('User/Post/Share')
                                                .child(postkey).remove();
                                        }
                                    });
                                firebase.database().ref('Users')
                                    .child(firebase.auth().currentUser.uid)
                                    .child('User/Post').on('value', function (CHECK) {
                                        var a = CHECK.child('Feed/' + YOURNAME.key + postkey).exists();
                                        if (a) {
                                            firebase.database().ref('Users')
                                                .child(firebase.auth().currentUser.uid)
                                                .child('User/Post/Feed').child(YOURNAME.key)
                                                .child(postkey).remove();
                                            // LIKES
                                            firebase.database().ref('Users').child(firebase.auth().currentUser.uid)
                                                .child('User/Post/Like')
                                                .child(postkey).remove();
                                            // COMMENTS
                                            firebase.database().ref('Users').child(firebase.auth().currentUser.uid)
                                                .child('User/Post/Comment')
                                                .child(postkey).remove();
                                            // SHARES
                                            firebase.database().ref('Users').child(firebase.auth().currentUser.uid)
                                                .child('User/Post/Share')
                                                .child(postkey).remove();
                                        }
                                    });
                            }

                        })
                })
    }
}

// PULL TO REFRESH

function PULLTOREFRESH() {
    setTimeout(() => {
        var pullHook = document.getElementById('pull-hook');

        pullHook.addEventListener('changestate', function (event) {
            var message = '';

            switch (event.state) {
                case 'initial':
                    message = "<span><img style=\"vertical-align:middle\" src=\"https://img.icons8.com/color/48/000000/replay-5.png\"></span>";
                    break;
                case 'preaction':
                    message = "<span><img style=\"vertical-align:middle\" src=\"https://img.icons8.com/color/48/000000/circled-down-2.png\"></span>";
                    break;
                case 'action':
                    message = '<ons-icon style="color:#3498DB" size="50px" spin icon="md-spinner"></ons-icon>';
                    break;
            }

            pullHook.innerHTML = message;
        });

        pullHook.onAction = function (done) {
            setTimeout(done, 5000);
        };
    }, 1000);
}