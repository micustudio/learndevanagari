let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let mongooseUniqueValidator = require('mongoose-unique-validator');

let userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    fullName: {type: String},
    profilePic: {type: String},
    location: {type: String},
    biographu: {type: String},
    items: [{type: Schema.Types.ObjectId, ref: 'Item'}],
    comments: [{type: Schema.Types.ObjectId, ref:'Comment'}]
});

userSchema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User', userSchema);