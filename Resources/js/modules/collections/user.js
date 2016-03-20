'use strict';

App.factory('UserCollection', ['BaseCollection', 'UserModel', function(BaseCollection, UserModel) {

	var UserCollection = BaseCollection.extends({

        model: UserModel,

        constructor: function(data) {
          BaseCollection.call(this, data);
          this.url = {
            'get': 'nami_api_get_users',
            'put': 'nami_api_put_users',
            'delete': 'nami_api_post_users_delete'
          }
        }
    });
    return UserCollection;
}]);