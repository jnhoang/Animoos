angular
.module('Animoo')
.factory('AuthFactory', [
  '$window'
, ($window) => {
    let authStorage = {
      token: ''
    , UserInfo: {}
    };

    return {
      saveToken:      saveToken
    , getToken:       getToken
    , clearStorage:   clearStorage
    , saveUserInfo:   saveUserInfo
    , getUserInfo:    getUserInfo
    , isLoggedIn:     isLoggedIn
    , currentUser:    currentUser
    };

    function saveToken(token) {
      authStorage.token = token;
    }
    function getToken() {
      return authStorage.token;
    }
    function clearStorage() {
      authStorage.token = '';
      authStorage.UserInfo = {};
    }
    function saveUserInfo(userObj) {
      authStorage.UserInfo = userObj;
    }
    function getUserInfo() {
      return authStorage.UserInfo;
    }
    function isLoggedIn() {
      return authStorage.token ? true : false;
    }
    function currentUser() {
      if (!this.isLoggedIn) {
        return false;
      }

      const token = this.getToken();
      try {
        const payload = JSON.parse($window.atob(token.split('.')[1]));
        return payload;
      }
      catch(err) {
        return false;
      }
    }
  }
]);