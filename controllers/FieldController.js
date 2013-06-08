
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
        x: body.x,
        y: body.y,
        cell_type: body.cell_type,
        max_width: body.max_width,
        letter_spacing: body.letter_spacing,
        value: body.value
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

                field.x = ((typeof body.x !== undefined) ? body.x : field.x) || field.x;
                field.y = ((typeof body.y !== undefined) ? body.y : field.y) || field.y;
                field.name = ((typeof body.name !== undefined) ? body.name : field.name) || field.name;
                field.cell_type = ((typeof body.cell_type !== undefined) ? body.cell_type : field.cell_type) || field.cell_type;
                field.max_width = ((typeof body.max_width !== undefined) ? body.max_width : field.max_width) || field.max_width;
                field.letter_spacing = ((typeof body.letter_spacing !== undefined) ? body.letter_spacing : field.letter_spacing) || field.letter_spacing;
                field.value = ((typeof body.value !== undefined) ? body.value : field.value) || field.value;

                res.json({status:true});
            });
        });
};

exports.destroy = function(req, res){
    Field.findOneAndRemove({_id:req.params.id}, function(err, field) {
        if (err) {
            res.json({status:"error", message:"Field cannot be found."});
        } else {
            res.json({status:"ok", message:"Field has been deleted."});
        }
    });
};
