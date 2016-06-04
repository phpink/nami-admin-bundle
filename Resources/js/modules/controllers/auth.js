/**=========================================================
 * Module: auth.js
 * Authentication Controller
 =========================================================*/

App.controller('AuthController', ['$rootScope', '$scope', '$location', 'UserModel',
	function($rootScope, $scope, $location, UserModel) {
    "use strict";
    
    $scope.user = {login: 'admin', password: 'pass'};

    $scope.login = function(user) {
        var userModel = new UserModel();
        userModel
            .auth(user.login, user.password)
            .then(function(token) {
              if (token) {
                  $rootScope.isConnected = true;
                  $rootScope.loggedUser = userModel;
                  $rootScope.token = token;
                  window.localStorage['loggedUser'] = JSON.stringify(
                      userModel.getData()
                  );
                  window.localStorage['token'] = JSON.stringify(token);
                  $location.path('/app/dashboard');
              }

            }, function(response) {

            });
    };

    $scope.result = {};
    $scope.recover = function(user) {
        var userModel = new UserModel();
        userModel
            .reset(user.login)
            .then(function(data) {
                $scope.result = data;
                console.log(data);

            }, function(response) {
                console.log(response);
            });
    };
}]);
