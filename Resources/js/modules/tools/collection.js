'use strict';

App.factory('BaseCollection', [
  'Core', 'BaseModel', '$http', '$q',
  function(Core, BaseModel, $http, $q) {

    var BaseCollection = function (elements) {
        this.count = null;
        this.setItems(elements);
        this.url = {
          'get': null,
          'put': null,
          'delete': null
        };
    };

    angular.extend(BaseCollection.prototype, {
        model: BaseModel,

        getCount: function () {
            return (this.count !== null) ?
                this.count : this.countItems();
        },

        getItems: function() {
            return this.elements;
        },

        parse: function(data) {
            if (data.count) {
                this.count = data.count;
            }
            return this.setItems(data.elements);
        },

        countItems: function () {
            return this.elements.length;
        },

        setItems: function(elements) {
            this.elements = [];
            if (angular.isArray(elements)) {
                for (var i = 0, l = elements.length; i < l; i++) {
                    this.elements.push(
                        this.prepareModel(elements[i])
                    );
                }
            }
            return this;
        },

        getFilters: function () {
            return this.filters;
        },

        setFilters: function(filters) {
            if (angular.isObject(filters)) {
                this.filters = angular.extend(
                    {
                        "offset": 0,
                        "limit": 10
                    }, filters
                );
            }
            return this;
        },


        prepareModel: function(data) {
            return new this.model(data);
        },

        getUrl: function (method) {
          return this.url[method];
        },

        fetch: function (filters) {
            var self = this;
            var deferred = $q.defer();
            this.setFilters(filters)
            $http({
                method: 'GET',
                url: Routing.generate(
                    this.getUrl('get'),
                    this.getFilters()
                )

            }).success(function(data, status, headers, config) {
                if (status === 200) {
                    self.parse(data);
                    deferred.resolve(self);
                } else {
                    deferred.reject();
                }

            }).error(function(data, status, headers, config) {
                deferred.reject();
            });
            return deferred.promise;
        }
    });

    BaseCollection.extends = Core.extends;
    return BaseCollection;

  }]
);