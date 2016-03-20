/**=========================================================
 * Module: sidebar-menu.js
 * Provides a simple way to implement bootstrap collapse plugin using a target 
 * next to the current element (sibling)
 * Targeted elements must have [data-toggle="collapse-next"]
 =========================================================*/
App.controller('SidebarController', ['$rootScope', '$scope', '$location', '$http', '$timeout', 'APP_MEDIAQUERY', function($rootScope, $scope, $location, $http, $timeout, mq){

  var currentState = $rootScope.$state.current.name;
  var $win = $(window);
  var $html = $('html');
  var $body = $('body');

  // Adjustment on route changes
  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
    currentState = toState.name;
    // Hide sidebar automatically on mobile
    $('body.aside-toggled').removeClass('aside-toggled');

    $rootScope.$broadcast('closeSidebarMenu');
  });

  // Normalize state on resize to avoid multiple checks
  $win.on('resize', function() {
    if( isMobile() )
      $body.removeClass('aside-collapsed');
    else
      $body.removeClass('aside-toggled');
  });

  // Check item and children active state
  var isActive = function(item) {

    if(!item || !item.sref) return;

    var path = item.sref, prefix = '#';
    if(path === prefix) {
      var foundActive = false;
      angular.forEach(item.submenu, function(value, key) {
        if(isActive(value)) foundActive = true;
      });
      return foundActive;
    }
    else
      return (currentState === path);
  };

  // Load menu from json file
  // ----------------------------------- 
  
  $scope.getMenuItemPropClasses = function(item) {
    return (item.heading ? 'nav-heading' : '') +
           (isActive(item) ? ' active' : '') ;
  };

  $scope.loadSidebarMenu = function() {

    var menuJson = '/bundles/namiadmin/sidebar-menu.json',
        menuURL  = menuJson + '?v=' + (new Date().getTime()); // jumps cache
    $http.get(menuURL)
      .success(function(items) {
         $rootScope.menuItems = items;
      })
      .error(function(data, status, headers, config) {
        alert('Failure loading menu');
      });
   };

   $scope.loadSidebarMenu();

  // Handle sidebar collapse items
  // ----------------------------------- 
  var collapseList = [];

  $scope.addCollapse = function($index, item) {
    collapseList[$index] = !isActive(item);
  };

  $scope.isCollapse = function($index) {
    return (collapseList[$index]);
  };

  $scope.toggleCollapse = function($index) {

    // collapsed sidebar doesn't toggle drodopwn
    if( isSidebarCollapsed() && !isMobile() ) return true;
    // make sure the item index exists
    if( typeof collapseList[$index] === undefined ) return true;

    closeAllBut($index);
    collapseList[$index] = !collapseList[$index];
  
    return true;
  
    function closeAllBut($index) {
      angular.forEach(collapseList, function(v, i) {
        if($index !== i)
          collapseList[i] = true;
      });
    }
  };

  // Helper checks
  // ----------------------------------- 

  function isMobile() {
    return $win.width() < mq.tablet;
  }
  function isTouch() {
    return $html.hasClass('touch');
  }
  function isSidebarCollapsed() {
    return $body.hasClass('aside-collapsed');
  }
  function isSidebarToggled() {
    return $body.hasClass('aside-toggled');
  }
}]);