﻿var swiper
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
        thumbnailWidth: 165,
        thumbnailHeight: 110,
        galleryToolbarHideIcons: true,
        displayBreadcrumb: false,
        galleryToolbarWidthAligned: false
    });
});

window.onresize = function () {
    resizeShits();
}

function resizeShits() {
    bg = document.getElementById('child');
    var str =  bg.clientHeight + "px";
    $('.overflow-scroll').css('height', str);
    $('.overflow-scroll').css('width', "100%");
    //setTimeout(function () {
    //    bg = document.getElementById('form-half-width');
    //    // change form height accordingly :D
    //    var number = Math.round(0.7 * bg.clientWidth);
    //    var formWidth = String(number) + "px";
    //    $('#form-contact').css('width', formWidth)
    //    console.log(number)
    //}, 2500);
}


var iOs = agent.indexOf('iphone') >= 0 || agent.indexOf('ipad') >= 0; 
var clickEvent = iOs ? 'touchend' : 'click';
var touchMoving = false;
if (iOs)
{  
    document.ontouchmove = function(e)
    {
        touchMoving = true;
    }

    document.ontouchend = function(e)
    {
        touchMoving = false;
    }
} 

$(document).bind('ready', function() 
{
    $(a).bind(clickEvent, function()
    {
        if (touchMoving) return false;
        // your code here
    });
}