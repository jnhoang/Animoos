angular
.module('Animoo')
.factory('AnimeAPIFactory', [
  '$http',
  function($http) {
    return {
      getAnimeById: getAnimeById
    , searchForAnime: searchForAnime  
    , initialSearch: initialSearch
    }
    
  function getAnimeById(id) {
    return $http.get('/api/anilist/page-data/anime/' + id)
  }
  function searchForAnime(animeTitle) {
    return $http.get('/api/anilist/search/anime/' + animeTitle);
  }
  function initialSearch() {
    return $http.get('api/anilist/');
  }
}])