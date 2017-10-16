/* global $ */

$(document).ready(function() {
    $.getJSON(window.location.origin + "/api/events", function(data) {
        
        for (var i = 0; i < data.length; i++) {
            $("#events_div").prepend('<form action="/admin/event/update" method="POST"><input type="text" name="time" placeholder="Time ..." value="' + data[i].time + '" required /><input type="text" name="title" placeholder="Title ..." value="' + data[i].title + '" required /><textarea name="description" placeholder="Description ..." rows="5" required >' + data[i].description + '</textarea><input type="hidden" name="id" value="' + data[i]._id + '" /><input type="submit" value="Update Event" /></form><form action="/admin/event/delete" method="POST"><input type="hidden" name="id" value="' + data[i]._id + '" /><input type="submit" onclick="return confirm(\'Delete this event?\')" value="Delete Event" /></form><hr />');
        }
    
    });
})