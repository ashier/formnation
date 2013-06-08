
var Profile = require('../models/Profile').Profile;
var ProfileField = require('../models/ProfileField').ProfileField;

exports.index = function(req, res) {
    Profile.find()
        .populate('fields')
        .exec(function(err, profiles) {
            if (err) throw new Error(err);
            res.json(profiles);
        });
};

exports.create = function(req, res) {
    var body = req.body;

    var profile = new Profile({
        name: body.name,
        fields: body.fields
    });

    profile.save(function(err, profile) {
        if (err) throw new Error(err);
        res.json({status:true});
    });
};

exports.show = function(req, res) {
    var body = req.body;
    Profile.findOne({id:body.id})
        .populate('fields')
        .exec(function(err, profile) {
            res.json(profile);
        });
};

exports.update = function(req, res) {

    var body = req.body;
    var fieldParam = req.params.field;
    var fields = body.fields ? body.fields.split(",") : null;

    Profile.findOne({id:body.id})
        .exec(function(err, profile) {

            profile.name = ((typeof body.name !== undefined) ? body.name : profile.name) || profile.name;

            if (fields) {
                profile.fields = [];
                for(var i = 0; i < fields.length; i += 1) {
                    ProfileField.findOne({_id:fields[i]})
                                .exec(function(err, field) {
                                    if (err) throw new Error(err);
                                    profile.fields.push(field);
                                    profile.save();
                                });
                }
            }

            profile.save(function(err, profile) {
                if (err) throw new Error(err);
                res.json({status:true});
            });
        });
};

exports.createField = function(req, res) {
    var body = req.body;

    Profile.findOne({id:body.id})
        .populate('fields')
        .exec(function(err, profile) {
            if (err) throw new Error(err);

            var profileField = new ProfileField({
                name: body.name,
                value: body.value
            });

            profileField.save(function(err, profileField) {
                if (err) throw new Error(err);
                profile.fields.push(profileField);
                profile.save();
            });

            res.json({status:true});
        });

};

exports.showField = function(req, res) {
    var body = req.body;
    ProfileField.findOne({id:body.field_id})
        .exec(function(err, profileField) {
            res.json(profileField);
        });
};

exports.updateField = function(req, res) {

    var body = req.body;

    ProfileField.findOne({id:body.field_id})
        .exec(function(err, profileField) {

            profileField.name = ((typeof body.name !== undefined) ? body.name : profileField.name) || profileField.name;
            profileField.value = ((typeof body.value !== undefined) ? body.value : profileField.value) || profileField.value;

            profileField.save(function(err, profileField) {
                if (err) throw new Error(err);
                res.json({status:true});
            });
        });
};

exports.destroy = function(req, res){
    // res.send('destroy ' + req.params.slug);
};
