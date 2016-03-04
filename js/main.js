
wow = new WOW()
wow.init();

var logo
var share
var navLeft
var navRight

window.addEventListener('orientationchange', doOnOrientationChange);

window.onresize = function () {
    resizeShits();
}

window.onload = function () {
    var bg = document.getElementById('background-vertical');
    
        $('.overlay-center').addClass('overlay-center-loaded')
        $('#overlay').delay(2000).fadeOut();
    // change background yo
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
        if (u == "#contact" || u == "#thanks") {
            bg.style.background = "url(../img/portfolio/background-04.jpg) no-repeat center"
            bg.style.backgroundSize = "cover";
            $("#background-vertical").css('background', 'url(../img/portfolio/background-04.jpg) no-repeat center;');
        }
        
    });

    resizeShits();

    $("#form-contact").submit(function (evt) {
        evt.preventDefault();

        var userName = $("#form-name").val();
        var userPhone = $("#form-phone").val();
        var userEmail = $("#form-email").val();
        var userMessage = $("#form-message").val();
        $.ajax({
            url: "//formspree.io/contact@kaienx.com",
            method: "POST",
            data: {
                name: userName,
                phone: userPhone,
                email: userEmail,
                message: userMessage
            },
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            dataType: "json",
            error: function (err) {
                console.log(err);
            }
        }).done(function () {
            $("#contact-form").css('display', 'none');
            $("#contact-form-success").css('display','block')
            $("#contact-form-success").append("<p>Your message has been sent.</p><p>You may have a sip of coffee if you may while waiting for my reply.</p><br><p>Thank you!</p>");
        });
    });

}



function resizeShits() {
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
    if(change == bg.clientHeight){
     bgOverlay.style.height = String(change) + "px"
    }
    else {
        bgOverlay.style.height = String(bg.clientHeight) + "px";
    }
    document.getElementById('contact-form').style.height = String(change) + "px";

    // change form height accordingly :D
    var number = Math.round(0.473 * bg.clientHeight);
    var formHeight = String(number) + "px";
    $('#form-message').css('height', formHeight)
}

function doOnOrientationChange() {
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
    bgOverlay.style.height = String(document.getElementById("background-vertical").clientHeight) + "px";
    //bgOverlay.style.minHeight = String(change) + "px";
    document.getElementById('contact-form').style.height = String(change) + "px"
    
}


