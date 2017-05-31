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
    // intialize Navbar fade animation onload
    navbarFade();


    // FUNCTIONS
    function isLoggedIn() {
      console.log(AuthFactory.isLoggedIn());
      $scope.loggedIn = AuthFactory.isLoggedIn();
      let userInfo = AuthFactory.getUserInfo();
      $scope.username = userInfo.username;
    }
    $scope.login = () => {
      UserFactory.userLogin($scope.loginData)
      .then( (res) => {
        let data = res.data;
        console.log(data)
        Materialize.toast('You are now signed in.', 3000);
        // Saves data in auth factory variables
        AuthFactory.saveUserInfo(data.user);
        AuthFactory.saveToken(data.token);
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
      //$state.go('Home')
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

