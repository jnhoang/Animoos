angular
.module('Animoo')
.directive('topSlider', function() {
	return {
		scope: { top5: '=info' }
	,	templateUrl: './app/views/directives/top5-slider.html'
	};
});