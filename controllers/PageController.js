
var Page = require('../models/Page').Page;
var Field = require('../models/Field').Field;

exports.index = function(req, res) {
    Page.find()
        .populate('fields')
        .exec(function(err, pages) {
            if (err) throw new Error(err);
            res.json(pages);
        });
};

exports.create = function(req, res) {
    var body = req.body;

    var page = new Page({
        page_image: body.page_image,
        page_index: body.page_index,
        fields: body.fields
    });

    page.save(function(err, page) {
        if (err) throw new Error(err);
        res.json({status:true});
    });
};

exports.show = function(req, res) {
    var body = req.body;
    Page.findOne({id:body.id})
        .populate('fields')
        .exec(function(err, page) {
            res.json(page);
        });
};

exports.update = function(req, res) {

    var body = req.body;
    var fields = body.fields ? body.fields.split(",") : null;

    Page.findOne({id:body.id})
        .exec(function(err, page) {

            page.page_image = ((typeof body.page_image !== undefined) ? body.page_image : page.page_image) || page.page_image;
            page.page_index = ((typeof body.page_index !== undefined) ? body.page_index : page.page_index) || page.page_index;

            if (fields) {
                page.fields = [];
                for(var i = 0; i < fields.length; i += 1) {
                    Field.findOne({_id:fields[i]})
                                .exec(function(err, field) {
                                    if (err) throw new Error(err);
                                    page.fields.push(field);
                                    page.save();
                                });
                }
            }

            page.save(function(err, page) {
                if (err) throw new Error(err);
                res.json({status:true});
            });
        });

};

exports.destroy = function(req, res){
    // res.send('destroy ' + req.params.slug);
};
