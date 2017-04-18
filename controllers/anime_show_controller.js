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
, uri:    'https://anilist.co/api/auth/access_token?'
, json:   true
, body: {
    grant_type:     process.env.GRANT_TYPE
  , client_id:      process.env.CLIENT_ID
  , client_secret:  process.env.CLIENT_SECRET
  }
}
var router = express.Router();

// set and use statements

// routes

//BROWSE
router.get('/', function(req, res) {
  checkAccessToken()
  .then(function(tokenData) { 

    browsePopularAnime()
    .then(function(data) {
      //console.log('success at browsePopularAnime() ', data);
      res.send(data);
    })
    .catch(function(err) {
      console.log('error at browsePopularAnime() ', err.message);
      res.send(err);
    })
  })
  .catch(function(err) {
    console.log('error at checkAccessToken() ', err.message);
    res.send(err);
  })
})

// SEARCH FOR SHOW BY :TITLE
// Gets back array of possible shows
router.get('/search/anime/:title', function(req, res) {
  
  checkAccessToken()
  .then(function() {
    
    searchShow(req.params.title)
    .then(function(data) {
      console.log('success at searchShow() ', data)
      res.send(data);
    })
    .catch(function(err) {
      console.log('error at searchShow() ', err.message);
      res.send(err);
    });
  })
  .catch(function(err) {
    console.log('error at checkAccessToken() ', err.message)
    res.send(err);
  })   
})

// GET SPECIFIC SHOW BY :ID
router.get('/page-data/anime/:id', function(req, res) {
  checkAccessToken()
  .then(function() {

    getAnimeById(req.params.id)
    .then(function(data) {
      console.log('success at getAnimeById()');
      res.send(data);
    })
    .catch(function(err) {
      console.log('error at getAnimeById()', err.message);
      res.send(err);
    })
  })
  .catch(function(err) {
    console.log('error at checkAccessToken()', err.message);
    res.send(err);
  })
}) 
// GET CHARACTER BY ID
router.get('/page-data/character/:id', function(req, res) {
  checkAccessToken()
  .then(function() {

    getCharById(req.params.id)
    .then(function(data) {
      console.log('succcess at getCharById');
      res.send(data);
    })
    .catch(function(err) {
      console.log('error at getCharById()', err.message);
      res.send(err);
    })
  })
  .catch(function(err) {
    console.log('error at checkAccessToken()', err.message)
    res.send(err);
  })
})
// export
module.exports = router;



// FUNCTIONS
function checkAccessToken(searchTerm) {
  var deferred      = q.defer();
  var currentTime   = Math.floor(new Date().getTime() / 1000);

  if (!token || currentTime > expirationTime) {
    rp(accessTokenOptions)
    .then(function(tokenData) {
      var tokenData = tokenData;
      token = tokenData.access_token;
      // token expires after 1 hour
      expirationTime = tokenData.expires;
      console.log('success in checkAccessToken', tokenData)
      deferred.resolve();
    })
    .catch(function(err) {
      console.log('error in checkAccessToken', err.message)
      deferred.reject(err);
    });
  } 
  else {
    deferred.resolve();
  }

  return deferred.promise;
}

function searchShow(searchTerm) {
  var deferred = q.defer();
  var requestOptions = {
    method: 'GET'
  , uri:    'https://anilist.co/api/anime/search/' + searchTerm
  , qs: {
      access_token: token
    , token_type:   'Bearer'
    }
  }

  rp(requestOptions)
  .then(function(data) { deferred.resolve(data); })
  .catch(function(err) { deferred.reject(err); });

  return deferred.promise;
}

function getCharById(id) {
  var deferred = q.defer();
  requestOptions = {
    method: 'GET'
  , uri:    'https://anilist.co/api/character/' + id
  , qs: {
      access_token: token
    , token_type:   'Bearer'
    }
  };

  rp(requestOptions)
  .then(function(data) { deferred.resolve(data); })
  .catch(function(err) { deferred.reject(err); });

  return deferred.promise;
}

function getAnimeById(id) {
  var deferred = q.defer();
  requestOptions = {
    method: 'GET'
  , uri:    'https://anilist.co/api/anime/' + id + '/page'
  , qs: {
      access_token: token
    , token_type:   'Bearer'
    }
  };
  
  rp(requestOptions)
  .then(function(data) { deferred.resolve(data); })
  .catch(function(err) { deferred.reject(err); });

  return deferred.promise;
}
  
function browsePopularAnime() {
  var deferred = q.defer();
  var requestOptions = {
    method: 'GET'
  , uri: 'https://anilist.co/api/browse/anime'
  , qs: {
      access_token:     token
    , token_type:       'Bearer'
    , sort:             'popularity-desc'
    , genres_exclude:   'hentai'
    , page: 1
    }
  };

  rp(requestOptions)
  .then(function(data) { deferred.resolve(data); })
  .catch(function(err) { deferred.reject(err); });

  return deferred.promise;
}

function browseAnime(qsObj) {
  var deferred = q.defer();
  var qsObj;
  qsObj.access_token = token;
  var requestOptions = {
    method: 'GET'
  , uri: 'https://anilist.co/api/browse/anime'
  , qs: {
      access_token:     token
    , token_type:       'Bearer'
    , sort:             'popularity-desc'
    , genres_exclude:   'hentai'
    , page: 1
    }
  };

  rp(requestOptions)
  .then(function(data) { deferred.resolve(data); })
  .catch(function(err) { deferred.reject(err); });

  return deferred.promise;
}