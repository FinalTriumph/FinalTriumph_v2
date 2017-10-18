/* global $ */

var actSl = 2;
var slideshow;

function swapClasses(num) {
    $(".ss_img").removeClass("ss_selected");
    $(".ss_img_" + num).addClass("ss_selected");
    $(".slide_s").removeClass("slide_s_selected");
    $(".slide_s_" + num).addClass("slide_s_selected");
}

function showNextImg() {
    if (actSl === 3) {
        actSl = 1;
    } else {
        actSl +=1;
    }
    
    swapClasses(actSl);
}

function startSlideshow() {
    slideshow = setInterval(function() {
        showNextImg();
    }, 3000);
}

function nextImg() {
    clearInterval(slideshow);
    showNextImg();
    startSlideshow();
}

function prevImg() {
    clearInterval(slideshow);
    
    if (actSl === 1) {
        actSl = 3;
    } else {
        actSl -=1;
    }
    
    swapClasses(actSl);
    
    startSlideshow();
}

function showImg(num) {
    clearInterval(slideshow);
    
    swapClasses(num);
    
    actSl = num;
    
    startSlideshow();
}

$(document).ready(function() {
    startSlideshow();
    
    $.getJSON(window.location.origin + "/api/projects", function(data) {
        
        for (var i = 0; i < data.length; i++) {
            $("#"+data[i].category+"_projects").prepend('<div class="project_div"><h3>'+data[i].title+'</h3><p>'+data[i].languages+'</p><img src="'+data[i].image+'" alt="Project Image" class="pr_img_s"/></div>');
        }
    
    });
});