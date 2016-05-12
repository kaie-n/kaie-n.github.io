﻿var swiper;
$(window).load(function () {
    var text = $('.quote').data('text');
    typeWriter(text, 0);
    wow = new WOW();
    wow.init();
    $(".sub").removeClass('hideAfterFade')
    swiper = new Swiper('.swiper-container', {
        slideToClickedSlide: true,
        spaceBetween: 30,
        loop: true,
        threshold: 100,
        simulateTouch: false
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
        thumbnailWidth: 410,
        thumbnailHeight: 'auto',
        thumbnailHoverEffect: 'labelSlideUp,borderLighter',
        thumbnailLabel: { display: true, align: 'center' },
        galleryToolbarHideIcons: true,
        displayBreadcrumb: false,
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
                    $('#back-to-top').addClass('show');
                } else {
                    $('#back-to-top').removeClass('show');
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
    $(document).on('submit', '#form-contact', function (e) {
        console.log("TEST")
       
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
});



window.onresize = function () {
    resizeShits();
}

function resizeShits() {
    bg = document.getElementById('child');
    var str = bg.clientHeight + "px";
    $('.overflow-scroll').css('height', str);
    $('.overflow-scroll').css('width', "100%");

}


