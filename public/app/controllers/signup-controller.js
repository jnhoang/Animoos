angular
.module('Animoo')
.controller('SignupCtrl', [
  '$scope'
, function($scope) {
    
    $scope.user = {
      firstName: ''
    , lastName: ''
    , username: ''
    , email: ''
    , password: ''
    , passwordConfirm: ''
    }

  }
]);