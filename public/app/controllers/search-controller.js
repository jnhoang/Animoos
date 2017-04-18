angular
.module('Animoo')
.controller('SearchCtrl', [
  '$scope'
, '$state'
, 'AnimeAPIFactory'
, function($scope, $state, AnimeAPIFactory) {
    // TYPE
    // 0 TV
    // 1 TV Short
    // 2 Movie
    // 3 Special
    // 4 OVA
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


    }
    function toggleGenre(genre) {
      console.log(genre)
      if ($scope.testVar.genres.includes(genre)) {
        console.log('yes!')
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