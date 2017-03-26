const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//const gravatar = require('gravatar');
const gravatar = require('gravatar-api');

// need it to add the new items
const Item = require('../models/item');

// Get User By Id
router.get('/:id', (req, res) => {
        User.findById(req.params.id).populate('items', 'items')
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


router.get('/', (req, res) => {
  res.send('user works');
});

router.post('/gravatar', (req, res) => {
    console.log("THE EMAIL INTHEROUTEZIS..");
    console.log(req.body.email);
    //const url = gravatar.url('req.body.email', {protocol: 'https', s: '100'});

        let options = {
            email: req.body.email,
            parameters: { "size": "200" }
        }

    let avatar = gravatar.imageUrl(options);

    console.log("the avatar rertreived is...");
    console.log(avatar);


        res.status(200).json({
            message: 'Successfully found url!',
            gravatarUrl: avatar
        })
});

// Get User after Sign In
router.get('/signeduser', (req, res) => {
    var decoded = jwt.decode(req.query.token);
    console.log("The decoded message is...");
    console.log(decoded);
        User.findById(decoded.userId).populate('items', 'items')
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


// Update Item from User
router.patch('/updateitem', (req, res) => {
    var decoded = jwt.decode(req.query.token);
    console.log("The decoded message is...");
    console.log(decoded);
        User.findById(decoded.userId).populate('items', 'items')
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
        console.log("The REQUEST.BODY (WHICH IS AN UUUUUSER IS....)");
        console.log(req.body);
        console.log("hello");
        user.level = req.body.level;
        for(i = 0; i < user.items.length; i++){
            console.log("The user char is ");
            console.log(user.items[i].char);
            console.log("THE REQ char is ");
            //console.log(req.body.char);
            if(user.items[i].char == req.body.items[i].char){
                console.log("WE FOUND A MATCH!!");
                user.items[i].correct = req.body.items[i].correct;
                user.items[i].incorrect = req.body.items[i].incorrect;
                user.items[i].streak = req.body.items[i].streak;
                user.items[i].highestStreak = req.body.items[i].highestStreak;
                user.items[i].rank = req.body.items[i].rank;
                user.items[i].unseen = req.body.items[i].unseen;
                user.items[i].impressions = req.body.items[i].impressions;
            }
        }

            user.save(function(err, result){
                    if (err) {
                        return res.status(500).json({
                            title: 'An error occurred',
                            error: err
                        });
                    }
                    res.status(200).json({
                        message: 'Successfully found User!',
                        user: user
                    });
            });

      });
});

// Authenticate a User after Succesful Signin
router.post('/signin', function(req, res, next) {
    User.findOne({email: { "$regex": req.body.email, "$options": "i" }}).populate('items', 'items')
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
        let token = jwt.sign({userId: user._id}, 'secretMyKeyUserApp', {expiresIn: 7200});
        console.log("The token is...");
        console.log(token);
        res.status(200).json({
            message: 'Successfully logged in!',
            token: token,
            userId: user._id
        })
    });
});

// Create a New User 
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
                    highestStreak: 0,
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