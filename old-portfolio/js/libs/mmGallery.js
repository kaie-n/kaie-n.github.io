$(function(){
$(window).load(function(){
    // roXon mmGallery   
    MouseRelXpos = 0;  
    sumW = 0;
    
    // auto-SET mmGallery_container WIDTH ()
    $('#mmGallery img').each(function(){
        sumW += $(this).width(); // collect all images widths
        $('#mmGallery').width(sumW);//SET gallery WIDTH!
    });        
    // Calculate 'compensation speed': width difference between the gallery container and the gallery
    wDiff1 = $('#mmGallery_container').width();
    wDiff2 = $('#mmGallery').width();
    wDiff = (wDiff2/wDiff1)-1;  //(-1 is for the already existant container width)        
    //#
    
    $("#mmGallery_container").mousemove(function(e) {
        MouseRelXpos = (e.pageX - this.offsetLeft); // = mouse pos. 'minus' offsetLeft of this element       
    });
        
    var xSlider = $("#mmGallery");     // cache 
    var posX = 0;
    setInterval(function(){
        posX += (- MouseRelXpos - posX) / 14; // 14 = speed (higher val = slower animation)
        xSlider.css({marginLeft:  Math.round(posX * wDiff) +'px' }); // instead 'marginLeft' use 'left' for absolute pos. #mmGallery
    }, 10); // 10 = loop timeout
});
});//]]>  
