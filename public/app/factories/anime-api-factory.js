angular
.module('Animoo')
.factory('AnimeAPIFactory', [
  '$http',
  function($http) {
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
    return $http.get('/api/anilist/page-data/character/' + id);
  } 
  function getAnimeById(id) {
    return $http.get('/api/anilist/page-data/anime/' + id);
  }
  function searchForAnime(animeTitle) {
    return $http.get('/api/anilist/search/anime/' + animeTitle);
  }
}])