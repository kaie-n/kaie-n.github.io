var swiper;
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
            console.log('slide change start - before');
            console.log(swiper);
            console.log(swiper.activeIndex);

            if(swiper.activeIndex != 2){
                e.preventDefault();
                $('#nanoGallery2').animate({
                    scrollTop: 0
                }, 700);
                backToTop();
            }
            //before Event use it for your purpose
        }
    });



    //change text alittle bit here and there
    var text = ["video", "event", "project", "wedding", "engagement", "web design", "animation", "logo", "photography"];
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
        locationHash: false
    });

    //scroll to top
    if ($('#back-to-top').length) {
        var scrollTrigger = 100, // px
            backToTop = function () {
                var scrollTop = $('#nanoGallery2').scrollTop();
                if (scrollTop > scrollTrigger) {
                    $('#back-to-top').addClass('show')
                } else {
                    $('#back-to-top').removeClass("show")
                }
            };
        backToTop();
        $('#nanoGallery2').on('scroll', function () {
            backToTop();
        });
        $('#back-to-top').on('click', function (e) {
            e.preventDefault();
            $('#nanoGallery2').animate({
                scrollTop: 0
            }, 700);
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
                    $("#video-gallery").append('<div class="col-md-4"><a class="item" href="' + source_id + '" data-poster="' + data[0].thumbnail_large + '"><img src="' + data[0].thumbnail_large + '" style="width:100%;"></a></div>')
                    
                });
               
                
            });
           
            if (data.response.posts.length == 20) {
                retrieve_more(offset + 20);
            }

        });
    };
    
    retrieve_more(0);
    setTimeout(function () {
        $('#video-gallery').lightGallery({
            loadVimeoThumbnail: true,
            vimeoThumbSize: 'thumbnail_medium',
            selector: '.item'
        });
    }, 2500);
}


