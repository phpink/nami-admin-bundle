'use strict';

App.factory('ConfigurationModel',
    ['BaseModel',
    function(BaseModel) {

        var ConfigurationModel = BaseModel.extends({
            constructor: function(data) {
                BaseModel.call(this, data);
                this.url = {
                    'put': 'nami_api_put_configuration'
                };
            },

            getModelRouteParams: function() {
              return {
                name: this.getName(),
                value: this.getValue()
              }
            },

            getDefaultProperties: function() {
                return {
                    'id': null,
                    'name': '',
                    'value': ''
                };
            },

            getName: function() {
                return this.data.name;
            },

            getValue: function() {
                return this.data.value;
            }
        });
        return ConfigurationModel;
    }]
);