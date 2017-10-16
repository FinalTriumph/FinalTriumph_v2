var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var session = require("express-session");
var mongoose = require("mongoose");
var routes = require("./routes/index.js");

require("dotenv").load();
var mongourl = process.env.MONGOLAB_URI;

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(session({
    secret: "FT-SessionSecret",
    resave: false,
    saveUninitialized: true
}));

mongoose.connect(mongourl, {
    useMongoClient: true
});
mongoose.Promise = global.Promise;

var path = process.cwd();

app.use("/public", express.static(path + "/public"));
app.use("/controllers", express.static(path + "/controllers"));

routes(app);

var port = process.env.PORT || 8080;
app.listen(port, function() {
    console.log("Listening on port " + port);
});
