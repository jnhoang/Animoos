angular
.module('Animoo')
.controller('HomeCtrl', [
  '$scope'
, 'AnimeAPIFactory'
, 'smoothScroll'
, function($scope, AnimeAPIFactory, smoothScroll) {
    // PAGE LOAD ASSETS
    $scope.top5         = [];
    $scope.currentArr   = [];
    $scope.popularArr   = [];
    $scope.showArr      = [];
    $scope.scoreArr     = [];
    $scope.loading      = true;
    $scope.loadingBar   = false;

    // On Page Render
    browseTop40();

    function browseTop40() {
      var option = { sort: 'popularity-desc' }
      AnimeAPIFactory.browseBy(option)
      .then(function(res) {
        $scope.popularArr = res.data;
        for (var i = 0; i < 5; i++) {
          $scope.top5.push($scope.popularArr.shift());
        }
        $scope.showArr = $scope.popularArr;
        $scope.loading = false;
        console.log($scope.top5);
      })
      .catch(function (err) {
          console.log('error: ', err.message[0])
          Materialize.toast('Sorry, there was an error. \
            Reload the page or try again later', 10000);
      });
    }

    function selectResults(filter) {
      var options;
      console.log('triggering')
      // stops function if data already saved from prev call
      if (isDataSaved(filter)) { return; }

      if (filter == 'score') {
        options = { sort: 'score-desc' };
      } 
      else if (filter == 'current') {
        options = {
          sort: 'popularity-desc'
        , status: 'currently airing'
        };
      }

      $scope.loadingBar = true;
      AnimeAPIFactory.browseBy(options)
      .then(function(res) {
        console.log('results back', res.data);
        if (filter == 'score') {
          $scope.scoreArr = res.data;
          $scope.showArr = res.data;
        }
        else {
          $scope.currentArr = res.data;
          $scope.showArr = res.data;
        }
        $scope.loadingBar = false;
      })
      .catch(function(err) {
        Materialize.toast('Sorry, there was an error. \
          Reload the page or try again later', 10000);
      });
    }

    function isDataSaved(filter) {
      if (filter == 'popular') {
        $scope.showArr = $scope.popularArr;
        return true;
      } 
      else if (filter == 'score' && $scope.scoreArr.length > 0) {
        $scope.showArr = $scope.scoreArr;
        return true;
      } 
      else if (filter == 'current' && $scope.currentArr.length > 0) {
        $scope.showArr = $scope.currentArr;
        return true;
      } 
      else {
        return false;
      }
    }

    
    // ADVANCE FILTER ASSETS
    $scope.advFilter = false;
    $scope.genres = [
      'Genres', 'action', 'adventure', 'comedy', 'drama', 'fantasy', 'horror',
      'mahou shoujo', 'mecha', 'music', 'mystery', 'psychological', 'romance', 
      'sci fi', 'slice of life', 'sports'
    ];
    $scope.filterObj = {
      token_type: 'Bearer'
    , year:       ''
    , season:     ''
    , type:       ''
    , status:     ''
    , genres:     []
    , sort:       ''
    , page:       1
    }

    $scope.$watchCollection('filterObj', function(newObj, oldObj) {
      console.log('logging')
      for (var key in $scope.filterObj) {
        if ($scope.filterObj[key] == '') {
          delete $scope.filterObj[key]
        }
      }
      AnimeAPIFactory.browseBy($scope.filterObj)
      .then(function(res) {
        console.log(res.data);
      })
      .catch(function(err) {
        console.log(err)
      });
    });

    $scope.toggleFilters = function() {
      $scope.advFilter = $scope.advFilter ?  false : true;
    }
   
    function filterAnime() {
      console.log('searching')
      // deletes empty keys
      AnimeAPIFactory.browseBy($scope.filterObj)
      .then(function(res) {
        console.log(res.data);
      })
      .catch(function(err) {
        console.log(err)
      });
    }

  }
])