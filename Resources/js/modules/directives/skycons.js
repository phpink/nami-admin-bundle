/**=========================================================
 * Module: skycons.js
 * Include any animated weather icon from Skycons
 =========================================================*/

App.directive('skycon', function() {

    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            // observe changes in attribute - could also be scope.$watch
            attrs.$observe('skycon', function (value) {
                if (value) {
                    var opts = {
                        'color': (attrs.color || 'white'),
                        'resizeClear': (navigator.userAgent.toLowerCase().indexOf("android") > -1)
                    };
                    var skycons = new Skycons(opts);
                    element.html('<canvas width="' + attrs.width + '" height="' + attrs.height + '"></canvas>');
                    skycons.add(element.children()[0], value);
                    skycons.play();
                }
            });
        }
    };
});