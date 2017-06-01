angular
.module('Animoo')
.controller('AnimeDetailCtrl', [
  '$scope'
, '$stateParams'
, 'AnimeAPIFactory'
, 'AuthFactory'
, 'UserFactory'
, function($scope, $stateParams, AnimeAPIFactory, AuthFactory, UserFactory) {
    
    // PUBLIC VARS & FUNCTIONS 
    $scope.animeData;
    $scope.charData;
    $scope.userInfo;
    $scope.showActor      = false;
    $scope.loading        = true;
    $scope.loadingModal   = true;
    $scope.isLoggedIn     = AuthFactory.isLoggedIn();

    $scope.getAnimeData     = getAnimeData;
    $scope.getCharById      = getCharById;
    $scope.addToFav         = addToFav;
    $scope.addToWatchList   = addToWatchList;
    // Run at page render
    getAnimeData();

    UserFactory.getUserAll()
    .then( (data) => console.log('DATA', data) )
    .catch( (err) => console.log('error', err) )

    if ($scope.isLoggedIn) {
      console.log(AuthFactory.getUserInfo());
      $scope.userInfo = AuthFactory.getUserInfo();
    }

    function addToWatchList() {
      console.log('click at watchlist')
      // Updates userObj & pushes anime to current user's watchlist
      $scope.userInfo.watchList.push($scope.animeData);
      AuthFactory.saveUserInfo($scope.userInfo);
      
      // Updates user db
      UserFactory.userUpdate($scope.userInfo.id, $scope.userInfo)
      .then( (data) => Materialize.toast('added to watchList') )
      .catch( (err) => Materialize.toast('Sorry, an error has occured') );
    }

    function addToFav() {
      console.log('click at addtoFav')
      $scope.userInfo.favorites.push($scope.animeData);
      AuthFactory.saveUserInfo($scope.userInfo);
      
      // Updates user db
      UserFactory.userUpdate($scope.userInfo.id, $scope.userInfo)
      .then( (data) => Materialize.toast('added to favorites') )
      .catch( (err) => Materialize.toast('Sorry, an error has occured') );
      console.log('UserFactory has been accessed');
    }

    function getAnimeData() {
      AnimeAPIFactory.getAnimeById($stateParams.id)
      .then(function(data) {
        $scope.loading    = false;
        $scope.animeData  = data;
      })
      .catch(function(err) {
        console.log(err.message)
        Materialize.toast('Sorry, there was an error. Reload the page or try again later', 10000);
      });
    }

    function getCharById(id) {
      $scope.loadingModal = true;

      AnimeAPIFactory.getCharById(id)
      .then(function(res) {
        $scope.loadingModal   = false;
        $scope.charData       = res;
      })
      .catch(function(err) { console.log(err.message); });
    }
  }
])