/**=========================================================
 * Module: users.js
 * Pages Controller
 =========================================================*/

App.controller('ConfigurationController',
    ['$scope', '$location', 'cfpLoadingBar', 'ConfigurationCollection',
	function($scope, $location, cfpLoadingBar, ConfigurationCollection) {
        "use strict";

        $scope.refreshing = false;
        $scope.collection = new ConfigurationCollection();

        // refresh function
        $scope.refresh = function() {
            cfpLoadingBar.start();
            $scope.collection.fetch().finally(function() {
                cfpLoadingBar.complete();
                $scope.refreshing = false;
            });
        };
        $scope.refresh();

        $scope.updateTimer;
        $scope.update = function($index) {
            clearTimeout($scope.updateTimer);
            $scope.updateTimer = setTimeout(function() {
                cfpLoadingBar.start();
                $scope.collection.elements[$index]
                    .update().then(function() {
                        cfpLoadingBar.complete();
                        $scope.refreshing = false;
                    });
            }, 1e3);
        };
    }
]);
