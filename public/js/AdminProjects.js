/* global $ */

$(document).ready(function() {
    $.getJSON(window.location.origin + "/api/projects", function(data) {
        
        for (var i = 0; i < data.length; i++) {
            $("#projects_div").prepend('<form action="/admin/project/update" method="POST"><input type="text" name="title" placeholder="Title ..." value="' + data[i].title + '" required /><input type="text" name="languages" placeholder="Languages ..." value="' + data[i].languages + '" required /><input type="text" name="image" placeholder="Image link ..." value="' + data[i].image + '" required /><input type="text" name="link" placeholder="Project link ..." value="' + data[i].link + '" required /><input type="text" name="category" placeholder="Category ..." value="' + data[i].category + '" required /><textarea name="description" placeholder="Description ..." rows="5" required >' + data[i].description + '</textarea><input type="hidden" name="id" value="' + data[i]._id + '" /><input type="submit" value="Update Project" /></form><form action="/admin/project/delete" method="POST"><input type="hidden" name="id" value="' + data[i]._id + '" /><input type="submit" onclick="return confirm(\'Delete this project?\')" value="Delete Project" /></form><hr />');
        }
    
    });
})