/**=========================================================
 * Module: dashboard.js
 * Dashboard Controller
 =========================================================*/

App.controller('DashboardController', ['$rootScope', '$scope', 'cfpLoadingBar', '$http',
	function($rootScope, $scope, cfpLoadingBar, $http) {
    "use strict";

    $scope.weatherData = [];
    $http.get(
        Routing.generate('nami_api_get_analytics_weather')
    ).success(function(data) {
        $scope.weatherData = data;
    })
}]);
