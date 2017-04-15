// global vars and requires
require('dotenv').config();
var express = require('express');
var request = require('request');

// Auth token
var token;

var router = express.Router();

// set and use statements


  // receive request from front end
  var searchTerm = "cowboy bebop";
  // check for an authorization token / token is not expired

    // expired - make a post request to api and store returning auth token
    // unexpired - make request for the searchTerm


  // TEST CALL
  // request({
  //   url: 'https://anilist.co/api/' + searchTerm,
  //   token_type: 'bearer',
  //   access_token: token,
  //   searchType: '',
  //   qs: ''
  // }, function(err, res, body) {
  //   if (!err && res.statusCode == 200) {
  //     var dataObj = JSON.parse(body);
  //   }
  // });

// routes
//router.route('/search/:id')
  


// export
//module.exports = router;

getAccessToken();


function getAccessToken() {
  request.post({ 
    url: 'https://anilist.co/api/auth/access_token?', 
    qs : {
      grant_type:     process.env.GRANT_TYPE,
      client_id:      process.env.CLIENT_ID,
      client_secret:  process.env.CLIENT_SECRET
    }
  },
  function (err, res, body) {
    if (!err && res.statusCode == 200) {
      // expect access token, token type, expiration time back
      console.log('success', JSON.parse(body));
    }
    else {
      console.log('error', err, res.body);
    }
  });
}