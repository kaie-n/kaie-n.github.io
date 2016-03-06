
wow = new WOW()
wow.init();
var loadOnce = false;
var index = 0;
var currentVideo;
var divIndex = {
    "id": ["#homepage", "#about", "#works", "#contact", "#works"]

};
var bg;
$.mobile.autoInitializePage = false;
window.addEventListener('orientationchange', doOnOrientationChange);

window.onresize = function () {
    resizeShits();
}

window.onload = function () {
    bg = document.getElementById('background-vertical');
    currentVideo = "";
    $('.overlay-center').addClass('overlay-center-loaded')
    $('#overlay').delay(2000).fadeOut(400, function () {

    });
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
        changeBackground(u, bg);
        currentVideo = "";
    });
    $("#works-portfolio").on('click', '.linkage2', function (e) {
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
        changeBackground(u, bg);
        currentVideo = u + " iframe";
        index = 4;
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
            $("#contact-form-success").css('display', 'block')
            $("#contact-form-success").append("<p>Your message has been sent.</p><p>You may have a sip of coffee if you may while waiting for my reply.</p><br><p>Thank you!</p>");
        });
    });

    // swipe stuff
    $(".text-vertical-center").on("swipeleft", function () {
        if (index != 4) {
            index++
            changePage(false);
        }
        else {
            index = 2;
            changePage(true);
        }
    });
    $(".text-vertical-center").on("swiperight", function () {
        if (index != 4) {
            index--;
            changePage(false);
        }
        else {
            index = 2;
            changePage(true);
        }
    });
}



function loadPosts() {

    var key = "api_key=nSlp93ivVTteusCXvKX0o5PCnTo9fIhx1elpCuLTLCj97xlcE5";
    var api = "https://api.tumblr.com/v2/blog/kaien-x2.tumblr.com/";
    var retrieve_more = function (offset) {
        var t_data = $.getJSON(api + "posts/video?callback=?&filter=video&limit=20&offset=" + offset + "&" + key, function (data) {
            $.each(data.response.posts, function (i, item) {
                var content = item.player[2].embed_code;
                var caption = item.caption;
                var source_url = item.source_url;
                var numb = source_url.match(/\d/g);
                numb = numb.join("");
                var source_id = "vimeo-" + numb;
                $(".table-div").append('<div id="' + source_id + '" class="table-div-cell hideAfterFade"> <div class="col-md-6 col-md-offset-3"><p>' + caption + '</p>' + content + '</div></div>')

                $.getJSON('http://www.vimeo.com/api/v2/video/' + numb + '.json?callback=?', { format: "json" }, function (data) {
                    $("#works-portfolio").append('<div class="col-md-4"><a href="#' + source_id + '" class="linkage2"><img id="vimeo-thumbs-' + numb + '" src="' + data[0].thumbnail_large + '" style="width:100%"/></a></div>')
                });
                //vimeoLoadingThumb(numb);
                resizeVideos()
            });

            if (data.response.posts.length == 20) {
                retrieve_more(offset + 20);
            }
        });

    };
    retrieve_more(0);

}

function changePage(bool) {
    if (bool == false) {
        if (index < 0) {
            index = 3;
        }
        else {
            if (index > 3) {
                index = 0;
            }
        }
    }
    var t = $(divIndex.id[index]);
    changeBackground(divIndex.id[index], bg);
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

}

function pauseVideos() {
    if (currentVideo != "") {
        var temp = $(currentVideo).attr('src');
        $(currentVideo).attr('src', '');
        $(currentVideo).attr('src', temp)
    }
    currentVideo = "";
}

function resizeVideos() {

    var width = window.innerWidth
   || document.documentElement.clientWidth
   || document.body.clientWidth;

    var height = window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight;
    var change = height - (76 * 2);
    var vid = document.getElementsByTagName('iframe');
    for (var i = 0; i < vid.length; i++) {
        vid[i].height = change - Math.round(change * 0.12664259927797833);
        vid[i].id = "vimeo-video-" + i;
    }
}

//end of portfolio stuffs
function changeBackground(u, bg) {
    if (u == "#homepage") {
        index = 0;
        bg.style.background = "url(../img/portfolio/background-01.jpg) no-repeat center"
        bg.style.backgroundSize = "cover";
        $("#background-vertical").css('background', 'url(../img/portfolio/background-01.jpg) no-repeat center;');
    }
    if (u == "#about") {
        index = 1;
        bg.style.background = "url(../img/portfolio/background-02.jpg) no-repeat center"
        bg.style.backgroundSize = "cover";
        $("#background-vertical").css('background', 'url(../img/portfolio/background-02.jpg) no-repeat center;');
    }
    if (u == "#works") {
        index = 2;
        bg.style.background = "url(../img/portfolio/background-03.jpg) no-repeat center"
        bg.style.backgroundSize = "cover";
        $("#background-vertical").css('background', 'url(../img/portfolio/background-03.jpg) no-repeat center;');
        if (loadOnce == false) {
            loadPosts();
            loadOnce = true;
        }
        pauseVideos();
    }
    if (u == "#contact" || u == "#thanks") {
        index = 3;
        bg.style.background = "url(../img/portfolio/background-04.jpg) no-repeat center"
        bg.style.backgroundSize = "cover";
        $("#background-vertical").css('background', 'url(../img/portfolio/background-04.jpg) no-repeat center;');
    }

}


function resizeShits() {
    resizeVideos();
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
    if (change == bg.clientHeight) {
        bgOverlay.style.height = String(change) + "px"
    }
    else {
        bgOverlay.style.height = String(bg.clientHeight) + "px";
    }
    document.getElementById('contact-form').style.height = String(change) + "px";
    if (width < 992) {
        document.getElementById('works-portfolio').style.height = String(change) + "px";
    }
    else {
        document.getElementById('works-portfolio').style.height = "";
    }
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
    if (width < 992) {
        document.getElementById('works-portfolio').style.height = String(change) + "px";
    }
    else {
        document.getElementById('works-portfolio').style.height = "";
    }
    resizeVideos();
}


