angular
.module('Animoo')
.factory('AuthFactory', [
  '$window'
, ($window) => {
    let authStorage = {
      token = ''
    , UserInfo = {}
    }

    return {
      saveToken:      saveToken
    , getToken:       getToken
    , removeToken:    removeToken
    , saveUserInfo:   saveUserInfo
    , getUserInfo:    getUserInfo
    , isLoggedIn:     isLoggedIn
    , currentUser:    currentUser
    }

    function saveToken(token) {
      authStorage.token = token;
    }
    function getToken() {
      return authStorage.token;
    }
    function removeToken() {
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
  }
]);