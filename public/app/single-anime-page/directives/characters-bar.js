angular
.module('Animoo')
.directive('charsBar', function() {
  return {
    scope: { char: '=info'}
  , templateUrl: './app/single-anime-page/directives/characters-bar.html'
  };
});