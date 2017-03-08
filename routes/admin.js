const express = require('express');
const router = express.Router();
const Admin = require('../models/admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


router.post('/signin', function(req, res, next) {
    Admin.findOne({email: req.body.email}, function(err, admin) {
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
        if(!bcrypt.compareSync(req.body.password, admin.password)){
            return res.status(401).json({
                title: 'Login Failed',
                error: {message: 'Invalid login credentials'}
            });
        }
        var token = jwt.sign({admin: admin}, 'secretMyKeyAdminApp', {expiresIn: 7200});
        res.status(200).json({
            message: 'Successfully logged in!',
            token: token,
            adminId: admin._id
        })
    });
});

router.post('/', function(req, res, next) {
    console.log("HELLO!");
    console.log("THE REQ THAT CAME BACK IS");
    console.log(req);
    console.log("THE BODY IS");
    console.log(req.body);
    let admin = new Admin({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10)
    });

    admin.save(function(err, result){
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        res.status(201).json({
            message: 'Admin created!',
            obj: result
        });
    });

});

module.exports = router;