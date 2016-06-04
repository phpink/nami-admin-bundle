/**=========================================================
 * Module: users.js
 * Pages Controller
 =========================================================*/

App.controller('MenuController',
  ['$scope', '$translate', '$location',
   'cfpLoadingBar', 'MenuCollection',
    '$http', '$q', 'tg.dynamicDirective', 'ui.sortable',
  function(
      $scope, $translate, $location,  cfpLoadingBar,
      MenuCollection, $http, $q, dynamicDirective, sortable
  ) {
    "use strict";

    var tmpList = [];
    $scope.collection = new MenuCollection();

    $scope.sortingLog = [];

    $scope.sortingLog = [];
    $scope.sortableOptions = {
      connectWith: ".tree-container",
    };
    $scope.getView = function (item) {
      if (item) {
        return 'nestable_item.html';
      }
      return null;
    };

    /**
     * Refresh view
     */
    $scope.refresh = function () {
      $scope.collection.fetch().then(function () {
        console.log($scope.collection.getItems());
      }).finally(function () {
        cfpLoadingBar.complete();
        $scope.refreshing = false;
      });
    };
    $scope.refresh();
    /**
     * Listen to sort change to trigger refresh
     */
    $scope.$watch('sort.limit', function () {
      $scope.refresh();
    });

    /**
     * Delete button
     * @param model (Page model)
     */
    $scope.deleteItem = function (model) {
      model.delete().then(function () {
        $scope.refresh();
      });
    };
  }]
);
