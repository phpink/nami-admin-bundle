'use strict';

App.factory('CategoryCollection', ['BaseCollection', 'CategoryModel', function(BaseCollection, MenuModel) {

	var CategoryCollection = BaseCollection.extends({

        model: MenuModel,

        constructor: function(data) {
          BaseCollection.call(this, data);
          this.url = {
            'get': 'nami_api_get_categories'
          };
        }
    });
    return CategoryCollection;
}]);
