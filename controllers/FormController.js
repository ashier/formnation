
var Form = require('../models/Form').Form;
var Page = require('../models/Page').Page;

exports.index = function(req, res) {
    var forms = [];
    Form.find({})
        .populate('pages')
        .exec(function(err, forms) {
            if (err) throw new Error(err);
            res.json(forms);
        });
};

exports.create = function(req, res) {
    var body = req.body;

    var form = new Form({
        width: body.width,
        height: body.height,
        type: body.type,
        pages: body.pages,
        description: body.description
    });

    form.save(function(err, form) {
        if (err) throw new Error(err);
        res.json({status:true});
    });
};

exports.show = function(req, res) {
    var body = req.body;
    var slug = req.body.slug ? req.body.slug : req.params.slug;
    Form.findOne({slug:slug})
        .populate('pages', 'page_image slug')
        .exec(function(err, form) {
            res.json(form);

        });
};

var saveForm = function (form, id) {
    Page.findOne({_id:id})
        .exec(function(err, page) {
            if (err) throw new Error(err);
            form.pages.push(page);
            form.save();
        });
};

exports.update = function(req, res) {

    var body = req.body;
    var slug = req.body.slug ? req.body.slug : req.params.slug;
    var pages = body.pages ? body.pages.split(",") : null;

    Form.findOne({slug:slug})
        .select('pages width height type slug')
        .populate('pages', 'page_image slug')
        .exec(function(err, form) {
            if (err) throw new Error(err);
            console.log('form >', form);

            form.width = ((typeof body.width !== undefined) ? body.width : form.width) || form.width;
            form.height = ((typeof body.height !== undefined) ? body.height : form.height) || form.height;
            form.type = ((typeof body.type !== undefined) ? body.type : form.type) || form.type;
            form.description = ((typeof body.description !== undefined) ? body.description : form.description) || form.description;

            if (pages) {
                form.pages = [];
                for(var i = 0; i < pages.length; i+= 1) {
                    saveForm(form, pages[i]);
                }
            }

            form.save(function(err, form) {
                if (err) throw new Error(err);
                res.json({status:true});
            });
        });
};

exports.destroy = function(req, res){
    Form.findOneAndRemove({_id:req.params.id}, function(err, form) {
        if (err) {
            res.json({status:"error", message:"Form cannot be found."});
        } else {
            res.json({status:"ok", message:"Form has been deleted."});
        }
    });
};
