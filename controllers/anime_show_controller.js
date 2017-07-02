// global vars and requires
require('dotenv').config();
const express   = require('express');
const request   = require('request');
const rp        = require('request-promise');
const q         = require('q');

// Auth token
let token;
let expirationTime;
const waitForAccessToken = false;
const accessTokenOptions = {
  method: 'POST'
, uri:    'https://anilist.co/api/auth/access_token?'
, json:   true
, body: {
    grant_type:     process.env.GRANT_TYPE
  , client_id:      process.env.CLIENT_ID
  , client_secret:  process.env.CLIENT_SECRET
  }
}

// General API call options
const requestOptions  = {
  method: 'GET'
, uri: ''
, qs: {
    access_token: ''
  , token_type: 'Bearer'
  }
};

const router = express.Router();

// ROUTES

// BROWSE
router.get('/browse', function(req, res) {
  const browseObj = req.query;

  checkAccessToken()
  .then(function(tokenData) { 
    browseAnime(browseObj)
    .then(function(data) { res.send(data); })
    .catch(function(err) {errorMsg(res, err, 'browseAnime()'); });
  })
  .catch(function(err) { errorMsg(res, err, 'checkAccessToken(), browseAnime'); });
})

/*
** SEARCH FOR SHOW BY :TITLE
** Gets back array of possible shows
*/
router.get('/search/anime/:title', function(req, res) {
  checkAccessToken()
  .then(function() {
    searchShow(req.params.title)
    .then(function(data) { res.send(data); })
    .catch(function(err) { errorMsg(res, err, 'searchShow()'); });
  })
  .catch( function(err) { errorMsg(res, err, 'checkAccessToken(), :title'); });
})

// GET SPECIFIC SHOW BY :ID
router.get('/page-data/anime/:id', function(req, res) {
  checkAccessToken()
  .then(function() {
    getAnimeById(req.params.id)
    .then(function(data) { res.send(data); })
    .catch(function(err) { errorMsg(res, err, 'getAnimeById()'); });
  })
  .catch( function(err) { errorMsg(res, err, 'checkAccessToken(), :ID'); });
}) 

// GET CHARACTER BY ID
router.get('/page-data/character/:id', function(req, res) { 
  checkAccessToken()
  .then(function() {
    getCharById(req.params.id)
    .then( function(data) { res.send(data); })
    .catch( function(err) { errorMsg(res, err, 'getCharById()'); });
  })
  .catch( function(err) { errorMsg(res, err, 'checkAccessToken(), :CharID'); });
})

// export
module.exports = router;



// FUNCTIONS
function checkAccessToken(searchTerm) {
  const deferred      = q.defer();
  const currentTime   = Math.floor(new Date().getTime() / 1000);

  if (!token || currentTime > expirationTime) {
    rp(accessTokenOptions)
    .then(function(data) {
      const tokenData = data;
      token = tokenData.access_token;
      
      // token expires after 1 hour
      expirationTime = tokenData.expires;
      console.log('success in checkAccessToken', tokenData)
      deferred.resolve();
    })
    .catch(function(err) { deferred.reject(err); });
  } 
  else { 
    deferred.resolve(); 
  }

  return deferred.promise;
}

function searchShow(searchTerm) {
  const deferred      = q.defer();
  requestOptions.uri  = 'https://anilist.co/api/anime/search/' + searchTerm;
  requestOptions.qs.access_token = token;

  rp(requestOptions)
  .then(function(data) { deferred.resolve(data); })
  .catch(function(err) { deferred.reject(err); });

  return deferred.promise;
}

function getCharById(id) {
  const deferred      = q.defer();
  requestOptions.uri  = 'https://anilist.co/api/character/' + id;
  requestOptions.qs.access_token = token;

  rp(requestOptions)
  .then(function(data) { deferred.resolve(data); })
  .catch(function(err) { deferred.reject(err); });

  return deferred.promise;
}

function getAnimeById(id) {
  const deferred      = q.defer();
  requestOptions.uri  = 'https://anilist.co/api/anime/' + id + '/page';
  requestOptions.qs.access_token = token;

  rp(requestOptions)
  .then( function(data) { deferred.resolve(data); })
  .catch( function(err) { deferred.reject(err); });
  return deferred.promise;
}

// receives qs for requestOptions
function browseAnime(qsObj) {
  const deferred = q.defer();
  
  // add an excluded results and access token to qs before API call
  qsObj.genres_exclude  = 'hentai'; // (^_^');;
  qsObj.access_token    = token;
  requestOptions.uri    = 'https://anilist.co/api/browse/anime';
  requestOptions.qs     = qsObj

  rp(requestOptions)
  .then(function(data) { deferred.resolve(data); })
  .catch(function(err) { deferred.reject(err); });

  return deferred.promise;
}

function errorMsg(res, err, locationOfError) {
  console.log('error in ' + locationOfError, err.message)
  res.send(err);
}