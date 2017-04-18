angular
.module('Animoo', [
  'ui.router'
, 'ui.materialize'
, 'smoothScroll'])
.config([
  '$stateProvider'
, '$urlRouterProvider'
, '$locationProvider'
, function($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('Home', {
      url: '/'
    , templateUrl: 'app/views/home.html'
    , controller: 'HomeCtrl'
    })
    .state('AnimeDetail', {
      url: '/anime/:id'
    , templateUrl: 'app/views/anime-page.html'
    , controller: 'AnimeDetailCtrl'
    })
    .state('Search', {
      url: '/search'
    , templateUrl: 'app/views/search-results.html'
    , controller: 'SearchCtrl'
    })

    $locationProvider.html5Mode(true);

  }
])