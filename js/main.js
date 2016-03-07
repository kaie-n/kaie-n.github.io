
wow = new WOW()
wow.init();
var loadOnce = false;
var index = 0;
var index2 = 0;
var currentVideo;
var divIndex = {
    "id": ["#homepage", "#about", "#works", "#contact", "#works"]
};
var portfolioIndex = [];
var bg;
$.mobile.autoInitializePage = false;
window.addEventListener('orientationchange', doOnOrientationChange);

window.onresize = function () {
    resizeShits();
}

$(window).load(function () {
    bg = document.getElementById('background-vertical');
    currentVideo = "";
    $('.overlay-center').addClass('overlay-center-loaded')
    $('#overlay').delay(2000).fadeOut(400, function () {
        setTimeout(function () {
            var text = $('.quote').data('text');

            typeWriter(text, 0);
        }, 2500);
        $(".sub").addClass("fadeInUp")
        $(".sub").removeClass('hideAfterFade')
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
        for (var i = 0; i < portfolioIndex.length; i++) {
            if (u == portfolioIndex[i]) {
                index2 = i;
                break;
            }
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
            $("#contact-form-success").css('display', 'block')
            $("#contact-form-success").append("<p>Your message has been sent.</p><p>You may have a sip of coffee if you may while waiting for my reply.</p><br><p>Thank you!</p>");
        });
    });

    // swipe stuff
    $(".text-vertical-center").on("swipeleft", function () {
        if (index != 4) {
            index++
            changePage(false, false);
        }
        else {
            index = 2;
            changePage(true, false);
        }
    });
    $(".text-vertical-center").on("swiperight", function () {
        if (index != 4) {
            index--;
            changePage(false, false);
        }
        else {
            index = 2;
            changePage(true, false);
        }
    });
    $("#portfolio-list").on("swipedown", ".portfolio-individual", function () {
        if (index == 4) {
            index2--;
            changePage(true, true);
        }
        console.log("swiped down")
    });
    $("#portfolio-list").on("swipeup", ".portfolio-individual", function () {
        if (index == 4) {
            index2++;
            changePage(true, true);
        }
        console.log("swiped up")
    });
});



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
                var thumb = "#vimeo-thumbs-" + numb;
                $("#portfolio-list").append('<div id="' + source_id + '" class="table-div-cell hideAfterFade"> <div class="portfolio-individual col-md-6 col-md-offset-3"><a><i class="fa fa-arrow-up fa-3x" onclick="index2--;changePage(true, true);"></i></a><p>' + caption + '</p><div class="embed-responsive embed-responsive-16by9">' + content + '</div><p><br/></p><a><i class="fa fa-arrow-down fa-3x" onclick="index2++;changePage(true, true);"></i></a></div></div>')
                $("#works-portfolio").append('<div class="col-md-4"><a href="#' + source_id + '" class="linkage2"><img id="vimeo-thumbs-' + numb + '" src="" style="width:100%; display:none;"/></a></div>')
                $.getJSON('http://www.vimeo.com/api/v2/video/' + numb + '.json?callback=?', { format: "json" }, function (data) {
                    $(thumb).attr("src", data[0].thumbnail_large);
                    $(thumb).delay(3000).fadeIn();
                    $('.loading').delay(3000).fadeOut();
                });
                //vimeoLoadingThumb(numb);
                resizeVideos()
                portfolioIndex.push("#" + source_id);
            });
            
            if (data.response.posts.length == 20) {
                retrieve_more(offset + 20);
            }
        });

    };
    retrieve_more(0);

}

function changePage(bool1, bool2) {
    var t;
    if (bool1 == false && bool2 == false) {
        if (index < 0) {
            index = 3;
        }
        else {
            if (index > 3) {
                index = 0;
            }
        }
        t = $(divIndex.id[index]);
        changeBackground(divIndex.id[index], bg);
    }
    if (bool1 == true && bool2 == false) {
        t = $(divIndex.id[index]);
        changeBackground(divIndex.id[index], bg);
    }
    if (bool1 == true && bool2 == true) {
        if (index2 < 0) {
            index2 = portfolioIndex.length - 1;
        }
        else {
            if (index2 >= portfolioIndex.length) {
                index2 = 0;
            }
        }
        t = $(portfolioIndex[index2]);
    }
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
        //vid[i].height = change - Math.round(change * 0.12664259927797833);
        vid[i].id = "vimeo-video-" + i;
        vid[i].className = "embed-responsive-item";
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
        document.getElementById('works-portfolio').style.height = String(change) + "px";
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


