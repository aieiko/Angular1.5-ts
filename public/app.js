/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../interfaces/IContent.ts" />
var App;
(function (App) {
    'use strict';
    var ContentCtrl = (function () {
        function ContentCtrl() {
            this.greeting = "Wellcome!";
            this.paths = ['choose path', 'LocalStore', 'API', 'path to JSON'];
            this.myPath = this.paths[0];
            this.master = [];
            this.data = {
                login: 'fff',
                birthDate: new Date(2000, 2, 22),
                age: 21
            };
            this.aaa = function (name) {
                this.greeting = "Hello " + name + "!";
            };
        }
        ContentCtrl.prototype.createStore = function () {
            this.master.push(this.data);
            console.log(this.master);
            localStorage.setItem('CRUD', JSON.stringify(this.master));
        };
        ContentCtrl.prototype.addPerson = function () {
            this.master.push(this.data);
            /*this.data = {
                    login: '',
                    birthDate: new Date,
                    age: 0,
            };*/
            localStorage.setItem('CRUD', JSON.stringify(this.master));
            console.log(localStorage.getItem('CRUD'));
            console.log(this.master);
            console.log(new Date(2000, 2, 22));
        };
        return ContentCtrl;
    })();
    var ContentComponent = (function () {
        function ContentComponent() {
            this.bindings = {
                textBinding: '@',
                dataBinding: '<',
                functionBinding: '&'
            };
            this.template = "<div>\n                                <lable>\n                                    <select ng-model=\"$ctrl.myPath\" ng-options=\"path for path in $ctrl.paths\"></select>\n                                </lable>\n                                <div class=\"animate-switch-container\"\n                                     ng-switch on=\"$ctrl.myPath\">\n                                  <div class=\"animate-switch\" ng-switch-when=\"LocalStore\"><localstorecomponent></localstorecomponent></div>\n                                  <div class=\"animate-switch\" ng-switch-when=\"API\">Home Span</div>\n                                  <div class=\"animate-switch\" ng-switch-when=\"path to JSON\">Home Span</div>\n                                  <div class=\"animate-switch\" ng-switch-default></div>\n                                </div>\n                                <h1>{{$ctrl.greeting}}</h1>\n                                <h1>{{$ctrl.myPath}}</h1>\n                                <h1>{{$ctrl.master}}</h1>\n                                <div ng-click=\"$ctrl.createStore()\">create</div>\n                                <div ng-click=\"$ctrl.addPerson()\">add</div>\n                                <div ng-repeat=\"item in $ctrl.master track by $index\">\n                                    <div>{{item.login}}</div>\n                                    <div>{{item.birthDate}}</div>\n                                    <div>{{item.age}}</div>\n                                </div>\n                                <input type=\"text\" ng-model=\"name\"/>\n                                <button ng-click=\"$ctrl.login(name)\">Add Click</button>\n                            </div>";
            this.controller = ContentCtrl;
        }
        return ContentComponent;
    })();
    App.ContentComponent = ContentComponent;
    var LocalStoreCtrl = (function () {
        function LocalStoreCtrl() {
            this.data = (localStorage.length == 1) ? '' : localStorage.getItem(this.nameData);
        }
        return LocalStoreCtrl;
    })();
    var LocalStoreComponent = (function () {
        function LocalStoreComponent() {
            this.bindings = {
                textBinding: '@',
                dataBinding: '<',
                functionBinding: '&'
            };
            this.template = "<div>\n\n                             </div>";
            this.controller = LocalStoreCtrl;
        }
        return LocalStoreComponent;
    })();
    App.LocalStoreComponent = LocalStoreComponent;
})(App || (App = {}));
/**
 * Created by aieiko on 22.02.16.
 */
/// <reference path="typings/tsd.d.ts" />
var App;
(function (App) {
    'use strict';
    angular.module('app', [])
        .component('contentcomponent', new App.ContentComponent())
        .component('localstorecomponent', new App.LocalStoreComponent());
})(App || (App = {}));
