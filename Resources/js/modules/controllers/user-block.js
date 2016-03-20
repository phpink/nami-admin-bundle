App.controller(
    'UserBlockController',
    ['$rootScope', '$scope',  function($rootScope, $scope) {

        $scope.userBlockVisible = true;
        $scope.user = $rootScope.loggedUser;
        $scope.$on('toggleUserBlock', function(event, args) {
            $scope.userBlockVisible = !$scope.userBlockVisible;
        });
        $rootScope.$on('loggedUserUpdate', function (event, loggedUser) {
            $scope.user = loggedUser;
        });

    }]
);
