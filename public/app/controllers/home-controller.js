angular
.module('Animoo')
.controller('HomeCtrl', [
  '$scope'
, '$state'
, 'AnimeAPIFactory'
, function($scope, $state, AnimeAPIFactory) {
    // PUBLIC VARS
    $scope.top5 = [];
    $scope.top40 = [];
    $scope.loading = true;
    $scope.searchFilter = {
      sort: 'popularity-desc'
    , genres_exclude: 'hentai'
    }




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
        console.log('error: '. err)
    })


  }
])