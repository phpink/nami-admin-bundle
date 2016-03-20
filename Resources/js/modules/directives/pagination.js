/**
 * Created by wamania on 25/11/14.
 */

App.directive('mlpagination', function() {

    return {
        template:
            '<div class="panel-footer">\
                <div class="row">\
                    <div class="col-sm-6">\
                        <div class="row">\
                            <label class="col-lg-6" style="width: 150px;">Résultats par page</label>\
                            <div class="col-lg-6">\
                                <select ng-model="paginator.limit" class="form-control">\
                                    <option value="2">2</option>\
                                    <option value="5">5</option>\
                                    <option value="10">10</option>\
                                    <option value="20">20</option>\
                                    <option value="50">50</option>\
                                    <option value="100">100</option>\
                                </select>\
                            </div>\
                        </div>\
                    </div>\
                    <div class="col-sm-6 text-right">\
                        <ul class="pagination pagination-sm" ng-show="paginator.nbpage()>1">\
                            <li ng-show="paginator.current() > paginator.displayed"><a href="#" ng-click="gopage(1)">&laquo;</a></li>\
                            <li ng-repeat="page in paginator.pages" ng-class="{active:page==paginator.current()}"><a href="#" ng-click="gopage(page)">{{ page }}</a></li>\
                            <li ng-show="paginator.current() < paginator.nbpage()-paginator.displayed"><a href="#" ng-click="gopage(paginator.nbpage())">&raquo;</a></li>\
                        </ul>\
                    </div>\
                </div>\
            </div>'
    };
});