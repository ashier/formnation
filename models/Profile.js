var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var schemaOptions = {toJSON: {virtuals: true}};

var ProfileSchema = new Schema({
    fields: [{type: ObjectId, ref: 'Field'}]
}, schemaOptions);

module.exports.Profile = mongoose.model('Profile', ProfileSchema);
