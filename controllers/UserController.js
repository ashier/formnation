
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

    // first_name: String,
    //     last_name: String,
    //     middle_name: String,
    //     email: String,
    //     password: String,
    //     slug: String,
    //     forms: [{type: ObjectId, ref: 'Form'}],
    //     profiles: [{type: ObjectId, ref: 'Profile'}]

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

exports.show = function(req, res){
  res.send('show ' + req.params.slug);
};

exports.update = function(req, res){
  res.send('update ' + req.params.slug);
};

exports.destroy = function(req, res){
  res.send('destroy ' + req.params.slug);
};
