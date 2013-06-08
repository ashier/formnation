
var Form = require('../models/Form').Form;

exports.index = function(req, res) {
    Form.find()
        .exec(function(err, forms) {
            if (err) throw new Error(err);
            res.json(forms);
        });
};

exports.create = function(req, res) {
    var body = req.body;

    var form = new Form({
        size: body.size,
        type: body.type,
        pages: body.pages
    });

    form.save(function(err, form) {
        if (err) throw new Error(err);
        res.json({status:true});
    });
};

exports.show = function(req, res) {
    var body = req.body;
    Form.findOne({id:body.id})
        .exec(function(err, form) {
            res.json(form);
        });
};

exports.update = function(req, res) {

    var body = req.body;

    Form.findOne({id:body.id})
        .exec(function(err, form) {

            form.save(function(err, form) {
                if (err) throw new Error(err);
                res.json({status:true});
            });
        });
};

exports.destroy = function(req, res){
    // res.send('destroy ' + req.params.slug);
};
