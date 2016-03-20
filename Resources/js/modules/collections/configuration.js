'use strict';

App.factory('ConfigurationCollection',
    ['BaseCollection', 'ConfigurationModel',
    function(BaseCollection, ConfigurationModel) {

        var ConfigurationCollection = BaseCollection.extends({
            model: ConfigurationModel,

            constructor: function(data) {
              BaseCollection.call(this, data);
                this.url = {
                  'get': 'nami_api_get_configuration'
                };
            },

            parse: function(data) {
                var config = [];
                for (var name in data) {
                    config.push({
                        name: name,
                        value: data[name]
                    });
                }
                return this.setItems(config);
            }
        });
        return ConfigurationCollection;
    }]
);