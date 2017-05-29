angular
.module('Animoo')
.factory('AuthInterceptor', [
  'AuthFactory'
, (AuthFactory) => {
    return {
      request: function(config) {
        const token = AuthFactory.getToken();

        if(token) {
          config.headers.Authorization = 'Bearer' + token;
        }
        return config;
      }
    }
  }
]);

$httpProvider.interceptors.push('AuthInterceptor');