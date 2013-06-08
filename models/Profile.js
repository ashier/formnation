var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var schemaOptions = {toJSON: {virtuals: true}};

var ProfileSchema = new Schema({
    name: String,
    fields: [{type: ObjectId, ref: 'ProfileField'}]
}, schemaOptions);

module.exports.Profile = mongoose.model('Profile', ProfileSchema);
