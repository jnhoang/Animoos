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

    if ($scope.isLoggedIn) {
      console.log(AuthFactory.getUserInfo());
      $scope.userInfo = AuthFactory.getUserInfo();
    }

    function addToWatchList() {
      // checks if anime already on user's list
      if (checkIfOnList($scope.animeData, $scope.userInfo, 'watchList')) {
        Materialize.toast('Anime is already on your watch list', 3000)
        console.log('returned');
        return;
      }
      // Updates userObj & pushes anime to current user's watchlist
      $scope.userInfo.watchList.push($scope.animeData);
      AuthFactory.saveUserInfo($scope.userInfo);
      
      // Updates user db
      UserFactory.userUpdate($scope.userInfo.id, $scope.userInfo)
      .then( (data) => Materialize.toast('added to watchList', 3000) )
      .catch( (err) => Materialize.toast('Sorry, an error has occured', 3000) );
    }

    function addToFav() {
      // checks if anime already on user's list
      if (checkIfOnList($scope.animeData, $scope.userInfo, 'favorites')) {
        Materialize.toast('Anime is already on your favorites list', 3000)
        console.log('returned');
        return;
      }
      // Updates userObj & pushes anime to current user's favorites
      $scope.userInfo.favorites.push($scope.animeData);
      AuthFactory.saveUserInfo($scope.userInfo);
      
      // Updates user db
      UserFactory.userUpdate($scope.userInfo.id, $scope.userInfo)
      .then( (data) => Materialize.toast('added to favorites', 3000) )
      .catch( (err) => Materialize.toast('Sorry, an error has occured', 3000) );
      console.log('UserFactory has been accessed');
    }

    function getAnimeData() {
      AnimeAPIFactory.getAnimeById($stateParams.id)
      .then(function(data) {
        $scope.loading    = false;
        $scope.animeData  = data;
      })
      .catch(function(err) {
        console.log(err)
        Materialize.toast('Sorry, there was an error. Reload the page or try again later', 10000);
      });
    }

    function getCharById(id) {
      $scope.loadingModal = true;

      AnimeAPIFactory.getCharById(id)
      .then((res) => {
        $scope.loadingModal   = false;
        $scope.charData       = res;
      })
      .catch( (err) => console.log(err.message) );
    }

    function checkIfOnList(newAnime, user, listType) {
      let inListYet = false;
      console.log(user[listType])
      user[listType].forEach( (anime) => {
        if (anime.id === newAnime.id) {
          inListYet = true;
          return;
        }
      });

      return inListYet;
    }
  }
])