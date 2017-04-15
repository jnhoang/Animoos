// global vars and requires
var express = require('express');
var request = require('request');

var router = express.Router();

// set and use statements


// routes
router.route('/search/:id')
  request({
    url: 'https://anilist.co/api/',
    searchType: '',
    qs: ''
  }, function(err, res, body) {
    if (!err && res.statusCode == 200) {
      var dataObj = JSON.parse(body);
    }
  });


// export
module.exports = router;