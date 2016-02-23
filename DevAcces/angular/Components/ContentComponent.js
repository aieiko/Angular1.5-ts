/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../interfaces/IContent.ts" />
var App;
(function (App) {
    'use strict';
    var ContentCtrl = (function () {
        function ContentCtrl() {
            this.paths = ['choose path', 'LocalStore', 'API', 'path to JSON'];
            this.myPath = this.paths[0];
            this.master = [];
        }
        ContentCtrl.prototype.add = function () {
            console.log(this.user.birthDate);
            this.data = {
                login: this.user.login,
                birthDate: this.user.birthDate,
                age: (this.user.birthDate) ? Math.floor((+new Date() - this.user.birthDate) / (1000 * 60 * 60 * 24 * 365)) : null
            };
            this.master.push(this.data);
            localStorage.setItem('CRUD', JSON.stringify(this.master));
            this.user = { login: null, birthDate: null };
            if (!this.editButtons) {
                this.editButtons = new Array();
                this.editButtons[0] = false;
            }
            else {
                this.editButtons[this.editButtons.length] = false;
            }
        };
        ContentCtrl.prototype.deletePerson = function (index) {
            this.master.splice(index, 1);
            localStorage.setItem('CRUD', JSON.stringify(this.master));
        };
        ContentCtrl.prototype.editPerson = function (index) {
            this.editButtons[index] = true;
        };
        ContentCtrl.prototype.savePerson = function (index) {
            if (!this.editUser || !this.editUser[index]) {
                this.editButtons[index] = false;
            }
            else {
                this.editButtons[index] = false;
                this.data = {
                    login: (this.editUser[index].login == null) ? this.master[index].login : this.editUser[index].login,
                    birthDate: (this.editUser[index].birthDate == null) ? this.master[index].birthDate : this.editUser[index].birthDate,
                    age: (this.editUser[index].birthDate) ? Math.floor((+new Date() - this.editUser[index].birthDate) / (1000 * 60 * 60 * 24 * 365)) : (this.master[index].age == null) ? null : this.master[index].age
                };
                this.master[index] = this.data;
                localStorage.setItem('CRUD', JSON.stringify(this.master));
                this.editUser[index] = { login: null, birthDate: null };
            }
        };
        ContentCtrl.prototype.cancel = function (index) {
            this.editButtons[index] = false;
            this.editUser = { login: null, birthDate: null };
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
            this.template = "<div>\n                                <lable>\n                                    <select ng-model=\"$ctrl.myPath\" ng-options=\"path for path in $ctrl.paths\"></select>\n                                </lable>\n                                <div class=\"animate-switch-container\"\n                                     ng-switch on=\"$ctrl.myPath\">\n                                  <div class=\"animate-switch\" ng-switch-when=\"LocalStore\"><localstorecomponent></localstorecomponent></div>\n                                  <div class=\"animate-switch\" ng-switch-when=\"API\">Home Span</div>\n                                  <div class=\"animate-switch\" ng-switch-when=\"path to JSON\">Home Span</div>\n                                  <div class=\"animate-switch\" ng-switch-default></div>\n                                </div>\n                                <h1>{{$ctrl.greeting}}</h1>\n                                <h1>{{$ctrl.myPath}}</h1>\n                                <h1>{{$ctrl.master}}</h1>\n\n\n                                <form class=\"form-inline\" name=\"userForm\" ng-submit=\"$ctrl.add()\" novalidate>\n\n                                    <div class=\"form-group\" ng-class=\"{ 'has-error' : userForm.login.$invalid && !userForm.login.$pristine }\">\n                                        <label>Login</label>\n                                        <input type=\"text\" name=\"login\" class=\"form-control\" ng-model=\"$ctrl.user.login\" ng-minlength=\"3\" ng-maxlength=\"8\" required>\n                                        <p ng-show=\"userForm.login.$invalid && !userForm.login.$pristine && $ctrl.user.login.length > 0 || userForm.login.$error.minlength || userForm.login.$error.maxlength\"\n                                           style=\"position: absolute\"\n                                           class=\"alert alert-danger\">You Login is empty or short or overlong.</p>\n\n                                    </div>\n\n                                    <div class=\"form-group\" ng-class=\"{ 'has-error' : userForm.date.$invalid && !userForm.date.$pristine }\">\n                                        <label>Birh date</label>\n                                        <input type=\"date\" name=\"date\" class=\"form-control\" ng-model=\"$ctrl.user.birthDate\" placeholder=\"2000-11-02\">\n                                        <p ng-show=\"userForm.date.$invalid && !userForm.date.$pristine\"\n                                           style=\"position: absolute\"\n                                           class=\"alert alert-danger\">Please enter a valid date.</p>\n                                    </div>\n\n                                    <button style=\"margin-top: 25px\" type=\"submit\" class=\"btn btn-primary\" ng-disabled=\"userForm.$invalid\">Add</button>\n\n                                </form>\n\n                                <button type=\"button\" class=\"btn btn-success\" ng-click=\"$ctrl.createStore()\">create</button>\n                                <button type=\"button\" class=\"btn btn-info\" ng-click=\"$ctrl.addPerson()\">add</button>\n                                <table class=\"table table-striped\">\n                                <tr>\n                                    <th>login</th><th>BirthDay</th><th>Age</th>\n                                </tr>\n                                <tr ng-repeat=\"item in $ctrl.master track by $index\">\n                                <div>\n                                    <td>\n                                        <input type=\"text\" ng-show=\"!!$ctrl.editButtons[$index]\" ng-minlength=\"3\" ng-maxlength=\"8\" ng-model=\"$ctrl.editUser[$index].login\" placeholder=\"{{item.login}}\"/>\n                                        <div ng-hide=\"!!$ctrl.editButtons[$index]\">{{item.login}}</div>\n                                    </td>\n                                    <td>\n                                        <input type=\"date\" ng-show=\"!!$ctrl.editButtons[$index]\" ng-model=\"$ctrl.editUser[$index].birthDate\"\n                                        placeholder=\"{{(item.birthDate == null) ? '' : item.birthDate.getFullYear()+'-'+(item.birthDate.getMonth()+1)+'-'+item.birthDate.getDate()}}\"/>\n                                        <div ng-hide=\"!!$ctrl.editButtons[$index]\">{{(item.birthDate == null) ? '' : item.birthDate.getFullYear()+'-'+(item.birthDate.getMonth()+1)+'-'+item.birthDate.getDate()}}</div>\n                                    </td>\n                                    <td>{{item.age}}\n                                        <div ng-show=\"!!$ctrl.editButtons[$index]\" style=\"float: right\">\n                                            <button type=\"button\" class=\"btn btn-success\" ng-click=\"$ctrl.savePerson($index)\">Save</button>\n                                            <button type=\"button\" class=\"btn btn-danger\" ng-click=\"$ctrl.cancel($index)\">Cancel</button>\n                                        </div>\n                                        <div ng-hide=\"!!$ctrl.editButtons[$index]\" style=\"float: right\">\n                                            <button type=\"button\" class=\"btn btn-warning\" ng-click=\"$ctrl.editPerson($index)\">Edit</button>\n                                            <button type=\"button\" class=\"btn btn-danger\" ng-click=\"$ctrl.deletePerson($index)\">Delete</button>\n                                        </div>\n                                    </td>\n                                </div>\n                                </tr>\n                                </table>\n\n                                <button ng-click=\"$ctrl.login(name)\">Add Click</button>\n                            </div>";
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
//# sourceMappingURL=ContentComponent.js.map