var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../interfaces/IContent.ts" />
var App;
(function (App) {
    'use strict';
    var ContentCtrl = (function () {
        function ContentCtrl() {
            this.paths = ['choose path', 'LocalStore', 'API', 'path to JSON'];
            this.myPath = this.paths[0];
            this.data = []; /*(localStorage.length == 1) ? [] : JSON.parse(localStorage[this.localStorageUse]);*/
            this.typeDispData = 'list';
            this.filters = {
                age: {
                    def: true,
                    descending: false,
                    increase: false
                },
                login: {
                    def: true,
                    descending: false,
                    increase: false
                }
            };
            if (localStorage.length == 1) {
                this.editButtons = false;
                this.localStorageUse = null;
            }
            else {
                this.editButtons = [];
                for (var i = 0; i <= this.data.length - 1; i++) {
                    this.editButtons[i] = false;
                }
            }
        }
        ContentCtrl.prototype.add = function () {
            this.user = {
                login: this.addUser.login,
                birthDate: this.addUser.birthDate,
                age: (this.addUser.birthDate) ? Math.floor((+new Date() - this.addUser.birthDate) / (1000 * 60 * 60 * 24 * 365)) : null
            };
            this.data.push(this.user);
            localStorage.setItem(this.localStorageUse, JSON.stringify(this.data));
            this.addUser = { login: null, birthDate: null };
            if (!this.editButtons) {
                this.editButtons = new Array();
                this.editButtons[0] = false;
            }
            else {
                this.editButtons[this.editButtons.length] = false;
            }
        };
        ContentCtrl.prototype.deletePerson = function (index) {
            this.data.splice(index, 1);
            localStorage.setItem(this.localStorageUse, JSON.stringify(this.data));
        };
        ContentCtrl.prototype.editPerson = function (index) {
            this.editButtons[index] = true;
        };
        ContentCtrl.prototype.savePerson = function (index) {
            if (!this.editUsers || !this.editUsers[index]) {
                this.editButtons[index] = false;
            }
            else {
                this.editButtons[index] = false;
                this.user = {
                    login: (this.editUsers[index].login == null) ? this.data[index].login : this.editUsers[index].login,
                    birthDate: (this.editUsers[index].birthDate == null) ? this.data[index].birthDate : this.editUsers[index].birthDate,
                    age: (this.editUsers[index].birthDate) ? Math.floor((+new Date() - this.editUsers[index].birthDate) / (1000 * 60 * 60 * 24 * 365)) : (this.data[index].age == null) ? null : this.data[index].age
                };
                this.data[index] = this.user;
                localStorage.setItem(this.localStorageUse, JSON.stringify(this.data));
                this.editUsers[index] = { login: null, birthDate: null };
            }
        };
        ContentCtrl.prototype.cancel = function (index) {
            this.editButtons[index] = false;
            this.editUsers = { login: null, birthDate: null };
        };
        //Filters for list
        ContentCtrl.prototype.filterAge = function () {
            if (!this.filters.login.def) {
                this.filters.login = {
                    def: true,
                    descending: false,
                    increase: false
                };
            }
            if (this.filters.age.def && !this.filters.age.descending && !this.filters.age.increase) {
                this.filters.age.def = false;
                this.filters.age.descending = true;
            }
            else if (!this.filters.age.def && this.filters.age.descending && !this.filters.age.increase) {
                this.filters.age.descending = false;
                this.filters.age.increase = true;
            }
            else {
                this.filters.age.def = true;
                this.filters.age.increase = false;
            }
        };
        ContentCtrl.prototype.filterLogin = function () {
            if (!this.filters.age.def) {
                this.filters.age = {
                    def: true,
                    descending: false,
                    increase: false
                };
            }
            if (this.filters.login.def && !this.filters.login.descending && !this.filters.login.increase) {
                this.filters.login.def = false;
                this.filters.login.descending = true;
            }
            else if (!this.filters.login.def && this.filters.login.descending && !this.filters.login.increase) {
                this.filters.login.descending = false;
                this.filters.login.increase = true;
            }
            else {
                this.filters.login.def = true;
                this.filters.login.increase = false;
            }
        };
        return ContentCtrl;
    })();
    var ContentComponent = (function () {
        function ContentComponent() {
            this.template = "<div>\n                                <lable>\n                                    <select ng-model=\"$ctrl.myPath\" ng-options=\"path for path in $ctrl.paths\"></select>\n                                </lable>\n                                <div class=\"animate-switch-container\"\n                                     ng-switch on=\"$ctrl.myPath\">\n                                  <div class=\"animate-switch\" ng-switch-when=\"LocalStore\"><localstorecomponent jok-value=\"$ctrl.typeDispData\" datat-value=\"$ctrl.data\" storageuse-value=\"$ctrl.localStorageUse\"></localstorecomponent></div>\n                                  <div class=\"animate-switch\" ng-switch-when=\"API\">Home Span</div>\n                                  <div class=\"animate-switch\" ng-switch-when=\"path to JSON\">Home Span</div>\n                                  <div class=\"animate-switch\" ng-switch-default></div>\n                                </div>\n                                <h1>{{$ctrl.greeting}}</h1>\n                                <h1>{{$ctrl.myPath}}</h1>\n                                <h1>{{$ctrl.data}}</h1>\n                                <h1>{{$ctrl.typeDispData}}</h1>\n\n\n                                <form class=\"form-inline\" name=\"userForm\" ng-show=\"!!$ctrl.localStorageUse\" ng-submit=\"$ctrl.add()\" novalidate>\n\n                                    <div class=\"form-group\" ng-class=\"{ 'has-error' : userForm.login.$invalid && !userForm.login.$pristine }\">\n                                        <label>Login</label>\n                                        <input type=\"text\" name=\"login\" class=\"form-control\" ng-model=\"$ctrl.addUser.login\" ng-minlength=\"3\" ng-maxlength=\"8\" required>\n                                        <p ng-show=\"userForm.login.$invalid && !userForm.login.$pristine && $ctrl.addUser.login.length > 0 || userForm.login.$error.minlength || userForm.login.$error.maxlength\"\n                                           style=\"position: absolute\"\n                                           class=\"alert alert-danger\">You Login is empty or short or overlong.</p>\n\n                                    </div>\n\n                                    <div class=\"form-group\" ng-class=\"{ 'has-error' : userForm.date.$invalid && !userForm.date.$pristine }\">\n                                        <label>Birh date</label>\n                                        <input type=\"date\" name=\"date\" class=\"form-control\" ng-model=\"$ctrl.addUser.birthDate\" placeholder=\"2000-11-02\">\n                                        <p ng-show=\"userForm.date.$invalid && !userForm.date.$pristine\"\n                                           style=\"position: absolute\"\n                                           class=\"alert alert-danger\">Please enter a valid date.</p>\n                                    </div>\n\n                                    <button style=\"margin-top: 25px\" type=\"submit\" class=\"btn btn-primary\" ng-disabled=\"userForm.$invalid\">Add</button>\n\n                                </form>\n                                <table class=\"table table-striped\">\n                                <h1>{{$ctrl.localStorageUse}}</h1>\n                                <input style=\"width: 350px; margin: auto\" type=\"text\" class=\"form-control\" placeholder=\"search\" ng-model=\"search\"/>\n                                <tr>\n                                    <th>\n                                        <div style=\"width: 51px\" ng-click=\"$ctrl.filterLogin()\" ng-class=\"{'dropdown': !$ctrl.filters.login.def && !$ctrl.filters.login.descending, 'dropup': $ctrl.filters.login.increase}\">\n                                            <button class=\"btn btn-default\" type=\"button\">\n                                                Login\n                                                <span ng-class=\"{'caret': !$ctrl.filters.login.def}\"></span>\n                                        </div>\n                                    </th>\n                                    <th>BirthDay</th>\n                                    <th>\n                                        <div style=\"width: 51px; float: left\" ng-click=\"$ctrl.filterAge()\" ng-class=\"{'dropdown': !$ctrl.filters.age.def && !$ctrl.filters.age.descending, 'dropup': $ctrl.filters.age.increase}\">\n                                            <button class=\"btn btn-default\" type=\"button\">\n                                                Age\n                                                <span ng-class=\"{'caret': !$ctrl.filters.age.def}\"></span>\n                                        </div>\n\n                                        <div class=\"btn-group\" data-toggle=\"buttons\" style=\"float:right\">\n                                          <label class=\"btn btn-primary\" ng-class=\"{'active': $ctrl.typeDispData == 'list' }\">\n                                            <input type=\"radio\" ng-model=\"$ctrl.typeDispData\" value=\"list\"><span class=\"glyphicon glyphicon-list\"></span>\n                                          </label>\n                                          <label class=\"btn btn-primary\" ng-class=\"{'active': $ctrl.typeDispData == 'thumbs' }\">\n                                            <input type=\"radio\" ng-model=\"$ctrl.typeDispData\" value=\"thumbs\"><span class=\"glyphicon glyphicon-th\"></span>\n                                          </label>\n                                        </div>\n\n                                    </th>\n                                </tr>\n                                <tr ng-repeat=\"item in $ctrl.data | filter:search track by $index\">\n                                <div>\n                                    <td>\n                                        <input type=\"text\" ng-show=\"!!$ctrl.editButtons[$index]\" ng-minlength=\"3\" ng-maxlength=\"8\" ng-model=\"$ctrl.editUsers[$index].login\" placeholder=\"{{item.login}}\"/>\n                                        <div ng-hide=\"!!$ctrl.editButtons[$index]\">{{item.login}}</div>\n                                    </td>\n                                    <td>\n                                        <input type=\"date\" ng-show=\"!!$ctrl.editButtons[$index]\" ng-model=\"$ctrl.editUsers[$index].birthDate\"\n                                        placeholder=\"{{(item.birthDate == null) ? '' : item.birthDate.getFullYear()+'-'+(item.birthDate.getMonth()+1)+'-'+item.birthDate.getDate()}}\"/>\n\n                                        <div ng-hide=\"!!$ctrl.editButtons[$index]\">{{(item.birthDate == null) ? '' : item.birthDate.getFullYear()+'-'+(item.birthDate.getMonth()+1)+'-'+item.birthDate.getDate()}}</div>\n                                    </td>\n                                    <td>{{item.age}}\n                                        <div ng-show=\"!!$ctrl.editButtons[$index]\" style=\"float: right\">\n                                            <button type=\"button\" class=\"btn btn-success\" ng-click=\"$ctrl.savePerson($index)\">Save</button>\n                                            <button type=\"button\" class=\"btn btn-danger\" ng-click=\"$ctrl.cancel($index)\">Cancel</button>\n                                        </div>\n                                        <div ng-hide=\"!!$ctrl.editButtons[$index]\" style=\"float: right\">\n                                            <button type=\"button\" class=\"btn btn-warning\" ng-click=\"$ctrl.editPerson($index)\">Edit</button>\n                                            <button type=\"button\" class=\"btn btn-danger\" ng-click=\"$ctrl.deletePerson($index)\">Delete</button>\n                                        </div>\n                                    </td>\n                                </div>\n                                </tr>\n                                </table>\n                            </div>";
            this.controller = ContentCtrl;
        }
        return ContentComponent;
    })();
    App.ContentComponent = ContentComponent;
    var LocalStoreCtrl = (function () {
        function LocalStoreCtrl() {
            this.jokValue = 'thumbs';
            this.localStorageNames = [];
            if (localStorage['debug']) {
                localStorage.removeItem('debug');
            }
            if (localStorage.length !== 0) {
                for (var i = 0; i <= localStorage.length - 1; i++)
                    this.localStorageNames[i] = localStorage.key(i);
                this.selectData = this.localStorageNames[0];
            }
        }
        LocalStoreCtrl.prototype.createStorage = function () {
            console.log('create');
            localStorage.setItem(this.storageName, JSON.stringify([]));
            for (var i = 0; i <= localStorage.length - 1; i++)
                this.localStorageNames[i] = localStorage.key(i);
            this.selectData = this.storageName;
            this.storageName = null;
            this.datatValue = JSON.parse(localStorage[this.selectData]);
            this.storageuseValue = this.selectData;
        };
        LocalStoreCtrl.prototype.getStorage = function () {
            console.log('get');
            this.datatValue = JSON.parse(localStorage[this.selectData]);
            if (this.datatValue.length >= 1) {
                for (var i = 0; i <= this.datatValue.length - 1; i++)
                    this.datatValue[i].birthDate = (this.datatValue[i].birthDate == null) ? null : new Date(Date.parse(this.datatValue[i].birthDate));
            }
            this.storageuseValue = this.selectData;
        };
        LocalStoreCtrl.prototype.removeStorage = function () {
            console.log('delete');
            if (this.selectData == this.storageuseValue) {
                alert('You can\'t delet this table because ' + this.selectData + ' used');
            }
            else {
                localStorage.removeItem(this.selectData);
                if (localStorage.length == 0) {
                    this.localStorageNames = [];
                }
                else {
                    for (var i = 0; i <= localStorage.length - 1; i++)
                        this.localStorageNames[i] = localStorage.key(i);
                    this.selectData = this.storageuseValue || this.localStorageNames[0];
                }
            }
        };
        return LocalStoreCtrl;
    })();
    var LocalStoreComponent = (function () {
        function LocalStoreComponent() {
            this.bindings = {
                textBinding: '@',
                jokValue: '=',
                storagenamesValue: '=',
                datatValue: '=',
                storageuseValue: '=',
                functionBinding: '&'
            };
            this.template = "<div>\n                            <lable>\n                                <select ng-model=\"$ctrl.selectData\" ng-options=\"name for name in $ctrl.localStorageNames\"></select>\n                            </lable>\n                            <button type=\"button\" class=\"btn btn-warning\" ng-click=\"$ctrl.getStorage()\">GET</button>\n                            <button type=\"button\" class=\"btn btn-danger\" ng-click=\"$ctrl.removeStorage()\">Delete</button>\n                            <div style=\"display: flex\">\n                                <input type=\"text\" style=\"width: 300px\" minlength=\"3\" maxlength=\"8\" class=\"form-control\" ng-model=\"$ctrl.storageName\"/>\n                                <button type=\"button\" class=\"btn btn-success\" ng-click=\"$ctrl.createStorage()\">Create</button>\n                            </div>\n                            </div>";
            this.controller = LocalStoreCtrl;
        }
        return LocalStoreComponent;
    })();
    App.LocalStoreComponent = LocalStoreComponent;
    var ListCtrl = (function (_super) {
        __extends(ListCtrl, _super);
        function ListCtrl() {
            this.add = this.ContentCtrl.add();
            _super.call(this);
        }
        return ListCtrl;
    })(ContentCtrl);
    var ListComponent = (function () {
        function ListComponent() {
            this.template = "<div>\n\n                            </div> ";
        }
        return ListComponent;
    })();
    App.ListComponent = ListComponent;
    var ThumbsComponent = (function (_super) {
        __extends(ThumbsComponent, _super);
        function ThumbsComponent() {
            _super.apply(this, arguments);
        }
        return ThumbsComponent;
    })(ContentCtrl);
    App.ThumbsComponent = ThumbsComponent;
})(App || (App = {}));
//# sourceMappingURL=ContentComponent.js.map