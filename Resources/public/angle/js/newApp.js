/*!
 *
 * Angle - Bootstrap Admin App + AngularJS
 *
 * Author: @themicon_co
 * Website: http://themicon.co
 * License: http://support.wrapbootstrap.com/knowledge_base/topics/usage-licenses
 *
 */
if (typeof $ === 'undefined') {
    throw new Error('This application\'s JavaScript requires jQuery');
}
var App = angular.module('angle', ['ngRoute', 'ngAnimate', 'ngStorage', 'ngCookies', 'pascalprecht.translate', 'ui.bootstrap', 'ui.router', 'oc.lazyLoad', 'cfp.loadingBar', 'ngSanitize', 'ngResource']).run(["$rootScope", "$state", "$stateParams", '$window', '$templateCache', function($rootScope, $state, $stateParams, $window, $templateCache) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.$storage = $window.localStorage;
    $rootScope.app = {
        name: 'Angle',
        description: 'Angular Bootstrap Admin Template',
        year: ((new Date()).getFullYear()),
        layout: {
            isFixed: true,
            isCollapsed: false,
            isBoxed: false,
            isRTL: false
        },
        viewAnimation: 'ng-fadeInUp'
    };
    $rootScope.user = {
        name: 'John',
        job: 'ng-Dev',
        picture: 'app/img/user/02.jpg'
    }
}]);
App.config(['$stateProvider', '$urlRouterProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$ocLazyLoadProvider', 'APP_REQUIRES', function($stateProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $ocLazyLoadProvider, appRequires) {
    'use strict';
    App.controller = $controllerProvider.register;
    App.directive = $compileProvider.directive;
    App.filter = $filterProvider.register;
    App.factory = $provide.factory;
    App.service = $provide.service;
    App.constant = $provide.constant;
    App.value = $provide.value;
    $ocLazyLoadProvider.config({
        debug: false,
        events: true,
        modules: appRequires.modules
    });
    $urlRouterProvider.otherwise('/app/dashboard');
    $stateProvider.state('app', {
        url: '/app',
        abstract: true,
        templateUrl: basepath('app.html'),
        controller: 'AppController',
        resolve: resolveFor('fastclick', 'modernizr', 'icons', 'screenfull', 'animo', 'sparklines', 'slimscroll', 'classyloader', 'toaster', 'csspiner')
    }).state('app.dashboard', {
        url: '/dashboard',
        title: 'Dashboard',
        templateUrl: basepath('dashboard.html'),
        resolve: resolveFor('flot-chart', 'flot-chart-plugins')
    }).state('app.widgets', {
        url: '/widgets',
        title: 'Widgets',
        templateUrl: basepath('widgets.html'),
        controller: 'NullController',
        resolve: resolveFor('loadGoogleMapsJS', function() {
            return loadGoogleMaps()
        }, 'google-map')
    }).state('app.buttons', {
        url: '/buttons',
        title: 'Buttons',
        templateUrl: basepath('buttons.html'),
        controller: 'NullController'
    }).state('app.colors', {
        url: '/colors',
        title: 'Colors',
        templateUrl: basepath('colors.html'),
        controller: 'NullController'
    }).state('app.notifications', {
        url: '/notifications',
        title: 'Notifications',
        templateUrl: basepath('notifications.html'),
        controller: 'NotificationController'
    }).state('app.ngdialog', {
        url: '/ngdialog',
        title: 'ngDialog',
        templateUrl: basepath('ngdialog.html'),
        resolve: angular.extend(resolveFor('ngDialog'), {
            tpl: function() {
                return {
                    path: basepath('ngdialog-template.html')
                }
            }
        }),
        controller: 'DialogIntroCtrl'
    }).state('app.interaction', {
        url: '/interaction',
        title: 'Interaction',
        templateUrl: basepath('interaction.html'),
        controller: 'NullController'
    }).state('app.spinners', {
        url: '/spinners',
        title: 'Spinners',
        templateUrl: basepath('spinners.html'),
        controller: 'NullController'
    }).state('app.animations', {
        url: '/animations',
        title: 'Animations',
        templateUrl: basepath('animations.html'),
        controller: 'NullController'
    }).state('app.dropdown-animations', {
        url: '/dropdown-animations',
        title: 'Dropdown Animations',
        templateUrl: basepath('dropdown-animations.html'),
        controller: 'NullController'
    }).state('app.panels', {
        url: '/panels',
        title: 'Panels',
        templateUrl: basepath('panels.html'),
        controller: 'NullController'
    }).state('app.portlets', {
        url: '/portlets',
        title: 'Portlets',
        templateUrl: basepath('portlets.html'),
        controller: 'NullController',
        resolve: resolveFor('jquery-ui')
    }).state('app.maps-google', {
        url: '/maps-google',
        title: 'Maps Google',
        templateUrl: basepath('maps-google.html'),
        controller: 'NullController',
        resolve: resolveFor('loadGoogleMapsJS', function() {
            return loadGoogleMaps()
        }, 'google-map')
    }).state('app.maps-vector', {
        url: '/maps-vector',
        title: 'Maps Vector',
        templateUrl: basepath('maps-vector.html'),
        controller: 'VectorMapController',
        resolve: resolveFor('vector-map')
    }).state('app.grid', {
        url: '/grid',
        title: 'Grid',
        templateUrl: basepath('grid.html'),
        controller: 'NullController'
    }).state('app.grid-masonry', {
        url: '/grid-masonry',
        title: 'Grid Masonry',
        templateUrl: basepath('grid-masonry.html'),
        controller: 'NullController'
    }).state('app.typo', {
        url: '/typo',
        title: 'Typo',
        templateUrl: basepath('typo.html'),
        controller: 'NullController'
    }).state('app.icons-font', {
        url: '/icons-font',
        title: 'Icons Font',
        templateUrl: basepath('icons-font.html'),
        controller: 'NullController'
    }).state('app.icons-weather', {
        url: '/icons-weather',
        title: 'Icons Weather',
        templateUrl: basepath('icons-weather.html'),
        controller: 'NullController'
    }).state('app.form-standard', {
        url: '/form-standard',
        title: 'Form Standard',
        templateUrl: basepath('form-standard.html'),
        controller: 'NullController'
    }).state('app.form-extended', {
        url: '/form-extended',
        title: 'Form Extended',
        templateUrl: basepath('form-extended.html'),
        controller: 'NullController',
        resolve: resolveFor('codemirror', 'codemirror-plugins', 'moment', 'taginput', 'inputmask', 'chosen', 'slider', 'ngWig', 'filestyle')
    }).state('app.form-validation', {
        url: '/form-validation',
        title: 'Form Validation',
        templateUrl: basepath('form-validation.html'),
        controller: 'NullController',
        resolve: resolveFor('parsley')
    }).state('app.form-wizard', {
        url: '/form-wizard',
        title: 'Form Wizard',
        templateUrl: basepath('form-wizard.html'),
        controller: 'NullController',
        resolve: resolveFor('bwizard', 'parsley')
    }).state('app.form-upload', {
        url: '/form-upload',
        title: 'Form upload',
        templateUrl: basepath('form-upload.html'),
        controller: 'NullController',
        resolve: resolveFor('filestyle')
    }).state('app.chart-flot', {
        url: '/chart-flot',
        title: 'Chart Flot',
        templateUrl: basepath('chart-flot.html'),
        controller: 'NullController',
        resolve: resolveFor('flot-chart', 'flot-chart-plugins')
    }).state('app.chart-radial', {
        url: '/chart-radial',
        title: 'Chart Radial',
        templateUrl: basepath('chart-radial.html'),
        controller: 'NullController',
        resolve: resolveFor('classyloader')
    }).state('app.table-standard', {
        url: '/table-standard',
        title: 'Table Standard',
        templateUrl: basepath('table-standard.html'),
        controller: 'NullController'
    }).state('app.table-extended', {
        url: '/table-extended',
        title: 'Table Extended',
        templateUrl: basepath('table-extended.html'),
        controller: 'NullController'
    }).state('app.table-datatable', {
        url: '/table-datatable',
        title: 'Table Datatable',
        templateUrl: basepath('table-datatable.html'),
        controller: 'NullController',
        resolve: resolveFor('datatables', 'datatables-pugins')
    }).state('app.timeline', {
        url: '/timeline',
        title: 'Timeline',
        templateUrl: basepath('timeline.html'),
        controller: 'NullController'
    }).state('app.calendar', {
        url: '/calendar',
        title: 'Calendar',
        templateUrl: basepath('calendar.html'),
        controller: 'NullController',
        resolve: resolveFor('jquery-ui', 'moment', 'fullcalendar')
    }).state('app.invoice', {
        url: '/invoice',
        title: 'Invoice',
        templateUrl: basepath('invoice.html'),
        controller: 'NullController'
    }).state('app.search', {
        url: '/search',
        title: 'Search',
        templateUrl: basepath('search.html'),
        controller: 'NullController',
        resolve: resolveFor('moment', 'chosen', 'slider')
    }).state('app.todo', {
        url: '/todo',
        title: 'Todo List',
        templateUrl: basepath('todo.html'),
        controller: 'TodoController'
    }).state('app.profile', {
        url: '/profile',
        title: 'Profile',
        templateUrl: basepath('profile.html'),
        controller: 'NullController',
        resolve: resolveFor('loadGoogleMapsJS', function() {
            return loadGoogleMaps()
        }, 'google-map')
    }).state('app.template', {
        url: '/template',
        title: 'Blank Template',
        templateUrl: basepath('template.html'),
        controller: 'NullController'
    }).state('app.documentation', {
        url: '/documentation',
        title: 'Documentation',
        templateUrl: basepath('documentation.html'),
        controller: 'NullController',
        resolve: resolveFor('flatdoc')
    }).state('app.mailbox', {
        url: '/mailbox',
        title: 'Mailbox',
        abstract: true,
        templateUrl: basepath('mailbox.html'),
        controller: 'MailboxController'
    }).state('app.mailbox.folder', {
        url: '/folder/:folder',
        title: 'Mailbox',
        templateUrl: basepath('mailbox-inbox.html'),
        controller: 'NullController'
    }).state('app.mailbox.view', {
        url: "/{mid:[0-9]{1,4}}",
        title: 'View mail',
        templateUrl: basepath('mailbox-view.html'),
        controller: 'NullController',
        resolve: resolveFor('ngWig')
    }).state('app.mailbox.compose', {
        url: '/compose',
        title: 'Mailbox',
        templateUrl: basepath('mailbox-compose.html'),
        controller: 'NullController',
        resolve: resolveFor('ngWig')
    }).state('app.multilevel', {
        url: '/multilevel',
        title: 'Multilevel',
        template: '<h3>Multilevel Views</h3>' + '<div class="lead ba p">View @ Top Level ' + '<div ui-view=""></div> </div>'
    }).state('app.multilevel.level1', {
        url: '/level1',
        title: 'Multilevel - Level1',
        template: '<div class="lead ba p">View @ Level 1' + '<div ui-view=""></div> </div>'
    }).state('app.multilevel.level1.item', {
        url: '/item',
        title: 'Multilevel - Level1',
        template: '<div class="lead ba p"> Menu item @ Level 1</div>'
    }).state('app.multilevel.level1.level2', {
        url: '/level2',
        title: 'Multilevel - Level2',
        template: '<div class="lead ba p">View @ Level 2' + '<div ui-view=""></div> </div>'
    }).state('app.multilevel.level1.level2.level3', {
        url: '/level3',
        title: 'Multilevel - Level3',
        template: '<div class="lead ba p">View @ Level 3' + '<div ui-view=""></div> </div>'
    }).state('app.multilevel.level1.level2.level3.item', {
        url: '/item',
        title: 'Multilevel - Level3 Item',
        template: '<div class="lead ba p"> Menu item @ Level 3</div>'
    }).state('page', {
        url: '/page',
        templateUrl: 'app/pages/page.html',
        resolve: resolveFor('modernizr', 'icons', 'parsley')
    }).state('page.login', {
        url: '/login',
        title: "Login",
        templateUrl: 'app/pages/login.html'
    }).state('page.register', {
        url: '/register',
        title: "Register",
        templateUrl: 'app/pages/register.html'
    }).state('page.recover', {
        url: '/recover',
        title: "Recover",
        templateUrl: 'app/pages/recover.html'
    }).state('page.lock', {
        url: '/lock',
        title: "Lock",
        templateUrl: 'app/pages/lock.html'
    }).state('page.404', {
        url: '/404',
        title: "Not Found",
        templateUrl: 'app/pages/404.html'
    });

    function basepath(uri) {
        return 'app/views/' + uri
    }

    function resolveFor() {
        var _args = arguments;
        return {
            deps: ['$ocLazyLoad', '$q', function($ocLL, $q) {
                var promise = $q.when(1);
                for (var i = 0, len = _args.length; i < len; i++) {
                    promise = andThen(_args[i])
                }
                return promise;

                function andThen(_arg) {
                    if (typeof _arg == 'function') return promise.then(_arg);
                    else return promise.then(function() {
                        var whatToLoad = getRequired(_arg);
                        if (!whatToLoad) return $.error('Route resolve: Bad resource name [' + _arg + ']');
                        return $ocLL.load(whatToLoad)
                    })
                }

                function getRequired(name) {
                    if (appRequires.modules)
                        for (var m in appRequires.modules)
                            if (appRequires.modules[m].name && appRequires.modules[m].name === name) return appRequires.modules[m];
                    return appRequires.scripts && appRequires.scripts[name]
                }
            }]
        }
    }
}]).config(['$translateProvider', function($translateProvider) {
    $translateProvider.useStaticFilesLoader({
        prefix: 'app/i18n/',
        suffix: '.json'
    });
    $translateProvider.preferredLanguage('en');
    $translateProvider.useLocalStorage()
}]).config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeBar = true;
    cfpLoadingBarProvider.includeSpinner = false;
    cfpLoadingBarProvider.latencyThreshold = 500;
    cfpLoadingBarProvider.parentSelector = '.wrapper > section'
}]).controller('NullController', function() {});
App.constant('APP_COLORS', {
    'primary': '#5d9cec',
    'success': '#27c24c',
    'info': '#23b7e5',
    'warning': '#ff902b',
    'danger': '#f05050',
    'inverse': '#131e26',
    'green': '#37bc9b',
    'pink': '#f532e5',
    'purple': '#7266ba',
    'dark': '#3a3f51',
    'yellow': '#fad732',
    'gray-darker': '#232735',
    'gray-dark': '#3a3f51',
    'gray': '#dde6e9',
    'gray-light': '#e4eaec',
    'gray-lighter': '#edf1f2'
}).constant('APP_MEDIAQUERY', {
    'desktopLG': 1200,
    'desktop': 992,
    'tablet': 768,
    'mobile': 480
}).constant('APP_REQUIRES', {
    scripts: {
        'jquery': ['vendor/jquery/jquery.min.js'],
        'icons': ['vendor/skycons/skycons.js', 'vendor/fontawesome/css/font-awesome.min.css', 'vendor/simplelineicons/simple-line-icons.css', 'vendor/weathericons/css/weather-icons.min.css'],
        'modernizr': ['vendor/modernizr/modernizr.js'],
        'fastclick': ['vendor/fastclick/fastclick.js'],
        'filestyle': ['vendor/filestyle/bootstrap-filestyle.min.js'],
        'csspiner': ['vendor/csspinner/csspinner.min.css'],
        'animo': ['vendor/animo/animo.min.js'],
        'sparklines': ['vendor/sparklines/jquery.sparkline.min.js'],
        'slimscroll': ['vendor/slimscroll/jquery.slimscroll.min.js'],
        'screenfull': ['vendor/screenfull/screenfull.min.js'],
        'classyloader': ['vendor/classyloader/js/jquery.classyloader.min.js'],
        'vector-map': ['vendor/jvectormap/jquery-jvectormap-1.2.2.min.js', 'vendor/jvectormap/maps/jquery-jvectormap-world-mill-en.js', 'vendor/jvectormap/jquery-jvectormap-1.2.2.css'],
        'loadGoogleMapsJS': ['vendor/gmap/load-google-maps.js'],
        'google-map': ['vendor/gmap/jquery.gmap.min.js'],
        'flot-chart': ['vendor/flot/jquery.flot.min.js'],
        'flot-chart-plugins': ['vendor/flot/jquery.flot.tooltip.min.js', 'vendor/flot/jquery.flot.resize.min.js', 'vendor/flot/jquery.flot.pie.min.js', 'vendor/flot/jquery.flot.time.min.js', 'vendor/flot/jquery.flot.categories.min.js', 'vendor/flot/jquery.flot.spline.min.js'],
        'jquery-ui': ['vendor/jqueryui/jquery-ui.min.js', 'vendor/touch-punch/jquery.ui.touch-punch.min.js'],
        'chosen': ['vendor/chosen/chosen.jquery.min.js', 'vendor/chosen/chosen.min.css'],
        'slider': ['vendor/slider/js/bootstrap-slider.js', 'vendor/slider/css/slider.css'],
        'moment': ['vendor/moment/min/moment-with-locales.min.js'],
        'fullcalendar': ['vendor/fullcalendar/dist/fullcalendar.min.js', 'vendor/fullcalendar/dist/fullcalendar.css'],
        'codemirror': ['vendor/codemirror/lib/codemirror.js', 'vendor/codemirror/lib/codemirror.css'],
        'codemirror-plugins': ['vendor/codemirror/addon/mode/overlay.js', 'vendor/codemirror/mode/markdown/markdown.js', 'vendor/codemirror/mode/xml/xml.js', 'vendor/codemirror/mode/gfm/gfm.js', 'vendor/marked/marked.js'],
        'taginput': ['vendor/tagsinput/bootstrap-tagsinput.min.js', 'vendor/tagsinput/bootstrap-tagsinput.css'],
        'inputmask': ['vendor/inputmask/jquery.inputmask.bundle.min.js'],
        'bwizard': ['vendor/wizard/js/bwizard.min.js'],
        'parsley': ['vendor/parsley/parsley.min.js'],
        'datatables': ['vendor/datatable/media/js/jquery.dataTables.min.js', 'vendor/datatable/extensions/datatable-bootstrap/css/dataTables.bootstrap.css'],
        'datatables-pugins': ['vendor/datatable/extensions/datatable-bootstrap/js/dataTables.bootstrap.js', 'vendor/datatable/extensions/datatable-bootstrap/js/dataTables.bootstrapPagination.js', 'vendor/datatable/extensions/ColVis/js/dataTables.colVis.min.js', 'vendor/datatable/extensions/ColVis/css/dataTables.colVis.css'],
        'flatdoc': ['vendor/flatdoc/flatdoc.js']
    },
    modules: [{
        name: 'toaster',
        files: ['vendor/toaster/toaster.js', 'vendor/toaster/toaster.css']
    }, {
        name: 'ngWig',
        files: ['vendor/ngwig/ng-wig.min.js']
    }, {
        name: 'ngDialog',
        files: ['vendor/ngdialog/js/ngDialog.min.js', 'vendor/ngdialog/css/ngDialog.min.css', 'vendor/ngdialog/css/ngDialog-theme-default.min.css']
    }]
});
App.controller('LoginFormController', ['$scope', '$http', '$state', function($scope, $http, $state) {
    $scope.account = {};
    $scope.authMsg = '';
    $scope.login = function() {
        $scope.authMsg = '';
        $http.post('api/account/login', {
            email: $scope.account.email,
            password: $scope.account.password
        }).then(function(response) {
            if (!response.account) {
                $scope.authMsg = 'Incorrect credentials.'
            } else {
                $state.go('app.dashboard')
            }
        }, function(x) {
            $scope.authMsg = 'Server Request Error'
        })
    }
}]);
App.controller('RegisterFormController', ['$scope', '$http', '$state', function($scope, $http, $state) {
    $scope.account = {};
    $scope.authMsg = '';
    $scope.register = function() {
        $scope.authMsg = '';
        $http.post('api/account/register', {
            email: $scope.account.email,
            password: $scope.account.password
        }).then(function(response) {
            if (!response.account) {
                $scope.authMsg = response
            } else {
                $state.go('app.dashboard')
            }
        }, function(x) {
            $scope.authMsg = 'Server Request Error'
        })
    }
}]);
App.controller('CalendarController', ['$scope', function($scope) {
    'use strict';
    if (!$.fn.fullCalendar) return;
    var draggingEvent = null;
    var ExternalEvent = function(elements) {
        if (!elements) return;
        elements.each(function() {
            var $this = $(this);
            var calendarEventObject = {
                title: $.trim($this.text())
            };
            $this.data('calendarEventObject', calendarEventObject);
            $this.draggable({
                zIndex: 1070,
                revert: true,
                revertDuration: 0
            })
        })
    };

    function initCalendar(calElement, events) {
        var removeAfterDrop = $('#remove-after-drop');
        calElement.fullCalendar({
            isRTL: $scope.app.layout.isRTL,
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
            },
            buttonIcons: {
                prev: ' fa fa-caret-left',
                next: ' fa fa-caret-right'
            },
            buttonText: {
                today: 'today',
                month: 'month',
                week: 'week',
                day: 'day'
            },
            editable: true,
            droppable: true,
            drop: function(date, allDay) {
                var $this = $(this),
                    originalEventObject = $this.data('calendarEventObject');
                if (!originalEventObject) return;
                var clonedEventObject = $.extend({}, originalEventObject);
                clonedEventObject.start = date;
                clonedEventObject.allDay = allDay;
                clonedEventObject.backgroundColor = $this.css('background-color');
                clonedEventObject.borderColor = $this.css('border-color');
                calElement.fullCalendar('renderEvent', clonedEventObject, true);
                if (removeAfterDrop.is(':checked')) {
                    $this.remove()
                }
            },
            eventDragStart: function(event, js, ui) {
                draggingEvent = event
            },
            events: events
        })
    }

    function initExternalEvents(calElement) {
        var externalEvents = $('.external-events');
        new ExternalEvent(externalEvents.children('div'));
        var currColor = '#f6504d';
        var eventAddBtn = $('.external-event-add-btn');
        var eventNameInput = $('.external-event-name');
        var eventColorSelector = $('.external-event-color-selector .circle');
        $('.external-events-trash').droppable({
            accept: '.fc-event',
            activeClass: 'active',
            hoverClass: 'hovered',
            tolerance: 'touch',
            drop: function(event, ui) {
                if (draggingEvent) {
                    var eid = draggingEvent.id || draggingEvent._id;
                    calElement.fullCalendar('removeEvents', eid);
                    ui.draggable.remove();
                    draggingEvent = null
                }
            }
        });
        eventColorSelector.click(function(e) {
            e.preventDefault();
            var $this = $(this);
            currColor = $this.css('background-color');
            eventColorSelector.removeClass('selected');
            $this.addClass('selected')
        });
        eventAddBtn.click(function(e) {
            e.preventDefault();
            var val = eventNameInput.val();
            if ($.trim(val) === '') return;
            var newEvent = $('<div/>').css({
                'background-color': currColor,
                'border-color': currColor,
                'color': '#fff'
            }).html(val);
            externalEvents.prepend(newEvent);
            new ExternalEvent(newEvent);
            eventNameInput.val('')
        })
    }

    function createDemoEvents() {
        var date = new Date();
        var d = date.getDate(),
            m = date.getMonth(),
            y = date.getFullYear();
        return [{
            title: 'All Day Event',
            start: new Date(y, m, 1),
            backgroundColor: '#f56954',
            borderColor: '#f56954'
        }, {
            title: 'Long Event',
            start: new Date(y, m, d - 5),
            end: new Date(y, m, d - 2),
            backgroundColor: '#f39c12',
            borderColor: '#f39c12'
        }, {
            title: 'Meeting',
            start: new Date(y, m, d, 10, 30),
            allDay: false,
            backgroundColor: '#0073b7',
            borderColor: '#0073b7'
        }, {
            title: 'Lunch',
            start: new Date(y, m, d, 12, 0),
            end: new Date(y, m, d, 14, 0),
            allDay: false,
            backgroundColor: '#00c0ef',
            borderColor: '#00c0ef'
        }, {
            title: 'Birthday Party',
            start: new Date(y, m, d + 1, 19, 0),
            end: new Date(y, m, d + 1, 22, 30),
            allDay: false,
            backgroundColor: '#00a65a',
            borderColor: '#00a65a'
        }, {
            title: 'Open Google',
            start: new Date(y, m, 28),
            end: new Date(y, m, 29),
            url: '//google.com/',
            backgroundColor: '#3c8dbc',
            borderColor: '#3c8dbc'
        }]
    }
    $(function() {
        var calendar = $('#calendar');
        var demoEvents = createDemoEvents();
        initExternalEvents(calendar);
        initCalendar(calendar, demoEvents)
    })
}]);
App.controller('DataTableController', ['$scope', '$timeout', function($scope, $timeout) {
    'use strict';
    $timeout(function() {
        if (!$.fn.dataTable) return;
        $('#datatable1').dataTable({
            'paging': true,
            'ordering': true,
            'info': true,
            oLanguage: {
                sSearch: 'Search all columns:',
                sLengthMenu: '_MENU_ records per page',
                info: 'Showing page _PAGE_ of _PAGES_',
                zeroRecords: 'Nothing found - sorry',
                infoEmpty: 'No records available',
                infoFiltered: '(filtered from _MAX_ total records)'
            }
        });
        var dtInstance2 = $('#datatable2').dataTable({
            'paging': true,
            'ordering': true,
            'info': true,
            oLanguage: {
                sSearch: 'Search all columns:',
                sLengthMenu: '_MENU_ records per page',
                info: 'Showing page _PAGE_ of _PAGES_',
                zeroRecords: 'Nothing found - sorry',
                infoEmpty: 'No records available',
                infoFiltered: '(filtered from _MAX_ total records)'
            }
        });
        var inputSearchClass = 'datatable_input_col_search';
        var columnInputs = $('tfoot .' + inputSearchClass);
        columnInputs.keyup(function() {
            dtInstance2.fnFilter(this.value, columnInputs.index(this))
        });
        $('#datatable3').dataTable({
            'paging': true,
            'ordering': true,
            'info': true,
            oLanguage: {
                sSearch: 'Search all columns:',
                sLengthMenu: '_MENU_ records per page',
                info: 'Showing page _PAGE_ of _PAGES_',
                zeroRecords: 'Nothing found - sorry',
                infoEmpty: 'No records available',
                infoFiltered: '(filtered from _MAX_ total records)'
            },
            'aoColumns': [{
                'bVisible': false
            }, {
                'bVisible': true
            }, {
                'bVisible': true
            }, {
                'bVisible': true
            }, {
                'bVisible': true
            }],
            sDom: 'C<"clear">lfrtip',
            colVis: {
                order: 'alfa',
                'buttonText': 'Show/Hide Columns'
            }
        })
    })
}]);
App.controller('AlertDemoCtrl', ['$scope', function AlertDemoCtrl($scope) {
    $scope.alerts = [{
        type: 'danger',
        msg: 'Oh snap! Change a few things up and try submitting again.'
    }, {
        type: 'warning',
        msg: 'Well done! You successfully read this important alert message.'
    }];
    $scope.addAlert = function() {
        $scope.alerts.push({
            msg: 'Another alert!'
        })
    };
    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1)
    }
}]);
App.controller('ButtonsCtrl', ['$scope', function($scope) {
    $scope.singleModel = 1;
    $scope.radioModel = 'Middle';
    $scope.checkModel = {
        left: false,
        middle: true,
        right: false
    }
}]);
App.controller('CarouselDemoCtrl', ['$scope', function($scope) {
    $scope.myInterval = 5000;
    var slides = $scope.slides = [];
    $scope.addSlide = function() {
        var newWidth = 800 + slides.length;
        slides.push({
            image: '//placekitten.com/' + newWidth + '/300',
            text: ['More', 'Extra', 'Lots of', 'Surplus'][slides.length % 2] + ' ' + ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 2]
        })
    };
    for (var i = 0; i < 2; i++) {
        $scope.addSlide()
    }
}]);
App.controller('DatepickerDemoCtrl', ['$scope', function($scope) {
    $scope.today = function() {
        $scope.dt = new Date()
    };
    $scope.today();
    $scope.clear = function() {
        $scope.dt = null
    };
    $scope.disabled = function(date, mode) {
        return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6))
    };
    $scope.toggleMin = function() {
        $scope.minDate = $scope.minDate ? null : new Date()
    };
    $scope.toggleMin();
    $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened = true
    };
    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };
    $scope.initDate = new Date('2016-15-20');
    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0]
}]);
App.controller('DialogIntroCtrl', ['$scope', 'ngDialog', 'tpl', function($scope, ngDialog, tpl) {
    'user strict';
    $scope.tpl = tpl;
    ngDialog.open({
        template: tpl.path,
        className: 'ngdialog-theme-default'
    })
}]);
App.controller('DialogMainCtrl', function($scope, $rootScope, ngDialog) {
    'user strict';
    $rootScope.jsonData = '{"foo": "bar"}';
    $rootScope.theme = 'ngdialog-theme-default';
    $scope.directivePreCloseCallback = function(value) {
        if (confirm('Close it? MainCtrl.Directive. (Value = ' + value + ')')) {
            return true
        }
        return false
    };
    $scope.preCloseCallbackOnScope = function(value) {
        if (confirm('Close it? MainCtrl.OnScope (Value = ' + value + ')')) {
            return true
        }
        return false
    };
    $scope.open = function() {
        ngDialog.open({
            template: 'firstDialogId',
            controller: 'InsideCtrl',
            data: {
                foo: 'some data'
            }
        })
    };
    $scope.openDefault = function() {
        ngDialog.open({
            template: 'firstDialogId',
            controller: 'InsideCtrl',
            className: 'ngdialog-theme-default'
        })
    };
    $scope.openDefaultWithPreCloseCallbackInlined = function() {
        ngDialog.open({
            template: 'firstDialogId',
            controller: 'InsideCtrl',
            className: 'ngdialog-theme-default',
            preCloseCallback: function(value) {
                if (confirm('Close it?  (Value = ' + value + ')')) {
                    return true
                }
                return false
            }
        })
    };
    $scope.openConfirm = function() {
        ngDialog.openConfirm({
            template: 'modalDialogId',
            className: 'ngdialog-theme-default'
        }).then(function(value) {
            console.log('Modal promise resolved. Value: ', value)
        }, function(reason) {
            console.log('Modal promise rejected. Reason: ', reason)
        })
    };
    $scope.openConfirmWithPreCloseCallbackOnScope = function() {
        ngDialog.openConfirm({
            template: 'modalDialogId',
            className: 'ngdialog-theme-default',
            preCloseCallback: 'preCloseCallbackOnScope',
            scope: $scope
        }).then(function(value) {
            console.log('Modal promise resolved. Value: ', value)
        }, function(reason) {
            console.log('Modal promise rejected. Reason: ', reason)
        })
    };
    $scope.openConfirmWithPreCloseCallbackInlinedWithNestedConfirm = function() {
        ngDialog.openConfirm({
            template: 'dialogWithNestedConfirmDialogId',
            className: 'ngdialog-theme-default',
            preCloseCallback: function(value) {
                var nestedConfirmDialog = ngDialog.openConfirm({
                    template: '<p>Are you sure you want to close the parent dialog?</p>' + '<div>' + '<button type="button" class="btn btn-default" ng-click="closeThisDialog(0)">No' + '<button type="button" class="btn btn-primary" ng-click="confirm(1)">Yes' + '</button></div>',
                    plain: true,
                    className: 'ngdialog-theme-default'
                });
                return nestedConfirmDialog
            },
            scope: $scope
        }).then(function(value) {
            console.log('resolved:' + value)
        }, function(value) {
            console.log('rejected:' + value)
        })
    };
    $scope.openInlineController = function() {
        $rootScope.theme = 'ngdialog-theme-default';
        ngDialog.open({
            template: 'withInlineController',
            controller: ['$scope', '$timeout', function($scope, $timeout) {
                var counter = 0;
                var timeout;

                function count() {
                    $scope.exampleExternalData = 'Counter ' + (counter++);
                    timeout = $timeout(count, 450)
                }
                count();
                $scope.$on('$destroy', function() {
                    $timeout.cancel(timeout)
                })
            }],
            className: 'ngdialog-theme-default'
        })
    };
    $scope.openTemplate = function() {
        $scope.value = true;
        ngDialog.open({
            template: $scope.tpl.path,
            className: 'ngdialog-theme-default',
            scope: $scope
        })
    };
    $scope.openTemplateNoCache = function() {
        $scope.value = true;
        ngDialog.open({
            template: $scope.tpl.path,
            className: 'ngdialog-theme-default',
            scope: $scope,
            cache: false
        })
    };
    $scope.openTimed = function() {
        var dialog = ngDialog.open({
            template: '<p>Just passing through!</p>',
            plain: true,
            closeByDocument: false,
            closeByEscape: false
        });
        setTimeout(function() {
            dialog.close()
        }, 2000)
    };
    $scope.openNotify = function() {
        var dialog = ngDialog.open({
            template: '<p>You can do whatever you want when I close, however that happens.</p>' + '<div><button type="button" class="btn btn-primary" ng-click="closeThisDialog(1)">Close Me</button></div>',
            plain: true
        });
        dialog.closePromise.then(function(data) {
            console.log('ngDialog closed' + (data.value === 1 ? ' using the button' : '') + ' and notified by promise: ' + data.id)
        })
    };
    $scope.openWithoutOverlay = function() {
        ngDialog.open({
            template: '<h2>Notice that there is no overlay!</h2>',
            className: 'ngdialog-theme-default',
            plain: true,
            overlay: false
        })
    };
    $rootScope.$on('ngDialog.opened', function(e, $dialog) {
        console.log('ngDialog opened: ' + $dialog.attr('id'))
    });
    $rootScope.$on('ngDialog.closed', function(e, $dialog) {
        console.log('ngDialog closed: ' + $dialog.attr('id'))
    });
    $rootScope.$on('ngDialog.closing', function(e, $dialog) {
        console.log('ngDialog closing: ' + $dialog.attr('id'))
    })
});
App.controller('InsideCtrl', function($scope, ngDialog) {
    'user strict';
    $scope.dialogModel = {
        message: 'message from passed scope'
    };
    $scope.openSecond = function() {
        ngDialog.open({
            template: '<p class="lead m0"><a href="" ng-click="closeSecond()">Close all by click here!</a></h3>',
            plain: true,
            closeByEscape: false,
            controller: 'SecondModalCtrl'
        })
    }
});
App.controller('SecondModalCtrl', function($scope, ngDialog) {
    'user strict';
    $scope.closeSecond = function() {
        ngDialog.close()
    }
});
App.controller('FormDemoCtrl', function($scope) {
    'use strict';
    $scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming']
});
App.controller('PaginationDemoCtrl', ['$scope', function($scope) {
    $scope.totalItems = 64;
    $scope.currentPage = 4;
    $scope.setPage = function(pageNo) {
        $scope.currentPage = pageNo
    };
    $scope.pageChanged = function() {
        console.log('Page changed to: ' + $scope.currentPage)
    };
    $scope.maxSize = 5;
    $scope.bigTotalItems = 175;
    $scope.bigCurrentPage = 1
}]);
App.controller('PopoverDemoCtrl', ['$scope', function($scope) {
    $scope.dynamicPopover = 'Hello, World!';
    $scope.dynamicPopoverTitle = 'Title'
}]);
App.controller('ProgressDemoCtrl', ['$scope', function($scope) {
    $scope.max = 200;
    $scope.random = function() {
        var value = Math.floor((Math.random() * 100) + 1);
        var type;
        if (value < 25) {
            type = 'success'
        } else if (value < 50) {
            type = 'info'
        } else if (value < 75) {
            type = 'warning'
        } else {
            type = 'danger'
        }
        $scope.showWarning = (type === 'danger' || type === 'warning');
        $scope.dynamic = value;
        $scope.type = type
    };
    $scope.random();
    $scope.randomStacked = function() {
        $scope.stacked = [];
        var types = ['success', 'info', 'warning', 'danger'];
        for (var i = 0, n = Math.floor((Math.random() * 4) + 1); i < n; i++) {
            var index = Math.floor((Math.random() * 4));
            $scope.stacked.push({
                value: Math.floor((Math.random() * 30) + 1),
                type: types[index]
            })
        }
    };
    $scope.randomStacked()
}]);
App.controller('RatingDemoCtrl', ['$scope', function($scope) {
    $scope.rate = 7;
    $scope.max = 10;
    $scope.isReadonly = false;
    $scope.hoveringOver = function(value) {
        $scope.overStar = value;
        $scope.percent = 100 * (value / $scope.max)
    };
    $scope.ratingStates = [{
        stateOn: 'fa fa-check',
        stateOff: 'fa fa-check-circle'
    }, {
        stateOn: 'fa fa-star',
        stateOff: 'fa fa-star-o'
    }, {
        stateOn: 'fa fa-heart',
        stateOff: 'fa fa-ban'
    }, {
        stateOn: 'fa fa-heart'
    }, {
        stateOff: 'fa fa-power-off'
    }]
}]);
App.controller('TimepickerDemoCtrl', ['$scope', function($scope) {
    $scope.mytime = new Date();
    $scope.hstep = 1;
    $scope.mstep = 15;
    $scope.options = {
        hstep: [1, 2, 3],
        mstep: [1, 5, 10, 15, 25, 30]
    };
    $scope.ismeridian = true;
    $scope.toggleMode = function() {
        $scope.ismeridian = !$scope.ismeridian
    };
    $scope.update = function() {
        var d = new Date();
        d.setHours(14);
        d.setMinutes(0);
        $scope.mytime = d
    };
    $scope.changed = function() {
        console.log('Time changed to: ' + $scope.mytime)
    };
    $scope.clear = function() {
        $scope.mytime = null
    }
}]);
App.controller('ToasterDemoCtrl', ['$scope', 'toaster', function($scope, toaster) {
    $scope.toaster = {
        type: 'success',
        title: 'Title',
        text: 'Message'
    };
    $scope.pop = function() {
        toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text)
    }
}]);
App.controller('TooltipDemoCtrl', ['$scope', function($scope) {
    $scope.dynamicTooltip = 'Hello, World!';
    $scope.dynamicTooltipText = 'dynamic';
    $scope.htmlTooltip = 'I\'ve been made <b>bold</b>!'
}]);
App.controller('TypeaheadCtrl', ['$scope', '$http', function($scope, $http) {
    $scope.selected = undefined;
    $scope.states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
    $scope.getLocation = function(val) {
        return $http.get('//maps.googleapis.com/maps/api/geocode/json', {
            params: {
                address: val,
                sensor: false
            }
        }).then(function(res) {
            var addresses = [];
            angular.forEach(res.data.results, function(item) {
                addresses.push(item.formatted_address)
            });
            return addresses
        })
    };
    $scope.statesWithFlags = [{
        'name': 'Alabama',
        'flag': '5/5c/Flag_of_Alabama.svg/45px-Flag_of_Alabama.svg.png'
    }, {
        'name': 'Alaska',
        'flag': 'e/e6/Flag_of_Alaska.svg/43px-Flag_of_Alaska.svg.png'
    }, {
        'name': 'Arizona',
        'flag': '9/9d/Flag_of_Arizona.svg/45px-Flag_of_Arizona.svg.png'
    }, {
        'name': 'Arkansas',
        'flag': '9/9d/Flag_of_Arkansas.svg/45px-Flag_of_Arkansas.svg.png'
    }, {
        'name': 'California',
        'flag': '0/01/Flag_of_California.svg/45px-Flag_of_California.svg.png'
    }, {
        'name': 'Colorado',
        'flag': '4/46/Flag_of_Colorado.svg/45px-Flag_of_Colorado.svg.png'
    }, {
        'name': 'Connecticut',
        'flag': '9/96/Flag_of_Connecticut.svg/39px-Flag_of_Connecticut.svg.png'
    }, {
        'name': 'Delaware',
        'flag': 'c/c6/Flag_of_Delaware.svg/45px-Flag_of_Delaware.svg.png'
    }, {
        'name': 'Florida',
        'flag': 'f/f7/Flag_of_Florida.svg/45px-Flag_of_Florida.svg.png'
    }, {
        'name': 'Georgia',
        'flag': '5/54/Flag_of_Georgia_%28U.S._state%29.svg/46px-Flag_of_Georgia_%28U.S._state%29.svg.png'
    }, {
        'name': 'Hawaii',
        'flag': 'e/ef/Flag_of_Hawaii.svg/46px-Flag_of_Hawaii.svg.png'
    }, {
        'name': 'Idaho',
        'flag': 'a/a4/Flag_of_Idaho.svg/38px-Flag_of_Idaho.svg.png'
    }, {
        'name': 'Illinois',
        'flag': '0/01/Flag_of_Illinois.svg/46px-Flag_of_Illinois.svg.png'
    }, {
        'name': 'Indiana',
        'flag': 'a/ac/Flag_of_Indiana.svg/45px-Flag_of_Indiana.svg.png'
    }, {
        'name': 'Iowa',
        'flag': 'a/aa/Flag_of_Iowa.svg/44px-Flag_of_Iowa.svg.png'
    }, {
        'name': 'Kansas',
        'flag': 'd/da/Flag_of_Kansas.svg/46px-Flag_of_Kansas.svg.png'
    }, {
        'name': 'Kentucky',
        'flag': '8/8d/Flag_of_Kentucky.svg/46px-Flag_of_Kentucky.svg.png'
    }, {
        'name': 'Louisiana',
        'flag': 'e/e0/Flag_of_Louisiana.svg/46px-Flag_of_Louisiana.svg.png'
    }, {
        'name': 'Maine',
        'flag': '3/35/Flag_of_Maine.svg/45px-Flag_of_Maine.svg.png'
    }, {
        'name': 'Maryland',
        'flag': 'a/a0/Flag_of_Maryland.svg/45px-Flag_of_Maryland.svg.png'
    }, {
        'name': 'Massachusetts',
        'flag': 'f/f2/Flag_of_Massachusetts.svg/46px-Flag_of_Massachusetts.svg.png'
    }, {
        'name': 'Michigan',
        'flag': 'b/b5/Flag_of_Michigan.svg/45px-Flag_of_Michigan.svg.png'
    }, {
        'name': 'Minnesota',
        'flag': 'b/b9/Flag_of_Minnesota.svg/46px-Flag_of_Minnesota.svg.png'
    }, {
        'name': 'Mississippi',
        'flag': '4/42/Flag_of_Mississippi.svg/45px-Flag_of_Mississippi.svg.png'
    }, {
        'name': 'Missouri',
        'flag': '5/5a/Flag_of_Missouri.svg/46px-Flag_of_Missouri.svg.png'
    }, {
        'name': 'Montana',
        'flag': 'c/cb/Flag_of_Montana.svg/45px-Flag_of_Montana.svg.png'
    }, {
        'name': 'Nebraska',
        'flag': '4/4d/Flag_of_Nebraska.svg/46px-Flag_of_Nebraska.svg.png'
    }, {
        'name': 'Nevada',
        'flag': 'f/f1/Flag_of_Nevada.svg/45px-Flag_of_Nevada.svg.png'
    }, {
        'name': 'New Hampshire',
        'flag': '2/28/Flag_of_New_Hampshire.svg/45px-Flag_of_New_Hampshire.svg.png'
    }, {
        'name': 'New Jersey',
        'flag': '9/92/Flag_of_New_Jersey.svg/45px-Flag_of_New_Jersey.svg.png'
    }, {
        'name': 'New Mexico',
        'flag': 'c/c3/Flag_of_New_Mexico.svg/45px-Flag_of_New_Mexico.svg.png'
    }, {
        'name': 'New York',
        'flag': '1/1a/Flag_of_New_York.svg/46px-Flag_of_New_York.svg.png'
    }, {
        'name': 'North Carolina',
        'flag': 'b/bb/Flag_of_North_Carolina.svg/45px-Flag_of_North_Carolina.svg.png'
    }, {
        'name': 'North Dakota',
        'flag': 'e/ee/Flag_of_North_Dakota.svg/38px-Flag_of_North_Dakota.svg.png'
    }, {
        'name': 'Ohio',
        'flag': '4/4c/Flag_of_Ohio.svg/46px-Flag_of_Ohio.svg.png'
    }, {
        'name': 'Oklahoma',
        'flag': '6/6e/Flag_of_Oklahoma.svg/45px-Flag_of_Oklahoma.svg.png'
    }, {
        'name': 'Oregon',
        'flag': 'b/b9/Flag_of_Oregon.svg/46px-Flag_of_Oregon.svg.png'
    }, {
        'name': 'Pennsylvania',
        'flag': 'f/f7/Flag_of_Pennsylvania.svg/45px-Flag_of_Pennsylvania.svg.png'
    }, {
        'name': 'Rhode Island',
        'flag': 'f/f3/Flag_of_Rhode_Island.svg/32px-Flag_of_Rhode_Island.svg.png'
    }, {
        'name': 'South Carolina',
        'flag': '6/69/Flag_of_South_Carolina.svg/45px-Flag_of_South_Carolina.svg.png'
    }, {
        'name': 'South Dakota',
        'flag': '1/1a/Flag_of_South_Dakota.svg/46px-Flag_of_South_Dakota.svg.png'
    }, {
        'name': 'Tennessee',
        'flag': '9/9e/Flag_of_Tennessee.svg/46px-Flag_of_Tennessee.svg.png'
    }, {
        'name': 'Texas',
        'flag': 'f/f7/Flag_of_Texas.svg/45px-Flag_of_Texas.svg.png'
    }, {
        'name': 'Utah',
        'flag': 'f/f6/Flag_of_Utah.svg/45px-Flag_of_Utah.svg.png'
    }, {
        'name': 'Vermont',
        'flag': '4/49/Flag_of_Vermont.svg/46px-Flag_of_Vermont.svg.png'
    }, {
        'name': 'Virginia',
        'flag': '4/47/Flag_of_Virginia.svg/44px-Flag_of_Virginia.svg.png'
    }, {
        'name': 'Washington',
        'flag': '5/54/Flag_of_Washington.svg/46px-Flag_of_Washington.svg.png'
    }, {
        'name': 'West Virginia',
        'flag': '2/22/Flag_of_West_Virginia.svg/46px-Flag_of_West_Virginia.svg.png'
    }, {
        'name': 'Wisconsin',
        'flag': '2/22/Flag_of_Wisconsin.svg/45px-Flag_of_Wisconsin.svg.png'
    }, {
        'name': 'Wyoming',
        'flag': 'b/bc/Flag_of_Wyoming.svg/43px-Flag_of_Wyoming.svg.png'
    }]
}]);
App.controller('FileUploadController', ['$scope', function($scope) {
    'use strict';
    $scope.fileUploadList = [{
        file: 'some-file.txt'
    }];
    $scope.removeFile = function(index) {
        $scope.fileUploadList.splice(index, 1)
    };
    angular.element(document).ready(function() {
        var progressbar = $('#progressbar'),
            bar = progressbar.find('.progress-bar'),
            settings = {
                action: 'server/upload.php',
                allow: '*.(jpg|jpeg|gif|png)',
                param: 'upfile',
                loadstart: function() {
                    bar.css('width', '0%').text('0%');
                    progressbar.removeClass('hidden')
                },
                progress: function(percent) {
                    percent = Math.ceil(percent);
                    bar.css('width', percent + '%').text(percent + '%')
                },
                allcomplete: function(response) {
                    var data = response && angular.fromJson(response);
                    bar.css('width', '100%').text('100%');
                    setTimeout(function() {
                        progressbar.addClass('hidden')
                    }, 250);
                    if (data && data.file) {
                        $scope.$apply(function() {
                            $scope.fileUploadList.push(data)
                        })
                    }
                }
            };
        var select = new $.upload.select($('#upload-select'), settings),
            drop = new $.upload.drop($('#upload-drop'), settings)
    })
}]);
App.controller('FlotChartController', ['$scope', '$window', '$http', function($scope, $window, $http) {
    'use strict';
    $window.FlotChart = function(element, url) {
        this.element = $(element);
        this.url = url;
        this.requestData = function(option, method, callback) {
            var self = this;
            callback = (method && $.isFunction(method)) ? method : callback;
            method = (method && typeof method == 'string') ? method : 'GET';
            self.option = option;
            $http({
                url: self.url,
                cache: false,
                method: method
            }).success(function(data) {
                $.plot(self.element, data, option);
                if (callback) callback()
            }).error(function() {
                $.error('Bad chart request.')
            });
            return this
        };
        this.listen = function() {
            var self = this,
                chartPanel = this.element.parents('.panel').eq(0);
            chartPanel.on('panel-refresh', function(event, panel) {
                self.requestData(self.option, function() {
                    panel.removeSpinner()
                })
            });
            return this
        }
    };
    angular.element(document).ready(function() {
        (function() {
            var Selector = '.chart-bar';
            $(Selector).each(function() {
                var source = $(this).data('source') || $.error('Bar: No source defined.');
                var chart = new FlotChart(this, source),
                    option = {
                        series: {
                            bars: {
                                align: 'center',
                                lineWidth: 0,
                                show: true,
                                barWidth: 0.6,
                                fill: 0.9
                            }
                        },
                        grid: {
                            borderColor: '#eee',
                            borderWidth: 1,
                            hoverable: true,
                            backgroundColor: '#fcfcfc'
                        },
                        tooltip: true,
                        tooltipOpts: {
                            content: '%x : %y'
                        },
                        xaxis: {
                            tickColor: '#fcfcfc',
                            mode: 'categories'
                        },
                        yaxis: {
                            position: ($scope.app.layout.isRTL ? 'right' : 'left'),
                            tickColor: '#eee'
                        },
                        shadowSize: 0
                    };
                chart.requestData(option)
            })
        })();
        (function() {
            var Selector = '.chart-bar-stacked';
            $(Selector).each(function() {
                var source = $(this).data('source') || $.error('Bar Stacked: No source defined.');
                var chart = new FlotChart(this, source),
                    option = {
                        series: {
                            stack: true,
                            bars: {
                                align: 'center',
                                lineWidth: 0,
                                show: true,
                                barWidth: 0.6,
                                fill: 0.9
                            }
                        },
                        grid: {
                            borderColor: '#eee',
                            borderWidth: 1,
                            hoverable: true,
                            backgroundColor: '#fcfcfc'
                        },
                        tooltip: true,
                        tooltipOpts: {
                            content: '%x : %y'
                        },
                        xaxis: {
                            tickColor: '#fcfcfc',
                            mode: 'categories'
                        },
                        yaxis: {
                            position: ($scope.app.layout.isRTL ? 'right' : 'left'),
                            tickColor: '#eee'
                        },
                        shadowSize: 0
                    };
                chart.requestData(option)
            })
        })();
        (function() {
            var Selector = '.chart-spline';
            $(Selector).each(function() {
                var source = $(this).data('source') || $.error('Spline: No source defined.');
                var chart = new FlotChart(this, source),
                    option = {
                        series: {
                            lines: {
                                show: false
                            },
                            points: {
                                show: true,
                                radius: 4
                            },
                            splines: {
                                show: true,
                                tension: 0.4,
                                lineWidth: 1,
                                fill: 0.5
                            }
                        },
                        grid: {
                            borderColor: '#eee',
                            borderWidth: 1,
                            hoverable: true,
                            backgroundColor: '#fcfcfc'
                        },
                        tooltip: true,
                        tooltipOpts: {
                            content: '%x : %y'
                        },
                        xaxis: {
                            tickColor: '#fcfcfc',
                            mode: 'categories'
                        },
                        yaxis: {
                            min: 0,
                            tickColor: '#eee',
                            position: ($scope.app.layout.isRTL ? 'right' : 'left'),
                            tickFormatter: function(v) {
                                return v
                            }
                        },
                        shadowSize: 0
                    };
                chart.requestData(option).listen()
            })
        })();
        (function() {
            var Selector = '.chart-area';
            $(Selector).each(function() {
                var source = $(this).data('source') || $.error('Area: No source defined.');
                var chart = new FlotChart(this, source),
                    option = {
                        series: {
                            lines: {
                                show: true,
                                fill: 0.8
                            },
                            points: {
                                show: true,
                                radius: 4
                            }
                        },
                        grid: {
                            borderColor: '#eee',
                            borderWidth: 1,
                            hoverable: true,
                            backgroundColor: '#fcfcfc'
                        },
                        tooltip: true,
                        tooltipOpts: {
                            content: '%x : %y'
                        },
                        xaxis: {
                            tickColor: '#fcfcfc',
                            mode: 'categories'
                        },
                        yaxis: {
                            min: 0,
                            tickColor: '#eee',
                            position: ($scope.app.layout.isRTL ? 'right' : 'left'),
                            tickFormatter: function(v) {
                                return v + ' visitors'
                            }
                        },
                        shadowSize: 0
                    };
                chart.requestData(option).listen()
            })
        })();
        (function() {
            var Selector = '.chart-line';
            $(Selector).each(function() {
                var source = $(this).data('source') || $.error('Line: No source defined.');
                var chart = new FlotChart(this, source),
                    option = {
                        series: {
                            lines: {
                                show: true,
                                fill: 0.01
                            },
                            points: {
                                show: true,
                                radius: 4
                            }
                        },
                        grid: {
                            borderColor: '#eee',
                            borderWidth: 1,
                            hoverable: true,
                            backgroundColor: '#fcfcfc'
                        },
                        tooltip: true,
                        tooltipOpts: {
                            content: '%x : %y'
                        },
                        xaxis: {
                            tickColor: '#eee',
                            mode: 'categories'
                        },
                        yaxis: {
                            position: ($scope.app.layout.isRTL ? 'right' : 'left'),
                            tickColor: '#eee'
                        },
                        shadowSize: 0
                    };
                chart.requestData(option)
            })
        })();
        (function() {
            var Selector = '.chart-pie';
            $(Selector).each(function() {
                var source = $(this).data('source') || $.error('Pie: No source defined.');
                var chart = new FlotChart(this, source),
                    option = {
                        series: {
                            pie: {
                                show: true,
                                innerRadius: 0,
                                label: {
                                    show: true,
                                    radius: 0.8,
                                    formatter: function(label, series) {
                                        return '<div class="flot-pie-label">' + Math.round(series.percent) + '%</div>'
                                    },
                                    background: {
                                        opacity: 0.8,
                                        color: '#222'
                                    }
                                }
                            }
                        }
                    };
                chart.requestData(option)
            })
        })();
        (function() {
            var Selector = '.chart-donut';
            $(Selector).each(function() {
                var source = $(this).data('source') || $.error('Donut: No source defined.');
                var chart = new FlotChart(this, source),
                    option = {
                        series: {
                            pie: {
                                show: true,
                                innerRadius: 0.5
                            }
                        }
                    };
                chart.requestData(option)
            })
        })()
    })
}]);
App.controller('MailboxController', function($scope, colors) {
    $scope.folders = [{
        name: 'Inbox',
        folder: '',
        alert: 42,
        icon: "fa-inbox"
    }, {
        name: 'Starred',
        folder: 'starred',
        alert: 10,
        icon: "fa-star"
    }, {
        name: 'Sent',
        folder: 'sent',
        alert: 0,
        icon: "fa-paper-plane-o"
    }, {
        name: 'Draft',
        folder: 'draft',
        alert: 5,
        icon: "fa-edit"
    }, {
        name: 'Trash',
        folder: 'trash',
        alert: 0,
        icon: "fa-trash"
    }];
    $scope.labels = [{
        name: 'Red',
        color: 'danger'
    }, {
        name: 'Pink',
        color: 'pink'
    }, {
        name: 'Blue',
        color: 'info'
    }, {
        name: 'Yellow',
        color: 'warning'
    }];
    $scope.mail = {
        cc: false,
        bcc: false
    };
    $scope.content = "<p>Type something..</p>"
});
App.controller('MailFolderController', ['$scope', 'mails', '$stateParams', function($scope, mails, $stateParams) {
    $scope.folder = $stateParams.folder;
    mails.all().then(function(mails) {
        $scope.mails = mails
    })
}]);
App.controller('MailViewController', ['$scope', 'mails', '$stateParams', function($scope, mails, $stateParams) {
    mails.get($stateParams.mid).then(function(mail) {
        $scope.mail = mail
    })
}]);
App.factory('mails', ['$http', function($http) {
    var path = 'server/mails.json';
    var mails = $http.get(path).then(function(resp) {
        return resp.data.mails
    });
    var factory = {};
    factory.all = function() {
        return mails
    };
    factory.get = function(id) {
        return mails.then(function(mails) {
            for (var i = 0; i < mails.length; i++) {
                if (mails[i].id == id) return mails[i]
            }
            return null
        })
    };
    return factory
}]);
App.controller('AppController', ['$rootScope', '$scope', '$state', '$translate', '$window', '$localStorage', '$timeout', 'toggleStateService', 'colors', 'browser', 'cfpLoadingBar', function($rootScope, $scope, $state, $translate, $window, $localStorage, $timeout, toggle, colors, browser, cfpLoadingBar) {
    "use strict";
    var thBar;
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        if ($('.wrapper > section').length) thBar = $timeout(function() {
            cfpLoadingBar.start()
        }, 0)
    });
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
        event.targetScope.$watch("$viewContentLoaded", function() {
            $timeout.cancel(thBar);
            cfpLoadingBar.complete()
        })
    });
    $rootScope.$on('$stateNotFound', function(event, unfoundState, fromState, fromParams) {
        console.log(unfoundState.to);
        console.log(unfoundState.toParams);
        console.log(unfoundState.options)
    });
    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
        console.log(error)
    });
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
        $window.scrollTo(0, 0);
        $rootScope.currTitle = $state.current.title
    });
    $rootScope.currTitle = $state.current.title;
    $rootScope.pageTitle = function() {
        return $rootScope.app.name + ' - ' + ($rootScope.currTitle || $rootScope.app.description)
    };
    $rootScope.$watch('app.layout.isCollapsed', function(newValue, oldValue) {
        if (newValue === false) $rootScope.$broadcast('closeSidebarMenu')
    });
    if (angular.isDefined($localStorage.layout)) $scope.app.layout = $localStorage.layout;
    else $localStorage.layout = $scope.app.layout;
    $rootScope.$watch("app.layout", function() {
        $localStorage.layout = $scope.app.layout
    }, true);
    $scope.colorByName = colors.byName;
    $scope.toggleUserBlock = function() {
        $scope.$broadcast('toggleUserBlock')
    };
    $scope.language = {
        listIsOpen: false,
        available: {
            'en': 'English',
            'es_AR': 'Español'
        },
        init: function() {
            var proposedLanguage = $translate.proposedLanguage() || $translate.use();
            var preferredLanguage = $translate.preferredLanguage();
            $scope.language.selected = $scope.language.available[(proposedLanguage || preferredLanguage)]
        },
        set: function(localeId, ev) {
            $translate.use(localeId);
            $scope.language.selected = $scope.language.available[localeId];
            $scope.language.listIsOpen = !$scope.language.listIsOpen
        }
    };
    $scope.language.init();
    toggle.restoreState($(document.body));
    $timeout(function() {
        $rootScope.mainViewAnimation = $rootScope.app.viewAnimation
    });
    $rootScope.cancel = function($event) {
        $event.stopPropagation()
    }
}]);
App.controller('ModalGmapController', ['$scope', '$modal', 'gmap', function($scope, $modal, gmap) {
    $scope.open = function(size) {
        var modalInstance = $modal.open({
            templateUrl: '/myModalContent.html',
            controller: ModalInstanceCtrl,
            size: size
        })
    };
    var ModalInstanceCtrl = function($scope, $modalInstance) {
        $modalInstance.opened.then(function() {
            $scope.initGmap = true
        });
        $scope.ok = function() {
            $modalInstance.close('closed')
        };
        $scope.cancel = function() {
            $modalInstance.dismiss('cancel')
        }
    }
}]);
App.controller('ModalController', ['$scope', '$modal', function($scope, $modal) {
    $scope.open = function(size) {
        var modalInstance = $modal.open({
            templateUrl: '/myModalContent.html',
            controller: ModalInstanceCtrl,
            size: size
        });
        var state = $('#modal-state');
        modalInstance.result.then(function() {
            state.text('Modal dismissed with OK status')
        }, function() {
            state.text('Modal dismissed with Cancel status')
        })
    };
    var ModalInstanceCtrl = function($scope, $modalInstance) {
        $scope.ok = function() {
            $modalInstance.close('closed')
        };
        $scope.cancel = function() {
            $modalInstance.dismiss('cancel')
        }
    }
}]);
App.controller('NotificationController', ['$scope', function($scope) {
    $scope.autoplace = function(context, source) {
        var pos = 'top';
        if (predictTooltipTop(source) < 0) pos = 'bottom';
        if (predictTooltipLeft(source) < 0) pos = 'right';
        return pos
    };

    function predictTooltipTop(el) {
        var top = el.offsetTop;
        var height = 40;
        while (el.offsetParent) {
            el = el.offsetParent;
            top += el.offsetTop
        }
        return (top - height) - (window.pageYOffset)
    }

    function predictTooltipLeft(el) {
        var left = el.offsetLeft;
        var width = el.offsetWidth;
        while (el.offsetParent) {
            el = el.offsetParent;
            left += el.offsetLeft
        }
        return (left - width) - (window.pageXOffset)
    }
}]);
App.controller('portletsController', ['$scope', '$timeout', '$window', function($scope, $timeout, $window) {
    'use strict';
    if (!$.fn.sortable) return;
    var Selector = '[portlet]',
        storageKeyName = 'portletState';
    angular.element(document).ready(function() {
        $timeout(function() {
            $(Selector).sortable({
                connectWith: Selector,
                items: 'div.panel',
                handle: '.portlet-handler',
                opacity: 0.7,
                placeholder: 'portlet box-placeholder',
                cancel: '.portlet-cancel',
                forcePlaceholderSize: true,
                iframeFix: false,
                tolerance: 'pointer',
                helper: 'original',
                revert: 200,
                forceHelperSize: true,
                start: saveListSize,
                update: savePortletOrder,
                create: loadPortletOrder
            })
        }, 0)
    });

    function savePortletOrder(event, ui) {
        var self = event.target;
        var data = angular.fromJson($scope.$storage[storageKeyName]);
        if (!data) {
            data = {}
        }
        data[self.id] = $(self).sortable('toArray');
        $scope.$storage[storageKeyName] = angular.toJson(data);
        saveListSize.apply(self)
    }

    function loadPortletOrder(event) {
        var self = event.target;
        var data = angular.fromJson($scope.$storage[storageKeyName]);
        if (data) {
            var porletId = self.id,
                panels = data[porletId];
            if (panels) {
                var portlet = $('#' + porletId);
                $.each(panels, function(index, value) {
                    $('#' + value).appendTo(portlet)
                })
            }
        }
        saveListSize.apply(self)
    }

    function saveListSize() {
        var $this = $(this);
        $this.css('min-height', $this.height())
    }
}]);
App.controller('SidebarController', ['$rootScope', '$scope', '$state', '$location', '$http', '$timeout', 'APP_MEDIAQUERY', function($rootScope, $scope, $state, $location, $http, $timeout, mq) {
    var currentState = $rootScope.$state.current.name;
    var $win = $(window);
    var $html = $('html');
    var $body = $('body');
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        currentState = toState.name;
        $('body.aside-toggled').removeClass('aside-toggled');
        $rootScope.$broadcast('closeSidebarMenu')
    });
    $win.on('resize', function() {
        if (isMobile()) $body.removeClass('aside-collapsed');
        else $body.removeClass('aside-toggled')
    });
    var isActive = function(item) {
        if (!item) return;
        if (!item.sref || item.sref == '#') {
            var foundActive = false;
            angular.forEach(item.submenu, function(value, key) {
                if (isActive(value)) foundActive = true
            });
            return foundActive
        } else return $state.is(item.sref) || $state.includes(item.sref)
    };
    $scope.getMenuItemPropClasses = function(item) {
        return (item.heading ? 'nav-heading' : '') + (isActive(item) ? ' active' : '')
    };
    $scope.loadSidebarMenu = function() {
        var menuJson = 'server/sidebar-menu.json',
            menuURL = menuJson + '?v=' + (new Date().getTime());
        $http.get(menuURL).success(function(items) {
            $rootScope.menuItems = items
        }).error(function(data, status, headers, config) {
            alert('Failure loading menu')
        })
    };
    $scope.loadSidebarMenu();
    var collapseList = [];
    $scope.addCollapse = function($index, item) {
        collapseList[$index] = !isActive(item)
    };
    $scope.isCollapse = function($index) {
        return (collapseList[$index])
    };
    $scope.toggleCollapse = function($index, isParentItem) {
        if (isSidebarCollapsed() && !isMobile()) return true;
        if (angular.isDefined(collapseList[$index])) {
            collapseList[$index] = !collapseList[$index];
            closeAllBut($index)
        } else if (isParentItem) {
            closeAllBut(-1)
        }
        return true;

        function closeAllBut(index) {
            index += '';
            for (var i in collapseList) {
                if (index < 0 || index.indexOf(i) < 0) collapseList[i] = true
            }
        }
    };

    function isMobile() {
        return $win.width() < mq.tablet
    }

    function isTouch() {
        return $html.hasClass('touch')
    }

    function isSidebarCollapsed() {
        return $body.hasClass('aside-collapsed')
    }

    function isSidebarToggled() {
        return $body.hasClass('aside-toggled')
    }
}]);
App.controller("TodoController", ['$scope', '$filter', function($scope, $filter) {
    $scope.items = [{
        todo: {
            title: "Meeting with Mark at 7am.",
            description: "Pellentesque convallis mauris eu elit imperdiet quis eleifend quam aliquet. "
        },
        complete: true
    }, {
        todo: {
            title: "Call Sonya. Talk about the new project.",
            description: ""
        },
        complete: false
    }, {
        todo: {
            title: "Find a new place for vacations",
            description: ""
        },
        complete: false
    }];
    $scope.editingTodo = false;
    $scope.todo = {};
    $scope.addTodo = function() {
        if ($scope.todo.title === "") return;
        if (!$scope.todo.description) $scope.todo.description = "";
        if ($scope.editingTodo) {
            $scope.todo = {};
            $scope.editingTodo = false
        } else {
            $scope.items.push({
                todo: angular.copy($scope.todo),
                complete: false
            });
            $scope.todo.title = "";
            $scope.todo.description = ""
        }
    };
    $scope.editTodo = function(index, $event) {
        $event.stopPropagation();
        $scope.todo = $scope.items[index].todo;
        $scope.editingTodo = true
    };
    $scope.removeTodo = function(index, $event) {
        $scope.items.splice(index, 1)
    };
    $scope.clearAll = function() {
        $scope.items = []
    };
    $scope.totalCompleted = function() {
        return $filter("filter")($scope.items, function(item) {
            return item.complete
        }).length
    };
    $scope.totalPending = function() {
        return $filter("filter")($scope.items, function(item) {
            return !item.complete
        }).length
    }
}]);
(function($, window, document) {
    'use strict';
    var UploadSelect = function(element, options) {
        var $this = this,
            $element = $(element);
        options = $.extend({}, xhrupload.defaults, UploadSelect.defaults, options);
        if ($element.data("uploadSelect")) return;
        this.element = $element.on("change", function() {
            xhrupload($this.element[0].files, options)
        });
        $element.data("uploadSelect", this)
    };
    UploadSelect.defaults = {};
    var UploadDrop = function(element, options) {
        var $this = this,
            $element = $(element),
            hasdragCls = false;
        options = $.extend({}, xhrupload.defaults, UploadDrop.defaults, options);
        if ($element.data("uploadDrop")) return;
        $element.on("drop", function(e) {
            if (e.dataTransfer && e.dataTransfer.files) {
                e.stopPropagation();
                e.preventDefault();
                $element.removeClass(options.dragoverClass);
                xhrupload(e.dataTransfer.files, options)
            }
        }).on("dragenter", function(e) {
            e.stopPropagation();
            e.preventDefault()
        }).on("dragover", function(e) {
            e.stopPropagation();
            e.preventDefault();
            if (!hasdragCls) {
                $element.addClass(options.dragoverClass);
                hasdragCls = true
            }
        }).on("dragleave", function(e) {
            e.stopPropagation();
            e.preventDefault();
            $element.removeClass(options.dragoverClass);
            hasdragCls = false
        });
        $element.data("uploadDrop", this)
    };
    UploadDrop.defaults = {
        'dragoverClass': 'dragover'
    };
    $.upload = {
        "select": UploadSelect,
        "drop": UploadDrop
    };
    $.support.ajaxupload = (function() {
        function supportFileAPI() {
            var fi = document.createElement('INPUT');
            fi.type = 'file';
            return 'files' in fi
        }

        function supportAjaxUploadProgressEvents() {
            var xhr = new XMLHttpRequest();
            return !!(xhr && ('upload' in xhr) && ('onprogress' in xhr.upload))
        }

        function supportFormData() {
            return !!window.FormData
        }
        return supportFileAPI() && supportAjaxUploadProgressEvents() && supportFormData()
    })();
    if ($.support.ajaxupload) {
        $.event.props.push("dataTransfer")
    }

    function xhrupload(files, settings) {
        if (!$.support.ajaxupload) {
            return this
        }
        settings = $.extend({}, xhrupload.defaults, settings);
        if (!files.length) {
            return
        }
        if (settings.allow !== '*.*') {
            for (var i = 0, file;
                 (file = files[i]); i++) {
                if (!matchName(settings.allow, file.name)) {
                    if (typeof(settings.notallowed) == 'string') {
                        alert(settings.notallowed)
                    } else {
                        settings.notallowed(file, settings)
                    }
                    return
                }
            }
        }
        var complete = settings.complete;
        if (settings.single) {
            var count = files.length,
                uploaded = 0;
            settings.complete = function(response, xhr) {
                uploaded = uploaded + 1;
                complete(response, xhr);
                if (uploaded < count) {
                    upload([files[uploaded]], settings)
                } else {
                    settings.allcomplete(response, xhr)
                }
            };
            upload([files[0]], settings)
        } else {
            settings.complete = function(response, xhr) {
                complete(response, xhr);
                settings.allcomplete(response, xhr)
            };
            upload(files, settings)
        }

        function upload(files, settings) {
            var formData = new FormData(),
                xhr = new XMLHttpRequest();
            if (settings.before(settings, files) === false) return;
            for (var i = 0, f;
                 (f = files[i]); i++) {
                formData.append(settings.param, f)
            }
            for (var p in settings.params) {
                formData.append(p, settings.params[p])
            }
            xhr.upload.addEventListener("progress", function(e) {
                var percent = (e.loaded / e.total) * 100;
                settings.progress(percent, e)
            }, false);
            xhr.addEventListener("loadstart", function(e) {
                settings.loadstart(e)
            }, false);
            xhr.addEventListener("load", function(e) {
                settings.load(e)
            }, false);
            xhr.addEventListener("loadend", function(e) {
                settings.loadend(e)
            }, false);
            xhr.addEventListener("error", function(e) {
                settings.error(e)
            }, false);
            xhr.addEventListener("abort", function(e) {
                settings.abort(e)
            }, false);
            xhr.open(settings.method, settings.action, true);
            xhr.onreadystatechange = function() {
                settings.readystatechange(xhr);
                if (xhr.readyState == 4) {
                    var response = xhr.responseText;
                    if (settings.type == "json") {
                        try {
                            response = $.parseJSON(response)
                        } catch (e) {
                            response = false
                        }
                    }
                    settings.complete(response, xhr)
                }
            };
            xhr.send(formData)
        }
    }
    xhrupload.defaults = {
        'action': '',
        'single': true,
        'method': 'POST',
        'param': 'files[]',
        'params': {},
        'allow': '*.*',
        'type': 'text',
        'before': function(o) {},
        'loadstart': function() {},
        'load': function() {},
        'loadend': function() {},
        'error': function() {},
        'abort': function() {},
        'progress': function() {},
        'complete': function() {},
        'allcomplete': function() {},
        'readystatechange': function() {},
        'notallowed': function(file, settings) {
            alert('Only the following file types are allowed: ' + settings.allow)
        }
    };

    function matchName(pattern, path) {
        var parsedPattern = '^' + pattern.replace(/\//g, '\\/').replace(/\*\*/g, '(\\/[^\\/]+)*').replace(/\*/g, '[^\\/]+').replace(/((?!\\))\?/g, '$1.') + '$';
        parsedPattern = '^' + parsedPattern + '$';
        return (path.match(new RegExp(parsedPattern)) !== null)
    }
    $.xhrupload = xhrupload;
    return xhrupload
}(jQuery, window, document));
App.controller('UserBlockController', ['$scope', function($scope) {
    $scope.userBlockVisible = true;
    $scope.$on('toggleUserBlock', function(event, args) {
        $scope.userBlockVisible = !$scope.userBlockVisible
    })
}]);
(function($, window, doc) {
    'use strict';
    var $html = $("html"),
        $win = $(window);
    $.support.transition = (function() {
        var transitionEnd = (function() {
            var element = doc.body || doc.documentElement,
                transEndEventNames = {
                    WebkitTransition: 'webkitTransitionEnd',
                    MozTransition: 'transitionend',
                    OTransition: 'oTransitionEnd otransitionend',
                    transition: 'transitionend'
                },
                name;
            for (name in transEndEventNames) {
                if (element.style[name] !== undefined) return transEndEventNames[name]
            }
        }());
        return transitionEnd && {
            end: transitionEnd
        }
    })();
    $.support.animation = (function() {
        var animationEnd = (function() {
            var element = doc.body || doc.documentElement,
                animEndEventNames = {
                    WebkitAnimation: 'webkitAnimationEnd',
                    MozAnimation: 'animationend',
                    OAnimation: 'oAnimationEnd oanimationend',
                    animation: 'animationend'
                },
                name;
            for (name in animEndEventNames) {
                if (element.style[name] !== undefined) return animEndEventNames[name]
            }
        }());
        return animationEnd && {
            end: animationEnd
        }
    })();
    $.support.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function(callback) {
        window.setTimeout(callback, 1000 / 60)
    };
    $.support.touch = (('ontouchstart' in window && navigator.userAgent.toLowerCase().match(/mobile|tablet/)) || (window.DocumentTouch && document instanceof window.DocumentTouch) || (window.navigator['msPointerEnabled'] && window.navigator['msMaxTouchPoints'] > 0) || (window.navigator['pointerEnabled'] && window.navigator['maxTouchPoints'] > 0) || false);
    $.support.mutationobserver = (window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver || null);
    $.Utils = {};
    $.Utils.debounce = function(func, wait, immediate) {
        var timeout;
        return function() {
            var context = this,
                args = arguments;
            var later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args)
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args)
        }
    };
    $.Utils.removeCssRules = function(selectorRegEx) {
        var idx, idxs, stylesheet, _i, _j, _k, _len, _len1, _len2, _ref;
        if (!selectorRegEx) return;
        setTimeout(function() {
            try {
                _ref = document.styleSheets;
                for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                    stylesheet = _ref[_i];
                    idxs = [];
                    stylesheet.cssRules = stylesheet.cssRules;
                    for (idx = _j = 0, _len1 = stylesheet.cssRules.length; _j < _len1; idx = ++_j) {
                        if (stylesheet.cssRules[idx].type === CSSRule.STYLE_RULE && selectorRegEx.test(stylesheet.cssRules[idx].selectorText)) {
                            idxs.unshift(idx)
                        }
                    }
                    for (_k = 0, _len2 = idxs.length; _k < _len2; _k++) {
                        stylesheet.deleteRule(idxs[_k])
                    }
                }
            } catch (_error) {}
        }, 0)
    };
    $.Utils.isInView = function(element, options) {
        var $element = $(element);
        if (!$element.is(':visible')) {
            return false
        }
        var window_left = $win.scrollLeft(),
            window_top = $win.scrollTop(),
            offset = $element.offset(),
            left = offset.left,
            top = offset.top;
        options = $.extend({
            topoffset: 0,
            leftoffset: 0
        }, options);
        if (top + $element.height() >= window_top && top - options.topoffset <= window_top + $win.height() && left + $element.width() >= window_left && left - options.leftoffset <= window_left + $win.width()) {
            return true
        } else {
            return false
        }
    };
    $.Utils.options = function(string) {
        if ($.isPlainObject(string)) return string;
        var start = (string ? string.indexOf("{") : -1),
            options = {};
        if (start != -1) {
            try {
                options = (new Function("", "var json = " + string.substr(start) + "; return JSON.parse(JSON.stringify(json));"))()
            } catch (e) {}
        }
        return options
    };
    $.Utils.events = {};
    $.Utils.events.click = $.support.touch ? 'tap' : 'click';
    $.langdirection = $html.attr("dir") == "rtl" ? "right" : "left";
    $(function() {
        if (!$.support.mutationobserver) return;
        var observer = new $.support.mutationobserver($.Utils.debounce(function(mutations) {
            $(doc).trigger("domready")
        }, 300));
        observer.observe(document.body, {
            childList: true,
            subtree: true
        })
    });
    $html.addClass($.support.touch ? "touch" : "no-touch")
}(jQuery, window, document));
App.controller('VectorMapController', ['$scope', function($scope) {
    'use strict';
    $scope.seriesData = {
        'CA': 11100,
        'DE': 2510,
        'FR': 3710,
        'AU': 5710,
        'GB': 8310,
        'RU': 9310,
        'BR': 6610,
        'IN': 7810,
        'CN': 4310,
        'US': 839,
        'SA': 410
    };
    $scope.markersData = [{
        latLng: [41.90, 12.45],
        name: 'Vatican City'
    }, {
        latLng: [43.73, 7.41],
        name: 'Monaco'
    }, {
        latLng: [-0.52, 166.93],
        name: 'Nauru'
    }, {
        latLng: [-8.51, 179.21],
        name: 'Tuvalu'
    }, {
        latLng: [7.11, 171.06],
        name: 'Marshall Islands'
    }, {
        latLng: [17.3, -62.73],
        name: 'Saint Kitts and Nevis'
    }, {
        latLng: [3.2, 73.22],
        name: 'Maldives'
    }, {
        latLng: [35.88, 14.5],
        name: 'Malta'
    }, {
        latLng: [41.0, -71.06],
        name: 'New England'
    }, {
        latLng: [12.05, -61.75],
        name: 'Grenada'
    }, {
        latLng: [13.16, -59.55],
        name: 'Barbados'
    }, {
        latLng: [17.11, -61.85],
        name: 'Antigua and Barbuda'
    }, {
        latLng: [-4.61, 55.45],
        name: 'Seychelles'
    }, {
        latLng: [7.35, 134.46],
        name: 'Palau'
    }, {
        latLng: [42.5, 1.51],
        name: 'Andorra'
    }]
}]);
App.directive('href', function() {
    return {
        restrict: 'A',
        compile: function(element, attr) {
            return function(scope, element) {
                if (attr.ngClick || attr.href === '' || attr.href === '#') {
                    if (!element.hasClass('dropdown-toggle')) element.on('click', function(e) {
                        e.preventDefault();
                        e.stopPropagation()
                    })
                }
            }
        }
    }
});
App.directive("animateEnabled", ["$animate", function($animate) {
    return {
        link: function(scope, element, attrs) {
            scope.$watch(function() {
                return scope.$eval(attrs.animateEnabled, scope)
            }, function(newValue) {
                $animate.enabled(!!newValue, element)
            })
        }
    }
}]);
App.directive('chosen', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            scope.$watch(attr.chosen, function(oldVal, newVal) {
                element.trigger('chosen:updated')
            });
            scope.$watch(attr.ngModel, function() {
                element.trigger('chosen:updated')
            });
            if ($.fn.chosen) element.chosen()
        }
    }
});
App.directive('classyloader', function($timeout) {
    'use strict';
    var $scroller = $(window),
        inViewFlagClass = 'js-is-in-view';
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            $timeout(function() {
                var $element = $(element),
                    options = $element.data();
                if (options) {
                    if (options.triggerInView) {
                        $scroller.scroll(function() {
                            checkLoaderInVIew($element, options)
                        });
                        checkLoaderInVIew($element, options)
                    } else startLoader($element, options)
                }
            }, 0);

            function checkLoaderInVIew(element, options) {
                var offset = -20;
                if (!element.hasClass(inViewFlagClass) && $.Utils.isInView(element, {
                        topoffset: offset
                    })) {
                    startLoader(element, options)
                }
            }

            function startLoader(element, options) {
                element.ClassyLoader(options).addClass(inViewFlagClass)
            }
        }
    }
});
App.directive('resetKey', ['$state', '$rootScope', function($state, $rootScope) {
    'use strict';
    return {
        restrict: 'A',
        scope: {
            resetKey: '='
        },
        link: function(scope, element, attrs) {
            scope.resetKey = attrs.resetKey
        },
        controller: function($scope, $element) {
            $element.on('click', function(e) {
                e.preventDefault();
                if ($scope.resetKey) {
                    delete $rootScope.$storage[$scope.resetKey];
                    $state.go($state.current, {}, {
                        reload: true
                    })
                } else {
                    $.error('No storage key specified for reset.')
                }
            })
        }
    }
}]);
App.directive('filestyle', function() {
    return {
        restrict: 'A',
        controller: function($scope, $element) {
            var $elem = $($element);
            $elem.filestyle({
                classInput: $elem.data('classinput')
            })
        }
    }
});
App.directive('flatdoc', ['$location', function($location) {
    return {
        restrict: "EA",
        template: "<div role='flatdoc'><div role='flatdoc-menu'></div><div role='flatdoc-content'></div></div>",
        link: function(scope, element, attrs) {
            Flatdoc.run({
                fetcher: Flatdoc.file(attrs.src)
            });
            var $root = $('html, body');
            $(document).on('flatdoc:ready', function() {
                var docMenu = $('[role="flatdoc-menu"]');
                docMenu.find('a').on('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    var $this = $(this);
                    docMenu.find('a.active').removeClass('active');
                    $this.addClass('active');
                    $root.animate({
                        scrollTop: $(this.getAttribute('href')).offset().top - ($('.topnavbar').height() + 10)
                    }, 800)
                })
            })
        }
    }
}]);
App.directive('formWizard', function() {
    'use strict';
    if (!$.fn.bwizard) return;
    return {
        restrict: 'EA',
        link: function(scope, element, attrs) {
            var wizard = $(element).children('.form-wizard'),
                validate = attrs.validateStep;
            if (validate) {
                wizard.bwizard({
                    clickableSteps: false,
                    validating: function(e, ui) {
                        var $this = $(this),
                            form = $this.parent(),
                            group = form.find('.bwizard-activated');
                        if (false === form.parsley().validate(group[0].id)) {
                            e.preventDefault();
                            return
                        }
                    }
                })
            } else {
                wizard.bwizard()
            }
        }
    }
});
App.directive('toggleFullscreen', function() {
    'use strict';
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.on('click', function(e) {
                e.preventDefault();
                if (screenfull.enabled) {
                    screenfull.toggle();
                    if (screenfull.isFullscreen) $(this).children('em').removeClass('fa-expand').addClass('fa-compress');
                    else $(this).children('em').removeClass('fa-compress').addClass('fa-expand')
                } else {
                    $.error('Fullscreen not enabled')
                }
            })
        }
    }
});
App.directive('gmap', ['$window', 'gmap', function($window, gmap) {
    'use strict';
    var MapStyles = [{
        featureType: 'water',
        stylers: [{
            visibility: 'on'
        }, {
            color: '#bdd1f9'
        }]
    }, {
        featureType: 'all',
        elementType: 'labels.text.fill',
        stylers: [{
            color: '#334165'
        }]
    }, {
        featureType: 'landscape',
        stylers: [{
            color: '#e9ebf1'
        }]
    }, {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{
            color: '#c5c6c6'
        }]
    }, {
        featureType: 'road.arterial',
        elementType: 'geometry',
        stylers: [{
            color: '#fff'
        }]
    }, {
        featureType: 'road.local',
        elementType: 'geometry',
        stylers: [{
            color: '#fff'
        }]
    }, {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{
            color: '#d8dbe0'
        }]
    }, {
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [{
            color: '#cfd5e0'
        }]
    }, {
        featureType: 'administrative',
        stylers: [{
            visibility: 'on'
        }, {
            lightness: 33
        }]
    }, {
        featureType: 'poi.park',
        elementType: 'labels',
        stylers: [{
            visibility: 'on'
        }, {
            lightness: 20
        }]
    }, {
        featureType: 'road',
        stylers: [{
            color: '#d8dbe0',
            lightness: 20
        }]
    }];
    gmap.setStyle(MapStyles);
    $($window).resize(function() {
        gmap.autocenter()
    });
    return {
        restrict: 'A',
        link: function(scope, element) {
            gmap.init(element)
        }
    }
}]);
App.directive('loadCss', function() {
    'use strict';
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.on('click', function(e) {
                if (element.is('a')) e.preventDefault();
                var uri = attrs.loadCss,
                    link;
                if (uri) {
                    link = createLink(uri);
                    if (!link) {
                        $.error('Error creating stylesheet link element.')
                    }
                } else {
                    $.error('No stylesheet location defined.')
                }
            })
        }
    };

    function createLink(uri) {
        var linkId = 'autoloaded-stylesheet',
            oldLink = $('#' + linkId).attr('id', linkId + '-old');
        $('head').append($('<link/>').attr({
            'id': linkId,
            'rel': 'stylesheet',
            'href': uri
        }));
        if (oldLink.length) {
            oldLink.remove()
        }
        return $('#' + linkId)
    }
});
App.directive('markdownarea', function() {
    'use strict';
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var area = $(element),
                Markdownarea = $.fn["markdownarea"],
                options = $.Utils.options(attrs.markdownarea);
            var obj = new Markdownarea(area, $.Utils.options(attrs.markdownarea))
        }
    }
});
(function($, window, document) {
    'use strict';
    var Markdownarea = function(element, options) {
        var $element = $(element);
        if ($element.data("markdownarea")) return;
        this.element = $element;
        this.options = $.extend({}, Markdownarea.defaults, options);
        this.marked = this.options.marked || marked;
        this.CodeMirror = this.options.CodeMirror || CodeMirror;
        this.marked.setOptions({
            gfm: true,
            tables: true,
            breaks: true,
            pedantic: true,
            sanitize: false,
            smartLists: true,
            smartypants: false,
            langPrefix: 'lang-'
        });
        this.init();
        this.element.data("markdownarea", this)
    };
    $.extend(Markdownarea.prototype, {
        init: function() {
            var $this = this,
                tpl = Markdownarea.template;
            tpl = tpl.replace(/\{\:lblPreview\}/g, this.options.lblPreview);
            tpl = tpl.replace(/\{\:lblCodeview\}/g, this.options.lblCodeview);
            this.markdownarea = $(tpl);
            this.content = this.markdownarea.find(".uk-markdownarea-content");
            this.toolbar = this.markdownarea.find(".uk-markdownarea-toolbar");
            this.preview = this.markdownarea.find(".uk-markdownarea-preview").children().eq(0);
            this.code = this.markdownarea.find(".uk-markdownarea-code");
            this.element.before(this.markdownarea).appendTo(this.code);
            this.editor = this.CodeMirror.fromTextArea(this.element[0], this.options.codemirror);
            this.editor.markdownarea = this;
            this.editor.on("change", (function() {
                var render = function() {
                    var value = $this.editor.getValue();
                    $this.currentvalue = String(value);
                    $this.element.trigger("markdownarea-before", [$this]);
                    $this.applyPlugins();
                    $this.marked($this.currentvalue, function(err, markdown) {
                        if (err) throw err;
                        $this.preview.html(markdown);
                        $this.element.val($this.editor.getValue()).trigger("markdownarea-update", [$this])
                    })
                };
                render();
                return $.Utils.debounce(render, 150)
            })());
            this.code.find(".CodeMirror").css("height", this.options.height);
            this._buildtoolbar();
            this.fit();
            $(window).on("resize", $.Utils.debounce(function() {
                $this.fit()
            }, 200));
            var previewContainer = $this.preview.parent(),
                codeContent = this.code.find('.CodeMirror-sizer'),
                codeScroll = this.code.find('.CodeMirror-scroll').on('scroll', $.Utils.debounce(function() {
                    if ($this.markdownarea.attr("data-mode") == "tab") return;
                    var codeHeight = codeContent.height() - codeScroll.height(),
                        previewHeight = previewContainer[0].scrollHeight - previewContainer.height(),
                        ratio = previewHeight / codeHeight,
                        previewPostition = codeScroll.scrollTop() * ratio;
                    previewContainer.scrollTop(previewPostition)
                }, 10));
            this.markdownarea.on("click", ".uk-markdown-button-markdown, .uk-markdown-button-preview", function(e) {
                e.preventDefault();
                if ($this.markdownarea.attr("data-mode") == "tab") {
                    $this.markdownarea.find(".uk-markdown-button-markdown, .uk-markdown-button-preview").removeClass("uk-active").filter(this).addClass("uk-active");
                    $this.activetab = $(this).hasClass("uk-markdown-button-markdown") ? "code" : "preview";
                    $this.markdownarea.attr("data-active-tab", $this.activetab)
                }
            });
            this.preview.parent().css("height", this.code.height())
        },
        applyPlugins: function() {
            var $this = this,
                plugins = Object.keys(Markdownarea.plugins),
                plgs = Markdownarea.plugins;
            this.markers = {};
            if (plugins.length) {
                var lines = this.currentvalue.split("\n");
                plugins.forEach(function(name) {
                    this.markers[name] = []
                }, this);
                for (var line = 0, max = lines.length; line < max; line++) {
                    (function(line) {
                        plugins.forEach(function(name) {
                            var i = 0;
                            lines[line] = lines[line].replace(plgs[name].identifier, function() {
                                var replacement = plgs[name].cb({
                                    "area": $this,
                                    "found": arguments,
                                    "line": line,
                                    "pos": i++,
                                    "uid": [name, line, i, (new Date().getTime()) + "RAND" + (Math.ceil(Math.random() * 100000))].join('-'),
                                    "replace": function(strwith) {
                                        var src = this.area.editor.getLine(this.line),
                                            start = src.indexOf(this.found[0]),
                                            end = start + this.found[0].length;
                                        this.area.editor.replaceRange(strwith, {
                                            "line": this.line,
                                            "ch": start
                                        }, {
                                            "line": this.line,
                                            "ch": end
                                        })
                                    }
                                });
                                return replacement
                            })
                        })
                    }(line))
                }
                this.currentvalue = lines.join("\n")
            }
        },
        _buildtoolbar: function() {
            if (!(this.options.toolbar && this.options.toolbar.length)) return;
            var $this = this,
                bar = [];
            this.options.toolbar.forEach(function(cmd) {
                if (Markdownarea.commands[cmd]) {
                    var title = Markdownarea.commands[cmd].title ? Markdownarea.commands[cmd].title : cmd;
                    bar.push('<li><a data-markdownarea-cmd="' + cmd + '" title="' + title + '" data-toggle="tooltip">' + Markdownarea.commands[cmd].label + '</a></li>');
                    if (Markdownarea.commands[cmd].shortcut) {
                        $this.registerShortcut(Markdownarea.commands[cmd].shortcut, Markdownarea.commands[cmd].action)
                    }
                }
            });
            this.toolbar.html(bar.join("\n"));
            this.markdownarea.on("click", "a[data-markdownarea-cmd]", function() {
                var cmd = $(this).data("markdownareaCmd");
                if (cmd && Markdownarea.commands[cmd] && (!$this.activetab || $this.activetab == "code" || cmd == "fullscreen")) {
                    Markdownarea.commands[cmd].action.apply($this, [$this.editor])
                }
            })
        },
        fit: function() {
            var mode = this.options.mode;
            if (mode == "split" && this.markdownarea.width() < this.options.maxsplitsize) {
                mode = "tab"
            }
            if (mode == "tab") {
                if (!this.activetab) {
                    this.activetab = "code";
                    this.markdownarea.attr("data-active-tab", this.activetab)
                }
                this.markdownarea.find(".uk-markdown-button-markdown, .uk-markdown-button-preview").removeClass("uk-active").filter(this.activetab == "code" ? '.uk-markdown-button-markdown' : '.uk-markdown-button-preview').addClass("uk-active")
            }
            this.editor.refresh();
            this.preview.parent().css("height", this.code.height());
            this.markdownarea.attr("data-mode", mode)
        },
        registerShortcut: function(combination, callback) {
            var $this = this;
            combination = $.isArray(combination) ? combination : [combination];
            for (var i = 0, max = combination.length; i < max; i++) {
                var map = {};
                map[combination[i]] = function() {
                    callback.apply($this, [$this.editor])
                };
                $this.editor.addKeyMap(map)
            }
        },
        getMode: function() {
            var pos = this.editor.getDoc().getCursor();
            return this.editor.getTokenAt(pos).state.base.htmlState ? 'html' : 'markdown'
        }
    });
    $.fn.markdownarea = function(options) {
        return this.each(function() {
            var ele = $(this);
            if (!ele.data("markdownarea")) {
                var obj = new Markdownarea(ele, options)
            }
        })
    };
    var baseReplacer = function(replace, editor) {
        var text = editor.getSelection(),
            markdown = replace.replace('$1', text);
        editor.replaceSelection(markdown, 'end')
    };
    Markdownarea.commands = {
        "fullscreen": {
            "title": 'Fullscreen',
            "label": '<i class="fa fa-expand"></i>',
            "action": function(editor) {
                editor.markdownarea.markdownarea.toggleClass("uk-markdownarea-fullscreen");
                $('html').toggleClass("markdownarea-fullscreen");
                $('html, body').scrollTop(0);
                var wrap = editor.getWrapperElement();
                if (editor.markdownarea.markdownarea.hasClass("uk-markdownarea-fullscreen")) {
                    editor.state.fullScreenRestore = {
                        scrollTop: window.pageYOffset,
                        scrollLeft: window.pageXOffset,
                        width: wrap.style.width,
                        height: wrap.style.height
                    };
                    wrap.style.width = "";
                    wrap.style.height = editor.markdownarea.content.height() + "px";
                    document.documentElement.style.overflow = "hidden"
                } else {
                    document.documentElement.style.overflow = "";
                    var info = editor.state.fullScreenRestore;
                    wrap.style.width = info.width;
                    wrap.style.height = info.height;
                    window.scrollTo(info.scrollLeft, info.scrollTop)
                }
                editor.refresh();
                editor.markdownarea.preview.parent().css("height", editor.markdownarea.code.height())
            }
        },
        "bold": {
            "title": "Bold",
            "label": '<i class="fa fa-bold"></i>',
            "shortcut": ['Ctrl-B', 'Cmd-B'],
            "action": function(editor) {
                baseReplacer(this.getMode() == 'html' ? "<strong>$1</strong>" : "**$1**", editor)
            }
        },
        "italic": {
            "title": "Italic",
            "label": '<i class="fa fa-italic"></i>',
            "action": function(editor) {
                baseReplacer(this.getMode() == 'html' ? "<em>$1</em>" : "*$1*", editor)
            }
        },
        "strike": {
            "title": "Strikethrough",
            "label": '<i class="fa fa-strikethrough"></i>',
            "action": function(editor) {
                baseReplacer(this.getMode() == 'html' ? "<del>$1</del>" : "~~$1~~", editor)
            }
        },
        "blockquote": {
            "title": "Blockquote",
            "label": '<i class="fa fa-quote-right"></i>',
            "action": function(editor) {
                baseReplacer(this.getMode() == 'html' ? "<blockquote><p>$1</p></blockquote>" : "> $1", editor)
            }
        },
        "link": {
            "title": "Link",
            "label": '<i class="fa fa-link"></i>',
            "action": function(editor) {
                baseReplacer(this.getMode() == 'html' ? '<a href="http://">$1</a>' : "[$1](http://)", editor)
            }
        },
        "picture": {
            "title": "Picture",
            "label": '<i class="fa fa-picture-o"></i>',
            "action": function(editor) {
                baseReplacer(this.getMode() == 'html' ? '<img src="http://" alt="$1">' : "![$1](http://)", editor)
            }
        },
        "listUl": {
            "title": "Unordered List",
            "label": '<i class="fa fa-list-ul"></i>',
            "action": function(editor) {
                if (this.getMode() == 'markdown') baseReplacer("* $1", editor)
            }
        },
        "listOl": {
            "title": "Ordered List",
            "label": '<i class="fa fa-list-ol"></i>',
            "action": function(editor) {
                if (this.getMode() == 'markdown') baseReplacer("1. $1", editor)
            }
        }
    };
    Markdownarea.defaults = {
        "mode": "split",
        "height": 500,
        "maxsplitsize": 1000,
        "codemirror": {
            mode: 'gfm',
            tabMode: 'indent',
            tabindex: "2",
            lineWrapping: true,
            dragDrop: false,
            autoCloseTags: true,
            matchTags: true
        },
        "toolbar": ["bold", "italic", "strike", "link", "picture", "blockquote", "listUl", "listOl"],
        "lblPreview": "Preview",
        "lblCodeview": "Markdown"
    };
    Markdownarea.template = '<div class="uk-markdownarea uk-clearfix" data-mode="split">' + '<div class="uk-markdownarea-navbar">' + '<ul class="uk-markdownarea-navbar-nav uk-markdownarea-toolbar"></ul>' + '<div class="uk-markdownarea-navbar-flip">' + '<ul class="uk-markdownarea-navbar-nav">' + '<li class="uk-markdown-button-markdown"><a>{:lblCodeview}</a></li>' + '<li class="uk-markdown-button-preview"><a>{:lblPreview}</a></li>' + '<li><a data-markdownarea-cmd="fullscreen" data-toggle="tooltip" title="Zen Mode"><i class="fa fa-expand"></i></a></li>' + '</ul>' + '</div>' + '</div>' + '<div class="uk-markdownarea-content">' + '<div class="uk-markdownarea-code"></div>' + '<div class="uk-markdownarea-preview"><div></div></div>' + '</div>' + '</div>';
    Markdownarea.plugins = {};
    Markdownarea.addPlugin = function(name, identifier, callback) {
        Markdownarea.plugins[name] = {
            "identifier": identifier,
            "cb": callback
        }
    };
    $.fn["markdownarea"] = Markdownarea;
    $(function() {
        $("textarea[data-uk-markdownarea]").each(function() {
            var area = $(this),
                obj;
            if (!area.data("markdownarea")) {
                obj = new Markdownarea(area, $.Utils.options(area.attr("data-uk-markdownarea")))
            }
        })
    });
    return Markdownarea
}(jQuery, window, document));
App.directive('masked', function() {
    return {
        restrict: 'A',
        controller: function($scope, $element) {
            var $elem = $($element);
            if ($.fn.inputmask) $elem.inputmask()
        }
    }
});
App.directive('searchOpen', ['navSearch', function(navSearch) {
    'use strict';
    return {
        restrict: 'A',
        controller: function($scope, $element) {
            $element.on('click', function(e) {
                e.stopPropagation()
            }).on('click', navSearch.toggle)
        }
    }
}]).directive('searchDismiss', ['navSearch', function(navSearch) {
    'use strict';
    var inputSelector = '.navbar-form input[type="text"]';
    return {
        restrict: 'A',
        controller: function($scope, $element) {
            $(inputSelector).on('click', function(e) {
                e.stopPropagation()
            }).on('keyup', function(e) {
                if (e.keyCode == 27) navSearch.dismiss()
            });
            $(document).on('click', navSearch.dismiss);
            $element.on('click', function(e) {
                e.stopPropagation()
            }).on('click', navSearch.dismiss)
        }
    }
}]);
App.directive('notify', function($window) {
    return {
        restrict: 'A',
        controller: function($scope, $element) {
            $element.on('click', function(e) {
                e.preventDefault();
                notifyNow($element)
            })
        }
    };

    function notifyNow(elem) {
        var $element = $(elem),
            message = $element.data('message'),
            options = $element.data('options');
        if (!message) $.error('Notify: No message specified');
        $.notify(message, options || {})
    }
});
(function($, window, document) {
    var containers = {},
        messages = {},
        notify = function(options) {
            if ($.type(options) == 'string') {
                options = {
                    message: options
                }
            }
            if (arguments[1]) {
                options = $.extend(options, $.type(arguments[1]) == 'string' ? {
                    status: arguments[1]
                } : arguments[1])
            }
            return (new Message(options)).show()
        },
        closeAll = function(group, instantly) {
            if (group) {
                for (var id in messages) {
                    if (group === messages[id].group) messages[id].close(instantly)
                }
            } else {
                for (var id in messages) {
                    messages[id].close(instantly)
                }
            }
        };
    var Message = function(options) {
        var $this = this;
        this.options = $.extend({}, Message.defaults, options);
        this.uuid = "ID" + (new Date().getTime()) + "RAND" + (Math.ceil(Math.random() * 100000));
        this.element = $(['<div class="uk-notify-message alert-dismissable">', '<a class="close">&times;</a>', '<div>' + this.options.message + '</div>', '</div>'].join('')).data("notifyMessage", this);
        if (this.options.status) {
            this.element.addClass('alert alert-' + this.options.status);
            this.currentstatus = this.options.status
        }
        this.group = this.options.group;
        messages[this.uuid] = this;
        if (!containers[this.options.pos]) {
            containers[this.options.pos] = $('<div class="uk-notify uk-notify-' + this.options.pos + '"></div>').appendTo('body').on("click", ".uk-notify-message", function() {
                $(this).data("notifyMessage").close()
            })
        }
    };
    $.extend(Message.prototype, {
        uuid: false,
        element: false,
        timout: false,
        currentstatus: "",
        group: false,
        show: function() {
            if (this.element.is(":visible")) return;
            var $this = this;
            containers[this.options.pos].show().prepend(this.element);
            var marginbottom = parseInt(this.element.css("margin-bottom"), 10);
            this.element.css({
                "opacity": 0,
                "margin-top": -1 * this.element.outerHeight(),
                "margin-bottom": 0
            }).animate({
                "opacity": 1,
                "margin-top": 0,
                "margin-bottom": marginbottom
            }, function() {
                if ($this.options.timeout) {
                    var closefn = function() {
                        $this.close()
                    };
                    $this.timeout = setTimeout(closefn, $this.options.timeout);
                    $this.element.hover(function() {
                        clearTimeout($this.timeout)
                    }, function() {
                        $this.timeout = setTimeout(closefn, $this.options.timeout)
                    })
                }
            });
            return this
        },
        close: function(instantly) {
            var $this = this,
                finalize = function() {
                    $this.element.remove();
                    if (!containers[$this.options.pos].children().length) {
                        containers[$this.options.pos].hide()
                    }
                    delete messages[$this.uuid]
                };
            if (this.timeout) clearTimeout(this.timeout);
            if (instantly) {
                finalize()
            } else {
                this.element.animate({
                    "opacity": 0,
                    "margin-top": -1 * this.element.outerHeight(),
                    "margin-bottom": 0
                }, function() {
                    finalize()
                })
            }
        },
        content: function(html) {
            var container = this.element.find(">div");
            if (!html) {
                return container.html()
            }
            container.html(html);
            return this
        },
        status: function(status) {
            if (!status) {
                return this.currentstatus
            }
            this.element.removeClass('alert alert-' + this.currentstatus).addClass('alert alert-' + status);
            this.currentstatus = status;
            return this
        }
    });
    Message.defaults = {
        message: "",
        status: "normal",
        timeout: 5000,
        group: null,
        pos: 'top-center'
    };
    $["notify"] = notify;
    $["notify"].message = Message;
    $["notify"].closeAll = closeAll;
    return notify
}(jQuery, window, document));
App.directive("now", ['dateFilter', '$interval', function(dateFilter, $interval) {
    return {
        restrict: 'E',
        link: function(scope, element, attrs) {
            var format = attrs.format;

            function updateTime() {
                var dt = dateFilter(new Date(), format);
                element.text(dt)
            }
            updateTime();
            $interval(updateTime, 1000)
        }
    }
}]);
App.directive('paneltool', function() {
    var templates = {
        collapse: "<a href='#' panel-collapse='' data-toggle='tooltip' title='Collapse Panel' ng-click='{{panelId}} = !{{panelId}}' ng-init='{{panelId}}=false'>                 <em ng-show='{{panelId}}' class='fa fa-plus'></em>                 <em ng-show='!{{panelId}}' class='fa fa-minus'></em>               </a>",
        dismiss: "<a href='#' panel-dismiss='' data-toggle='tooltip' title='Close Panel'>               <em class='fa fa-times'></em>             </a>",
        refresh: "<a href='#' panel-refresh='' data-toggle='tooltip' data-spinner='{{spinner}}' title='Refresh Panel'>               <em class='fa fa-refresh'></em>             </a>"
    };
    return {
        restrict: 'E',
        template: function(elem, attrs) {
            var temp = '';
            if (attrs.toolCollapse) temp += templates.collapse.replace(/{{panelId}}/g, (elem.parent().parent().attr('id')));
            if (attrs.toolDismiss) temp += templates.dismiss;
            if (attrs.toolRefresh) temp += templates.refresh.replace(/{{spinner}}/g, attrs.toolRefresh);
            return temp
        },
        link: function(scope, element, attrs) {
            element.addClass('pull-right')
        }
    }
}).directive('panelDismiss', function() {
    'use strict';
    return {
        restrict: 'A',
        controller: function($scope, $element) {
            var removeEvent = 'panel-remove',
                removedEvent = 'panel-removed';
            $element.on('click', function() {
                var parent = $(this).closest('.panel');
                if ($.support.animation) {
                    parent.animo({
                        animation: 'bounceOut'
                    }, removeElement)
                } else removeElement();

                function removeElement() {
                    $.when(parent.trigger(removeEvent, [parent])).done(destroyPanel)
                }

                function destroyPanel() {
                    var col = parent.parent();
                    parent.remove();
                    col.trigger(removedEvent).filter(function() {
                        var el = $(this);
                        return (el.is('[class*="col-"]:not(.sortable)') && el.children('*').length === 0)
                    }).remove()
                }
            })
        }
    }
}).directive('panelCollapse', ['$timeout', function($timeout) {
    'use strict';
    var storageKeyName = 'panelState',
        storage;
    return {
        restrict: 'A',
        controller: function($scope, $element) {
            var $elem = $($element),
                parent = $elem.closest('.panel'),
                panelId = parent.attr('id');
            storage = $scope.$storage;
            var currentState = loadPanelState(panelId);
            if (typeof currentState !== undefined) {
                $timeout(function() {
                    $scope[panelId] = currentState
                }, 10)
            }
            $element.bind('click', function() {
                savePanelState(panelId, !$scope[panelId])
            })
        }
    };

    function savePanelState(id, state) {
        if (!id) return false;
        var data = angular.fromJson(storage[storageKeyName]);
        if (!data) {
            data = {}
        }
        data[id] = state;
        storage[storageKeyName] = angular.toJson(data)
    }

    function loadPanelState(id) {
        if (!id) return false;
        var data = angular.fromJson(storage[storageKeyName]);
        if (data) {
            return data[id]
        }
    }
}]).directive('panelRefresh', function() {
    'use strict';
    return {
        restrict: 'A',
        controller: function($scope, $element) {
            var refreshEvent = 'panel-refresh',
                csspinnerClass = 'csspinner',
                defaultSpinner = 'standard';

            function removeSpinner() {
                this.removeClass(csspinnerClass)
            }
            $element.on('click', function() {
                var $this = $(this),
                    panel = $this.parents('.panel').eq(0),
                    spinner = $this.data('spinner') || defaultSpinner;
                panel.addClass(csspinnerClass + ' ' + spinner);
                panel.removeSpinner = removeSpinner;
                $this.trigger(refreshEvent, [panel])
            })
        }
    }
});
(function($, window, document) {
    'use strict';
    $(document).on('panel-refresh', '.panel.panel-demo', function(e, panel) {
        setTimeout(function() {
            panel.removeSpinner()
        }, 3000)
    })
}(jQuery, window, document));
App.directive('animate', function($window) {
    'use strict';
    var $scroller = $(window).add('body, .wrapper');
    return {
        restrict: 'A',
        link: function(scope, elem, attrs) {
            var $elem = $(elem),
                offset = $elem.data('offset'),
                delay = $elem.data('delay') || 100,
                animation = $elem.data('play') || 'bounce';
            if (typeof offset !== 'undefined') {
                testAnimation($elem);
                $scroller.scroll(function() {
                    testAnimation($elem)
                })
            }

            function testAnimation(element) {
                if (!element.hasClass('anim-running') && $.Utils.isInView(element, {
                        topoffset: offset
                    })) {
                    element.addClass('anim-running');
                    setTimeout(function() {
                        element.addClass('anim-done').animo({
                            animation: animation,
                            duration: 0.7
                        })
                    }, delay)
                }
            }
            $elem.on('click', function() {
                var $elem = $(this),
                    targetSel = $elem.data('target'),
                    animation = $elem.data('play') || 'bounce',
                    target = $(targetSel);
                if (target && target) {
                    target.animo({
                        animation: animation
                    })
                }
            })
        }
    }
});
App.directive('scrollable', function() {
    return {
        restrict: 'EA',
        link: function(scope, elem, attrs) {
            var defaultHeight = 250;
            elem.slimScroll({
                height: (attrs.height || defaultHeight)
            })
        }
    }
});
App.directive('sidebar', ['$window', 'APP_MEDIAQUERY', function($window, mq) {
    var $win = $($window);
    var $html = $('html');
    var $body = $('body');
    var $scope;
    var $sidebar;
    return {
        restrict: 'EA',
        template: '<nav class="sidebar" ng-transclude></nav>',
        transclude: true,
        replace: true,
        link: function(scope, element, attrs) {
            $scope = scope;
            $sidebar = element;
            var eventName = isTouch() ? 'click' : 'mouseenter';
            $sidebar.on(eventName, '.nav > li', function() {
                if (isSidebarCollapsed() && !isMobile()) toggleMenuItem($(this))
            });
            scope.$on('closeSidebarMenu', function() {
                removeFloatingNav();
                $('.sidebar li.open').removeClass('open')
            })
        }
    };

    function toggleTouchItem($element) {
        $element.siblings('li').removeClass('open').end().toggleClass('open')
    }

    function toggleMenuItem($listItem) {
        removeFloatingNav();
        var ul = $listItem.children('ul');
        if (!ul.length) return;
        if ($listItem.hasClass('open')) {
            toggleTouchItem($listItem);
            return
        }
        var $aside = $('.aside');
        var mar = $scope.app.layout.isFixed ? parseInt($aside.css('margin-top'), 0) : 0;
        var subNav = ul.clone().appendTo($aside);
        toggleTouchItem($listItem);
        var itemTop = ($listItem.position().top + mar) - $sidebar.scrollTop();
        var vwHeight = $win.height();
        subNav.addClass('nav-floating').css({
            position: $scope.app.layout.isFixed ? 'fixed' : 'absolute',
            top: itemTop,
            bottom: (subNav.outerHeight(true) + itemTop > vwHeight) ? 0 : 'auto'
        });
        subNav.on('mouseleave', function() {
            toggleTouchItem($listItem);
            subNav.remove()
        })
    }

    function removeFloatingNav() {
        $('.sidebar-subnav.nav-floating').remove()
    }

    function isTouch() {
        return $html.hasClass('touch')
    }

    function isSidebarCollapsed() {
        return $body.hasClass('aside-collapsed')
    }

    function isSidebarToggled() {
        return $body.hasClass('aside-toggled')
    }

    function isMobile() {
        return $win.width() < mq.tablet
    }
}]);
App.directive('skycon', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var skycons = new Skycons({
                'color': (attrs.color || 'white')
            });
            element.html('<canvas width="' + attrs.width + '" height="' + attrs.height + '"></canvas>');
            skycons.add(element.children()[0], attrs.skycon);
            skycons.play()
        }
    }
});
App.directive('sparkline', ['$timeout', '$window', function($timeout, $window) {
    'use strict';
    return {
        restrict: 'EA',
        controller: function($scope, $element) {
            var runSL = function() {
                initSparLine($element)
            };
            $timeout(runSL)
        }
    };

    function initSparLine($element) {
        var options = $element.data();
        options.type = options.type || 'bar';
        options.disableHiddenCheck = true;
        $element.sparkline('html', options);
        if (options.resize) {
            $(window).resize(function() {
                $element.sparkline('html', options)
            })
        }
    }
}]);
App.directive('checkAll', function() {
    'use strict';
    return {
        restrict: 'A',
        controller: function($scope, $element) {
            $element.on('change', function() {
                var $this = $(this),
                    index = $this.index() + 1,
                    checkbox = $this.find('input[type="checkbox"]'),
                    table = $this.parents('table');
                table.find('tbody > tr > td:nth-child(' + index + ') input[type="checkbox"]').prop('checked', checkbox[0].checked)
            })
        }
    }
});
App.directive('tagsinput', function() {
    return {
        restrict: 'A',
        controller: function($scope, $element) {
            var $elem = $($element);
            if ($.fn.tagsinput) $elem.tagsinput()
        }
    }
});
App.directive('toggleState', ['toggleStateService', function(toggle) {
    'use strict';
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var $body = $('body');
            $(element).on('click', function(e) {
                e.preventDefault();
                var classname = attrs.toggleState;
                if (classname) {
                    if ($body.hasClass(classname)) {
                        $body.removeClass(classname);
                        if (!attrs.noPersist) toggle.removeState(classname)
                    } else {
                        $body.addClass(classname);
                        if (!attrs.noPersist) toggle.addState(classname)
                    }
                }
            })
        }
    }
}]);
App.directive('uiSlider', function() {
    return {
        restrict: 'A',
        controller: function($scope, $element) {
            var $elem = $($element);
            if ($.fn.slider) $elem.slider()
        }
    }
});
App.directive('validateForm', function() {
    return {
        restrict: 'A',
        controller: function($scope, $element) {
            var $elem = $($element);
            if ($.fn.parsley) $elem.parsley()
        }
    }
});
App.directive('vectorMap', ['vectorMap', function(vectorMap) {
    'use strict';
    var defaultColors = {
        markerColor: '#23b7e5',
        bgColor: 'transparent',
        scaleColors: ['#878c9a'],
        regionFill: '#bbbec6'
    };
    return {
        restrict: 'EA',
        link: function(scope, element, attrs) {
            var mapHeight = attrs.height || '300',
                options = {
                    markerColor: attrs.markerColor || defaultColors.markerColor,
                    bgColor: attrs.bgColor || defaultColors.bgColor,
                    scale: attrs.scale || 1,
                    scaleColors: attrs.scaleColors || defaultColors.scaleColors,
                    regionFill: attrs.regionFill || defaultColors.regionFill,
                    mapName: attrs.mapName || 'world_mill_en'
                };
            element.css('height', mapHeight);
            vectorMap.init(element, options, scope.seriesData, scope.markersData)
        }
    }
}]);
App.service('browser', function() {
    "use strict";
    var matched, browser;
    var uaMatch = function(ua) {
        ua = ua.toLowerCase();
        var match = /(opr)[\/]([\w.]+)/.exec(ua) || /(chrome)[ \/]([\w.]+)/.exec(ua) || /(version)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(ua) || /(webkit)[ \/]([\w.]+)/.exec(ua) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) || /(msie) ([\w.]+)/.exec(ua) || ua.indexOf("trident") >= 0 && /(rv)(?::| )([\w.]+)/.exec(ua) || ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || [];
        var platform_match = /(ipad)/.exec(ua) || /(iphone)/.exec(ua) || /(android)/.exec(ua) || /(windows phone)/.exec(ua) || /(win)/.exec(ua) || /(mac)/.exec(ua) || /(linux)/.exec(ua) || /(cros)/i.exec(ua) || [];
        return {
            browser: match[3] || match[1] || "",
            version: match[2] || "0",
            platform: platform_match[0] || ""
        }
    };
    matched = uaMatch(window.navigator.userAgent);
    browser = {};
    if (matched.browser) {
        browser[matched.browser] = true;
        browser.version = matched.version;
        browser.versionNumber = parseInt(matched.version)
    }
    if (matched.platform) {
        browser[matched.platform] = true
    }
    if (browser.android || browser.ipad || browser.iphone || browser["windows phone"]) {
        browser.mobile = true
    }
    if (browser.cros || browser.mac || browser.linux || browser.win) {
        browser.desktop = true
    }
    if (browser.chrome || browser.opr || browser.safari) {
        browser.webkit = true
    }
    if (browser.rv) {
        var ie = "msie";
        matched.browser = ie;
        browser[ie] = true
    }
    if (browser.opr) {
        var opera = "opera";
        matched.browser = opera;
        browser[opera] = true
    }
    if (browser.safari && browser.android) {
        var android = "android";
        matched.browser = android;
        browser[android] = true
    }
    browser.name = matched.browser;
    browser.platform = matched.platform;
    return browser
});
App.factory('colors', ['APP_COLORS', function(colors) {
    return {
        byName: function(name) {
            return (colors[name] || '#fff')
        }
    }
}]);
App.service('gmap', function() {
    return {
        setStyle: function(style) {
            this.MapStyles = style
        },
        autocenter: function() {
            var refs = this.gMapRefs;
            if (refs && refs.length) {
                for (var r in refs) {
                    var mapRef = refs[r];
                    var currMapCenter = mapRef.getCenter();
                    if (mapRef && currMapCenter) {
                        google.maps.event.trigger(mapRef, 'resize');
                        mapRef.setCenter(currMapCenter)
                    }
                }
            }
        },
        init: function(element) {
            var self = this,
                $element = $(element),
                addresses = $element.data('address') && $element.data('address').split(';'),
                titles = $element.data('title') && $element.data('title').split(';'),
                zoom = $element.data('zoom') || 14,
                maptype = $element.data('maptype') || 'ROADMAP',
                markers = [];
            if (addresses) {
                for (var a in addresses) {
                    if (typeof addresses[a] == 'string') {
                        markers.push({
                            address: addresses[a],
                            html: (titles && titles[a]) || '',
                            popup: true
                        })
                    }
                }
                var options = {
                    controls: {
                        panControl: true,
                        zoomControl: true,
                        mapTypeControl: true,
                        scaleControl: true,
                        streetViewControl: true,
                        overviewMapControl: true
                    },
                    scrollwheel: false,
                    maptype: maptype,
                    markers: markers,
                    zoom: zoom
                };
                var gMap = $element.gMap(options);
                var ref = gMap.data('gMap.reference');
                if (!self.gMapRefs) self.gMapRefs = [];
                self.gMapRefs.push(ref);
                if ($element.data('styled') !== undefined) {
                    ref.setOptions({
                        styles: self.MapStyles
                    })
                }
            }
        }
    }
});
App.service('navSearch', function() {
    var navbarFormSelector = 'form.navbar-form';
    return {
        toggle: function() {
            var navbarForm = $(navbarFormSelector);
            navbarForm.toggleClass('open');
            var isOpen = navbarForm.hasClass('open');
            navbarForm.find('input')[isOpen ? 'focus' : 'blur']()
        },
        dismiss: function() {
            $(navbarFormSelector).removeClass('open').find('input[type="text"]').blur().val('')
        }
    }
});
App.service('toggleStateService', ['$rootScope', function($rootScope) {
    var storageKeyName = 'toggleState';
    var WordChecker = {
        hasWord: function(phrase, word) {
            return new RegExp('(^|\\s)' + word + '(\\s|$)').test(phrase)
        },
        addWord: function(phrase, word) {
            if (!this.hasWord(phrase, word)) {
                return (phrase + (phrase ? ' ' : '') + word)
            }
        },
        removeWord: function(phrase, word) {
            if (this.hasWord(phrase, word)) {
                return phrase.replace(new RegExp('(^|\\s)*' + word + '(\\s|$)*', 'g'), '')
            }
        }
    };
    return {
        addState: function(classname) {
            var data = angular.fromJson($rootScope.$storage[storageKeyName]);
            if (!data) {
                data = classname
            } else {
                data = WordChecker.addWord(data, classname)
            }
            $rootScope.$storage[storageKeyName] = angular.toJson(data)
        },
        removeState: function(classname) {
            var data = $rootScope.$storage[storageKeyName];
            if (!data) return;
            data = WordChecker.removeWord(data, classname);
            $rootScope.$storage[storageKeyName] = angular.toJson(data)
        },
        restoreState: function($elem) {
            var data = angular.fromJson($rootScope.$storage[storageKeyName]);
            if (!data) return;
            $elem.addClass(data)
        }
    }
}]);
App.service('vectorMap', function() {
    'use strict';
    return {
        init: function($element, opts, series, markers) {
            $element.vectorMap({
                map: opts.mapName,
                backgroundColor: opts.bgColor,
                zoomMin: 2,
                zoomMax: 8,
                zoomOnScroll: false,
                regionStyle: {
                    initial: {
                        'fill': opts.regionFill,
                        'fill-opacity': 1,
                        'stroke': 'none',
                        'stroke-width': 1.5,
                        'stroke-opacity': 1
                    },
                    hover: {
                        'fill-opacity': 0.8
                    },
                    selected: {
                        fill: 'blue'
                    },
                    selectedHover: {}
                },
                focusOn: {
                    x: 0.4,
                    y: 0.6,
                    scale: opts.scale
                },
                markerStyle: {
                    initial: {
                        fill: opts.markerColor,
                        stroke: opts.markerColor
                    }
                },
                onRegionLabelShow: function(e, el, code) {
                    if (series && series[code]) el.html(el.html() + ': ' + series[code] + ' visitors')
                },
                markers: markers,
                series: {
                    regions: [{
                        values: series,
                        scale: opts.scaleColors,
                        normalizeFunction: 'polynomial'
                    }]
                },
            })
        }
    }
});
var myApp = angular.module('myAppName', ['angle']);
myApp.run(function($log) {
    $log.log('I\'m a line from custom.js')
});
myApp.controller('oneOfMyOwnController', function($scope) {});
myApp.directive('oneOfMyOwnDirectives', function() {});
myApp.config(function($stateProvider) {});