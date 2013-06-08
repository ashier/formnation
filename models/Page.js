var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Slugify = require('../utils/slugify'),
    ObjectId = Schema.ObjectId;

var schemaOptions = {toJSON: {virtuals: true}};

var PageSchema = new Schema({
    page_image: String,
    index: String,
    slug: String,
    fields: [{type: ObjectId, ref: 'Field'}]
}, schemaOptions);

PageSchema.pre('save', function(next) {
    if(!this.page_image) next();
    this.slug = Slugify.slugify(this.page_image);
    next();
});

module.exports.Page = mongoose.model('Page', PageSchema);
