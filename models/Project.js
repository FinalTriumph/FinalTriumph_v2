var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Project = new Schema({
        title: String,
        languages: String,
        image: String,
        link: String,
        category: String,
        description: String
    }, 
    {
        collection : 'FT-Projects'
    });

module.exports = mongoose.model("Project", Project);