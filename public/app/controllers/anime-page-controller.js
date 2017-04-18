angular
.module('Animoo')
.controller('AnimeDetailCtrl', [
  '$scope'
, '$state'
, '$stateParams'
, 'AnimeAPIFactory'
, function($scope, $state, $stateParams, AnimeAPIFactory) {
    
    // PUBLIC VARS & FUNCTIONS 
    $scope.animeData;
    $scope.charData;
    $scope.loading = true;
    $scope.loadingModal = true;
    $scope.errorMessage;

    $scope.getCharById = getCharById;


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


    function getCharById(id) {
      $scope.loadingModal = true;

      AnimeAPIFactory.getCharById(id)
      .then(function(res) {
        console.log(res.data);
        $scope.loadingModal = false;
        $scope.charData = res.data;
      })
      .catch(function(err) { console.log(err.message[0]); });
    }

  }
])