angular
.module('Animoo')
.controller('AnimeDetailCtrl', [
  '$scope'
, '$state'
, '$stateParams'
, 'AnimeAPIFactory'
, function($scope, $state, $stateParams, AnimeAPIFactory) {
    $scope.animeData;
    $scope.loading = true;
    $scope.errorMessage;

    AnimeAPIFactory.getAnimeById($stateParams.id)
    .then(function(res) {
      console.log(res.data)
      $scope.loading = false;
      $scope.animeData = res.data;
    })
    .catch(function(err) {
      console.log(err.message[0])
      // CONSIDER TOASTING THIS
      $scope.errorMessage = err.error.messages[0];
    })


    AnimeAPIFactory.getCharById(1)
    .then(function(res) {
      console.log(res.data);
    })
    .catch(function(err) {
      console.log(err.message[0]);
    })
  }
])