// global vars and requires
require('dotenv').config();
var express = require('express');
var request = require('request');
var rp = require('request-promise');
var q = require('q');

// Auth token
var token;
var expirationTime;
var waitForAccessToken = false;
var accessTokenOptions = {
  method: 'POST'
, uri: 'https://anilist.co/api/auth/access_token?' 
, json: true
, body: {
    grant_type:     process.env.GRANT_TYPE,
    client_id:      process.env.CLIENT_ID,
    client_secret:  process.env.CLIENT_SECRET
  }
}
var router = express.Router();

// set and use statements

// routes
//BROWSE
router.get('/', function(req, res) {
  var currentTime = Math.floor(new Date().getTime() / 1000);

  if (!token || currentTime > expirationTime) {
    getAccessToken()
    .then(function(tokenData) { 

      browsePopularAnime()
      .then(function(data) {
        console.log('success at browsePopularAnime() ', data);
        res.send(data);
      })
      .catch(function(err) {
        console.log('error at browsePopularAnime() ', err);
        res.send(err);
      })
    })
    .catch(function(err) {
      console.log('error at getAccessToken() ', err);
    })
  }
  else {
    browsePopularAnime()
    .then(function(data) {
      console.log('success at browsePopularAnime() ', data);
      res.send(data);
    })
    .catch(function(err) {
      console.log('error at browsePopularAnime() ', err);
      res.send(err);
    })
  }
})

router.get('/test/browse', function(req, res) {
  var currentTime = Math.floor(new Date().getTime() / 1000);
  console.log('finding correct route, before if condition');
  // check for an authorization token / token is not expired
  if (!token || currentTime > expirationTime) {
    // expired - make a post request to api and store returning auth token
    console.log('within if condition')
    
    getAccessToken()
    .then(function(tokenData) {
      rp({
        method: 'GET'
      , uri: 'https://anilist.co/api/browse/anime/'
      , json: true
      , qs: {
          access_token: token
        , token_type:   'Bearer'
        }
      })
      .then(function(data) {
        res.send(data)
      })
      .catch(function(error) {
        console.log('error within rp browse call')
      })
    })
    .catch(function(err) {
      console.log('error within rp tokenCall')
    })
  }
  // unexpired - make request for the searchTerm
})


// SEARCH SPECIFIC SHOW
router.get('/search/anime/:id', function(req, res) {
  var currentTime = Math.floor(new Date().getTime() / 1000);
  console.log(req.params.id)
  // check for an authorization token / token is not expired
  if (!token || currentTime > expirationTime) {
    getAccessToken()
    .then(function() {
      
      searchShow(req.params.id)
      .then(function(data) {
        console.log('success at searchShow() ', data)
        res.send(data)
      })
      .catch(function(err) {
        console.log('error at searchShow() ', err);
      });
    })
    .catch(function(err) {
      console.log('error at getAccessToken() ', err)
    }) 
  }
  else {
    searchShow(req.params.id)
    .then(function(data) {
      console.log('success at searchShow() ', data)
      res.send(data)
    })
    .catch(function(err) {
      console.log('error at searchShow() ', err);
    })
  }

  // unexpired - make request for the searchTerm
  
})


// export
module.exports = router;


// FUNCTIONS
function getAccessToken(searchTerm) {
  var deferred = q.defer();

  rp(accessTokenOptions)
  .then(function(tokenData) {
    var tokenData = tokenData;
    token = tokenData.access_token;
    // 1 hour expiration time
    expirationTime = tokenData.expires;
    deferred.resolve(tokenData);
  })
  .catch(function(err) {
    deferred.reject(err);
  });

  return deferred.promise;
}

function searchShow(searchTerm) {
  var deferred = q.defer();

  console.log('searchTerm in searchShow ', searchTerm) // inuyasha
  rp({
    uri: 'https://anilist.co/api/anime/search/' + searchTerm
  , qs: {
      access_token: token
    , token_type: 'Bearer'
    }
  })
  .then(function(data) {
    deferred.resolve(data);
  })
  .catch(function(err) {
    deferred.reject(err);
  });

  return deferred.promise;
}

function apiCall(searchTerm) {
  console.log('searchTerm in searchTerm ', searchTerm) // inuyasha
  
  request.get({
    url: 'https://anilist.co/api/anime/search/' + searchTerm,
    qs: {
      access_token: token,
      token_type:   'Bearer'
    }
  }, function(err, res, body) {
    if (!err && res.statusCode == 200) {
      var dataObj = JSON.parse(body);
      console.log('success at apiCall() ', dataObj);
      return dataObj;
    } 
    else {
      console.log('err at apiCall() ', err);
      return err;
    }
  });
}
  
function browsePopularAnime() {
  var deferred = q.defer();
  rp({
    method: 'GET'
  , uri: 'https://anilist.co/api/browse/anime'
  , qs: {
      access_token: token
    , token_type: 'Bearer'
    , sort: 'popularity-desc'
    , genres_exclude: 'hentai'
    }
  })
  .then(function (data) {
    deferred.resolve(data);
  })
  .catch(function(err) {
    deferred.reject(err);
  })

  return deferred.promise;
}