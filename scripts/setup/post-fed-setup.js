// FOR IMAGES
var USERDATABASE = firebase.database().ref().child('Users');
var TEXTVALUE;
var SHARETEXT;
var IMGLIST;
var STORAGELINK;

function JUSTUPLOADX(dialog) {
    setTimeout(() => {
        fn.load('JUSTUPLOAD.html');
        HIDEADDPOST(dialog);
    }, 0000);
    setTimeout(() => {
        document.getElementById('JUSTBACK').innerHTML = "<ons-back-button style=\"color: #fff\" onclick=\"fn.load('homes.html'), SEEPOSTINFEED(), PULLTOREFRESH()\">BACK</ons-back-button>";
        var JUSTINPUT = document.getElementById('JUSTINPUT');
        var JUSTBUTTON = document.getElementById('JUSTBUTTON');

        var a = document.createElement('ons-input');
        a.setAttribute('style', 'width:100%');
        a.setAttribute('id', 'textvalue');
        a.setAttribute('value', '');
        a.setAttribute('placeholder', 'What are you thinking?');

        var b = document.createElement('ons-button');
        b.setAttribute('id', 'sharetext');
        b.setAttribute('modifier', 'noshadow');
        b.setAttribute('style', 'width:100%;background-color:#3498DB;color:#fff');
        b.innerHTML = '<b>POST MESSAGE</b>';

        JUSTINPUT.appendChild(a);
        JUSTBUTTON.appendChild(b);
    }, 1000);
    setTimeout(() => {
        TEXTVALUE = document.getElementById('textvalue');
        SHARETEXT = document.getElementById('sharetext');
        SHARETEXT.addEventListener('click', POSTNOW);
    }, 1001);
}

