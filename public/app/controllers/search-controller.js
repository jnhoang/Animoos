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

    $scope.searchAnime = function() {
      AnimeAPIFactory.searchForAnime($scope.searchTerm)
      .then(function(res) {
        console.log(res.data);
        $scope.searchResults = res.data;
      })
      .catch(function(err) {
        console.log(err.message);
      });
    }

  }
])