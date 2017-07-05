angular
.module('Animoo')
.directive('showCard', function(){
	return {
		scope: { animeObj: '=info'}
	, templateUrl: './app/views/directives/show-card.html'
	};
});