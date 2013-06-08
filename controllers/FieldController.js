
var Field = require('../models/Field').Field;

exports.index = function(req, res) {
    Field.find()
        .exec(function(err, fields) {
            if (err) throw new Error(err);
            res.json(fields);
        });
};

exports.create = function(req, res) {
    var body = req.body;
    var field = new Field({
        x: String,
        y: String,
        name: String,
        cell_type: String,
        max_width: String,
        letter_spacing: String,
        text: String
    });

    field.save(function(err, field) {
        if (err) throw new Error(err);
        res.json({status:true});
    });
};

exports.show = function(req, res) {
    var body = req.body;
    Field.findOne({id:body.id})
        .exec(function(err, field) {
            res.json(field);
        });
};

exports.update = function(req, res) {

    var body = req.body;

    Field.findOne({id:body.id})
        .exec(function(err, field) {
            field.save(function(err, field) {
                if (err) throw new Error(err);
                res.json({status:true});
            });
        });
};

exports.destroy = function(req, res){
    // res.send('destroy ' + req.params.slug);
};
