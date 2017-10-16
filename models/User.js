var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var User = new Schema({
        username: String,
        password: String
    }, 
    {
        collection : 'FT-Admin'
    });

module.exports = mongoose.model("User", User);