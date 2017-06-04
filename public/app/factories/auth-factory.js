angular
.module('Animoo')
.factory('AuthFactory', [
  '$window'
, function($window) {

    return {
      clearStorage:     clearStorage
    , updateUserInfo:   updateUserInfo
    , saveUserInfo:     saveUserInfo
    , getUserInfo:      getUserInfo
    , getToken:         getToken
    , isLoggedIn:       isLoggedIn
    };

    function clearStorage() {
      $window.localStorage.removeItem('animoo.user');
    }
    function updateUserInfo(userObj) {
      let storageData = JSON.parse($window.localStorage['animoo.user']);
      storageData.user = userObj;
      $window.localStorage['animoo.user'] = JSON.stringify(storageData);
    }
    function saveUserInfo(userObj) {
      $window.localStorage['animoo.user'] = JSON.stringify(userObj);
    }
    function getUserInfo() {
      let user = $window.localStorage['animoo.user'];
      return user ? JSON.parse(user).user : false;
    }
    function getToken() {
      let user = $window.localStorage['animoo.user'];
      return user ? JSON.parse(user).token : null;
    }
    function isLoggedIn() {
      let token = this.getToken();
      return token ? true : false;
    }
  }
]);