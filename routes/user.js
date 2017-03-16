const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const Item = require('../models/item');
// need it to add the new items

router.get('/', (req, res) => {
  res.send('user works');
});

router.get('/signeduser', (req, res) => {
    var decoded = jwt.decode(req.query.token);
    console.log("The decoded message is...");
    console.log(decoded);
        User.findById(decoded.user._id).populate('items', 'items')
        .exec(function(err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!user) {
            return res.status(401).json({
                title: 'Login Failed',
                error: {message: 'Invalid login credentials'}
            });
        }
        res.status(200).json({
            message: 'Successfully found User!',
            user: user
        })
    });
});

router.patch('/updateitem', (req, res) => {
    var decoded = jwt.decode(req.query.token);
    console.log("The decoded message is...");
    console.log(decoded);
        User.findById(decoded.user._id).populate('items', 'items')
        .exec(function(err, user) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!user) {
            return res.status(401).json({
                title: 'Login Failed',
                error: {message: 'Invalid login credentials'}
            });
        }
        console.log("The REQUEST.BODY (WHICH IS AN ITEM IS....)");
        console.log("hello");

      /*item.category = req.body.category; 
      item.subCategory = req.body.subCategory; 
      item.tags = req.body.tags;
      item.editorial = req.body.editorial;
      item.save(function(err, result){
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });

        } */
        res.status(200).json({
            message: 'Successfully found User!',
            user: user
        })
      });
});


router.post('/signin', function(req, res, next) {
    User.findOne({email: req.body.email}).populate('items', 'items')
        .exec(function(err, user) {
        
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!user) {
            return res.status(401).json({
                title: 'Login Failed',
                error: {message: 'Invalid login credentials'}
            });
        }
        if(!bcrypt.compareSync(req.body.password, user.password)){
            return res.status(401).json({
                title: 'Login Failed',
                error: {message: 'Invalid login credentials'}
            });
        }
        console.log("LOOKS LIKE THE USER SIGNIN WORKED!");
        console.log("The USER DETAILS IS:");
        console.log(user);
        console.log("The item details are:");
        console.log(user.items);
        let token = jwt.sign({user: user}, 'secretMyKeyUserApp', {expiresIn: 7200});
        console.log("The token is...");
        console.log(token);
        res.status(200).json({
            message: 'Successfully logged in!',
            token: token,
            // userID: user._id
            user: user
        })
    });
});

router.post('/', function(req, res, next) {
    console.log("HELLO!");
    console.log("THE REQ THAT CAME BACK IS");
    console.log(req);
    console.log("THE BODY IS");
    console.log(req.body);

    Item.find({}).exec(function(err, items) {
              let user = new User({
              username: req.body.username,
              email: req.body.email,
              password: bcrypt.hashSync(req.body.password, 10)
              });

        for(i = 0; i < items.length; i++){
          console.log("The " + i + 'item is: ');
          console.log(items[i].char);
              let item = new Item ({
                    char: items[i].char,
                    letter: items[i].letter,
                    category: items[i].category,
                    translation: items[i].translation,
                    combination: items[i].combination,
                    correct: 0,
                    incorrect: 0,
                    streak: 0,
                    rank: 0,
                    unseen: true,
                    impressions: 0
              })
              console.log(item);
            user.items.push(item);
        }

        user.save(function(err, result){
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(201).json({
            message: 'User created!',
            obj: result
        });
    });
    });

});

module.exports = router;