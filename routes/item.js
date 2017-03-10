const express = require('express');
const router = express.Router();

const Item = require('../models/item');
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

module.exports = router;


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
//

router.post('/', function(req, res, next) {
    var decoded = jwt.decode(req.query.token);
        var item = new Item({
            char: req.body.char, 
            letter: req.body.letter, 
            category: req.body.category, 
            translation: req.body.translation,
            combination: req.body.combination
        });
        item.save(function(err, result) {
                if (err) {
                    return res.status(500).json({
                        title: 'An error occurred',
                        error: err
                    });
                }
                res.status(201).json({
                    message: 'Saved item',
                    obj: result
                });
        });
});