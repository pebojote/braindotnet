setTimeout(() => {
    // HOME
    // Menu Splitter
    window.fn = {}; //Calling the function fn
    //JavaScript Code For Opening The Menu Splitter
    window.fn.open = function () { //Calling function fn.open
        var menu = document.getElementById('menu'); //Variable menu calling Id menu from called function fn.open
        menu.open(); //Variable menu is open using function fn.open
    };

    try {
        //JavaScript Code For Loading The Menu Splitter Content
        window.fn.load = function (page) { //Function fn.load Will Load A Page Inside Menu Splitter Content
            var content = document.getElementById('content'); //Variable Content Calling Id content
            var menu = document.getElementById('menu'); //Variable menu is included inside function fn.load
            content.load(page) //Variable content is load using function fn.load included the page
                .then(menu.close.bind(menu)); //After: Close the Menu Splitter
        };
        throw 'Loaded in intro';
    } catch(error) {
        console.log(error);
    }
    
    //End
}, 5000);
