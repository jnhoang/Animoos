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
    $scope.showActor;
    $scope.loading;
    $scope.loadingModal;
    $scope.isLoggedIn;

    $scope.getAnimeData     = getAnimeData;
    $scope.getCharById      = getCharById;
    $scope.addToList        = addToList;
    $scope.init             = init;    



    function init() {
      $scope.showActor      = false;
      $scope.loading        = true;
      $scope.loadingModal   = true;
      $scope.isLoggedIn     = AuthFactory.isLoggedIn();

      getAnimeData();

      if ($scope.isLoggedIn) {
        $scope.userInfo = AuthFactory.getUserInfo();
      }
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
      UserFactory
      .userUpdate($scope.userInfo.id, $scope.userInfo)
      .then(function (data) {
        
        console.log('data: ', data);
        console.log('$scope.userInfo: ', $scope.userInfo)
        
        AuthFactory.updateUserInfo($scope.userInfo);
        Materialize.toast('added to ' + specifiedList, 3000) 
      
      })
      .catch(function (err) { 
        Materialize.toast('Sorry, an error has occured', 3000); 
      });
    }

    function getAnimeData() {
      AnimeAPIFactory
      .getAnimeById($stateParams.id)
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

      AnimeAPIFactory
      .getCharById(id)
      .then(function (res) {
        $scope.loadingModal   = false;
        $scope.charData       = res;
      })
      .catch(function (err) { 
        console.log(err.message); 
      });
    }

    function checkIfOnList(newAnime, user, listType) {
      var inListYet = false;
      
      console.log(user[listType])
      user[listType].forEach( function(anime) {
        if (anime.id === newAnime.id) {
          inListYet = true;
          return;
        }
      });

      return inListYet;
    }

    function packageAnimeSaveData(animeObj) {
      var modifiedData = {};
      
      modifiedData.id             = animeObj.id;
      modifiedData.title_english  = animeObj.title_english;
      modifiedData.image_url_lge  = animeObj.image_url_lge;

      return modifiedData;
    }
  }
])