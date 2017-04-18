angular
.module('Animoo')
.controller('HomeCtrl', [
  '$scope'
, '$state'
, 'AnimeAPIFactory'
, 'smoothScroll'
, function($scope, $state, AnimeAPIFactory, smoothScroll) {
    // PUBLIC VARS
    $scope.top5 = [];
    $scope.top40 = [];
    $scope.loading = true;
    $scope.searchTerm;
    $scope.searchFilter = {
      sort: 'popularity-desc'
    , genres_exclude: 'hentai'
    }
    $scope.search = search;


    AnimeAPIFactory.initialSearch()
    .then(function(res) {
      $scope.top40 = res.data;
      for (var i = 0; i < 5; i++) {
        $scope.top5.push($scope.top40.shift());
      }
      $scope.loading = false;
      console.log($scope.top40);
      console.log($scope.top5);
    })
    .catch(function (err) {
        console.log('error: ', err)
    })

    function search() {
      console.log('searching')
      console.log('searchTerm: ', $scope.searchTerm)
      AnimeAPIFactory.searchForAnime($scope.searchTerm)
      .then(function(res) {
        console.log('search results: ', res.data);
        $scope.searchResults = res.data;
      })
      .catch(function(err) {
        console.log('error ', err.message);
        Materialize.toast(err.message, 10000);
      });
    }
  }
])