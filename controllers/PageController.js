
var Page = require('../models/Page').Page;

exports.index = function(req, res) {
    Page.find()
        .exec(function(err, pages) {
            if (err) throw new Error(err);
            res.json(pages);
        });
};

exports.create = function(req, res) {
    var body = req.body;
    var page = new Page({
    });

    page.save(function(err, page) {
        if (err) throw new Error(err);
        res.json({status:true});
    });
};

exports.show = function(req, res) {
    var body = req.body;
    Page.findOne({id:body.id})
        .exec(function(err, page) {
            res.json(page);
        });
};

exports.update = function(req, res) {

    var body = req.body;

    Page.findOne({id:body.id})
        .exec(function(err, page) {
            page.save(function(err, page) {
                if (err) throw new Error(err);
                res.json({status:true});
            });
        });
};

exports.destroy = function(req, res){
    // res.send('destroy ' + req.params.slug);
};
