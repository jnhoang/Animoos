angular
.module('Animoo')
.controller('NavCtrl', [
  '$scope'
, '$window'
, function($scope, $window) {
    var navbar = document.querySelector('.navbar');
    var transitionHeight = window.innerHeight / 2
    document.addEventListener('scroll', function(event) {
      if (window.scrollY >= transitionHeight) {
        navbar.style.backgroundColor = '#00bcd4';
      }
      if (window.scrollY < transitionHeight) {
        navbar.style.backgroundColor = 'transparent';
      }
      
    })
  }
]);

