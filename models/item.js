let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let Comment = require('./comment');
let mongooseUniqueValidator = require('mongoose-unique-validator');

let itemSchema = new Schema({
    char: {type: String, required: true},
    letter: {type: String, required: true},
    category: {type: String, required: true},
    translation: {type: String, default: null},
    combination: {type: String, default: null},
    correct: {type: Number, default: 0},
    incorrect: {type: Number, default: 0},
    streak: {type: Number, default: 0},
    highestStreak: {type: Number, default: 0},
    rank:  {type: Number, default: 0},
    unseen: {type: Boolean, default: 'true'},
    impressions: {type: Number, default: 0},
    date: {type: Date, default: Date.now },
    comments: [{type: Schema.Types.ObjectId, ref:'Comment'}]
});

itemSchema.plugin(mongooseUniqueValidator);

/*itemSchema.post('remove', function(item){
    User.findById(item.user, function(err, user){
        user.items.pull(item);
        user.save();
    });
});*/

module.exports = mongoose.model('Item', itemSchema);