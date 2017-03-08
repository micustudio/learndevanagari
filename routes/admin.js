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
        if (!admin) {
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
        console.log("LOOKS LIKE THE SIGNIN WORKED!");
        var token = jwt.sign({admin: admin}, 'secretMyKeyAdminApp', {expiresIn: 7200});
        res.status(200).json({
            message: 'Successfully logged in!',
            token: token,
            adminId: admin._id
        })
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

/*router.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, router.get('secretMyKeyAdminApp'), function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes 
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
    
  }
});

*/






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