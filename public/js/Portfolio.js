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
    }, 5000);
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

function navigate(target) {
    $("html, body").animate({
        scrollTop: $(target).offset().top - $("#proj_nav").outerHeight() - 20
    }, 1000);
}


$(document).ready(function() {
    
    $.getJSON(window.location.origin + "/api/projects", function(data) {
        
        for (var i = 0; i < data.length; i++) {
            var lang = data[i].languages.split(" ");
            var langDiv = '<div class="lang_div">'
            for (var l = 0; l < lang.length; l++) {
                langDiv += ('<img src="/public/img/lang/' + lang[l] + '_s.png" alt="' + lang[l] + ' Icon" class="lang_icon_s" />');
            }
            langDiv += '</div>';
            
            $("#"+data[i].category+"_projects").prepend('<div class="project_div"><div class="project_left_side"><h3 class="proj_div_h3">' + data[i].title + '</h3>' + langDiv + '<a href="' + window.location.origin + '/project?id=' + data[i]._id + '" class="pr_div_an">Project Description</a><a href="'+ data[i].link +'" class="pr_div_an" target="_blank">View Project</a></div><img src="' + data[i].image + '" alt="Project Image" class="project_right_side"/></div>');
        
        }
        
        $('body').waitForImages(true).progress(function(loaded, count, success) {
            var width = loaded * 100 / count;
            $("#loading").css("width", width + "%");
            $("#l_p").html(width.toFixed());
        }).done(function() {
            $("#loading").css("width", "100%");
            $("#l_p").html("100");
            
            $("#content_wrapper").show();
            $("#loading_div").fadeOut(300);
            
            startSlideshow();
        });
    });
    
    function navHover() {
        $(".proj_nav_btn").hover(function() {
            $(this).addClass("nav_hovered");
        }, function(){
            $(this).removeClass("nav_hovered");
        });
    }
    
    $(window).scroll(function(event) {
        
        var scrTop = $(this).scrollTop();
        
        if (scrTop > ($("#top_layer_2_bg").outerHeight() / 2 )) {
            $("#btt_btn").show(500);
        } else {
            $("#btt_btn").hide(500);
        }
        
        if (scrTop > ($("#top_layer_2_bg").outerHeight() + $("#middle_layer_1_bg").outerHeight() + $("#proj_nav").outerHeight()) + 5) {
            $("#proj_nav").css("position", "fixed");
        } else {
            $("#proj_nav").css("position", "absolute");
        }
        
        function calcOffset(id) {
            return $("#"+id).offset().top - $("#proj_nav").outerHeight() - 300;
        }
        
        function changeBordCol(id) {
            $(".proj_nav_btn").css("border-color", "#444");
            $("#"+id).css("border-color", "#8e793e");
            navHover();
        }
        
        if (scrTop >= calcOffset("be_p_d")) {
            changeBordCol("be_p_d_b");
            
        } else if (scrTop >= calcOffset("dv_p_d")) {
            changeBordCol("dv_p_d_b");
            
        } else if (scrTop >= calcOffset("fe_p_d")) {
            changeBordCol("fe_p_d_b");
            
        } else if (scrTop >= calcOffset("new_p_d")) {
            changeBordCol("new_p_d_b");
            
        } else {
            $(".proj_nav_btn").css("border-color", "#444");
            navHover();
        }
        
        var footertotop = ($("#footer").position().top);
        var scrolltop = $(document).scrollTop() + window.innerHeight;
        var difference = scrolltop - footertotop;
        
        if (scrolltop > footertotop) {
            $('#btt_btn').css("bottom", difference);
        } else {
            $('#btt_btn').css("bottom", 0);
        }
        
    });
    
    $("#btt_btn").click(function() {
        $("html, body").animate({
            scrollTop: $("body").offset().top
        }, 700);
    });
    
});