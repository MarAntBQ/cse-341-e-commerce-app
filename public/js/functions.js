function menudisplayer() {
    var menubtn = document.getElementsByTagName("UL")[0];
    if (menubtn.classList == ""  || menubtn.classList == "desactivate-menu") {
        menubtn.classList.remove("desactivate-menu");
        menubtn.classList.add("active-menu");
    } else {
        menubtn.classList.add("desactivate-menu");
        setTimeout(function(){menubtn.classList.remove("active-menu"); menubtn.classList.remove("desactivate-menu");}, 450);
    }
}

function destroymenu() {
    var menubtn = document.getElementsByTagName("UL")[0];
    if (menubtn.classList == ""  || menubtn.classList == "desactivate-menu") {
        menubtn.classList.remove("desactivate-menu");
        menubtn.classList.add("active-menu");
    } else {
        menubtn.classList.add("desactivate-menu");
        setTimeout(function(){menubtn.classList.remove("active-menu"); menubtn.classList.remove("desactivate-menu");}, 450);
    }
}