angular
.module('App')
.controller('HomeCtrl', [
  '$scope',
  '$state',
  'HomeFactory',
  function($scope, $state, HomeFactory) {

    HomeFactory.findAnime('cowboy bebop')
    .then(function(res) {
        console.log('res success: ', res.data)
    })
    .catch(function (err) {
        console.log('error: '. err)
    })
  }
])