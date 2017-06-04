angular
.module('Animoo')
.factory('AnimeAPIFactory', [
  '$http'
, '$log'
, '$q'
, '$sce'
, function($http, $log, $q, $sce) {
    // cache storage for any api calls
    const storage = {
      animeData:    {}
    , browseData:   {}
    , charData:     {}
    , searchData:   {}
    };

    return {
      // list of functions factory returns, see below for full function
      getAnimeById:     getAnimeById
    , searchForAnime:   searchForAnime
    , getCharById:      getCharById
    , browseBy:         browseBy
    }
  
    function browseBy(filterObj) {
      if (JSON.stringify(filterObj) === '{"token_type":"Bearer","sort":"popularity-desc","page":1}') {
        const deferred = $q.defer();
        deferred.resolve(browseResults);
        
        return deferred.promise;
      } 
      else {
        const httpPackage = {
          url: 'api/anilist/browse'
        , method: 'GET'
        , params: filterObj
        }

        return $http(httpPackage);
      }
    }
    // returns factory storage || api call for char data via a promise
    function getCharById(id) {
      const deferred = $q.defer();
      
      if (storage.charData[id]) {
        // returns local data if available
        $log.debug('char id stored in cache', storage.charData[id]);
        deferred.resolve(storage.charData[id]);
      }
      else {
        // api call for data, stores in local cache, returns local data
        $http.get('/api/anilist/page-data/character/' + id)
        .then( (res) => { 
          storage.charData[id] = res.data;
          $log.debug('successfully fetched data from API for char id: ', id);
          deferred.resolve(storage.charData[id]);
        })
        .catch( (err) => defer.reject(err) );
      }
      // returns promise
      return deferred.promise;
    } 
    // returns factory storage || api call for anime data via a promise
    function getAnimeById(id) {
      const deferred = $q.defer();

      if (storage.animeData[id]) {
        // returns local data if available
        $log.debug('anime id stored in cache', storage.animeData[id]);
        deferred.resolve(storage.animeData[id])
      }
      else {
        // api call for data, stores in local cache, returns local data
        $http.get('/api/anilist/page-data/anime/' + id)
        .then( (res) => {
          storage.animeData[id] = res.data;
          // formats return data for display
          adjustApiData(storage.animeData[id]);
          $log.debug('successfully fetched data from API for anime id: ', id);
          deferred.resolve(storage.animeData[id]);
        })
        .catch( (err) => deferred.reject(err) );
      }
      // returns promise
      return deferred.promise;
    }

    function adjustApiData(data) {
      // re-arrange date format
      let dateData = data.start_date_fuzzy.toString();
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      
      let year    = dateData.substr(0,4);
      let month   = parseInt(dateData.substr(4,2));
      month       = months[month - 1];
      
      data.start_date_fuzzy = month + ' ' + year;
      
      // add commas for genres, studios
      for (var i = 0; i < data.genres.length - 1; i++) {
        data.genres[i] += ',';
      }
      for (var i = 0; i < data.studio.length - 1; i++) {
        data.studio[i].studio_name += ',';
      }

      // reformat description to read HTML elements
      data.description = $sce.trustAsHtml(data.description);
    }

    function searchForAnime(animeTitle) {
      return $http.get('/api/anilist/search/anime/' + animeTitle);
    }
  }
]);