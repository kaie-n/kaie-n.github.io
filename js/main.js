
wow = new WOW()
wow.init();

var logo 
var share
var navLeft
var navRight
window.onload = function () {
    logo = document.getElementById('logo-overlay')
    share = document.getElementById('share')
    navLeft = document.getElementById('nav-left')
    navRight = document.getElementById('nav-right')

    logo.onmousedown = function () {
        toggleNavigation();
        navLeft.classList.toggle('hideAfterFade')
        navRight.classList.toggle('hideAfterFade')
        share.classList.toggle('hideAfterFade')
        logo.classList.toggle('clicked')
    };
}

function toggleNavigation(){
    if (!logo.classList.contains('clicked')) {
        navRight.classList.remove('fadeOutRight')
        navRight.classList.add('fadeInRight', 'animated')

        navLeft.classList.remove('fadeOutLeft')
        navLeft.classList.add('fadeInLeft', 'animated')

        share.classList.remove('fadeOutUp')
        share.classList.add('fadeInDown','animated')
    }
    if (logo.classList.contains('clicked')) {
        navRight.classList.remove('fadeInRight')
        navRight.classList.add('fadeOutRight', 'animated')

        navLeft.classList.remove('fadeInLeft')
        navLeft.classList.add('fadeOutLeft', 'animated')

        share.classList.remove('fadeInDown')
        share.classList.add('fadeOutUp', 'animated')
    }
}