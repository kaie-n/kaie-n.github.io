var swiper;
var currentSlider;
function backToTop(target) {
    var scrollTrigger = 100, // px      
    scrollTest = target.scrollTop();
    var tween;
    if (scrollTest > scrollTrigger) {
        currentSlider = target;
        tween = TweenMax.to($('#back-to-top'), 0.5, { alpha: 1, onStart: showClass, onStartParams: [true] })
        //$('#back-to-top').addClass('show')
        return true;
    } else {
        tween = TweenMax.to($('#back-to-top'), 0.5, { alpha: 0, onComplete: showClass, onCompleteParams: [false] })
        //$('#back-to-top').removeClass("show")
        return false;
    }
          
}
$(window).load(function () {
    var text = $('.quote').data('text');
    typeWriter(text, 0);
    wow = new WOW();
    wow.init();
    $(".sub").removeClass('hideAfterFade')
    swiper = new Swiper('.swiper-container', {
        slideToClickedSlide: true,
        spaceBetween: 30,
        loop: false,
        threshold: 100,
        simulateTouch: false,
        onSlideChangeStart: function (swiper) {
            $('.linkage').each(function () {
                $(this).blur();
                //console.log($(this).attr("data-src"));
                if ($(this).attr("data-src") == swiper.activeIndex) {
                    $(this).addClass('thick');
                    $(this).removeClass('normal');
                }
                else {
                    $(this).removeClass('thick');
                    $(this).addClass('normal');
                }
            });
            if (currentSlider != undefined) {
                animateToTop(currentSlider);
            }
            //testScroll($('#nanoGallery2'));
            //testScroll($('#nanoGallery3'));
            //testScroll($('#video-gallery'));
            //if (backToTop($('#nanoGallery2'))){
            //    animateToTop($('#nanoGallery2'));
            //}
            //animateToTop($('#nanoGallery3'));
            //animateToTop($('#video-gallery'));

            //before Event use it for your purpose
        }
    });



    //change text alittle bit here and there
    var text = ["video", "event", "project", "wedding", "engagement", "web design", "animation", "logo", "photography", "application"];
    var counter = 0;
    var elem = document.getElementById("project");
    setInterval(change, 1000);
    function change() {
        elem.innerHTML = text[counter];
        counter++;
        if (counter >= text.length) { counter = 0; }
    }

    $("#nanoGallery2").nanoGallery({
        kind: 'picasa',
        userID: '110838454337071281550',
        thumbnailWidth: 210,
        thumbnailHeight: 'auto',
        thumbnailHoverEffect: 'labelSlideUp,borderLighter',
        thumbnailLabel: { display: true, align: 'center' },
        galleryToolbarHideIcons: true,
        galleryToolbarWidthAligned: false,
        touchAutoOpenDelay: -1,
        locationHash: false,
        albumSorting: 'titleAsc'
    });
    $("#nanoGallery3").nanoGallery({
        kind: 'picasa',
        userID: '109844609354000166046',
        thumbnailWidth: 250,
        thumbnailHeight: 'auto',
        thumbnailHoverEffect: 'labelSlideUp,borderLighter',
        thumbnailLabel: { display: true, align: 'center' },
        galleryToolbarHideIcons: true,
        galleryToolbarWidthAligned: false,
        touchAutoOpenDelay: -1,
        locationHash: false,
        albumSorting: 'titleAsc'
    });

    //reset Scrolls?
    $('body').on('click', 'a.myclass', function () {
        // do something
    });
    //scroll to top
    if ($('#back-to-top').length) {

        $('#nanoGallery2').on('scroll', function () {
            backToTop($('#nanoGallery2'));
        });
        $('#nanoGallery3').on('scroll', function () {
            backToTop($('#nanoGallery3'));
        });
        $('#video-gallery').on('scroll', function () {
            backToTop($('#video-gallery'));
        });
        $('#back-to-top').on('click', function (e) {
            e.preventDefault();
            if (swiper.activeIndex == 2) {

                animateToTop($('#nanoGallery2'));
            }
            if (swiper.activeIndex == 3) {

                animateToTop($('#nanoGallery3'));
            }
            if (swiper.activeIndex == 4) {

                animateToTop($('#video-gallery'));
            }

        });
    }
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
            $('#myModal').modal('show');
            //$("#contact-form").css('display', 'none');
            //$("#contact-form-success").css('display', 'block')
            //$("#contact-form-success").append("<p>I have received your request</p><p class='sub'>You may have a sip of coffee while waiting for my reply.</p><p class='sub'>Thank you!</p>");
        });
        return false;
    });
    loadPosts();
});
function animateToTop(target) {
    target.animate({
        scrollTop: 0
    }, 500);
}
window.addEventListener('orientationchange', resizeShits);

window.onresize = function () {
    resizeShits();
}

function resizeShits() {
    bg = document.getElementById('child');
    var str = bg.clientHeight + "px";
    $('.overflow-scroll').css('height', str);
    $('.overflow-scroll').css('width', "100%");

}

function showClass(bool) {
    if (bool) {
        $('#back-to-top').addClass('show')
    } else {
        $('#back-to-top').removeClass('show')
    }
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
                var source_id = "https://vimeo.com/" + numb;
                $.getJSON('http://www.vimeo.com/api/v2/video/' + numb + '.json?callback=?', { format: "json" }, function (data) {
                    $("#video-gallery").append('<div class="col-md-4"><a class="item" href="' + source_id + '"><img src="' + data[0].thumbnail_large + '" style="width:100%;"></a></div>')

                });


            });

            if (data.response.posts.length == 20) {
                retrieve_more(offset + 20);
            }
            setTimeout(function () {
                $('#video-gallery').lightGallery({
                    loadVimeoThumbnail: true,
                    vimeoThumbSize: 'thumbnail_medium',
                    selector: '.item'
                });
            }, 2500);
        });
    };

    retrieve_more(0);

}
function waitForElementToDisplay(selector, time) {
    if (document.querySelector(selector) != null) {
        $('#video-gallery').lightGallery({
            loadVimeoThumbnail: true,
            vimeoThumbSize: 'thumbnail_medium',
            selector: '.item'
        });
        return;
    }
    else {
        setTimeout(function () {
            waitForElementToDisplay(selector, time);
        }, time);
    }
}

