var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var schemaOptions = {toJSON: {virtuals: true}};

var FormSchema = new Schema({
    width: String,
    height: String,
    type: String,
    pages: [{type: ObjectId, ref: 'Page'}]
}, schemaOptions);

module.exports.Form = mongoose.model('Form', FormSchema);
