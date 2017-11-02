angular
.module('Animoo')
.controller('ProfileCtrl', [
  '$scope'
, 'AuthFactory'
, function($scope, AuthFactory) {
    $scope.user = AuthFactory.getUserInfo();
}]);