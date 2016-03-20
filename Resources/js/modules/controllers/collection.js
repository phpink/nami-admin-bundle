/**=========================================================
 * Module: users.js
 * Pages Controller
 =========================================================*/

App.controller('CollectionController',
  ['$scope', '$translate', '$location', 'paginator',
   'cfpLoadingBar', 'UserCollection', 'PageCollection',
    '$http', '$q',
  function(
      $scope, $translate, $location, paginator, cfpLoadingBar,
      UserCollection, PageCollection, $http, $q
  ) {
    "use strict";

    var controllers = {
      'pages': {
        collection: PageCollection
      },
      'users': {
        collection: UserCollection
      }
    };
    var currentRoute = $location.path().split('/')[2];
    var controller = controllers[currentRoute];

    $scope.paginator = paginator;
    $scope.paginator.offset = 0;
    $scope.refreshing = false;
    $scope.orderBy = {
      id: 0
    };
    $scope.filterBy = {};
    $scope.collection = new controller.collection();

    /**
     * Get filters
     * @returns {
     *   offset: (number), limit: (number),
     *   orderBy: ({}), filterBy: ({})
     * }
     */
    var getFetchOpts = function () {
      $scope.refreshing = true;
      var opts = {
        offset: $scope.paginator.offset,
        limit: $scope.paginator.limit,
        orderBy: $scope.orderBy,
        filterBy: $scope.filterBy
      };
      angular.forEach(opts.filterBy, function (value, field) {
        if (!value) {
          delete opts.filterBy[field];
        }
      });
      return opts;
    };

    /**
     * Refresh view
     */
    $scope.refresh = function () {
      cfpLoadingBar.start();
      $scope.selection = {};
      $scope.collection.fetch(getFetchOpts()).then(function () {
        // Pagintor
        $scope.paginator.setCount(
            $scope.collection.getCount()
        );
        // Selection
        $scope.checkAll(false);
      }).finally(function () {
        cfpLoadingBar.complete();
        $scope.refreshing = false;
      });
    };
    $scope.refresh();

    /**
     * Updates a filter and
     * Triggers a view refresh
     * @type {null}
     */
    $scope.filterTimer = null;
    $scope.filterUpdate = function (field, event, filterType, useTime) {
      var value = angular.element(event.target).val();
      if (value) {
        if (filterType === 'like') {
          value = '%' + value + '%';
        }
        $scope.filterBy[field] = value;
      } else if ($scope.filterBy[field]) {
        delete $scope.filterBy[field];
      }
      if (useTime) {
        clearTimeout($scope.filterTimer);
        $scope.filterTimer = setTimeout(function () {
          $scope.refresh();
        }, 1e3);
      } else {
        $scope.refresh();
      }
    };
    /**
     * Listen to page change to trigger refresh
     */
    $scope.$watch('paginator.limit', function () {
      $scope.refresh();
    });

    /**
     * Pagination link click
     * @param page
     */
    $scope.gopage = function (page) {
      $scope.paginator.offset = (page - 1) * $scope.paginator.limit;
      $scope.refresh();
    };

    /**
     * Toggle selection check
     */
    $scope.toggleCheckAll = function () {
      if (!angular.isDefined($scope.toggleCheckState)) {
        $scope.toggleCheckState = true;
      }
      $scope.checkAll($scope.toggleCheckState);
      $scope.toggleCheckState = !$scope.toggleCheckState;
    };

    /**
     * Reset the selection to a value
     * @param check (boolean)
     */
    $scope.checkAll = function (check) {
      if (check !== true && check !== false) {
        check = true;
      }
      angular.forEach(
          $scope.collection.getItems(),
          function (model) {
            $scope.selection[
                model.getId()
                ] = check;
          }
      );
    };

    /**
     * Update the fields of the collection selection
     * @param fields ({(string): (mixed)})
     */
    $scope.updateCollection = function (fields, deleteItems) {
      var ids = [];
      if (!angular.isDefined(deleteItems) || deleteItems === null) {
        deleteItems = false;
      }
      angular.forEach(
        $scope.selection,
        function (selected, itemId) {
          if (selected) {
            ids.push(parseInt(itemId));
          }
        }
      );
      var deferred = $q.defer();
      if (ids.length) {
        var method = deleteItems ?
            'delete' : 'put';
        var data = {
          id: ids
        };
        if (!deleteItems) {
          data.fields = fields;
        }
        $http({
          method: deleteItems ? 'post' : 'put',
          url: Routing.generate(
              $scope.collection.getUrl(
                  deleteItems ?
                  'delete' : 'put'
              )
          ),
          data: data
        }).success(function (data, status, headers, config) {
          if (status === 202) {
            deferred.resolve(true);
          } else {
            deferred.reject(false);
          }

        }).error(function (data, status, headers, config) {
          deferred.reject();
        });
      } else {
        deferred.reject();
      }
      return deferred.promise;
    };

    /**
     * Enable/Disable bulk button listeners
     * @param active (boolean)
     */
    $scope.setActive = function (active) {
      $scope.updateCollection(
        {'active': active}
      ).then(function () {
        $scope.refresh();
      });
    };

    /**
     * Delete bulk button listeners
     * @param active (boolean)
     */
    $scope.deleteItems = function () {
      $scope.updateCollection(null, true).then(function () {
            $scope.refresh();
      });
    };

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
