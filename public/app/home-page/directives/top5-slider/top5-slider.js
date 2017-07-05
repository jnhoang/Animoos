angular
.module('Animoo')
.directive('topSlider', function() {
	return {
		scope: { top5: '=info' }
	,	templateUrl: './app/home-page/directives/top5-slider/top5-slider.html'
	};
});