angular
.module('Animoo')
.directive('infoSidebar', function() {
  return {
    scope: { animeData: '=info' }
  , templateUrl: './app/single-anime-page/directives/info-sidebar.html'
  };
});