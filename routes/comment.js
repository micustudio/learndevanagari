var express = require('express');
var router = express.Router();


router.get('/', (req, res) => {
  res.send('comment works');
});

module.exports = router;