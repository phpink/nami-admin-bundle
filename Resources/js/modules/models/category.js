'use strict';

App.factory('CategoryModel',
    ['BaseModel', '$http', '$q',
        function(BaseModel, $http, $q) {

            var CategoryModel = BaseModel.extends({
                constructor: function(data) {
                    BaseModel.call(this, data);
                    this.url = {
                        'get': 'nami_api_get_category',
                        'post': 'nami_api_post_category',
                        'put': 'nami_api_put_category',
                        'delete': 'nami_api_delete_category'
                    };
                },

                getDefaultProperties: function() {
                    return {
                        'id': null,
                        'name': '',
                        'title': '',
                        'slug': '',
                        'parent': null,
                        'header': '',
                        'content': '',
                        'metaDescription': null,
                        'metaKeywords': true
                    };
                },

                getName: function() {
                    return this.data.name;
                },

                getTitle: function() {
                    return this.data.title;
                },

                getSlug: function() {
                    return this.data.slug;
                },

                getParent: function() {
                    return this.data.parent;
                },

                getHeader: function() {
                    return this.data.header;
                },

                getContent: function() {
                    return this.data.content;
                },

                getMetaDescription: function() {
                    return this.data.metaDescription;
                },

                getMetaKeywords: function() {
                    return this.data.metaKeywords;
                }

            });
            return CategoryModel;
        }]);
