angular
.module('Animoo')
.controller('HomeCtrl', [
  '$scope'
, 'AnimeAPIFactory'
, 'smoothScroll'
, function($scope, AnimeAPIFactory, smoothScroll) {
    // PAGE LOAD ASSETS
    $scope.top5         = [];
    $scope.popularArr   = [];
    $scope.showArr      = [];
    $scope.loading      = true;
    $scope.loadingBar   = false;

    // ADVANCE FILTER ASSETS

    $scope.genres = [
      'Genres', 'action', 'adventure', 'comedy', 'drama', 'fantasy', 'horror',
      'mahou shoujo', 'mecha', 'music', 'mystery', 'psychological', 'romance', 
      'sci fi', 'slice of life', 'sports'
    ];
    // Initial API call
    $scope.filterObj = {
      token_type: 'Bearer'
    , year:       ''
    , season:     ''
    , type:       ''
    , status:     ''
    , genres:     []
    , sort:       'popularity-desc'
    , page:       1
    }

    // auto API call on any change to filters
    $scope.$watchCollection('filterObj', function(newObj, oldObj) {
      // prevents premature API calls
      if ($scope.filterObj.year && $scope.filterObj.year.length != 4) {
        return;
      }
      // notify user search in progress
      $scope.loadingBar = true;
      
      // clears empty fields from $scope.filterObj
      clearEmptyFields();

      AnimeAPIFactory.browseBy($scope.filterObj)
      .then(function(res) {
        $scope.showArr      = res.data;
        $scope.loading      = false;
        $scope.loadingBar   = false;

        // loads slider data on load
        if ($scope.top5.length === 0) {
          $scope.top5 = $scope.showArr.slice(0, 5);
        }
        // catch for no results
        if (res.data.error || res.data.length == 0) {
          Materialize.toast('Sorry, there were no results.', 10000);
          return;
        }
      })
      .catch(function(err) {
        $scope.loadingBar = false;
        Materialize.toast('Sorry, there was an error. \
          Reload the page or try again later', 10000);
      });
    });
    function clearEmptyFields() {
      for (var key in $scope.filterObj) {
        if ($scope.filterObj[key] == '') {
          delete $scope.filterObj[key]
        }
      }
    }
    function adjustApiData(animeArr) {
      animeArr.forEach(function(anime) {
        for (var i = 0; i < anime.genres.length - 1; i++) {
          anime.genres[i] += ',';
        }
      });
    }

  }
]);