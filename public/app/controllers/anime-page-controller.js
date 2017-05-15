angular
.module('Animoo')
.controller('AnimeDetailCtrl', [
  '$scope'
, '$stateParams'
, 'AnimeAPIFactory'
, function($scope, $stateParams, AnimeAPIFactory) {
    
    // PUBLIC VARS & FUNCTIONS 
    $scope.animeData;
    $scope.charData;
    $scope.showActor      = false;
    $scope.loading        = true;
    $scope.loadingModal   = true;

    $scope.getAnimeData   = getAnimeData;
    $scope.getCharById    = getCharById;

    // Run at page render
    getAnimeData();

    function getAnimeData() {
      AnimeAPIFactory.getAnimeById($stateParams.id)
      .then(function(data) {
        $scope.loading    = false;
        $scope.animeData  = data;
      })
      .catch(function(err) {
        console.log(err.message)
        Materialize.toast('Sorry, there was an error. Reload the page or try again later', 10000);
      });
    }

    function getCharById(id) {
      $scope.loadingModal = true;

      AnimeAPIFactory.getCharById(id)
      .then(function(res) {
        $scope.loadingModal   = false;
        $scope.charData       = res;
      })
      .catch(function(err) { console.log(err.message); });
    }
  }
])