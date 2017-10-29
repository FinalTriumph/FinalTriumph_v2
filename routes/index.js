var path = process.cwd();
var passwordHash = require('password-hash');
var User = require("../models/User");
var Event = require("../models/Event");
var Project = require("../models/Project");
var helper = require('sendgrid').mail;

module.exports = function(app) {
    
    app.get("/", function(req, res) {
        res.sendFile(path + "/public/views/Welcome.html");
    });
    
    app.get("/about", function(req, res) {
        res.sendFile(path + "/public/views/About.html");
    });
    
    app.get("/portfolio", function(req, res) {
        res.sendFile(path + "/public/views/Portfolio.html");
    });
    
    app.get("/contact", function(req, res) {
        res.sendFile(path + "/public/views/Contact.html");
    });
    
    app.get("/project", function(req, res) {
        if (req.query.id) {
            res.sendFile(path + "/public/views/Project.html");
        } else {
            res.redirect("/portfolio");
        }
    });
    
    // Admin
    
    function isLoggedIn (req, res, next) {
        if (req.session.user) {
            return next();
        } else {
            res.sendFile(path + "/public/views/AdminNL.html");
        }
    }
    
    app.get("/admin", isLoggedIn, function(req, res) {
        res.sendFile(path + "/public/views/AdminLIP.html");
    });
    
    app.get("/admin/events", isLoggedIn, function(req, res) {
        res.sendFile(path + "/public/views/AdminLIE.html");
    });
    
    app.post("/admin/login", function(req, res) {
        
        var username = req.body.username;
        
        User.find({ "username": username }, function(err, doc) {
            if (err) console.log(err);
            if (doc.length) {
                if (passwordHash.verify(req.body.password, doc[0].password)) {
                    req.session.user = username;
                }
            }
            res.redirect('/admin');
        });
    });
    
    app.get("/admin/logout", function(req, res) {
        
        req.session.destroy(function(err) {
            if (err) console.log(err);
            res.redirect('/admin');
        });
    });
    
    app.post("/admin/project/add", isLoggedIn, function(req, res) {
        
        var newProject = new Project();
        
        newProject.title = req.body.title;
        newProject.languages = req.body.languages;
        newProject.image = req.body.image;
        newProject.link = req.body.link;
        newProject.category = req.body.category;
        newProject.description = req.body.description;
        
        newProject.save(function(err){
                if(err) console.log(err);
            });
            
        res.redirect('/admin');
    });
    
    app.post("/admin/project/update", isLoggedIn, function(req, res) {
        
        Project.findById(req.body.id, function(err, project) {
            if (err) console.log(err);
            
            project.title = req.body.title;
            project.languages = req.body.languages;
            project.image = req.body.image;
            project.link = req.body.link;
            project.category = req.body.category;
            project.description = req.body.description;
            
            project.save(function(err){
                if(err) console.log(err);
            });
            
            res.redirect('/admin');
        });
    });
    
    app.post("/admin/project/delete", isLoggedIn, function(req, res) {
        
        Project.findByIdAndRemove(req.body.id, function(err) {
            if (err) console.log(err);
            res.redirect('/admin');
        });
    });
    
    app.post("/admin/event/add", isLoggedIn, function(req, res) {
        
        var newEvent = new Event();
        
        newEvent.time = req.body.time;
        newEvent.title = req.body.title;
        newEvent.description = req.body.description;
        
        newEvent.save(function(err){
                if(err) console.log(err);
            });
            
        res.redirect('/admin/events');
    });
    
    app.post("/admin/event/update", isLoggedIn, function(req, res) {
        
        Event.findById(req.body.id, function(err, event) {
            if (err) console.log(err);
            event.time = req.body.time;
            event.title = req.body.title;
            event.description = req.body.description;
            
            event.save(function(err){
                if(err) console.log(err);
            });
            
            res.redirect('/admin/events');
        });
    });
    
    app.post("/admin/event/delete", isLoggedIn, function(req, res) {
        
        Event.findByIdAndRemove(req.body.id, function(err) {
            if (err) console.log(err);
            res.redirect('/admin/events');
        });
    });
    
    //API
    
    app.get("/api/events", function(req, res) {
        
        Event.find({}, function(err, docs) {
            if (err) console.log(err);
            res.json(docs);
        });
    });
    
    app.get("/api/projects", function(req, res) {
        
        Project.find({}, function(err, docs) {
            if (err) console.log(err);
            res.json(docs);
        });
    });
    
    app.get("/api/singleproject", function(req, res) {
        
        Project.findById(req.query.id, function(err, doc) {
            if (err) console.log(err);
            Project.find( { "category": doc.category }, function(err, docs) {
                if(err) console.log(err);
                res.json(docs);
            });
        });
    });
    
    // Email
    
    app.post("/email/send", function(req, res) {
        
        var name = req.body.name;
        var email = req.body.email;
        var m_subject = req.body.subject;
        var message = req.body.message.replace(new RegExp('\r?\n','g'), '<br />');
        
        var from_email = new helper.Email('no-reply@finaltriumph.eu');
        var to_email = new helper.Email('final_triumph@outlook.com');
        var subject = 'FT Mail / Node.js';
        var content = new helper.Content('text/html', '<p><strong>Name</strong>: '+name+'</p><p><strong>Email</strong>: '+email+'</p><p><strong>Subject</strong>: '+m_subject+'</p><hr /><p><strong>Message:</strong><br />'+message+'</p><hr /><p>Sent from <strong>finaltriumph.eu</strong>(Node.js)</p>');
        var mail = new helper.Mail(from_email, subject, to_email, content);
        
        var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
        var request = sg.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: mail.toJSON(),
        });
        
        sg.API(request, function(error, response) {
            if(error) {
                console.log(error);
                res.json({"status": "error"});
            } else {
                res.json({"status": "sent"});
            }
        });
    
    });
};