function IMAGEUPLOADX(dialog) {
    setTimeout(() => {
        fn.load('IMAGEUPLOAD.html');
        HIDEADDPOST(dialog);
    }, 0000);
    setTimeout(() => {
        document.getElementById('IMAGEBACK').innerHTML = "<ons-back-button style=\"color: #fff\" onclick=\"fn.load('homes.html'), SEEPOSTINFEED(), PULLTOREFRESH()\">BACK</ons-back-button>";

        var IMAGEINPUT = document.getElementById('IMAGEINPUT');
        var IMAGEBUTTON = document.getElementById('IMAGEBUTTON');

        var a = document.createElement('ons-input');
        a.setAttribute('style', 'width:100%');
        a.setAttribute('id', 'textvalue');
        a.setAttribute('value', '');
        a.setAttribute('placeholder', 'Share what you know about your photos and image?');

        var b = document.createElement('ons-button');
        b.setAttribute('id', 'sharetext');
        b.setAttribute('modifier', 'noshadow');
        b.setAttribute('style', 'width:100%;background-color:#3498DB;color:#fff');
        b.innerHTML = '<b>POST PHOTO AND IMAGE</b>';

        IMAGEINPUT.appendChild(a);
        IMAGEBUTTON.appendChild(b);
    }, 1000);
    setTimeout(() => {
        TEXTVALUE = document.getElementById('textvalue');
        SHARETEXT = document.getElementById('sharetext');
        SHARETEXT.addEventListener('click', POSTNOW);
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

function VIDEOUPLOADX(dialog) {
    setTimeout(() => {
        fn.load('VIDEOUPLOAD.html');
        HIDEADDPOST(dialog);
    }, 0000);
    setTimeout(() => {
        document.getElementById('VIDEOBACK').innerHTML = "<ons-back-button style=\"color: #fff\" onclick=\"fn.load('homes.html'), SEEPOSTINFEED(), PULLTOREFRESH()\">BACK</ons-back-button>";
        var VIDEOINPUT = document.getElementById('VIDEOINPUT');
        var VIDEOBUTTON = document.getElementById('VIDEOBUTTON');

        var a = document.createElement('ons-input');
        a.setAttribute('style', 'width:100%');
        a.setAttribute('id', 'textvalue');
        a.setAttribute('value', '');
        a.setAttribute('placeholder', 'Share what you know about your video and stream?');

        var b = document.createElement('ons-button');
        b.setAttribute('id', 'sharetext');
        b.setAttribute('modifier', 'noshadow');
        b.setAttribute('style', 'width:100%;background-color:#3498DB;color:#fff');
        b.innerHTML = '<b>POST VIDEO AND STREAM</b>';

        VIDEOINPUT.appendChild(a);
        VIDEOBUTTON.appendChild(b);
    }, 1000);
    setTimeout(() => {
        TEXTVALUE = document.getElementById('textvalue');
        SHARETEXT = document.getElementById('sharetext');
        SHARETEXT.addEventListener('click', POSTNOW);
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

function AUDIOUPLOADX(dialog) {
    setTimeout(() => {
        fn.load('AUDIOUPLOAD.html');
        HIDEADDPOST(dialog);
    }, 0000);
    setTimeout(() => {
        document.getElementById('AUDIOBACK').innerHTML = "<ons-back-button style=\"color: #fff\" onclick=\"fn.load('homes.html'), SEEPOSTINFEED(), PULLTOREFRESH()\">BACK</ons-back-button>";
        var AUDIOINPUT = document.getElementById('AUDIOINPUT');
        var AUDIOBUTTON = document.getElementById('AUDIOBUTTON');

        var a = document.createElement('ons-input');
        a.setAttribute('style', 'width:100%');
        a.setAttribute('id', 'textvalue');
        a.setAttribute('value', '');
        a.setAttribute('placeholder', 'Share what you know about your music and audio?');

        var b = document.createElement('ons-button');
        b.setAttribute('id', 'sharetext');
        b.setAttribute('modifier', 'noshadow');
        b.setAttribute('style', 'width:100%;background-color:#3498DB;color:#fff');
        b.innerHTML = '<b>POST MUSIC AND AUDIO</b>';

        AUDIOINPUT.appendChild(a);
        AUDIOBUTTON.appendChild(b);
    }, 1000);
    setTimeout(() => {
        TEXTVALUE = document.getElementById('textvalue');
        SHARETEXT = document.getElementById('sharetext');
        SHARETEXT.addEventListener('click', POSTNOW);
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

function DOCUMENTUPLOADX(dialog) {
    setTimeout(() => {
        fn.load('DOCUMENTUPLOAD.html');
        HIDEADDPOST(dialog);
    }, 0000);
    setTimeout(() => {
        document.getElementById('DOCUMENTBACK').innerHTML = "<ons-back-button style=\"color: #fff\" onclick=\"fn.load('homes.html'), SEEPOSTINFEED(), PULLTOREFRESH()\">BACK</ons-back-button>";
        var DOCUMENTINPUT = document.getElementById('DOCUMENTINPUT');
        var DOCUMENTBUTTON = document.getElementById('DOCUMENTBUTTON');

        var a = document.createElement('ons-input');
        a.setAttribute('style', 'width:100%');
        a.setAttribute('id', 'textvalue');
        a.setAttribute('value', '');
        a.setAttribute('placeholder', 'Headlines');

        var b = document.createElement('ons-button');
        b.setAttribute('id', 'sharetext');
        b.setAttribute('modifier', 'noshadow');
        b.setAttribute('style', 'width:100%;background-color:#3498DB;color:#fff');
        b.innerHTML = '<b>POST DOCUMENTS</b>';

        DOCUMENTINPUT.appendChild(a);
        DOCUMENTBUTTON.appendChild(b);
    }, 1000);
    setTimeout(() => {
        TEXTVALUE = document.getElementById('textvalue');
        SHARETEXT = document.getElementById('sharetext');
        SHARETEXT.addEventListener('click', POSTNOW);
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

function ZIPUPLOADX(dialog) {
    setTimeout(() => {
        fn.load('ZIPUPLOAD.html');
        HIDEADDPOST(dialog);
    }, 0000);
    setTimeout(() => {
        document.getElementById('ZIPBACK').innerHTML = "<ons-back-button style=\"color: #fff\" onclick=\"fn.load('homes.html'), SEEPOSTINFEED(), PULLTOREFRESH()\">BACK</ons-back-button>";
        var ZIPINPUT = document.getElementById('ZIPINPUT');
        var ZIPBUTTON = document.getElementById('ZIPBUTTON');

        var a = document.createElement('ons-input');
        a.setAttribute('style', 'width:100%');
        a.setAttribute('id', 'textvalue');
        a.setAttribute('value', '');
        a.setAttribute('placeholder', 'Share what you know about your download?');

        var b = document.createElement('ons-button');
        b.setAttribute('id', 'sharetext');
        b.setAttribute('modifier', 'noshadow');
        b.setAttribute('style', 'width:100%;background-color:#3498DB;color:#fff');
        b.innerHTML = '<b>POST DOWNLOAD</b>';

        ZIPINPUT.appendChild(a);
        ZIPBUTTON.appendChild(b);
    }, 1000);
    setTimeout(() => {
        TEXTVALUE = document.getElementById('textvalue');
        SHARETEXT = document.getElementById('sharetext');
        SHARETEXT.addEventListener('click', POSTNOW);
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

function ADSUPLOADX(dialog) {
    setTimeout(() => {
        fn.load('ADSUPLOAD.html');
        HIDEADDPOST(dialog);
    }, 0000);
    setTimeout(() => {
        document.getElementById('ADSBACK').innerHTML = "<ons-back-button style=\"color: #fff\" onclick=\"fn.load('homes.html'), SEEPOSTINFEED(), PULLTOREFRESH()\">BACK</ons-back-button>";
        var ADSINPUT = document.getElementById('ADSINPUT');
        var ADSBUTTON = document.getElementById('ADSBUTTON');

        var a = document.createElement('ons-input');
        a.setAttribute('style', 'width:100%');
        a.setAttribute('id', 'textvalue');
        a.setAttribute('value', '');
        a.setAttribute('placeholder', 'Headlines');

        var b = document.createElement('ons-button');
        b.setAttribute('id', 'sharetext');
        b.setAttribute('modifier', 'noshadow');
        b.setAttribute('style', 'width:100%;background-color:#3498DB;color:#fff');
        b.innerHTML = '<b>POST ADVERSTISEMENT</b>';

        ADSINPUT.appendChild(a);
        ADSBUTTON.appendChild(b);

        document.getElementById('ADSSELECT').innerHTML = "<img onclick=\"IMAGESELECTEDX()\" src=\"https://img.icons8.com/color/158/000000/xlarge-icons.png\"><img onclick=\"VIDEOSELECTEDX()\" src=\"https://img.icons8.com/color/158/000000/tv-show.png\">";

    }, 1000);
    setTimeout(() => {
        TEXTVALUE = document.getElementById('textvalue');
        SHARETEXT = document.getElementById('sharetext');
        SHARETEXT.addEventListener('click', POSTNOW);
    }, 1001);
}

function IMAGESELECTEDX() {
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

function VIDEOSELECTEDX() {
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

function JOBUPLOADX(dialog) {
    setTimeout(() => {
        fn.load('JOBUPLOAD.html');
        HIDEADDPOST(dialog);
    }, 0000);
    setTimeout(() => {
        document.getElementById('JOBBACK').innerHTML = "<ons-back-button style=\"color: #fff\" onclick=\"fn.load('homes.html'), SEEPOSTINFEED(), PULLTOREFRESH()\">BACK</ons-back-button>";
        var JOBINPUT = document.getElementById('JOBINPUT');
        var JOBBUTTON = document.getElementById('JOBBUTTON');

        var a = document.createElement('ons-input');
        a.setAttribute('style', 'width:100%');
        a.setAttribute('id', 'textvalue');
        a.setAttribute('value', '');
        a.setAttribute('placeholder', 'Headline');

        var b = document.createElement('ons-button');
        b.setAttribute('id', 'sharetext');
        b.setAttribute('modifier', 'noshadow');
        b.setAttribute('style', 'width:100%;background-color:#3498DB;color:#fff');
        b.innerHTML = '<b>POST JOB</b>';

        JOBINPUT.appendChild(a);
        JOBBUTTON.appendChild(b);
    }, 1000);
    setTimeout(() => {
        TEXTVALUE = document.getElementById('textvalue');
        SHARETEXT = document.getElementById('sharetext');
        SHARETEXT.addEventListener('click', POSTNOW);
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

function HOWTOUPLOADX(dialog) {
    setTimeout(() => {
        fn.load('HOWTOUPLOAD.html');
        HIDEADDPOST(dialog);
    }, 0000);
    setTimeout(() => {
        document.getElementById('HOWTOBACK').innerHTML = "<ons-back-button style=\"color: #fff\" onclick=\"fn.load('homes.html'), SEEPOSTINFEED(), PULLTOREFRESH()\">BACK</ons-back-button>";
        var HOWTOINPUT = document.getElementById('HOWTOINPUT');
        var HOWTOCONFIRMBUTTON = document.getElementById('HOWTOCONFIRMBUTTON');
        var HOWTOBUTTON = document.getElementById('HOWTOBUTTON');

        var a = document.createElement('ons-input');
        a.setAttribute('style', 'width:100%');
        a.setAttribute('id', 'textvalue');
        a.setAttribute('value', '');
        a.setAttribute('placeholder', 'How To: \"Your title here\"');

        var b = document.createElement('ons-button');
        b.setAttribute('onclick', 'SELECTED7X()');
        b.setAttribute('modifier', 'noshadow');
        b.setAttribute('style', 'width:100%;background-color:#3498DB;color:#fff');
        b.innerHTML = '<b>CONFIRM</b>';

        var c = document.createElement('ons-button');
        c.setAttribute('id', 'sharetext');
        c.setAttribute('modifier', 'noshadow');
        c.setAttribute('style', 'width:100%;background-color:#3498DB;color:#fff');
        c.innerHTML = '<b>POST HOW TO EVERYTHING</b>';

        HOWTOINPUT.appendChild(a);
        HOWTOCONFIRMBUTTON.appendChild(b);
        HOWTOBUTTON.appendChild(c);

        // IMAGE
        document.getElementById("HOWTOIMG1").innerHTML = '<img style="width:100%;height:100%" onclick="SELECTED1X()" id="SL1" src="https://img.icons8.com/color/158/000000/add-image.png">';
        document.getElementById("HOWTOIMG2").innerHTML = '<img style="width:100%;height:100%" onclick="SELECTED2X()" id="SL2" src="https://img.icons8.com/color/158/000000/add-image.png">';
        document.getElementById("HOWTOIMG3").innerHTML = '<img style="width:100%;height:100%" onclick="SELECTED3X()" id="SL3" src="https://img.icons8.com/color/158/000000/add-image.png">';
        document.getElementById("HOWTOIMG4").innerHTML = '<img style="width:100%;height:100%" onclick="SELECTED4X()" id="SL4" src="https://img.icons8.com/color/158/000000/add-image.png">';
        document.getElementById("HOWTOIMG5").innerHTML = '<img style="width:100%;height:100%" onclick="SELECTED5X()" id="SL5" src="https://img.icons8.com/color/158/000000/add-image.png">';
        document.getElementById("HOWTOIMG6").innerHTML = '<img style="width:100%;height:100%" onclick="SELECTED6X()" id="SL6" src="https://img.icons8.com/color/158/000000/add-image.png">';
    }, 1000);
    setTimeout(() => {
        TEXTVALUE = document.getElementById('textvalue');
        SHARETEXT = document.getElementById('sharetext');
        SHARETEXT.addEventListener('click', POSTNOW);
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

function SELECTED1X() {
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

function DONATEUPLOADX(dialog) {
    setTimeout(() => {
        fn.load('DONATEUPLOAD.html');
        HIDEADDPOST(dialog);
    }, 0000);
    setTimeout(() => {
        document.getElementById('DONATEBACK').innerHTML = "<ons-back-button style=\"color: #fff\" onclick=\"fn.load('homes.html'), SEEPOSTINFEED(), PULLTOREFRESH()\">BACK</ons-back-button>";

        var DONATEINPUT = document.getElementById('DONATEINPUT');
        var DONATEBUTTON = document.getElementById('DONATEBUTTON');

        var a = document.createElement('ons-input');
        a.setAttribute('style', 'width:100%');
        a.setAttribute('id', 'textvalue');
        a.setAttribute('value', '');
        a.setAttribute('placeholder', 'Title');

        var b = document.createElement('ons-button');
        b.setAttribute('id', 'sharetext');
        b.setAttribute('modifier', 'noshadow');
        b.setAttribute('style', 'width:100%;background-color:#3498DB;color:#fff');
        b.innerHTML = '<b>POST DONATION AND CHARITY</b>';

        DONATEINPUT.appendChild(a);
        DONATEBUTTON.appendChild(b);
    }, 1000);
    setTimeout(() => {
        TEXTVALUE = document.getElementById('textvalue');
        SHARETEXT = document.getElementById('sharetext');
        SHARETEXT.addEventListener('click', POSTNOW);
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

function EVENTUPLOADX(dialog) {
    setTimeout(() => {
        fn.load("EVENTUPLOAD.html");
        HIDEADDPOST(dialog);
    }, 0000);
    setTimeout(() => {
        document.getElementById("EVENTBACK").innerHTML =
            '<ons-back-button style="color: #fff" onclick="fn.load(\'homes.html\'), SEEPOSTINFEED(), PULLTOREFRESH()">BACK</ons-back-button>';

        var EVENTINPUT = document.getElementById("EVENTINPUT");
        var EVENTBUTTON = document.getElementById("EVENTBUTTON");

        var a = document.createElement("ons-input");
        a.setAttribute("style", "width:100%");
        a.setAttribute("id", "textvalue");
        a.setAttribute("value", "");
        a.setAttribute("placeholder", "Title");

        var b = document.createElement("ons-button");
        b.setAttribute("id", "sharetext");
        b.setAttribute("modifier", "noshadow");
        b.setAttribute("style", "width:100%;background-color:#3498DB;color:#fff");
        b.innerHTML = "<b>POST EVENT AND OCCASION</b>";

        EVENTINPUT.appendChild(a);
        EVENTBUTTON.appendChild(b);
    }, 1000);
    setTimeout(() => {
        TEXTVALUE = document.getElementById("textvalue");
        SHARETEXT = document.getElementById("sharetext");
        SHARETEXT.addEventListener("click", POSTNOW);
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

function MARKETUPLOADX(dialog) {
    setTimeout(() => {
        fn.load("MARKETUPLOAD.html");
        HIDEADDPOST(dialog);
    }, 0000);
    setTimeout(() => {
        document.getElementById("MARKETBACK").innerHTML =
            '<ons-back-button style="color: #fff" onclick="fn.load(\'homes.html\'), SEEPOSTINFEED(), PULLTOREFRESH()">BACK</ons-back-button>';

        var MARKETINPUT = document.getElementById("MARKETINPUT");
        var MARKETBUTTON = document.getElementById("MARKETBUTTON");

        var a = document.createElement("ons-input");
        a.setAttribute("style", "width:100%");
        a.setAttribute("id", "textvalue");
        a.setAttribute("value", "");
        a.setAttribute("placeholder", "Title");

        var b = document.createElement("ons-button");
        b.setAttribute("id", "sharetext");
        b.setAttribute("modifier", "noshadow");
        b.setAttribute("style", "width:100%;background-color:#3498DB;color:#fff");
        b.innerHTML = "<b>POST MARKET AND PRODUCT</b>";

        MARKETINPUT.appendChild(a);
        MARKETBUTTON.appendChild(b);
    }, 1000);
    setTimeout(() => {
        TEXTVALUE = document.getElementById("textvalue");
        SHARETEXT = document.getElementById("sharetext");
        SHARETEXT.addEventListener("click", POSTNOW);
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

// PLUS BUTTON
function SHOWADDPOST() {
    var dialog = document.getElementById('ADD-DIALOG');

    if (dialog) {
        dialog.show();
    } else {
        ons.createElement('ADDPOSTINFEED.html', {
                append: true
            })
            .then(function (dialog) {
                dialog.show();
            });
    }
};

function HIDEADDPOST(id) {
    document
        .getElementById(id)
        .hide();
};

function POSTNOW() {
    var VALUE = TEXTVALUE.value;
    var a;
    // Retrieve data from user
    USERDATABASE.child(firebase.auth().currentUser.uid).child('User')
        .child('About').orderByKey().equalTo('Name').on('child_added',
            function (YOURNAMEVAL) {
                a = USERDATABASE.child(firebase.auth().currentUser.uid)
                    .child('User').child('Post').child('Timeline')
                    .child(YOURNAMEVAL.val()).push().getKey();
            })
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
                            // TRASH BUTTO
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
                            // POST TO TIMELINE AND TIMELINE
                            USERDATABASE.child(firebase.auth().currentUser.uid)
                                .child('User').child('Post').child('Timeline')
                                .child(YOURNAMEVAL.val()).child(a).set(LOCALONE);
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
                                                                            firebase.database().ref('Users').child(FRIENDSUIDS.key)
                                                                                .child('User/Post/Feed').child(YOURFRIENDSKEY.key)
                                                                                .child(a).set(LOCALONE);
                                                                            /* STORE THE FILES TO IN THE DATABASE TO SEPARATE AND
                                                                                RETRIEVE BY USERS IN SPECIFIC ORDER*/
                                                                            if (IMGLIST) {
                                                                                // POST TO YOU
                                                                                // POST TO FRIENDS
                                                                                firebase.database().ref('Users').child(FRIENDSUIDS.key)
                                                                                    .child('User/Post/Other/Image').child(a).set(LOCALONE);
                                                                            }
                                                                            if (VIDEOLIST) {
                                                                                // POST TO YOU
                                                                                // POST TO FRIENDS
                                                                                firebase.database().ref('Users').child(FRIENDSUIDS.key)
                                                                                    .child('User/Post/Other/Video').child(a).set(LOCALONE);
                                                                            }
                                                                            if (AUDIOLIST) {
                                                                                // POST TO YOU
                                                                                // POST TO FRIENDS
                                                                                firebase.database().ref('Users').child(FRIENDSUIDS.key)
                                                                                    .child('User/Post/Other/Audio').child(a).set(LOCALONE);
                                                                            }
                                                                            if (DOCUMENTLIST) {
                                                                                // POST TO YOU
                                                                                // POST TO FRIENDS
                                                                                firebase.database().ref('Users').child(FRIENDSUIDS.key)
                                                                                    .child('User/Post/Other/Document').child(a).set(LOCALONE);
                                                                            }
                                                                            if (ZIPLIST) {
                                                                                // POST TO YOU
                                                                                // POST TO FRIENDS
                                                                                firebase.database().ref('Users').child(FRIENDSUIDS.key)
                                                                                    .child('User/Post/Other/Zip').child(a).set(LOCALONE);
                                                                            }
                                                                            if (ADSLIST) {
                                                                                // POST TO YOU
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
                                                                            fn.load('homes.html');
                                                                            SEEPOSTINFEED();
                                                                            PULLTOREFRESH();
                                                                        });
                                                                });
                                                        });
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
                                                    fn.load('homes.html');
                                                    SEEPOSTINFEED();
                                                    PULLTOREFRESH();
                                                }
                                            })
                                    })
                        })
            })

}

var SHAREDPOSTS;
var SHAREDONTIMELINE;

function SEEPOSTINFEED() {
    setTimeout(() => {
        firebase.database().ref('Users').on('value', function (check) {
            var a = check.child(firebase.auth().currentUser.uid).exists();
            if (a) {} else {
                document.getElementById('EDITPROFILEFIRST').innerHTML = "<div style=\"text-align: center; margin-top: 20%\"><ons-button style=\"background-color: #3498DB;color: #fff\" onclick=\"EDITPROFILE()\"><b>CREATE NEW PROFILE</b></ons-button></div>";
            }
        });
        console.log('SEEPOSTINFEED IS USING!');
        SHAREDPOSTS = document.getElementById('SHAREDPOSTS');
        SHAREDONTIMELINE = document.getElementById('SHAREDPOSTSINTIMELINE');
        // Retrieve data from public post
        firebase.auth().onAuthStateChanged(USER => {
            if (USER) {
                USERDATABASE.child(firebase.auth().currentUser.uid)
                    .child('User/About/Authentic').on('child_added',
                        function (myname) {
                            USERDATABASE.child(firebase.auth().currentUser.uid)
                                .child('User/Post/Feed').child(myname.key)
                                .on('value', function (check) {
                                    var a = check.exists();
                                    if (a) {
                                        USERDATABASE.child(firebase.auth().currentUser.uid)
                                            .child('User/Post/Feed').child(myname.key)
                                            .on('child_added', function (checked) {
                                                var span = document.createElement('span');
                                                var item = document.createElement('span');
                                                item.innerHTML = checked.val();
                                                SHAREDPOSTS.appendChild(span);
                                                span.appendChild(item);
                                            })
                                    }
                                })
                            USERDATABASE.child(firebase.auth().currentUser.uid)
                                .child('User/Post/Timeline')
                                .child(myname.key)
                                .on('value', function (check) {
                                    var a = check.exists();
                                    if (a) {
                                        USERDATABASE.child(firebase.auth().currentUser.uid)
                                            .child('User/Post/Timeline')
                                            .child(myname.key)
                                            .on('child_added', function (checked) {
                                                var span = document.createElement('span');
                                                var item = document.createElement('span');
                                                item.innerHTML = checked.val();
                                                SHAREDONTIMELINE.appendChild(span);
                                                span.appendChild(item);
                                            })
                                    }
                                })
                        })
            }
        })
    }, 2000);
}

/*
// Comment
var item2 = document.createElement('ons-list-item');
var COMMENTSECTION = document.createElement('div');
var COMMENTTEXTAREA = document.createElement('ons-input');
COMMENTTEXTAREA.setAttribute('modifier', 'underbar');
COMMENTTEXTAREA.setAttribute('placeholder', 'Comment...');
GETKEY1 = FEED.child('GETKEY').push('postcomment').getKey();
var GETKEY1S = GETKEY1.replace(/-/g, "");
COMMENTTEXTAREA.setAttribute('id', GETKEY1S);
COMMENTTEXTAREA.setAttribute('value', '');
COMMENTTEXTAREA.setAttribute('float');
var COMMENTBUTTON = document.createElement('ons-button');
COMMENTBUTTON.setAttribute('style', 'background-color: #3498DB');
var COMMENTBUTTONTEXT = document.createTextNode('COMMENT');
GETKEY2 = FEED.child('GETKEY').push('postcommentbutton').getKey();
var GETKEY2S = GETKEY2.replace(/-/g, "");
COMMENTBUTTON.setAttribute('id', GETKEY2S);
item2.appendChild(COMMENTSECTION);
COMMENTSECTION.appendChild(COMMENTTEXTAREA);
COMMENTSECTION.appendChild(COMMENTBUTTON);
COMMENTBUTTON.appendChild(COMMENTBUTTONTEXT);
// Comment Area
var item3 = document.createElement('ons-list-item');
item3.setAttribute('expandable');
item3.innerText = 'See Comments';
var COMMENTAREAAREA = document.createElement('div');
COMMENTAREAAREA.setAttribute('class', 'expandable-content');
GETKEY3 = FEED.child('GETKEY').push('commenareainput').getKey();
var GETKEY3S = GETKEY3.replace(/-/g, "");
COMMENTAREAAREA.setAttribute('id', GETKEY3S);
var SCRIPT = document.createElement('script');

item3.appendChild(COMMENTAREAAREA);
SCRIPT.appendChild(document.createTextNode(""));

    firebase.database().ref().child('feed').child('comment').orderByKey().on('child_added', function (snapshot) {
        firebase.auth().onAuthStateChanged(firebaseUser => {
            if (firebaseUser) {
                ul = document.createElement('ul');
                li = document.createElement('li');
                li.innerHTML = snapshot.val();
                APPENDCHILDUL = COMMENTAREAINPUT.appendChild(ul);
                APPENDCHILDLI = ul.appendChild(li);
                firebase.database().ref('Users').child(firebase.auth().currentUser.uid).orderByKey().equalTo('Name').on('child_added', function (snapshot) {
                    USRNM = document.createElement('b');
                    USRNM.innerText = snapshot.val();
                    REALUSRNM = USRNM.outerHTML;
                });
            }
        });
    }, function (errorObject) {
        console.log('The read failed: ' + errorObject.code);
    });


setTimeout(() => {
var COMMENTAREAINPUT;
var COMMENTINPUT;
var COMMENTINPUTSUBMIT;
var ul;
var li;
COMMENTAREAINPUT = document.getElementById(" + GETKEY3S + ");
var APPENDCHILDUL;
var APPENDCHILDLI;
var USRNM;
var REALUSRNM;

COMMENTINPUT = document.getElementById(" + GETKEY1S + ");
COMMENTINPUTSUBMIT = document.getElementById(" + GETKEY2S + ");
COMMENTINPUTSUBMIT.addEventListener('click', e => {
    var INPUTCOMMENT = COMMENTINPUT.value;
    firebase.database().ref('Users').on('child_added',
    function(UIDs) {
        firebase.database().ref('Users').child(UIDs.key)
    })
    firebase.database().ref('Users').child(fire).child('feed').child('comment').push(REALUSRNM + ': ' + INPUTCOMMENT);
});
}, 0000);
*/