/**=========================================================
 * Module: config.js
 * App routes and resources configuration
 =========================================================*/

App.config(['$stateProvider','$urlRouterProvider', '$controllerProvider', '$compileProvider', '$filterProvider',
    '$httpProvider', '$provide', '$ocLazyLoadProvider', 'APP_REQUIRES',
    function ($stateProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider,
              $httpProvider, $provide, $ocLazyLoadProvider, appRequires) {
        'use strict';

        App.controller = $controllerProvider.register;
        App.directive  = $compileProvider.directive;
        App.filter     = $filterProvider.register;
        App.factory    = $provide.factory;
        App.service    = $provide.service;
        App.constant   = $provide.constant;
        App.value      = $provide.value;

        // LAZY MODULES
        // -----------------------------------

        $ocLazyLoadProvider.config({
            debug: true,
            events: true,
            modules: appRequires.modules
        });

        // defaults to dashboard
        $urlRouterProvider.otherwise('/page/login');

        //
        // Application Routes
        // -----------------------------------
        $stateProvider
            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: basepath('app.html'),
                controller: 'AppController',
                resolve: resolveFor('fastclick', 'modernizr', 'icons', 'screenfull', 'animo', 'sparklines', 'slimscroll', 'store', 'classyloader', 'toaster', 'csspiner')
            })
            .state('app.dashboard', {
                url: '/dashboard',
                title: 'Dashboard',
                templateUrl: basepath('dashboard.html'),
                controller: 'DashboardController',
                resolve: resolveFor('flot-chart','flot-chart-plugins')
            })
            .state('app.config', {
                url: '/config',
                title: 'Configuration',
                templateUrl: basepath('configuration/list.html'),
                controller: 'ConfigurationController'
            })
                
            // USERS
            .state('app.users', {
                url: '/users',
                title: 'Users',
                templateUrl: basepath('users/list.html'),
                controller: 'CollectionController'
            })
            .state('app.user-new', {
                url: '/users/new',
                title: 'New user',
                templateUrl: basepath('users/edit.html'),
                controller: 'ModelController'
            })
            .state('app.user', {
                url: '/users/:id',
                title: 'User details',
                templateUrl: basepath('users/view.html'),
                controller: 'ModelController'
            })
            .state('app.user-edit', {
                url: '/users/:id/edit',
                title: 'Edit user',
                templateUrl: basepath('users/edit.html'),
                controller: 'ModelController'
            })
            
            // PAGES
            .state('app.pages', {
                url: '/pages',
                title: 'Pages',
                templateUrl: basepath('pages/list.html'),
                controller: 'CollectionController'
            })
            .state('app.page-new', {
                url: '/pages/new',
                title: 'New page',
                templateUrl: basepath('pages/edit.html'),
                controller: 'ModelController'
            })
            .state('app.page', {
                url: '/pages/:id',
                title: 'Page details',
                templateUrl: basepath('pages/view.html'),
                controller: 'ModelController'
            })
            .state('app.page-edit', {
                url: '/pages/:id/edit',
                title: 'Edit page',
                templateUrl: basepath('pages/edit.html'),
                controller: 'ModelController',
                resolve: resolveFor('ngWig')
            })
            
            // CATEGORIES

            .state('app.categories', {
                url: '/categories',
                title: 'Pages',
                templateUrl: basepath('categories/list.html'),
                controller: 'CollectionController'
            })
            .state('app.category-new', {
                url: '/categories/new',
                title: 'New category',
                templateUrl: basepath('categories/edit.html'),
                controller: 'ModelController'
            })
            .state('app.category', {
                url: '/categories/:id',
                title: 'Page details',
                templateUrl: basepath('categories/view.html'),
                controller: 'ModelController'
            })
            .state('app.category-edit', {
                url: '/categories/:id/edit',
                title: 'Edit category',
                templateUrl: basepath('categories/edit.html'),
                controller: 'ModelController',
                resolve: resolveFor('ngWig')
            })
            
            // MENU
            .state('app.menulinks', {
                url: '/menu',
                title: 'Menu',
                templateUrl: basepath('menu/list.html'),
                controller: 'MenuController'
                //resolve: resolveFor('ui.sortable', 'tg.dynamicDirective')
            })
            .state('app.menulink-new', {
                url: '/menu/new',
                title: 'New menu link',
                templateUrl: basepath('menu/edit.html'),
                controller: 'ModelController'
            })
            .state('app.menulink', {
                url: '/menu/:id',
                title: 'Menu link details',
                templateUrl: basepath('menu/view.html'),
                controller: 'ModelController'
            })
            .state('app.menulink-edit', {
                url: '/menu/:id/edit',
                title: 'Edit menu link',
                templateUrl: basepath('menu/edit.html'),
                controller: 'ModelController',
                resolve: resolveFor('ngWig')
            })

            //
            // Single Page Routes
            // -----------------------------------
            .state('page', {
                url: '/page',
                templateUrl: App.path + '/pages/page.html',
                resolve: resolveFor('modernizr', 'icons', 'store')
            })
            .state('page.login', {
                url: '/login',
                title: "Login",
                templateUrl: App.path + '/pages/login.html',
                controller: 'AuthController'
            })
            .state('page.recover', {
                url: '/recover',
                title: "Recover password",
                templateUrl: App.path + '/pages/recover.html',
                controller: 'AuthController'
            });


        // Set here the base of the relative path
        // for all app views
        function basepath(uri) {
            return App.path + '/views/' + uri;
        };

        // Generates a resolve object by passing script names
        // previously configured in constant.APP_REQUIRES
        function resolveFor() {
            var _args = arguments;
            return {
                deps: ['$ocLazyLoad','$q', function ($ocLL, $q) {
                    // Creates a promise chain for each argument
                    var promise = $q.when(1); // empty promise
                    for(var i=0, len=_args.length; i < len; i ++){
                        promise = andThen(_args[i]);
                    }
                    return promise;

                    // creates promise to chain dynamically
                    function andThen(_arg) {
                        // also support a function that returns a promise
                        if(typeof _arg == 'function')
                            return promise.then(_arg);
                        else
                            return promise.then(function() {
                                // if is a module, pass the name. If not, pass the array
                                var whatToLoad = getRequired(_arg);
                                // simple error check
                                if(!whatToLoad) return $.error('Route resolve: Bad resource name [' + _arg + ']');
                                // finally, return a promise
                                return $ocLL.load( whatToLoad );
                            });
                    }
                    // check and returns required data
                    // analyze module items with the form [name: '', files: []]
                    // and also simple array of script files (for not angular js)
                    function getRequired(name) {
                        if (appRequires.modules)
                            for(var m in appRequires.modules)
                                if(appRequires.modules[m].name && appRequires.modules[m].name === name)
                                    return appRequires.modules[m];
                        return appRequires.scripts && appRequires.scripts[name];
                    }

                }]};
        }

}]).config(['$translateProvider', function ($translateProvider) {

    $translateProvider.useStaticFilesLoader({
        prefix : App.path + '/i18n/',
        suffix : '.json'
    });
    $translateProvider.preferredLanguage('fr_FR');
    $translateProvider.useLocalStorage();

}]).config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeBar = true;
    cfpLoadingBarProvider.includeSpinner = false;
    cfpLoadingBarProvider.latencyThreshold = 500;
    cfpLoadingBarProvider.parentSelector = '.wrapper > section';
}])
    .controller('NullController', function() {});
