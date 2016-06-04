'use strict';

App.factory('MenuCollection', ['BaseCollection', 'MenuModel', function(BaseCollection, MenuModel) {

	var MenuCollection = BaseCollection.extends({

        model: MenuModel,

        constructor: function(data) {
          BaseCollection.call(this, data);
          this.url = {
            'get': 'nami_api_get_menus_tree'
          };
        },

        parse: function(data) {
            if (data.count) {
                this.count = data.length;
            }
            return this.setItems(data);
        }
    });
    return MenuCollection;
}]);
