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
    $scope.test = 'this is a test'
    $scope.loggedIn = false;
    $scope.username;

    $scope.loginData = {
      username: ''
    , password: ''
    };

    // intialize Navbar fade animation onload
    navbarFade();

    // FUNCTIONS
    $scope.login = () => {
      UserFactory.userLogin($scope.loginData)
      .then( (res) => {
        let data = res.data;

        Materialize.toast('You are now signed in.', 3000);
        // Saves data in auth factory variables
        AuthFactory.saveUserInfo(data.user);
        AuthFactory.saveToken(data.token);
        // Used to change navbar
        $scope.username = data.user.username;
        $scope.loggedIn = true;

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
    }

    function navbarFade() {
      const navbar = document.querySelector('.navbar');
      // Displays navbar after scrolling past 1/2 screen
      const transitionHeight = window.innerHeight / 2
      document.addEventListener('scroll', function(event) {
        if (window.scrollY >= transitionHeight) {
          navbar.style.backgroundColor = '#00bcd4';
        }
        if (window.scrollY < transitionHeight) {
          navbar.style.backgroundColor = 'transparent';
        } 
      });
    }
  }
]);

