angular
.module('Animoo')
.factory('AnimeAPIFactory', [
  '$http',
  function($http) {
    return {
      findAnime: findAnime
    , initialSearch: initialSearch
    }
    

  function findAnime(animeTitle) {
    console.log('request in factory ',animeTitle)
    return $http.get('/api/anilist/search/anime/' + animeTitle);
  }
  function initialSearch() {
    return $http.get('api/anilist/');
  }
}])