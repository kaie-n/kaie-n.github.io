/*!
 * Start Bootstrap - Grayscale Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
  if ($(this).attr('class') != 'dropdown-toggle active' && $(this).attr('class') != 'dropdown-toggle') {
    $('.navbar-toggle:visible').click();
  }
});

$(document).ready(function () {
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
    $('#fullpage').fullpage({
            //Navigation
            //anchors:['intro', 'about'],
        scrollOverflow:true,
            showActiveTooltip: false,
            slidesNavigation: true,
            slidesNavPosition: 'bottom',
            onLeave: function (index, nextIndex, direction) {
                var leavingSection = $(this);

                //after leaving section 2
                if (index == 2 && direction == 'down') {
                }
                else if (index == 2 && direction == 'up') {
                }
            }
    });
    $('.overlay').delay(1000).fadeOut(1200);
});
