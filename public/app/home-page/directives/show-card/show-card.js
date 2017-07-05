angular
.module('Animoo')
.directive('showCard', function(){
	return {
		scope: { animeObj: '=info'}
	, templateUrl: './app/home-page/directives/show-card/show-card.html'
	};
});