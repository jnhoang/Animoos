angular
.module('Animoo')
.controller('AnimeDetailCtrl', [
  '$scope'
, '$state'
, '$stateParams'
, 'AnimeAPIFactory'
, function($scope, $state, $stateParams, AnimeAPIFactory) {
    $scope.animeData;
    
    AnimeAPIFactory.findAnime($state.params.title)
    .then(function(res) {
      console.log(res.data[0])
      $scope.animeData = res.data[0];
    })
    .catch(function(err) {
      console.log(err)
    })
  }
])