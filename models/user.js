let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let mongooseUniqueValidator = require('mongoose-unique-validator');

let Item = require('./item');

let userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    fullName: {type: String},
    profilePic: {type: String},
    location: {type: String},
    biography: {type: String},
    date: {type: Date, default: Date.now },
    items: [Item.schema], // Item.Schema!!!!! :DDDDD that is the correct way for embedda data (vs. reference of object Id's')
    comments: [{type: Schema.Types.ObjectId, ref:'Comment'}]
});

userSchema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User', userSchema);