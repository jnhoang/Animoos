angular
.module('Animoo')
.factory('UserFactory', [
  '$http'
, ($http) => {
    return {
      userLogin: userLogin
    , userSignup: userSignup
    , getUserSingle: getUserSingle
    , getUserAll : getUserAll
    , userUpdate: userUpdate
    , userDelete: userDelete
    }

    function userLogin(userObj) {

    }
    function userSignup(userObj) {

    }
    function getUserSingle(id) {

    }
    function getUserAll() {

    }
    function userUpdate(id, userObj) {

    }
    function userDelete(id) {

    }
  }
]);