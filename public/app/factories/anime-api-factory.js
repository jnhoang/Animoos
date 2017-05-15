angular
.module('Animoo')
.factory('AnimeAPIFactory', [
  '$http'
, '$q'
, '$log'
, function($http, $q, $log) {
    var storage = {
      charData: {}
    };

    return {
      getAnimeById: getAnimeById
    , searchForAnime: searchForAnime  
    , getCharById: getCharById
    , browseBy: browseBy
    }
  
  function browseBy(filter) {
    return $http({
      url: 'api/anilist/browse'
    , method: 'GET'
    , params: filter
    });
  }
  function getCharById(id) {
    var deferred = $q.defer();

    if (storage.charData[id]) {
      $log.debug('id stored in cache', storage.charData[id]);
      deferred.resolve(storage.charData[id]);
    }
    else {
      $http.get('/api/anilist/page-data/character/' + id)
      .then(function(res) { 
        storage.charData[id] = res.data;
        $log.debug('successfully fetched data from API for char id: ', id);
        deferred.resolve(storage.charData[id]);
      })
      .catch(function(err) { console.log(err.message); });
    }
    return deferred.promise;


  } 
  function getAnimeById(id) {
    return $http.get('/api/anilist/page-data/anime/' + id);
  }
  function searchForAnime(animeTitle) {
    return $http.get('/api/anilist/search/anime/' + animeTitle);
  }
}])