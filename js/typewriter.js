/**
 * http://pixelhunter.me/
 * 
 * text {String} - printing text
 * n {Number} - from what letter to start
 */
function typeWriter(text, n) {
  if (n < (text.length)) {
    $('.quote').html(text.substring(0, n+1));
    n++;
    setTimeout(function() {
      typeWriter(text, n)
    }, 100);
  }
}

$(document).ready(function () {
    setTimeout(function() {
        var text = $('.quote').data('text');

        typeWriter(text, 0);
    }, 3000);
    
});