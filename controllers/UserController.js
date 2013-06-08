
var mongoose = require('mongoose'),
    User = require('../models/User').User;

mongoose.connect('mongodb://localhost/formnation');

exports.index = function(req, res) {
    User.find()
        .exec(function(err, users) {
            if (err) throw new Error(err);
            res.json(users);
        });
};

exports.create = function(req, res) {

    var body = req.body;

    var user = new User({
        first_name: body.first_name,
        last_name: body.last_name,
        middle_name: body.middle_name,
        email: body.email,
        password: body.password,
        slug: body.slug,
        forms: body.forms,
        profiles: body.profiles
    });

    user.save(function(err, user) {
        if (err) throw new Error(err);
        res.json({status:true});
    });

};

exports.show = function(req, res) {
  res.send('show ' + req.params.slug);
};

exports.update = function(req, res) {

    var body = req.body;

    User.findOne({slug:body.slug})
        .exec(function(err, user) {
            // ((body.first_name !== undefined) ? body.title : note.title) || note.title;
            user.first_name = body.first_name;
            user.last_name = body.last_name;
            user.middle_name = body.middle_name;
            user.email = body.email;
            user.password = body.password;
            // user.slug = body.slug,
            user.forms = body.forms;
            user.profiles = body.profiles;

            user.save(function(err, user) {
                if (err) throw new Error(err);
                res.json({status:true});
            });
        });
};

exports.destroy = function(req, res){
  res.send('destroy ' + req.params.slug);
};
