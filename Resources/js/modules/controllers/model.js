/**=========================================================
 * Module: user.js
 * Page Controller
 =========================================================*/

App.controller('ModelController', [
    '$rootScope', '$scope', '$stateParams', '$location', '$cacheFactory',
    '$modal', 'cfpLoadingBar', 'UserModel', 'PageModel', 'MenuModel', 'CategoryModel', 'CategoryCollection',
    function($rootScope, $scope, $stateParams, $location, $cacheFactory,
             $modal, cfpLoadingBar, UserModel, PageModel, MenuModel, CategoryModel, CategoryCollection) {
        "use strict";
        var controllers = {
            'menu': {
                model: MenuModel
            },
            'categories': {
                model: CategoryModel,
                onFetch: function() {
                    $scope.categories = new CategoryCollection();
                    $scope.categories.fetch();
                }
            },
            'pages': {
                model: PageModel,
                onFetch: function() {
                  $scope.setBlockCollapse();
                }
            },
            'users': {
                model: UserModel,
                onUpdate: function() {
                    if ($rootScope.loggedUser.getId() === $scope.model.getId()) {
                        $rootScope.$broadcast('loggedUserUpdate', $scope.model);
                    }
                },
                onUpload: function() {
                    if ($rootScope.loggedUser.getId() === $scope.model.getId()) {
                        $rootScope.$broadcast('loggedUserUpdate', $scope.model);
                    }
                }
            }
        };
        var routeParts = $location.path().split('/');
        var currentRoute = routeParts[2];
        var currentAction = routeParts.length === 5 ? routeParts[4] : 'view';
        var controller = controllers[currentRoute]
        var model = controller.model;

        $scope.model = new model();
        $scope.blockCollapse = {};
        $scope.fileinput = null;
        $scope.refreshing = false;

        $scope.refresh = function() {
            if ($stateParams.id) {
                cfpLoadingBar.start();
                $scope.refreshing = true;

                $scope.model.setId($stateParams.id);
                $scope.model.fetch().then(function() {
                    if (angular.isFunction(controller.onFetch) && currentAction === 'edit') {
                        controller.onFetch();
                    }
                }).finally(function() {
                    cfpLoadingBar.complete();
                    $scope.refreshing = false;
                });

            }
        };

        $scope.setBlockCollapse = function() {
          $scope.positionMax = 1;
          angular.forEach($scope.model.getBlocks(), function(block) {
            $scope.blockCollapse[block.uiid] = false;
          });
        };

        $scope.addBlock = function() {
            $scope.model.addEmptyBlock();
            $scope.setBlockCollapse();
        };

        $scope.collapse = function(panel) {
          var blockId = panel.attr('data-id');
          if (blockId) {
            $scope.model.removeBlock(blockId);
          }
        };

        $scope.save = function() {
            cfpLoadingBar.start();
            $scope.refreshing = true;

            var deferred;
            var isUpdate = false;
            if (!$scope.model.getId()) {
                deferred = $scope.model.save();
            } else {
                isUpdate = true;
                deferred = $scope.model.update();
            }
            try {
                deferred.then(function() {
                    if (isUpdate
                    &&  angular.isFunction(controller.onUpdate)) {
                        controller.onUpdate();
                    }
                    $location.path(
                        '/app/' + currentRoute +
                        '/'+ $scope.model.getId()
                    );

                }, function(response) {
                    $scope.stopLoading();

                }).finally(function() {
                    $scope.stopLoading();
                });
            } catch (e) {
                $scope.stopLoading();
            }
        };


        $scope.stopLoading = function() {
            cfpLoadingBar.complete();
            $scope.refreshing = false;
        };

        /**
         * Upload image
         * @param element
         */
        $scope.upload = function(element) {

            $scope.$apply(function(scope) {
                var file = element.files[0];
                var el = angular.element(element);
                var folder = el.attr('data-folder');
                var id = el.attr('data-id');
                var params = id ? { id : id } : null;

                scope.refreshing = true;
                scope.model.upload(file, folder, params).finally(function() {
                    if (angular.isFunction(controller.onUpload)) {
                        controller.onUpload();
                    }
                    scope.refreshing = false;
                });
            });
        };

        /**
         * Upload image
         * @param element
         */
        $scope.removeUpload = function(event) {
            var el = angular.element(event.currentTarget);
            var folder = el.attr('data-folder');
            var uploadId = el.attr('data-upload-id');
            var id = el.attr('data-id');
            var params = id ? { id : id } : null;
            $scope.model.removeUpload(uploadId, params);
        };
    }]);
