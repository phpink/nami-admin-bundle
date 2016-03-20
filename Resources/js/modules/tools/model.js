'use strict';

App.factory('BaseModel', ['Core', '$http', '$q', function(Core, $http, $q) {

    var BaseModel = function (data) {
        this.data = this.getDefaultProperties();
        if (angular.isObject(data)) {
            this.data = angular.extend(
                this.data, data
            );
        }
        this.url = {
            'get': null,
            'post': null,
            'put': null,
            'delete': null,
            'upload': null
        };
    };

    angular.extend(BaseModel.prototype, {
        getData: function() {
            return this.data;
        },

        setData: function(data) {
            if (angular.isObject(data)) {
                this.data = this.prepareData(
                    data
                );
            }
            return this;
        },

        getId: function() {
            return this.data.id;
        },

        setId: function(id) {
            this.data.id = id;
            return this;
        },

        getDefaultProperties: function() {
            return {
                'id': null
            };
        },

        getReferences: function(key) {
            return this.data._references ?
                key ? this.data._references[key] :
                    this.data._references : null;
        },

        makeRequest: function(method, url, successCode, successCallback, postData) {
            var self = this;
            var deferred = $q.defer();
            var params = {
              method: method,
              url: url

            };
            if (postData === true) {
              params.data = this.data;
            }
            $http(params).success(function(data, status, headers, config) {
              if (status === successCode) {
                successCallback(data);
                deferred.resolve(self);
              } else {
                deferred.reject(false);
              }

            }).error(function(data, status, headers, config) {
              deferred.reject(false);
            });
            return deferred.promise;
        },

        makeModelRequest: function(method, postData) {
          var self = this;
          return this.makeRequest(
              method.toUpperCase(),
              Routing.generate(
                  this.getUrl(
                      method.toLowerCase()
                  ),
                  this.getModelRouteParams()
              ),
              200,
              function (data) {
                self.setData(data);
              },
              postData
          );
        },

        getModelRouteParams: function() {
          return {
            id: this.getId()
          }
        },

        getRawData: function () {
          return this.data;
        },

        prepareData: function(data) {
          return data;
        },

        fetch: function () {
          return this.makeModelRequest('get');
        },

        save: function () {
          return this.makeModelRequest('post', true);
        },

        update: function () {
          return this.makeModelRequest('put', true);
        },

        delete: function() {
          var self = this;
          return this.makeRequest(
              'DELETE',
              Routing.generate(
                  this.getUrl('delete'),
                  {id: this.getId()}
              ),
              204,
              function () {
              }
          );
        },

        upload: function(image, folder, params) {
            var fd = new FormData();
            fd.append('file', image);
            fd.append('name', image.name);

            var self = this;
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: Routing.generate(
                    folder ?
                        this.url.uploadFolder[folder] :
                        this.getUrl('upload'),
                    params ? params : { id: this.getId() }
                ),
                data: fd,
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined
                }
            }).success(function(data, status, headers, config) {
                if (status === 201) {
                    if (data && data.url) {
                       self.setUpload(data, folder, params);
                    }
                    deferred.resolve(self);
                } else {
                    deferred.reject();
                }

            }).error(function(data, status, headers, config) {
                deferred.reject();
            });
            return deferred.promise;
        },

        setUpload: function(data, folder, params) {

        },

        removeUpload: function(uploadId, params) {

        },

        getUrl: function (method) {
            return this.url[method];
        }
    });

    BaseModel.extends = Core.extends;
    return BaseModel;

}]);