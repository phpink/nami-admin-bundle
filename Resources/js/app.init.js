/*!
 * 
 * Angle - Bootstrap Admin App + AngularJS
 * 
 * Author: @themicon_co
 * Website: http://themicon.co
 * License: http://support.wrapbootstrap.com/knowledge_base/topics/usage-licenses
 * 
 */

if (typeof $ === 'undefined') { throw new Error('This application\'s JavaScript requires jQuery'); }


// APP START
// ----------------------------------- 

var App = angular.module('angle', [
'ngRoute', 'ngAnimate', 'ngStorage', 'ngCookies', 'pascalprecht.translate',
'ui.bootstrap', 'ui.router', 'oc.lazyLoad', 'cfp.loadingBar'])
.run([
    "$rootScope", "$state", "$stateParams", "$location", '$http', 'UserModel',
    function ($rootScope, $state, $stateParams, $location, $http, UserModel) {
        // Set reference to access them from any scope
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        // Scope Globals
        // -----------------------------------
        $rootScope.app = {
            name: '',
            description: 'Admin area',
            year: ((new Date()).getFullYear()),
            layout: {
                isFixed: true,
                isCollapsed: false,
                isBoxed: false,
                isRTL: false
            },
            viewAnimation: 'ng-fadeInUp'
        };
        $rootScope.mainStatistics = {
          'users': null,
              'pages': null,
              'lastUpdate': null
        };
        $http
          .get(Routing.generate('nami_api_index'))
          .success(function(data) {
            $rootScope.app.name = data.app.title,
            $rootScope.mainStatistics = {
                'users': data.users,
                'pages': data.pages,
                'lastUpdate': data.lastUpdate,
                'appSize': data.appSize
            }
         });

        // register listener to watch route changes
        $rootScope.$on("$locationChangeStart", function(event, next, current) {

            if ($rootScope.isConnected !== true) {

                // on cherche le user dans le scope
                if ($rootScope.loggedUser
                        && $rootScope.loggedUser.getUsername()
                        && $rootScope.token) {
                    $rootScope.isConnected = true;

                } else {

                    // on cherche le user dans le localstorage
                    if (typeof window.localStorage['loggedUser'] != 'undefined' &&
                        typeof window.localStorage['token'] != 'undefined') {
                        var loggedUser = JSON.parse(window.localStorage['loggedUser']);
                        var token = JSON.parse(window.localStorage['token']);
                        if (loggedUser && loggedUser.id && token) {
                            $rootScope.isConnected = true;
                            $rootScope.loggedUser = new UserModel(loggedUser);
                            $rootScope.token = token;
                        }
                    }
                }
            }

            if ($rootScope.isConnected !== true) {
                // si pas connecté, on redirige vers login
                if ($location.path() != "/page/login") {
                    $location.path("/page/login");
                    $rootScope.$apply();
                }

                // si connected
            } else {
                // si routé vers login, on dirige vers prjects
                if ($location.path() == "/page/login") {
                    $location.path("/app/dashboard");
                    $rootScope.$apply();
                }
            }
        }
    );
}]);
App.path = '/bundles/namiadmin';
