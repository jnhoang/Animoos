angular
.module('Animoo')
.factory('AuthInterceptor', [
  'AuthFactory'
, function(AuthFactory) {
    return {
      request: function(config) {
        const token = AuthFactory.getToken();

        if(token) {
          config.headers.Authorization = 'Bearer ' + token;
        }
        
        return config;
      }
    }   
  }
])
.config([
  '$httpProvider',
  function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
  }
]);
