/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../interfaces/IContent.ts" />
var App;
(function (App) {
    'use strict';
    var ContentCtrl = (function () {
        function ContentCtrl() {
            this.greeting = "Wellcome!";
            this.login = function (name) {
                this.greeting = "Hello " + name + "!";
            };
        }
        return ContentCtrl;
    })();
    var ContentComponent = (function () {
        function ContentComponent() {
            this.bindings = {
                textBinding: '@',
                dataBinding: '<',
                functionBinding: '&'
            };
            this.template = "<div>\n                                <h1>{{$ctrl.greeting}}</h1>\n                                <input type=\"text\" ng-model=\"name\"/>\n                                <button ng-click=\"$ctrl.login(name)\">Add Click</button>\n                            </div>";
            this.controller = ContentCtrl;
        }
        return ContentComponent;
    })();
    App.ContentComponent = ContentComponent;
})(App || (App = {}));
/// <reference path="typings/tsd.d.ts" />
var App;
(function (App) {
    'use strict';
    angular.module('app', [])
        .component('contentcomponent', new App.ContentComponent());
})(App || (App = {}));
