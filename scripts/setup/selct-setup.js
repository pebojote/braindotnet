var USERDATABASE = firebase.database().ref('Users');
var IMAGE;
function IMAGES() {
    setTimeout(() => {
        fn.load('IMAGES-SELECT.html');
    }, 0000);
    setTimeout(() => {
        IMAGE = document.getElementById('IMAGE');
    }, 1000);
    setTimeout(() => {
        USERDATABASE.child(firebase.auth().currentUser.uid)
            .child('User/Post/Other/Image').on('child_added',
                function (IMAGES) {
                    var SPAN = document.createElement('span');
                    var ITEM = document.createElement('span');
                    ITEM.innerHTML = IMAGES.val();
                    IMAGE.appendChild(SPAN);
                    SPAN.appendChild(ITEM);
                })
    }, 2000);
}
var VIDEO;
function VIDEOS() {
    setTimeout(() => {
        fn.load('VIDEOS-SELECT.html');
    }, 0000);
    setTimeout(() => {
        VIDEO = document.getElementById('VIDEO');
    }, 1000);
    setTimeout(() => {
        USERDATABASE.child(firebase.auth().currentUser.uid)
            .child('User/Post/Other/Video').on('child_added',
                function (VIDEOS) {
                    var SPAN = document.createElement('span');
                    var ITEM = document.createElement('span');
                    ITEM.innerHTML = VIDEOS.val();
                    VIDEO.appendChild(SPAN);
                    SPAN.appendChild(ITEM);
                })
    }, 2000);
}
var AUDIO;
function AUDIOS() {
    setTimeout(() => {
        fn.load('AUDIOS-SELECT.html');
    }, 0000);
    setTimeout(() => {
        AUDIO = document.getElementById('AUDIO');
    }, 1000);
    setTimeout(() => {
        USERDATABASE.child(firebase.auth().currentUser.uid)
            .child('User/Post/Other/Audio').on('child_added',
                function (AUDIOS) {
                    var SPAN = document.createElement('span');
                    var ITEM = document.createElement('span');
                    ITEM.innerHTML = AUDIOS.val();
                    AUDIO.appendChild(SPAN);
                    SPAN.appendChild(ITEM);
                })
    }, 2000);
}
var DOCUMENT;
function DOCUMENTS() {
    setTimeout(() => {
        fn.load('DOCUMENTS-SELECT.html');
    }, 0000);
    setTimeout(() => {
        DOCUMENT = document.getElementById('DOCUMENT');
    }, 1000);
    setTimeout(() => {
        USERDATABASE.child(firebase.auth().currentUser.uid)
            .child('User/Post/Other/Document').on('child_added',
                function (DOCUMENTS) {
                    var SPAN = document.createElement('span');
                    var ITEM = document.createElement('span');
                    ITEM.innerHTML = DOCUMENTS.val();
                    DOCUMENT.appendChild(SPAN);
                    SPAN.appendChild(ITEM);
                });
    }, 2000);
}

var FILE;
function FILES() {
    setTimeout(() => {
        fn.load('FILES-SELECT.html');
    }, 0000);
    setTimeout(() => {
        FILE = document.getElementById('FILE');
    }, 1000);
    setTimeout(() => {
        USERDATABASE.child(firebase.auth().currentUser.uid)
            .child('User/Post/Other/Zip').on('child_added',
                function (FILES) {
                    var SPAN = document.createElement('span');
                    var ITEM = document.createElement('span');
                    ITEM.innerHTML = FILES.val();
                    FILE.appendChild(SPAN);
                    SPAN.appendChild(ITEM);
                })
    }, 2000);
}

var AD;
function ADS() {
    setTimeout(() => {
        fn.load('ADS-SELECT.html');
    }, 0000);
    setTimeout(() => {
        AD = document.getElementById('AD');
    }, 1000);
    setTimeout(() => {
        USERDATABASE.child(firebase.auth().currentUser.uid)
            .child('User/Post/Other/Ads').on('child_added',
                function (ADS) {
                    var SPAN = document.createElement('span');
                    var ITEM = document.createElement('span');
                    ITEM.innerHTML = ADS.val();
                    AD.appendChild(SPAN);
                    SPAN.appendChild(ITEM);
                })
    }, 2000);
}

var JOB;

function JOBS() {
    setTimeout(() => {
        fn.load('JOBS-SELECT.html');
    }, 0000);
    setTimeout(() => {
        JOB = document.getElementById('JOB');
    }, 1000);
    setTimeout(() => {
        USERDATABASE.child(firebase.auth().currentUser.uid)
            .child('User/Post/Other/Job').on('child_added',
                function (JOBS) {
                    var SPAN = document.createElement('span');
                    var ITEM = document.createElement('span');
                    ITEM.innerHTML = JOBS.val();
                    JOB.appendChild(SPAN);
                    SPAN.appendChild(ITEM);
                })
    }, 2000);
}

var HOWTO;

function HOWTOS() {
    setTimeout(() => {
        fn.load('HOWTOS-SELECT.html');
    }, 0000);
    setTimeout(() => {
        HOWTO = document.getElementById('HOWTO');
    }, 1000);
    setTimeout(() => {
        USERDATABASE.child(firebase.auth().currentUser.uid)
            .child('User/Post/Other/HowTo').on('child_added',
                function (HOWTOS) {
                    var SPAN = document.createElement('span');
                    var ITEM = document.createElement('span');
                    ITEM.innerHTML = HOWTOS.val();
                    HOWTO.appendChild(SPAN);
                    SPAN.appendChild(ITEM);
                })
    }, 2000);
}

var DONATE;

function DONATES() {
    setTimeout(() => {
        fn.load('DONATES-SELECT.html');
    }, 0000);
    setTimeout(() => {
        DONATE = document.getElementById('DONATE');
    }, 1000);
    setTimeout(() => {
        USERDATABASE.child(firebase.auth().currentUser.uid)
            .child('User/Post/Other/Donate').on('child_added',
                function (DONATES) {
                    var SPAN = document.createElement('span');
                    var ITEM = document.createElement('span');
                    ITEM.innerHTML = DONATES.val();
                    DONATE.appendChild(SPAN);
                    SPAN.appendChild(ITEM);
                })
    }, 2000);
}

var EVENT;

function EVENTS() {
    setTimeout(() => {
        fn.load('EVENTS-SELECT.html');
    }, 0000);
    setTimeout(() => {
        EVENT = document.getElementById('EVENT');
    }, 1000);
    setTimeout(() => {
        USERDATABASE.child(firebase.auth().currentUser.uid)
            .child('User/Post/Other/Event').on('child_added',
                function (EVENTS) {
                    var SPAN = document.createElement('span');
                    var ITEM = document.createElement('span');
                    ITEM.innerHTML = EVENTS.val();
                    EVENT.appendChild(SPAN);
                    SPAN.appendChild(ITEM);
                })
    }, 2000);
}

var MARKET;

function MARKETS() {
    setTimeout(() => {
        fn.load('MARKETS-SELECT.html');
    }, 0000);
    setTimeout(() => {
        MARKET = document.getElementById('MARKET');
    }, 1000);
    setTimeout(() => {
        USERDATABASE.child(firebase.auth().currentUser.uid)
            .child('User/Post/Other/Market').on('child_added',
                function (MARKETS) {
                    var SPAN = document.createElement('span');
                    var ITEM = document.createElement('span');
                    ITEM.innerHTML = MARKETS.val();
                    MARKET.appendChild(SPAN);
                    SPAN.appendChild(ITEM);
                })
    }, 2000);
}