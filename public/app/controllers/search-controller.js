angular
.module('Animoo')
.controller('SearchCtrl', [
  '$scope'
, '$state'
, 'AnimeAPIFactory'
, function($scope, $state, AnimeAPIFactory) {
    
    // PUBLIC VARS AND FUNCTIONS
    $scope.searchTerm;
    $scope.searchResults;
    $scope.loadingBar = false;
    
    $scope.searchAnime = function() {
      $scope.loadingBar = true;

      AnimeAPIFactory.searchForAnime($scope.searchTerm)
      .then(function(res) {
        $scope.loadingBar = false;
        console.log('res.data: ', res.data);
        if (res.data.error) {
          Materialize.toast(res.data.error.messages[0], 10000);
          return;
        }
          
        $scope.searchResults = res.data;
      })
      .catch(function(err) {
        console.log(err.message);
      });
    }

  }
])