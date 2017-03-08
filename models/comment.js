let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let commentSchema = new Schema({
    comment: {type: String, required: true},
    votes: {type: Number, default: 0},
    date: {type: Date, default: Date.now }
});

module.exports = mongoose.model('Comment', commentSchema);