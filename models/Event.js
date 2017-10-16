var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Event = new Schema({
        time: String,
        title: String,
        description: String
    }, 
    {
        collection : 'FT-Events'
    });

module.exports = mongoose.model("Event", Event);