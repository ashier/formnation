
var User = require('../models/User').User;
var Form = require('../models/Form').Form;
var Profile = require('../models/Profile').Profile;

exports.index = function(req, res) {
    User.find()
        .populate('forms')
        .populate('profiles')
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
    var body = req.body;
    User.findOne({id:body.id})
        .populate('forms')
        .populate('profiles')
        .exec(function(err, user) {
            res.json(user);
        });
};

exports.update = function(req, res) {

    var body = req.body;
    var forms = body.forms ? body.forms.split(",") : null;
    var profiles = body.profiles ? body.profiles.split(",") : null;

    User.findOne({id:body.id})
        .exec(function(err, user) {

            user.first_name = ((typeof body.first_name !== undefined) ? body.first_name : user.first_name) || user.first_name;
            user.last_name = ((typeof body.last_name !== undefined) ? body.last_name : user.last_name) || user.last_name;
            user.middle_name = ((typeof body.middle_name !== undefined) ? body.middle_name : user.middle_name) || user.middle_name;
            user.email = ((typeof body.email !== undefined) ? body.email : user.email) || user.email;
            user.password = ((typeof body.password !== undefined) ? body.password : user.password) || user.password;

            if (profiles) {
                user.profiles = [];
                for(var i = 0; i < profiles.length; i += 1) {
                    Profile.findOne({_id:profiles[i]})
                            .exec(function(err, profile) {
                                if (err) throw new Error(err);
                                user.profiles.push(profile);
                                user.save();
                            });
                }
            }


            if (forms) {
                user.forms = [];
                for(var i = 0; i < forms.length; i += 1) {
                    Form.findOne({_id:forms[i]})
                            .exec(function(err, form) {
                                if (err) throw new Error(err);
                                user.forms.push(form);
                                user.save();
                            });
                }
            }

            user.save(function(err, user) {
                if (err) throw new Error(err);
                res.json({status:true});
            });
        });
};

exports.destroy = function(req, res){
  res.send('destroy ' + req.params.slug);
};
