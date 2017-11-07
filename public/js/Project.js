/* global $ */

$(document).ready(function() {
    var id = window.location.href.split('?')[1].substring(3);
    
    $.getJSON(window.location.origin + "/api/singleproject?id=" + id, function(data) {
        for (var i = 0; i < data.length; i++) {
            var lang = data[i].languages.split(" ");
            var langDiv = '<div class="lang_div">';
            for (var l = 0; l < lang.length; l++) {
                langDiv += ('<img src="/public/img/lang/' + lang[l] + '_s.png" alt="' + lang[l] + ' Icon" class="lang_icon_s" />');
            }
            langDiv += '</div>';
            
            if (data[i]._id === id) {
                
                $("#single_project").append('<div id="sp_div_left"><h3 id="sp_h3">'+data[i].title+'</h3><p id="sp_p">'+data[i].description+'</p><div id="sp_lang">'+langDiv+'</div></div><div id="sp_div_right"><img src="'+data[i].image+'" alt="Project Image" id="sp_pr_img" /><br /><a href="'+ data[i].link +'" id="sp_div_an" target="_blank">View Project</a></div>');
                document.title = data[i].title + ' | FinalTriumph | Web Developer';
                
                var catH3;
                
                switch(data[i].category) {
                    case "new": 
                        catH3 = 'Other Newest Projects';
                        break;
                    case "fccfe": 
                        catH3 = 'Other Front End Projects for Free Code Camp<br /><span class="pr_anounc_p">Created with main focus on <span class="gold_c">HTML</span> / <span class="gold_c">CSS</span> / <span class="gold_c">JavaScript</span> / <span class="gold_c">jQuery</span>.</span>';
                        break;
                    case "fccdv": 
                        catH3 = 'Other Data Visualization Projects for Free Code Camp<br/><span class="pr_anounc_p">Created with main focus on <span class="gold_c">D3.js</span> / <span class="gold_c">React.js</span>.</span>';
                        break;
                    case "fccbe": 
                        catH3 = 'Other Back End Projects for Free Code Camp<br /><span class="pr_anounc_p">Created with main focus on <span class="gold_c">Node.js</span> / <span class="gold_c">Express</span> / <span class="gold_c">MongoDB</span> / <span class="gold_c">Mongoose</span>.</span>';
                        break;
                }
                
                $(".pr_anounc_h3").html(catH3);
            } else {
                
                $("#other_projects").prepend('<div class="project_div"><div class="project_left_side"><h3 class="proj_div_h3">' + data[i].title + '</h3>' + langDiv + '<a href="' + window.location.origin + '/project?id=' + data[i]._id + '" class="pr_div_an">Project Description</a><a href="'+ data[i].link +'" class="pr_div_an" target="_blank">View Project</a></div><img src="' + data[i].image + '" alt="Project Image" class="project_right_side"/></div>');
            }
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
        });
    });
    
    $(window).scroll(function(event) {
        
        var scrTop = $(this).scrollTop();
        
        if (scrTop > ($("#top_layer_2_bg").outerHeight() / 2 )) {
            $("#btt_btn").show(500);
        } else {
            $("#btt_btn").hide(500);
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