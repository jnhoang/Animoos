var rp = require('request-promise');
var q = require('q');

var accessTokenOptions = {
  method: 'POST',
  uri: 'https://anilist.co/api/auth/access_token?', 
  body: {
    grant_type:     process.env.GRANT_TYPE,
    client_id:      process.env.CLIENT_ID,
    client_secret:  process.env.CLIENT_SECRET
  },
  json: true
}

function getAccessToken() {
  var deferred = q.defer();

  // async - resolve
  rp(accessTokenOptions)
  .then(function(tokenData) {
    deferred.resolve(tokenData);
  })
  .catch(function(err) {
    deferred.reject(err);
  })


  return deferred.promise;
}



getAccessToken()
.then(function(tokenData) {
  //assign vars from tokenData
})
.catch(function(err) {
  console.log('this was rejected from getAccessToken()', err);
})

