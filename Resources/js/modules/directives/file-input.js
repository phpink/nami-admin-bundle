App.directive("fileinput", [function () {
    return {
        scope: {
            fileinput: "="
        },
        link: function (scope, element, attributes) {
            element.bind("change", function (event) {
                scope.$apply(function () {
                    scope.fileinput = event.target.files[0];
                    // or all selected files:
                    //scope.fileinput = changeEvent.target.files;
                });
            });
        }
    }
}]);