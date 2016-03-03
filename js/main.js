
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
    var width = window.innerWidth
|| document.documentElement.clientWidth
|| document.body.clientWidth;

    var height = window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight;
    var change = height - (76 * 2)
    var bg = document.getElementById('background-vertical');
    var bgOverlay = document.getElementById('background-vertical-overlay');
    bg.style.minHeight = String(change) + "px"
    bgOverlay.style.minHeight = String(change) + "px"

    $(".linkage").on('click', function (e) {
        e.preventDefault();
        var t = $($(this).attr("href"))
        var u = $(this).attr("href");
        if (t.hasClass("show-time") == false) {
            $("div.show-time").each(function () {
                if ($("div").hasClass("show-time")) {
                    $('div.show-time').fadeOut(400, function () {
                        $('div.show-time').removeClass("show-time")
                        t.fadeToggle(400, function () {
                            t.addClass("show-time")
                        });
                        t.css("display", "table-cell");
                    });
                }
            });
        }
        if (u == "#homepage") {
            bg.style.background = "url(../img/portfolio/background-01.jpg) no-repeat center"
            bg.style.backgroundSize = "cover";
            $("#background-vertical").css('background', 'url(../img/portfolio/background-01.jpg) no-repeat center;');
        }
        if (u == "#about") {
            bg.style.background = "url(../img/portfolio/background-02.jpg) no-repeat center"
            bg.style.backgroundSize = "cover";
            $("#background-vertical").css('background', 'url(../img/portfolio/background-02.jpg) no-repeat center;');
        }
        
    });
}
window.onresize = function () {
    var width = window.innerWidth
|| document.documentElement.clientWidth
|| document.body.clientWidth;

    var height = window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight;
    var change = height - (76 * 2)
    var bg = document.getElementById('background-vertical');
    bg.style.minHeight = String(change) + "px"
    var bgOverlay = document.getElementById('background-vertical-overlay');
    bgOverlay.style.minHeight = String(change) + "px"
}

function toggleNavigation() {
    if (!logo.classList.contains('clicked')) {
        navRight.classList.remove('fadeOutRight')
        navRight.classList.add('fadeInRight', 'animated')

        navLeft.classList.remove('fadeOutLeft')
        navLeft.classList.add('fadeInLeft', 'animated')

        share.classList.remove('fadeOutUp')
        share.classList.add('fadeInDown', 'animated')
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