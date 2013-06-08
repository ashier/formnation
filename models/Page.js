var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var schemaOptions = {toJSON: {virtuals: true}};

var PageSchema = new Schema({
    pageImage: {type: ObjectId, ref: 'PageImage'},
    fields: [{type: ObjectId, ref: 'Field'}]
}, schemaOptions);

module.exports.Page = mongoose.model('Page', PageSchema);
