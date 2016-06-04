'use strict';

App.factory('UserModel',
    ['BaseModel', '$http', '$q',
    function(BaseModel, $http, $q) {

	var UserModel = BaseModel.extends({
        constructor: function(data) {
            BaseModel.call(this, data);
            this.url = {
                'get': 'nami_api_get_user',
                'post': 'nami_api_post_users',
                'put': 'nami_api_put_user',
                'delete': 'nami_api_delete_user',
                'upload': 'nami_api_post_users_upload'
            };
        },

        getDefaultProperties: function() {
            return {
                'id': null,
                'username': '',
                'firstName': '',
                'lastName': '',
              'active': false,
                'male': true,
                '_references': {
                    'avatar': null
                }
            };
        },

        getUsername: function() {
            return this.data.username;
        },

        getFirstname: function() {
            return this.data.firstName;
        },

        getLastname: function() {
            return this.data.lastName;
        },

        getFullname: function() {
            var name = this.getFirstname();
            if (name) {
                name += ' ';
            }
            name += this.getLastname();
            return name;
        },

        isActive: function() {
            return this.data.active;
        },

        isMale: function() {
            return this.data.male;
        },

        getAvatar: function() {
            return this.getReferences('avatar');
        },

        setUpload: function(avatar) {
            if (angular.isObject(avatar)) {
                this.data.avatar = avatar.id;
                this.data._references.avatar = avatar;
            }
            return this;
        },

        getAvatarThumb: function() {
            var thumb = '';
            var avatar = this.getAvatar();
            if (angular.isObject(avatar)) {
                thumb = avatar.thumbs.preview;
            }
            return thumb;
        },

        getLastLogin: function() {
          return this.data.lastLogin;
        },

        auth: function(username, password) {
            var self = this;
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: Routing.generate('nami_api_post_user_token'),
                data: {
                    username: username,
                    password: password
                }
            }).success(function(data, status, headers, config) {
                if (status === 200) {
                    self.data = data.user;
                    deferred.resolve(data.token);
                } else {
                    deferred.reject();
                }

            }).error(function(data, status, headers, config) {
                deferred.reject();
            });
            return deferred.promise;
        },

        reset: function(username) {
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: Routing.generate('nami_api_get_user_reset'),
                data: {
                    username: username
                }
            }).success(function(data, status, headers, config) {
                if (status === 200) {
                    deferred.resolve(data);
                } else {
                    deferred.reject();
                }

            }).error(function(data, status, headers, config) {
                deferred.reject();
            });
            return deferred.promise;
        }
    });
    return UserModel;
}]);
