angular
.module('Animoo')
.controller('SearchCtrl', [
  '$scope'
, '$state'
, '$http'
, 'AnimeAPIFactory'
, function($scope, $state, $http, AnimeAPIFactory) {
    $scope.searchResults;
    $scope.searchTerm;
    $scope.filterObj = {
      token_type: 'Bearer'
    , year: ''
    , season: ''
    , type: ''
    , status: ''
    , genres: []
    , sort: ''
    , page: 1
    }
    $scope.searchAnime = searchAnime;
    $scope.filterAnime = filterAnime;
    $scope.toggleGenre = toggleGenre;

    function searchAnime() {
      AnimeAPIFactory.searchForAnime($scope.searchTerm)
      .then(function(res) {
        console.log(res.data);
        $scope.searchResults = res.data;
      })
      .catch(function(err) {
        console.log(err.message);
      });
    }

    function filterAnime() {
      // deletes empty keys
      for (var key in $scope.filterObj) {
        if ($scope.filterObj[key] == '') {
          delete $scope.filterObj[key]
        }
      }
      AnimeAPIFactory.browseBy(filterObj)
      .then(function(res) {
        console.log(res.data);
      })
      .catch(function(err) {
        console.log(err)
      });
    }






    function toggleGenre(genre) {
      if ($scope.filterObj.genres == undefined) {
        $scope.filterObj.genres = [];
      }

      if ($scope.filterObj.genres.includes(genre)) {
        $scope.filterObj.genres.splice($scope.filterObj.genres.indexOf(genre), 1);
      } else {
        $scope.filterObj.genres.push(genre)
      }
    }


    function browseTop40() {
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
    }
  }
])