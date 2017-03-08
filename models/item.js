let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let Comment = require('./comment');
let mongooseUniqueValidator = require('mongoose-unique-validator');

let itemSchema = new Schema({
    char: {type: String, required: true, unique: true},
    letter: {type: String, required: true},
    category: {type: String, required: true},
    correct: {type: Number, required: true, default: 0},
    incorrect: [{type: Number, required: true, default: 0}],
    streak: {type: Number, required: true, default: 0},
    rank:  {type: String, required: true, default: 0},
    unseen: {type: Boolean, required: true, default: 'false'},
    translation: {type: String, default: null},
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