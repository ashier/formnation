var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Slugify = require('../utils/slugify'),
    ObjectId = Schema.ObjectId;

var schemaOptions = {toJSON: {virtuals: true}};

var PageSchema = new Schema({
    page_image: String,
    page_index: String,
    fields: [{type: ObjectId, ref: 'Field'}]
}, schemaOptions);

module.exports.Page = mongoose.model('Page', PageSchema);
