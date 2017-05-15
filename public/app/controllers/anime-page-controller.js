angular
.module('Animoo')
.controller('AnimeDetailCtrl', [
  '$scope'
, '$sce'
, '$stateParams'
, 'AnimeAPIFactory'
, function($scope, $sce, $stateParams, AnimeAPIFactory) {
    
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
      .then(function(res) {
        console.log(res.data)
        $scope.loading    = false;
        $scope.animeData  = res.data;
        adjustApiData();
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

    function adjustApiData() {
      // re-arrange date format
      var dateData = $scope.animeData.start_date_fuzzy.toString();
      var year;
      var month;
      var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 
        'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
      
      year    = dateData.substr(0,4);
      month   = parseInt(dateData.substr(4,2));
      month   = months[month - 1];
      
      $scope.animeData.start_date_fuzzy = month + ' ' + year;
      // add commas for genres, studios
      for (var i = 0; i < $scope.animeData.genres.length - 1; i++) {
        $scope.animeData.genres[i] += ',';
      }
      for (var i = 0; i < $scope.animeData.studio.length - 1; i++) {
        $scope.animeData.studio[i].studio_name += ',';
      }

      // reformat description to read HTML elements
      $scope.animeData.description = $sce.trustAsHtml($scope.animeData.description);
    }
  }
])