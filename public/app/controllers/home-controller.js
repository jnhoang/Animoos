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
    getTop5();

    function getTop5() {
      var option = { sort: 'popularity-desc' }
      AnimeAPIFactory.browseBy(option)
      .then(function(res) {
        $scope.popularArr = res.data;
        adjustApiData($scope.popularArr);
        
        for (var i = 0; i < 5; i++) {
          $scope.top5.push($scope.popularArr.shift());
        }

        $scope.loading = false;
        console.log($scope.top5);
      }.bind($scope))
      .catch(function (err) {
          console.log('error: ', err.message[0])
          Materialize.toast('Sorry, there was an error. \
            Reload the page or try again later', 10000);
      })

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
          adjustApiData($scope.scoreArr);
          $scope.showArr = $scope.scoreArr;
        }
        else {
          $scope.currentArr = res.data;
          adjustApiData($scope.currentArr)
          $scope.showArr = $scope.currentArr;
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

    function adjustApiData(animeArr) {
      animeArr.forEach(function(anime) {
        for (var i = 0; i < anime.genres.length - 1; i++) {
          anime.genres[i] += ',';
        }
      });
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
    , sort:       'score-desc'
    , page:       1
    }

    $scope.$watchCollection('filterObj', function(newObj, oldObj) {
      $scope.loadingBar = true;
      for (var key in $scope.filterObj) {
        if ($scope.filterObj[key] == '') {
          delete $scope.filterObj[key]
        }
      }
      AnimeAPIFactory.browseBy($scope.filterObj)
      .then(function(res) {
        console.log(res.data);
        $scope.showArr = res.data;
        $scope.loadingBar = false;
        if (res.data.error || res.data.length == 0) {
          Materialize.toast('Sorry, there were no results.', 10000);
          return;
        }
      })
      .catch(function(err) {
        console.log(err)
        $scope.loadingBar = false;
        Materialize.toast('Sorry, there was an error. \
          Reload the page or try again later', 10000);
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