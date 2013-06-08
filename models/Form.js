var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Slugify = require('../utils/slugify'),
    ObjectId = Schema.ObjectId;

var schemaOptions = {toJSON: {virtuals: true}};

var FormSchema = new Schema({
    width: String,
    height: String,
    type: String,
    slug:String,
    description:String,
    pages: [{type: ObjectId, ref: 'Page'}]
}, schemaOptions);

FormSchema.pre('save', function(next) {
    if(!this.type) next();
    this.slug = Slugify.slugify(this.type + ' ' + Math.floor(Math.random() * 100000000000));
    next();
});

module.exports.Form = mongoose.model('Form', FormSchema);
