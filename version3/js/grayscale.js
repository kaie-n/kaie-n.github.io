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

    $('#fullpage').fullpage({
            //Navigation
            anchors:['intro', 'about'],
            navigation: true,
            navigationPosition: 'left',
            navigationTooltips: ['intro', 'about'],
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