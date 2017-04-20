angular
.module('Animoo')
.controller('HomeCtrl', [
  '$scope'
, '$state'
, 'AnimeAPIFactory'
, 'smoothScroll'
, function($scope, $state, AnimeAPIFactory, smoothScroll) {
    // PUBLIC VARS
    $scope.top5         = [];
    $scope.currentArr   = [];
    $scope.popularArr   = [];
    $scope.showArr      = [];
    $scope.scoreArr     = [];
    $scope.loading      = true;
    $scope.loadingBar   = false;
    $scope.searchFilter = {
      sort: 'popularity-desc'
    , genres_exclude: 'hentai'
    }
    $scope.search = search;

    $scope.searchTerm;
    $scope.selectResults = selectResults;
    // On Page Render
    browseTop40();

    function browseTop40() {
      var option = { sort: 'popularity-desc' }
      AnimeAPIFactory.browseBy(option)
      .then(function(res) {
        $scope.popularArr = res.data;
        for (var i = 0; i < 5; i++) {
          $scope.top5.push($scope.popularArr.shift());
        }
        $scope.showArr = $scope.popularArr;
        $scope.loading = false;
        console.log($scope.top5);
      })
      .catch(function (err) {
          console.log('error: ', err.message[0])
          Materialize.toast('Sorry, there was an error. \
            Reload the page or try again later', 10000);
      });
    }

    function selectResults(filter) {
      var options;

      // stops function if data already saved from prev call
      if (isDataSaved(filter)) { return; }

      if (filter == 'score') {
        options = { sort: 'score-desc' };
      } 
      else if (filter == 'current') {
        options = {
          sort: 'popularity-desc'
        , status: 'currently airing'
        };
      }

      $scope.loadingBar = true;
      AnimeAPIFactory.browseBy(options)
      .then(function(res) {
        console.log('results back', res.data);
        if (filter == 'score') {
          $scope.scoreArr = res.data;
          $scope.showArr = res.data;
        }
        else {
          $scope.currentArr = res.data;
          $scope.showArr = res.data;
        }
        $scope.loadingBar = false;
      })
      .catch(function(err) {
        Materialize.toast('Sorry, there was an error. \
          Reload the page or try again later', 10000);
      });
    }

    function isDataSaved(filter) {
      if (filter == 'popular') {
        $scope.showArr = $scope.popularArr;
        return true;
      } 
      else if (filter == 'score' && $scope.scoreArr.length > 0) {
        $scope.showArr = $scope.scoreArr;
        return true;
      } 
      else if (filter == 'current' && $scope.currentArr.length > 0) {
        $scope.showArr = $scope.currentArr;
        return true;
      } 
      else {
        return false;
      }
    }

    // DELETE OR NOT?
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