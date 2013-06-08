var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Slugify = require('../utils/slugify'),
    ObjectId = Schema.ObjectId;

var schemaOptions = {toJSON: {virtuals: true}};

var UserSchema = new Schema({
    first_name: String,
    last_name: String,
    middle_name: String,
    email: String,
    password: String,
    slug: String,
    forms: [{type: ObjectId, ref: 'Form'}],
    profiles: [{type: ObjectId, ref: 'Profile'}]
}, schemaOptions);

UserSchema.virtual('full_name').get(function() {
    return this.first_name + " " + this.last_name;
});

UserSchema.pre('save', function(next) {
    if(!this.first_name) next();
    this.slug = Slugify.slugify(this.first_name + this.last_name);
    next();
});

module.exports.User = mongoose.model('User', UserSchema);
