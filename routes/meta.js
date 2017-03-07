var express = require('express');
var router = express.Router();


router.get('/', (req, res) => {
  res.send('api works');
});


// TWITTER API
var Twit = require('twit');
var T = new Twit({
  consumer_key:         'jc3WYJ3ce6Ngc4Wutg5Sl0HY4',
  consumer_secret:      'ux9NdIeA5rsdtAHlpmXaCNSLb1UcGrG4JHHlpFsIxnc9zN0yRI',
  access_token:         '814338062050279424-lUtoFuDobxAzp11hgPky2POrcXNtpcH',
  access_token_secret:  'IYEddTJNbZbuNkpNUjEyC4FJ1qVbtML9trWopjTGSg8fw'
});

// GET TWITTER COUNT
router.get('/twitter', function(req, res, next) {
    T.get('users/search', { q: '_nicefinds' },  function (err, data, response) {
        var result = data[0].followers_count;
        res.status(200).json({
            message: 'Found twitter count!',
            obj: result
        });
    })
});

module.exports = router;