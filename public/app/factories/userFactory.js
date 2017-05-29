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
      return $http.post('/api/users/auth', userObj);
    }
    function userSignup(userObj) {
      return $http.get('/api/users');
    }
    function getUserSingle(id) {
      return $http.get('/api/users' + id);
    }
    function getUserAll() {
      return $http.get('/api/users');
    }
    function userUpdate(id, userObj) {
      return $http.put('/api/users/' + id, userObj);
    }
    function userDelete(id) {
      return $http.delete('/api/users/' + id);
    }
  }
]);