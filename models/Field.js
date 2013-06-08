var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var schemaOptions = {toJSON: {virtuals: true}};

var FieldSchema = new Schema({
    x: String,
    y: String,
    name: String,
    cell_type: String,
    max_width: String,
    letter_spacing: String,
    text: String
}, schemaOptions);

module.exports.Field = mongoose.model('Field', FieldSchema);
