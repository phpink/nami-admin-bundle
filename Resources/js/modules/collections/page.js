'use strict';

App.factory('PageCollection', ['BaseCollection', 'PageModel', function(BaseCollection, PageModel) {

	var PageCollection = BaseCollection.extends({

        model: PageModel,

        constructor: function(data) {
          BaseCollection.call(this, data);
          this.url = {
            'get': 'nami_api_get_pages',
            'put': 'nami_api_put_pages',
            'delete': 'nami_api_post_pages_delete'
          };
        }
    });
    return PageCollection;
}]);