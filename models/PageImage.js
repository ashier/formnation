var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var schemaOptions = {toJSON: {virtuals: true}};

var PageImageSchema = new Schema({
    content: String
}, schemaOptions);

module.exports.PageImage = mongoose.model('PageImage', PageImageSchema);
