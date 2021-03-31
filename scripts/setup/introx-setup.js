// INDEX
// FIREBASE AUTHENTICATION
// LOGIN IS DEFINE AND READY TO EXECUTE
// LISTEN TO STATUS OF USER IF HE/SHE IS LOGIN OR NOT.
var tos;
var termsofservice;
var hidetermsofservice;
var disambiguation;
var hidedisambiguation;
var urr;
var hideurr;
var disclaimer;
var hidedisclaimer;
var modification;
var hidemodification;
var privacy;
var privacyguideline;
var hideprivacyguideline;
var privacypolicy;
var hideprivacypolicy;
var csi;
var hidecsi;
var aus;
var hideaus;
var tpdcos;
var hidetpdcos;
var cls;
var hidecls;
// TERMS OF SERVICE
tos = {};
setTimeout(() => {
    ons.ready(function () {
        ons.createElement('tos.html', {
                append: true
            })
            .then(function (sheet) {
                tos.showAA = sheet.show.bind(sheettos);
                tos.hideAA = sheet.hide.bind(sheettos);
            });
    });
}, 15000);

//Terms of Service Dialog
//Our Terms of Service
termsofservice = function () {
    var dialog = document.getElementById('termsofservice-dialog');

    if (dialog) {
        dialog.show();
    } else {
        ons.createElement('termsofservice.html', {
                append: true
            })
            .then(function (dialog) {
                dialog.show();
            });
    }
};

hidetermsofservice = function (id) {
    document
        .getElementById(id)
        .hide();
};

//Disambiguation/definition of key words and phrases
disambiguation = function () {
    var dialog = document.getElementById('disambiguation-dialog');

    if (dialog) {
        dialog.show();
    } else {
        ons.createElement('disambiguation.html', {
                append: true
            })
            .then(function (dialog) {
                dialog.show();
            });
    }
};

hidedisambiguation = function (id) {
    document
        .getElementById(id)
        .hide();
};
//User rights and responsibilities
urr = function () {
    var dialog = document.getElementById('urr-dialog');

    if (dialog) {
        dialog.show();
    } else {
        ons.createElement('urr.html', {
                append: true
            })
            .then(function (dialog) {
                dialog.show();
            });
    }
};

hideurr = function (id) {
    document
        .getElementById(id)
        .hide();
};
//Disclaimer/Limitation of Liability clarifying the site's legal liability for damages incurred by users
disclaimer = function () {
    var dialog = document.getElementById('disclaimer-dialog');

    if (dialog) {
        dialog.show();
    } else {
        ons.createElement('disclaimer.html', {
                append: true
            })
            .then(function (dialog) {
                dialog.show();
            });
    }
};

hidedisclaimer = function (id) {
    document
        .getElementById(id)
        .hide();
};
//User notification upon modification of terms, if offered
modification = function () {
    var dialog = document.getElementById('modification-dialog');

    if (dialog) {
        dialog.show();
    } else {
        ons.createElement('modification.html', {
                append: true
            })
            .then(function (dialog) {
                dialog.show();
            });
    }
};

hidemodification = function (id) {
    document
        .getElementById(id)
        .hide();
};

/* PRIVACY GUIDELINES. THIS IS THE PRIVACY GUIDELINES OF THE APP AND SHOULD NEVER BEEN CHANGE */
privacy = {};

setTimeout(() => {
    ons.ready(function () {
        ons.createElement('privacyguidelines.html', {
                append: true
            })
            .then(function (sheet) {
                privacy.showAA = sheet.show.bind(sheetprivacy);
                privacy.hideAA = sheet.hide.bind(sheetprivacy);
            });
    });
}, 15000);

//Privacy Guidelines Dialog
//Our Privacy Guidelines
privacyguideline = function () {
    var dialog = document.getElementById('privacyguideline-dialog');

    if (dialog) {
        dialog.show();
    } else {
        ons.createElement('privacyguideline.html', {
                append: true
            })
            .then(function (dialog) {
                dialog.show();
            });
    }
};

hideprivacyguideline = function (id) {
    document
        .getElementById(id)
        .hide();
};

//Privacy policy
privacypolicy = function () {
    var dialog = document.getElementById('privacypolicy-dialog');

    if (dialog) {
        dialog.show();
    } else {
        ons.createElement('privacypolicy.html', {
                append: true
            })
            .then(function (dialog) {
                dialog.show();
            });
    }
};

hideprivacypolicy = function (id) {
    document
        .getElementById(id)
        .hide();
};

//Collection of sensitive information
csi = function () {
    var dialog = document.getElementById('csi-dialog');

    if (dialog) {
        dialog.show();
    } else {
        ons.createElement('csi.html', {
                append: true
            })
            .then(function (dialog) {
                dialog.show();
            });
    }
};

hidecsi = function (id) {
    document
        .getElementById(id)
        .hide();
};

//Avoiding users suprise
aus = function () {
    var dialog = document.getElementById('aus-dialog');

    if (dialog) {
        dialog.show();
    } else {
        ons.createElement('aus.html', {
                append: true
            })
            .then(function (dialog) {
                dialog.show();
            });
    }
};

hideaus = function (id) {
    document
        .getElementById(id)
        .hide();
};

//Third party data collection or sharing
tpdcos = function () {
    var dialog = document.getElementById('tpdcos-dialog');

    if (dialog) {
        dialog.show();
    } else {
        ons.createElement('tpdcos.html', {
                append: true
            })
            .then(function (dialog) {
                dialog.show();
            });
    }
};

hidetpdcos = function (id) {
    document
        .getElementById(id)
        .hide();
};

//Collection limitation and security
cls = function () {
    var dialog = document.getElementById('cls-dialog');

    if (dialog) {
        dialog.show();
    } else {
        ons.createElement('cls.html', {
                append: true
            })
            .then(function (dialog) {
                dialog.show();
            });
    }
};

hidecls = function (id) {
    document
        .getElementById(id)
        .hide();
};