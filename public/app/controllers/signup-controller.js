angular
.module('Animoo')
.controller('SignupCtrl', [
  '$scope'
, '$state'
, 'AuthFactory'
, 'UserFactory'
, function($scope, $state, AuthFactory, userFactory) {
    
    $scope.user = {
      username: ''
    , email: ''
    , password: ''
    , passwordConfirm: ''
    };

    $scope.signup = function() {
      if ($scope.user.password !== $scope.user.passwordConfirm) {
        Materialize.toast('Your passwords don\'t match', 2000);
        return;
      }

      userFactory.userSignup($scope.user)
      .then(function(data) {
        Materialize.toast('Account successfully created', 8000);
        $state.go('Home');
        console.log('success: ', data);
      })
      .catch(function(err) {
        console.log('error: ',err.data.message);
        Materialize.toast(err.data.message, 5000);
      });
    }
  }
]);