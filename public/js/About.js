/* global $ */

$(document).ready(function() {
    
    var expanded = 0;
    var eventCount;
    
    $.getJSON(window.location.origin + "/api/events", function(data) {
        
        eventCount = data.length;
        
        for (var i = 0; i < data.length; i++) {
            $("#events_desc").prepend('<div class="event_div"><p class="event_h_p" data-id="' + data[i]._id + '">' + data[i].time + ' <span class="event_h_sep">|</span> ' + data[i].title + '</p><p class="event_d_p ' + data[i]._id + '">' + data[i].description + '</p></div>');
            $("#events_asc").append('<div class="event_div"><p class="event_h_p" data-id="' + data[i]._id + '">' + data[i].time + ' <span class="event_h_sep">|</span> ' + data[i].title + '</p><p class="event_d_p ' + data[i]._id + '">' + data[i].description + '</p></div>');
        }
        
        $(".event_h_p").hover(function() {
            $(this).parent().css("border-color", "#ddd");
        }, function() {
            $(this).parent().css("border-color", "#666");
        });
        
        $(".event_h_p").click(function() {
            var eId = $(this).attr('data-id');
            if ($("."+eId).is(":visible")) {
                $("."+eId).slideUp(500);
                expanded -=1;
                $(".exp_all").attr("disabled", false);
                if (expanded === 0) {
                    $(".cl_all").attr("disabled", "disabled");
                }
            } else {
                $("."+eId).slideDown(500);
                expanded +=1;
                $(".cl_all").attr("disabled", false);
                if (expanded === eventCount) {
                    $(".exp_all").attr("disabled", "disabled");
                }
            }
        });
    });
    
    var visible = 'desc';
    
    $(".sw_tmln_dir").click(function() {
        if (visible === 'desc') {
            $("#events_desc").fadeOut(300, function() {
                $("#events_asc").fadeIn(300);
                visible = 'asc';
            });
        } else {
            $("#events_asc").fadeOut(300, function() {
                $("#events_desc").fadeIn(300);
                visible = 'desc';
            });
        }
    });
    
    $(".exp_all").click(function() {
        $(".event_d_p").slideDown(500);
        if ($(this).attr("id") === "btm_exp_all") {
            var int = setInterval(function() {
                $("html, body").animate({
                    scrollTop: $(document).height()
                }, 0);
            }, 1);
            setTimeout(function() {
                clearInterval(int);
            }, 500);
        }
        $(".exp_all").attr("disabled", "disabled");
        $(".cl_all").attr("disabled", false);
        expanded = eventCount;
    });
    
    $(".cl_all").click(function() {
        $(".event_d_p").slideUp(500);
        $(".cl_all").attr("disabled", "disabled");
        $(".exp_all").attr("disabled", false);
        expanded = 0;
    });
    
    $("#top_about_arrow").click(function() {
        $("html, body").animate({
            scrollTop: $("#timeline_content").offset().top
        }, 700);
    });
    
    $(window).scroll(function(event) {
        if ($(this).scrollTop() > ($("#top_content").outerHeight() / 2 )) {
            $("#btt_btn").show(500);
        } else {
            $("#btt_btn").hide(500);
        }
    });
    
    $("#btt_btn").click(function() {
        $("html, body").animate({
            scrollTop: $("body").offset().top
        }, 700);
    });
});