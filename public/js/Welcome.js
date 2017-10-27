/* global $ */

$(document).ready(function() {
    
    var pr = 0;
    
    var pInt = setInterval(function() {
        pr += 7;
        console.log(pr);
        if (pr < 100) {
            $("#loading").css("width", pr + "%");
            $("#l_p").html(pr);
        }
    }, 300);
    
    setTimeout(function() {
        clearInterval(pInt);
    }, 4500);
    
    $('body').waitForImages(true).done(function() {
        $("#loading").css("width", "100%");
        $("#l_p").html("100");
            
        $("#content_wrapper").show();
        $("#loading_div").fadeOut(300);
    });

});