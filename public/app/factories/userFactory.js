angular
.module('Animoo')
.factory('UserFactory', [
  '$http'
, ($http) => {
    return {
      userLogin: userLogin
    , userSignup: userSignup
    , userSingle: userSingle
    , userAll : userAll
    , userUpdate: userUpdate
    , userDelete: userDelete
    }

    function userLogin() {

    }
    function userSignup() {

    }
    function userSingle() {

    }
    function userAll() {

    }
    function userUpdate() {

    }
    function userDelete() {
      
    }
  }
]);