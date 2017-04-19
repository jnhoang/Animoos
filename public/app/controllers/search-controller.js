angular
.module('Animoo')
.controller('SearchCtrl', [
  '$scope'
, '$state'
, '$http'
, 'AnimeAPIFactory'
, function($scope, $state, $http, AnimeAPIFactory) {
    $scope.testFunc = testFunc;
    $scope.toggleGenre = toggleGenre;
    // TEST
    $scope.testVar = {
      token_type: 'Bearer'
    , year: ''
    , season: ''
    , type: ''
    , status: ''
    , genres: []
    , sort: ''
    , page: 1
    }
    function testFunc() {
      for (var key in $scope.testVar) {
        if ($scope.testVar[key] == '') {
          delete $scope.testVar[key]
        }
      }
      $http({
        url: 'api/anilist/test'
      , method: 'GET'
      , params: $scope.testVar
      })
      .then(function(res) {
        $scope.data = res.data
        console.log(res)
        console.log(res.data)
      })
      .catch(function(err) {
        console.log(err)
      })
    }






    function toggleGenre(genre) {
      if ($scope.testVar.genres == undefined) {
        $scope.testVar.genres = [];
      }

      if ($scope.testVar.genres.includes(genre)) {
        $scope.testVar.genres.splice($scope.testVar.genres.indexOf(genre), 1);
      } else {
        $scope.testVar.genres.push(genre)
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