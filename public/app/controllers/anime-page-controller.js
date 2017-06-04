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
    $scope.addToList        = addToList;
    // Run at page render
    getAnimeData();

    if ($scope.isLoggedIn) {
      $scope.userInfo = AuthFactory.getUserInfo();
    }

    function addToList(specifiedList) {
      // checks if anime already on user's list
      if (checkIfOnList($scope.animeData, $scope.userInfo, specifiedList)) {
        Materialize.toast('Anime is already on your ' + specifiedList, 3000)
        return;
      }

      // Updates userObj & pushes anime to current user's list
      $scope.userInfo[specifiedList].push(packageAnimeSaveData($scope.animeData));      
      
      // Updates user db & local storage
      UserFactory.userUpdate($scope.userInfo.id, $scope.userInfo)
      .then( (data) => {
        AuthFactory.updateUserInfo($scope.userInfo);
        Materialize.toast('added to ' + specifiedList, 3000) 
      })
      .catch( (err) => Materialize.toast('Sorry, an error has occured', 3000) );
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

    function packageAnimeSaveData(animeObj) {
      let modifiedData = {};
      modifiedData.id = animeObj.id;
      modifiedData.title_english = animeObj.title_english;
      modifiedData.image_url_lge = animeObj.image_url_lge;

      return modifiedData;
    }
  }
])