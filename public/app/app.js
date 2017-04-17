angular
.module('App', ['ui.router', 'ui.materialize'])
.config([
  '$stateProvider',
  '$urlRouterProvider',
  '$locationProvider',
  function($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'app/views/home.html',
      controller: 'HomeCtrl'
    })
    // .state('Anime', {
    //   url: '/anime/:id',
    //   templateUrl: 'app/views/'
    // })

    $locationProvider.html5Mode(true);

  }
])