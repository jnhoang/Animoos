angular
.module('Animoo')
.controller('NavCtrl', [
  '$scope'
, '$state'
, '$window'
, 'UserFactory'
, 'AuthFactory'
, function($scope, $state, $window, UserFactory, AuthFactory) {
    // VARIABLES
    $scope.loggedIn;
    $scope.username;

    $scope.loginData = {
      username: ''
    , password: ''
    };

    // On Load functions
    // Check if user is currently logged in
    isLoggedIn();

    // FUNCTIONS
    function isLoggedIn() {
      // checks if a user is currently logged in
      // if logged in, stores user data 
      $scope.loggedIn = AuthFactory.isLoggedIn();
      
      if ($scope.loggedIn) {
        $scope.username = AuthFactory.getUserInfo().username;
      }
    }
    $scope.login = () => {
      UserFactory.userLogin($scope.loginData)
      .then( (res) => {
        // returns user obj & auth token
        let data = res.data;
        Materialize.toast('You are now signed in.', 3000);
        // Saves data in auth factory variables
        AuthFactory.saveUserInfo(data);
        // Used to change navbar
        $scope.username = data.user.username;
        $scope.loggedIn = true;
        $state.go('PrivateProfile', {username: $scope.username});

      })
      .catch( (err) => {
        Materialize.toast('Error: ' + err.data.message, 3000);
        console.log(err.data.message);
      });
      $scope.loginData = {};
    }
    $scope.logout = () => {
      // reset all stored data
      AuthFactory.clearStorage();
      $scope.username = '';
      $scope.loggedIn = false;
      Materialize.toast('OK Bye, see you again soon!', 3000);
      $state.go('Home')
    }
  }
]);

