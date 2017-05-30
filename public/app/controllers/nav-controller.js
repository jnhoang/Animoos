angular
.module('Animoo')
.controller('NavCtrl', [
  '$scope'
, '$window'
, 'AuthFactory'
, function($scope, $window, AuthFactory) {
    AuthFactory.currentUser();
    $scope.loggedIn = false;

    $scope.test = function() {
      console.log('click');
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

