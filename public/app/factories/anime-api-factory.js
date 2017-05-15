angular
.module('Animoo')
.factory('AnimeAPIFactory', [
  '$http'
, '$q'
, '$log'
, function($http, $q, $log) {
    var storage = {
      animeData:    {}
    , browseData:   {}
    , charData:     {}
    , searchData:   {}
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
    // returns factory storage || api call for char data via a promise
    function getCharById(id) {
      var deferred = $q.defer();
      if (storage.charData[id]) {
        // returns local data if available
        $log.debug('id stored in cache', storage.charData[id]);
        deferred.resolve(storage.charData[id]);
      }
      else {
        // api call for data, stores in local cache, returns local data
        $http.get('/api/anilist/page-data/character/' + id)
        .then(function(res) { 
          storage.charData[id] = res.data;
          $log.debug('successfully fetched data from API for char id: ', id);
          deferred.resolve(storage.charData[id]);
        })
        .catch(function(err) { defer.reject(err) });
      }
      // returns promise
      return deferred.promise;
    } 
    function getAnimeById(id) {
      return $http.get('/api/anilist/page-data/anime/' + id);
    }
    function searchForAnime(animeTitle) {
      return $http.get('/api/anilist/search/anime/' + animeTitle);
    }
  }
]);