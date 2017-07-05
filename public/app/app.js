angular
.module('Animoo', [
  'ui.router'
, 'ui.materialize'
, 'infinite-scroll'
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
    , templateUrl: 'app/home-page/home.html'
    , controller: 'HomeCtrl'
    })
    .state('Signup', {
      url: '/signup'
    , templateUrl: 'app/views/signup.html'
    , controller: 'SignupCtrl'
    })
    .state('AnimeDetail', {
      url: '/anime/:id'
    , templateUrl: 'app/single-anime-page/anime-page.html'
    , controller: 'AnimeDetailCtrl'
    })
    .state('Search', {
      url: '/search'
    , templateUrl: 'app/search-page/search-results.html'
    , controller: 'SearchCtrl'
    })
    .state('PrivateProfile', {
      url: '/profile/:username'
    , templateUrl: '/app/views/private-profile.html'
    , controller: 'ProfileCtrl'
    })

    $locationProvider.html5Mode(true);

  }
])
  