
var Page = require('../models/Page').Page;

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

    Page.findOne({id:body.id})
        .exec(function(err, page) {
            page.save(function(err, page) {

                page.width = ((typeof body.page_image !== undefined) ? body.page_image : page.page_image) || page.page_image;

                if (err) throw new Error(err);
                res.json({status:true});
            });
        });
};

exports.destroy = function(req, res){
    // res.send('destroy ' + req.params.slug);
};