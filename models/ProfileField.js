var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Slugify = require('../utils/slugify'),
    ObjectId = Schema.ObjectId;

var schemaOptions = {toJSON: {virtuals: true}};

var ProfileFieldSchema = new Schema({
    name: String,
    slug: String,
    value: String
}, schemaOptions);

ProfileFieldSchema.pre('save', function(next) {
    if(!this.name) next();
    this.slug = Slugify.slugify(this.name);
    next();
});

module.exports.ProfileField = mongoose.model('ProfileField', ProfileFieldSchema);
