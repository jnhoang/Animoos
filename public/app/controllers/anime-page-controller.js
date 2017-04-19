angular
.module('Animoo')
.controller('AnimeDetailCtrl', [
  '$scope'
, '$sce'
, '$state'
, '$stateParams'
, 'AnimeAPIFactory'
, function($scope, $sce, $state, $stateParams, AnimeAPIFactory) {
    
    // PUBLIC VARS & FUNCTIONS 
    $scope.animeData;
    $scope.charData;
    $scope.showActor      = false;
    $scope.loading        = true;
    $scope.loadingModal   = true;

    $scope.getAnimeData = getAnimeData;
    $scope.getCharById = getCharById;

    // Run at page render
    getAnimeData();

    function getAnimeData() {
      AnimeAPIFactory.getAnimeById($stateParams.id)
      .then(function(res) {
        console.log(res.data)
        $scope.loading = false;
        $scope.animeData = res.data;
        $scope.start_date_fuzzy =
        $scope.animeData.description = $sce.trustAsHtml($scope.animeData.description)
      })
      .catch(function(err) {
        console.log(err.message[0])
        Materialize.toast('Sorry, there was an error. Reload the page or try again later', 10000);
      });
    }

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