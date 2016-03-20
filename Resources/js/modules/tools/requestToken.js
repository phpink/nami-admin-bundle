App.factory('RequestService',
    ['$rootScope', '$location', '$q',
    function ($rootScope, $location, $q) {
        return {
            'request' : function (config) {
              if (config.url.indexOf(Routing.generate('nami_api_index')) === 0
              &&  config.url !== Routing.generate('nami_api_index')) {
                if (angular.isDefined($rootScope.token)) {
                    config.headers['Authorization'] =
                        'Bearer ' + $rootScope.token;
                }
              }
              return config;
            },

            'responseError': function(rejection) {
                if (rejection.status == 401) { // Unauthorized
                    $rootScope.token = null;
                    $rootScope.isConnected = false;
                    window.localStorage['token'] = null;
                    window.localStorage['loggedUser'] = null;
                    $location.path('/page/login');
                }
                return $q.reject(rejection);
            }
        }
    }

]).config(['$httpProvider', function ($httpProvider) {
    return $httpProvider.interceptors.push('RequestService');
}])