angular
.module('Animoo')
.factory('AuthFactory', [
  '$window'
, function($window) {

    return {
      clearStorage:   clearStorage
    , saveUserInfo:   saveUserInfo
    , getUserInfo:    getUserInfo
    , getToken:       getToken
    , isLoggedIn:     isLoggedIn
    };

    function clearStorage() {
      $window.localStorage.removeItem('animoo.user');
    }
    function saveUserInfo(userObj) {
      let user = {
        token: userObj.token
      , userInfo: userObj.user
      };
      $window.localStorage['animoo.user'] = JSON.stringify(user);
    }
    function getUserInfo() {
      let user = $window.localStorage['animoo.user'];
      return user ? JSON.parse(user).userInfo : false;
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