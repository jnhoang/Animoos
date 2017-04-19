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
    $scope.scoreArr = [];
    $scope.currentArr = [];
    $scope.loading = true;
    $scope.searchFilter = {
      sort: 'popularity-desc'
    , genres_exclude: 'hentai'
    }
    $scope.search = search;

    $scope.searchTerm;
    $scope.filterResults = filterResults;
    // On Page Render
    browseTop40();

    function browseTop40() {
      AnimeAPIFactory.initialSearch()
      .then(function(res) {
        $scope.top40 = res.data;
        for (var i = 0; i < 5; i++) {
          $scope.top5.push($scope.top40.shift());
        }
        $scope.loading = false;
        console.log($scope.top5);
      })
      .catch(function (err) {
          console.log('error: ', err.message[0])
          Materialize.toast('Sorry, there was an error. \
            Reload the page or try again later', 10000);
      });
    }

    function filterResults(filter) {
      var options;
      console.log('current arr length: ', $scope.currentArr.length)
      if (filter == 'score' && $scope.scoreArr.length == 0) {
        options = { sort: 'score-desc'};
      } 
      else if (filter == 'current' && $scope.currentArr.length == 0) {
        options = {
          sort: 'popularity-desc'
        , status: 'currently airing'
        };
      }
      else {
        return;
      }

      AnimeAPIFactory.browseBy(options)
      .then(function(res) {
        console.log('results back', res.data);
        $scope.currentArr = res.data;
      })
      .catch(function(err) {
        Materialize.toast('Sorry, there was an error. \
          Reload the page or try again later', 10000);
      });
    }

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