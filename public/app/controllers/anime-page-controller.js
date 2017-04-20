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
        adjustApiData();
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
      .catch(function(err) { console.log(err.message); });
    }

    function adjustApiData() {
      var dateData = $scope.animeData.start_date_fuzzy.toString();
      var year;
      var month;
      var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 
        'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
      
      year = dateData.substr(0,4);
      month = parseInt(dateData.substr(4,2));
      month = months[month - 1];
      $scope.animeData.start_date_fuzzy = month + ' ' + year;
      
      $scope.animeData.description = $sce.trustAsHtml($scope.animeData.description);
    }
  }
])