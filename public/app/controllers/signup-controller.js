angular
.module('Animoo')
.controller('SignupCtrl', [
  '$scope'
, '$state'
, 'AuthFactory'
, 'UserFactory'
, function($scope, $state, AuthFactory, userFactory) {
    
    $scope.user = {
      firstName: ''
    , lastName: ''
    , username: ''
    , email: ''
    , password: ''
    , passwordConfirm: ''
    };

    $scope.signup = () => {
      if ($scope.user.password !== $scope.user.passwordConfirm) {
        Materialize.toast('Your passwords don\'t match', 2000);
        return;
      }

      userFactory.userSignup($scope.user)
      .then( (data) => {
        $state.go('home');
        console.log('success: ', data);
      })
      .catch( (err) => {
        console.log('error: ',err.data.message);
        Materialize.toast(err.data.message, 5000);
      });
    }
  }
]);