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
    
    $scope.$watch('searchTerm', function(newObj, oldObj) {
      if ($scope.searchTerm == undefined) {
        return;
      }
      $scope.loadingBar = true;

      AnimeAPIFactory.searchForAnime($scope.searchTerm)
      .then(function(res) {
        console.log(res.data);
        $scope.searchResults = res.data;
        $scope.loadingBar = false;
        
        if (res.data.error) {
          Materialize.toast(res.data.error.messages[0], 10000);
          return;
        }
      })
      .catch(function(err) {
        console.log(err)
        $scope.loadingBar = false;
        Materialize.toast('Sorry, there was an error. \
          Reload the page or try again later', 10000);
      });
    });






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