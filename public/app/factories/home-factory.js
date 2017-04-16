angular
.module('App')
.factory('HomeFactory', [
  '$http',
  function($http) {
    return {
      findAnime: findAnime
    , testCall: testCall
    }
    

  function findAnime(animeTitle) {
    console.log('request in factory ',animeTitle)
    return $http.get('/api/anilist/search/anime/' + animeTitle);
  }
  function testCall() {
    return $http.get('api/anilist/');
  }
}])