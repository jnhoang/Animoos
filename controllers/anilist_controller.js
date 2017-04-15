// global vars and requires
require('dotenv').config();
var express = require('express');
var request = require('request');

// Auth token
var token;
var expirationTime;

var router = express.Router();

// set and use statements


  // receive request from front end
  // check for an authorization token / token is not expired

    // expired - make a post request to api and store returning auth token
    // unexpired - make request for the searchTerm

// Expiration time to compare against
//console.log('currentTime', Math.floor(new Date().getTime() / 1000))
  getAccessToken();
  
function apiCall() {
  console.log('token ',token)
  var searchTerm = "cowboy bebop";
  // TEST CALL
  request.get({
    //url: 'https://anilist.co/api/anime/search/"inuyasha"?access_token=' + token + '&token_type=bearer'
    url: 'https://anilist.co/api/anime/search/' + searchTerm + '?',
    qs: {
      access_token: token,
      token_type: 'Bearer' 
    }
    //searchType: '',
  }, function(err, res, body) {
    if (!err && res.statusCode == 200) {
      var dataObj = JSON.parse(body);
      console.log('success ', dataObj)
    } else {
      console.log('err ', err)
    }
  });
}
// routes
//router.route('/search/:id')
  


// export
//module.exports = router;


function getAccessToken() {
  request.post({ 
    url: 'https://anilist.co/api/auth/access_token?', 
    qs: {
      grant_type:     process.env.GRANT_TYPE,
      client_id:      process.env.CLIENT_ID,
      client_secret:  process.env.CLIENT_SECRET
    }
  },
  function (err, res, body) {
    if (!err && res.statusCode == 200) {
      console.log('success', JSON.parse(body));
      // expect access token, token type, expiration time back
      var accessObj = JSON.parse(body);
      token = accessObj.access_token;
      // 1 hour expiration time
      expirationTime = accessObj.expires;
      apiCall();
    }
    else {
      console.log('error', err, res.body);
    }
  });
}