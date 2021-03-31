
// CHECK IF THERE IS INTERNET CONNECTION
window.onload = checkInternetConnection;
var CLEARINTERVAL;

function checkInternetConnection() {
    var isOnLine = navigator.onLine;
    if (isOnLine) {
        // HAS INTERNET CONNECTION
        // NOT WE WILL GOING TO CHECK THE INTERNET SPEED
        var arrTimes = [];
        // START
        var i = 0;
        var timesToTest = 5;
        // MS
        var tThreshold = 150;
        // SMALL IMAGE IN THE SERVER FOR TESTING
        var testImage = "http://www.google.com/images/phd/px.gif";
        var dummyImage = new Image();
        var isConnectedFast = false;

        testLatency(function (avg) {
            isConnectedFast = (avg <= tThreshold);
            // OUTPUT 
            // OUTPUT OF THE SPEED WILL GOING TO USE TO SLOW, MID, OR HIGH
            avg = Math.trunc(avg.toFixed(2));
            console.log(avg);
            var isMobile = {
                Windows: function () {
                    return /IEMobile/i.test(navigator.userAgent);
                },
                Android: function () {
                    return /Android/i.test(navigator.userAgent);
                },
                BlackBerry: function () {
                    return /BlackBerry/i.test(navigator.userAgent);
                },
                iOS: function () {
                    return /iPhone|iPad|iPod/i.test(navigator.userAgent);
                },
                any: function () {
                    return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() ||
                        isMobile.Windows());
                }
            }
            if (avg.toFixed(2) <= 18) {
                // SLOW
                setTimeout(() => {
                    fn.load('SLOWINTERNET.html');
                }, 3000);
            } else if (avg.toFixed(2) <= 55) {
                // MIDDLE
                //fn.load('MIDINTERNET.html');
                // IF RUNNING IN MOBILE DEVICES
                if (isMobile.Android()) {
                    // ORIGINAL
                    
                    $('#BODY').load('platform/android.html #ANDROIDWEB');
                    setTimeout(() => {
                        INSTALLNOW();
                    }, 5000);
                    console.log("Android Phone");
                    clearInterval(CLEARINTERVAL);
                } else if (isMobile.BlackBerry()) {
                    // NOT AVAILABLE
                    
                    window.location.href = '404/index.html';
                    console.log("Blackberry Phone");
                    clearInterval(CLEARINTERVAL);
                } else if (isMobile.iOS()) {
                    // AVAILBLE
                    
                    $('#BODY').load('platform/ios.html #IOSWEB');
                    setTimeout(() => {
                        INSTALLNOW();
                    }, 5000);
                    console.log("iOS Phone");
                    clearInterval(CLEARINTERVAL);
                } else if (isMobile.Windows()) {
                    // NOT AVAILABLE
                    
                    window.location.href = '404/index.html';
                    console.log("Window Phone");
                    clearInterval(CLEARINTERVAL);
                } else {
                    // ELSE RUNNING IN DESKTOP
                    
                    window.location.href = '404/index.html';

                    console.log("Desktop");
                    clearInterval(CLEARINTERVAL);
                }
            } else if (avg.toFixed(2) <= 166) {
                // HIGH
                //fn.load('HIGHINTERNET.html');
                // IF RUNNING IN MOBILE DEVICES
                if (isMobile.Android()) {
                    // ORIGINAL

                    $('#BODY').load('platform/android.html #ANDROIDWEB');
                    setTimeout(() => {
                        INSTALLNOW();
                    }, 5000);
                    console.log("Android Phone");
                    clearInterval(CLEARINTERVAL);
                } else if (isMobile.BlackBerry()) {
                    // NOT AVAILABLE

                    window.location.href = '404/index.html';
                    console.log("Blackberry Phone");
                    clearInterval(CLEARINTERVAL);
                } else if (isMobile.iOS()) {
                    // AVAILBLE

                    $('#BODY').load('platform/ios.html #IOSWEB');
                    setTimeout(() => {
                        INSTALLNOW();
                    }, 5000);
                    console.log("iOS Phone");
                    clearInterval(CLEARINTERVAL);
                } else if (isMobile.Windows()) {
                    // NOT AVAILABLE

                    window.location.href = '404/index.html';
                    console.log("Window Phone");
                    clearInterval(CLEARINTERVAL);
                } else {
                    // ELSE RUNNING IN DESKTOP

                    window.location.href = '404/index.html';

                    console.log("Desktop");
                    clearInterval(CLEARINTERVAL);
                }
            } else if (avg.toFixed(2) <= 1000) {
                // HIGHEST
                //fn.load('HIGHESTINTERNET.html');
                // IF RUNNING IN MOBILE DEVICES
                if (isMobile.Android()) {
                    // ORIGINAL

                    $('#BODY').load('platform/android.html #ANDROIDWEB');
                    setTimeout(() => {
                        INSTALLNOW();
                    }, 5000);
                    console.log("Android Phone");
                    clearInterval(CLEARINTERVAL);
                } else if (isMobile.BlackBerry()) {
                    // NOT AVAILABLE

                    window.location.href = '404/index.html';
                    console.log("Blackberry Phone");
                    clearInterval(CLEARINTERVAL);
                } else if (isMobile.iOS()) {
                    // AVAILBLE

                    $('#BODY').load('platform/ios.html #IOSWEB');
                    setTimeout(() => {
                        INSTALLNOW();
                    }, 5000);
                    console.log("iOS Phone");
                    clearInterval(CLEARINTERVAL);
                } else if (isMobile.Windows()) {
                    // NOT AVAILABLE

                    window.location.href = '404/index.html';
                    console.log("Window Phone");
                    clearInterval(CLEARINTERVAL);
                } else {
                    // ELSE RUNNING IN DESKTOP

                    window.location.href = '404/index.html';

                    console.log("Desktop");
                    clearInterval(CLEARINTERVAL);
                }
            }
        });

        // TEST AND AVERAGE TIME TO TOOK TO DOWNLOAD IMAGE FROM SERVER, CALLED RECURSIVELY TIMETOTEST TIMES
        function testLatency(cb) {
            var tStart = new Date().getTime();
            if (i < timesToTest - 1) {
                dummyImage.src = testImage + '?t=' + tStart;
                dummyImage.onload = function () {
                    var tEnd = new Date().getTime();
                    var tTimeTook = tEnd - tStart;
                    arrTimes[i] = tTimeTook;
                    testLatency(cb);
                    i++;
                };
            } else {
                // CALCULATE AVERAGE OF ARRAY ITEMS THEN CALLBACK
                var sum = arrTimes.reduce(function (a, b) {
                    return a + b;
                });
                var avg = sum / arrTimes.length;
                cb(avg);
            }
        }

    } else {
        // NO INTERNET CONNECTION
        fn.load('NOINTERNET.html');
    }
}
CLEARINTERVAL = setInterval(() => {
    checkInternetConnection();
}, 5000);