angular
.module('Animoo')
.controller('NavCtrl', [
  '$scope'
, '$window'
, 'UserFactory'
, 'AuthFactory'
, function($scope, $window, UserFactory, AuthFactory) {
    $scope.loggedIn = false;
    $scope.loginData = {
      username: ''
    , password: ''
    };
    $scope.login = function() {
      console.log('click')
      UserFactory.userLogin($scope.loginData)
      .then( (data) => {
        console.log(data);
      })
      .catch( (err) => {
        console.log(err.data.message);
      });
    }


    navbarFade();

    // Navbar fade animation
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

