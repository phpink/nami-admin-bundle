'use strict';

App.factory('MenuModel',
    ['BaseModel', '$http', '$q',
        function(BaseModel, $http, $q) {

            var MenuModel = BaseModel.extends({
                constructor: function(data) {
                    BaseModel.call(this, data);
                    this.url = {
                        'get': 'nami_api_get_menu',
                        'post': 'nami_api_post_menu',
                        'put': 'nami_api_put_menu',
                        'delete': 'nami_api_delete_menu'
                    };
                },

                getDefaultProperties: function() {
                    return {
                        'id': null,
                        'name': '',
                        'title': '',
                        'link': '',
                        'items': [],
                        'position': 0
                    };
                },

                getName: function() {
                    return this.data.name;
                },

                getTitle: function() {
                    return this.data.title;
                },

                getLink: function() {
                    return this.data.link;
                },

                getItems: function() {
                    return this.data.items;
                },

                getPosition: function() {
                    return this.data.position;
                },

                addItem: function(item) {
                    if (angular.isObject(item)) {
                      //block.uuid = uuid.new();
                      this.data.items.push(item);
                    }
                    return this;
                },

                removeItem: function(item) {
                    if (angular.isString(item)) {
                        angular.forEach(this.data.items, function (itemCursor, index) {
                            if (item === itemCursor.id) {
                                delete this.data.items[index];
                            }
                        });
                    }
                    this.data.blocks.push(item);
                    return this;
                }

            });
            return MenuModel;
        }]);
