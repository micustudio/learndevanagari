const express = require('express');
const router = express.Router();

const Item = require('../models/item');
const User = require('../models/user');

var jwt = require('jsonwebtoken');


router.get('/', (req, res) => {
     Item.find({})
            .exec(function(err, items) {
                if(err){
                    return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                    });
                }
                res.status(200).json({
                    message: 'Success found the items!',
                    obj: items
                });
            });
});


// Authentication
router.use('/', function(req, res, next){
    jwt.verify(req.query.token, 'secretMyKeyAdminApp', function(err, decoded) {
        if (err) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: err
            });
        }
        next();
    })
});

// ADD ITEM
router.post('/', function(req, res, next) {
    var decoded = jwt.decode(req.query.token);
        var item = new Item({
            char: req.body.char, 
            letter: req.body.letter, 
            category: req.body.category, 
            translation: req.body.translation,
            combination: req.body.combination
        });
        item.save(function(err, resultItem) {
                if (err) {
                    return res.status(500).json({
                        title: 'An error occurred',
                        error: err
                    });
                }
                User.find({})
                    .exec(function(err, users) {

                        if(err){
                            return res.status(500).json({
                            title: 'An error occurred',
                            error: err
                            });
                        }
                        for(let i = 0; i < users.length; i++){
                            users[i].items.push(resultItem);
                            console.log("pushed.");
                            users[i].save();
                        }
                                res.status(200).json({
                                    message: 'Successfully add Item!',
                                    obj: resultItem
                                });
                        });
                    });
        });

// PATCH ITEM
router.patch('/:id', function(req, res, next) {
    Item.findById(req.params.id, function(err, item){
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        // If no item is found.
        if (!item){
            return res.status(500).json({
                title: 'No Item Found!',
                error: {item: 'Item not found!'}
            });
        }
      let placeHolderChar = item.char;
      console.log("The place holder char is..");
      console.log(placeHolderChar);
      item.char = req.body.char;
      item.letter = req.body.letter; 
      item.category = req.body.category; 
      item.translation = req.body.translation; 
      item.combination = req.body.combination;
      item.save(function(err, result){
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });

        }
        User.find({})
            .exec(function(err, users) {
                if(err){
                    return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                    });
                }
                for(let i = 0; i < users.length; i++){
                    for(let j = 0; j < users[i].items.length; j++){
                        if(placeHolderChar == users[i].items[j].char){
                            console.log("THERE IS ONE MATCH!!");
                            users[i].items[j].char = req.body.char;
                            users[i].items[j].letter = req.body.letter;
                            users[i].items[j].category = req.body.category;
                            users[i].items[j].translation = req.body.translation;
                            users[i].items[j].combination = req.body.combination;
                            users[i].save();
                        }
                    }
                }
                res.status(200).json({
                    message: 'Successfully edited item for all the users!!!',
                    obj: item
                });
            });           
      });
    });
});

// DELETE
router.delete('/:id', function (req, res, next) {
    Item.findById(req.params.id, function (err, item) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!item) {
            return res.status(500).json({
                title: 'No Item Found!',
                error: {message: 'Item not found'}
            });
        }
        let placeHolderChar = item.char;
        console.log("The place holder char for the delete route is....: " + item.char)
        /*if (item.user != decoded.user._id) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: {message: 'Users do not match'}
            });
        } */
        item.remove(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
                User.find({})
                    .exec(function(err, users) {
                        if(err){
                            return res.status(500).json({
                            title: 'An error occurred',
                            error: err
                            });
                        }
                        for(let i = 0; i < users.length; i++){
                            for(let j = 0; j < users[i].items.length; j++){
                                if(placeHolderChar == users[i].items[j].char){
                                    console.log("THERE IS A MATCH! AND IT WILL BE DELETED!");
                                    let charIndex = j;
                                    if (charIndex > -1) {
                                        users[i].items.splice(charIndex, 1);
                                    }
                                    users[i].save();
                                }
                            }
                        }
                        res.status(200).json({
                            message: 'Successfully removed item for all the users!!!',
                            obj: item
                        });
                    });    
        });
    });
});


module.exports = router;