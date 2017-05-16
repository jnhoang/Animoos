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

    // On Page Render
    getTop5();

    function getTop5() {
      var option = { sort: 'popularity-desc' };
      
      AnimeAPIFactory.browseBy(option)
      .then(function(res) {
        $scope.popularArr = res.data;
        adjustApiData($scope.popularArr);
        // Takes out first 5 arr items for display in slider
        for (var i = 0; i < 5; i++) {
          $scope.top5.push($scope.popularArr.shift());
        }
        $scope.loading = false;
      })
      .catch(function (err) {
          Materialize.toast('Sorry, there was an error. \
            Reload the page or try again later', 10000);
      });
    }

    function adjustApiData(animeArr) {
      animeArr.forEach(function(anime) {
        for (var i = 0; i < anime.genres.length - 1; i++) {
          anime.genres[i] += ',';
        }
      });
    }
    
    // ADVANCE FILTER ASSETS

    $scope.genres     = [
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
      if ($scope.filterObj.year && $scope.filterObj.year.length != 4) {
        return;
      }

      $scope.loadingBar = true;
      // clears empty fields from filterObj
      for (var key in $scope.filterObj) {
        if ($scope.filterObj[key] == '') {
          delete $scope.filterObj[key]
        }
      }
      AnimeAPIFactory.browseBy($scope.filterObj)
      .then(function(res) {
        $scope.showArr      = res.data;
        $scope.loadingBar   = false;
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

  }
]);