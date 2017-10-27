/* global $ */

$(document).ready(function() {
    
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
    
    $("#message_form").submit(function(e) {
        e.preventDefault();
        
        $("input, textarea").attr("disabled", true);
        
        $("#send_m").hide();
        $("#sending_m").css("opacity", "1");
        
        $.post(window.location.origin + "/email/send", $("#message_form").serialize(), function(data) {
            if (data.status === "sent") {
                $("#popup_bg").show();
                $("#sending_m").html("Message has been successfully sent.");
            } else {
                $("#popup_h3").html("Sorry, looks like some technical difficulties occurred and message couldn't be sent.<br /><br />You can try again later or choose different communication way.");
                $("#popup_h3").css("font-size", "1em");
                $("#popup_bg").show();
                $("#sending_m").html("Message couldn't be sent.");
            }
            $("#popup_bg").click(function() {
                $("#popup_content").fadeOut(500);
                window.location.reload();
            });
        });
    
    });
});