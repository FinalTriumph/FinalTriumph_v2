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
                
                $("#single_project").append('<div id="sp_div_left"><h3 id="sp_h3">'+data[i].title+'</h3><p id="sp_p">'+data[i].description+'</p><div id="sp_lang">'+langDiv+'</div></div><div id="sp_div_right"><img src="'+data[i].image+'" alt="Project Image" id="sp_pr_img" /><a href="'+ data[i].link +'" id="sp_div_an" target="_blank">View Project</a></div>');
                document.title = data[i].title + ' | Kaspars Andžāns "FinalTriumph"';
                
                var catH3;
                var catP;
                
                switch(data[i].category) {
                    case "new": 
                        catH3 = "Other Newest Projects";
                        catP = "Created with main focus on PHP / MySQL / Laravel.";
                        break;
                    case "fccfe": 
                        catH3 = "Other Front End Projects for Free Code Camp";
                        catP = "Created with main focus on HTML / CSS / JavaScript / jQuery.";
                        break;
                    case "fccdv": 
                        catH3 = "Other Data Visualization Projects for Free Code Camp";
                        catP = "Created with main focus on D3.js / React.js.";
                        break;
                    case "fccbe": 
                        catH3 = "Other Back End Projects for Free Code Camp";
                        catP = "Created with main focus on Node.js / Express / MongoDB / Mongoose.";
                        break;
                }
                
                $(".pr_anounc_h3").html(catH3);
                $(".pr_anounc_p").html(catP);
            } else {
                
                $("#other_projects").prepend('<div class="project_div"><img src="' + data[i].image + '" alt="Project Image" class="project_left_side"/><div class="project_right_side"><h3 class="proj_div_h3">' + data[i].title + '</h3>' + langDiv + '<a href="' + window.location.origin + '/project?id=' + data[i]._id + '" class="pr_div_an">Project Description</a><a href="'+ data[i].link +'" class="pr_div_an" target="_blank">View Project</a></div></div>');
            }
        }
    });
    
})