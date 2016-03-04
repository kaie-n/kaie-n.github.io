
wow = new WOW()
wow.init();

var logo
var share
var navLeft
var navRight



window.onload = function () {
    $('.overlay-center').addClass('overlay-center-loaded')
    $('#overlay').delay(2000).fadeOut();

    $(window).on("orientationchange", function () {
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
        bgOverlay.style.minHeight = String(document.getElementById("background-vertical").clientHeight) + "px"
        document.getElementById('contact-form').style.height = String(change) + "px";
    });
  
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
    bgOverlay.style.minHeight = String(document.getElementById("background-vertical").clientHeight) + "px"
    document.getElementById('contact-form').style.height = String(document.getElementById("background-vertical").clientHeight) + "px";
    $(".linkage").on('click', function (e) {
        e.preventDefault();
        var t = $($(this).attr("href"))
        var u = $(this).attr("href");
        if (t.hasClass("show-time") == false) {
            $("div.show-time").each(function () {
                if ($("div").hasClass("show-time")) {
                    $('div.show-time').fadeOut(250, function () {
                        $('div.show-time').removeClass("show-time")
                        t.fadeToggle(250, function () {
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
        if (u == "#works") {
            bg.style.background = "url(../img/portfolio/background-03.jpg) no-repeat center"
            bg.style.backgroundSize = "cover";
            $("#background-vertical").css('background', 'url(../img/portfolio/background-03.jpg) no-repeat center;');
        }
        if (u == "#contact") {
            bg.style.background = "url(../img/portfolio/background-04.jpg) no-repeat center"
            bg.style.backgroundSize = "cover";
            $("#background-vertical").css('background', 'url(../img/portfolio/background-04.jpg) no-repeat center;');
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
    document.getElementById('contact-form').style.height = String(change) + "px";
}

