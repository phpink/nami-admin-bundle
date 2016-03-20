/**=========================================================
 * Module: main.js
 * Main Application Controller
 =========================================================*/

App.controller('AppController', [
    '$rootScope', '$scope', '$state', '$translate',
    '$window', '$localStorage', '$timeout', '$location',
    'toggleStateService', 'colors', 'browser', 'cfpLoadingBar',
    function(
        $rootScope, $scope, $state, $translate,
        $window, $localStorage, $timeout, $location,
        toggle, colors, browser, cfpLoadingBar) {
        "use strict";

        // Loading bar transition
        // -----------------------------------
        var thBar;
        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            if($('.wrapper > section').length) // check if bar container exists
                thBar = $timeout(function() {
                    cfpLoadingBar.start();
                }, 0); // sets a latency Threshold
        });
        $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
            event.targetScope.$watch("$viewContentLoaded", function () {
                $timeout.cancel(thBar);
                cfpLoadingBar.complete();
            });
        });

        // Hook not found
        $rootScope.$on('$stateNotFound',
            function(event, unfoundState, fromState, fromParams) {
                console.log(unfoundState.to); // "lazy.state"
                console.log(unfoundState.toParams); // {a:1, b:2}
                console.log(unfoundState.options); // {inherit:false} + default options
            });

        // Hook success
        $rootScope.$on('$stateChangeSuccess',
            function(event, toState, toParams, fromState, fromParams) {
                // display new view from top
                $window.scrollTo(0, 0);
                // Save the route title
                $rootScope.currTitle = $state.current.title;
            }
        );

        $rootScope.currTitle = $state.current.title;
        $rootScope.pageTitle = function() {
            return $rootScope.app.name + ' - ' + ($rootScope.currTitle || $rootScope.app.description);
        };

        $rootScope.logout = function() {
            $rootScope.isConnected = false;
            $rootScope.loggedUser = null;
            $rootScope.token = null;
            window.localStorage['loggedUser'] = null;
            window.localStorage['token'] = null;
            $location.path('/page/login');
        };

        $rootScope.$on('loggedUserUpdate', function (event, updatedUser) {
            $rootScope.loggedUser = updatedUser;
            window.localStorage['loggedUser'] = updatedUser;
        });

        // iPad may presents ghost click issues
        // if( ! browser.ipad )
        // FastClick.attach(document.body);

        // Close submenu when sidebar change from collapsed to normal
        $rootScope.$watch('app.layout.isCollapsed', function(newValue, oldValue) {
            if( newValue === false )
                $rootScope.$broadcast('closeSidebarMenu');
        });

        // Restore layout settings
        if (angular.isDefined($localStorage.layout)) {
            $scope.app.layout = $localStorage.layout;
        } else {
            $localStorage.layout =
                $scope.app.layout;
        }

        $rootScope.$watch("app.layout", function () {
            $localStorage.layout = $scope.app.layout;
        }, true);


        // Allows to use branding color with interpolation
        // {{ colorByName('primary') }}
        $scope.colorByName = colors.byName;

        // Hides/show user avatar on sidebar
        $scope.toggleUserBlock = function(){
            $scope.$broadcast('toggleUserBlock');
        };

        // Restore application classes state
        toggle.restoreState( $(document.body) );

        // Applies animation to main view for the next pages to load
        $timeout(function(){
            $rootScope.mainViewAnimation = $rootScope.app.viewAnimation;
        });

}]);
