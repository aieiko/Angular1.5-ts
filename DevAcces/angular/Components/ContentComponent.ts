/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../interfaces/IContent.ts" />
module App {
    'use strict';

    class ContentCtrl implements IContent{
        public paths: Object;
        public myPath: string;
        public data: any;
        public user: Object;

        public addUser: {login; birthDate};
        public editUsers: {login; birthDate};
        public editButtons: any;

        public typeDispData: string;
        public filters: {
            age: {def; descending; increase};
            login: {def; descending; increase}
        };

        public localStorageUse: string;

        constructor() {
            this.paths = ['choose path', 'LocalStore', 'API', 'path to JSON'];
            this.myPath = this.paths[0];
            this.data = [];/*(localStorage.length == 1) ? [] : JSON.parse(localStorage[this.localStorageUse]);*/
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

            if(localStorage.length == 1) {
                this.editButtons = false;
                this.localStorageUse = null;
            } else {
                this.editButtons = [];
                for(var i=0; i <= this.data.length-1; i++){
                    this.editButtons[i] = false;
                }
            }
        }

        add() {
            this.user = {
                login: this.addUser.login,
                birthDate: this.addUser.birthDate,
                age: (this.addUser.birthDate) ? Math.floor((+new Date() - this.addUser.birthDate)/(1000 * 60 *60 * 24 * 365)) : null
            };
            this.data.push(this.user);
            localStorage.setItem(this.localStorageUse, JSON.stringify(this.data));
            this.addUser = {login: null, birthDate: null};
            if(!this.editButtons) {
                this.editButtons = new Array();
                this.editButtons[0] = false
            } else {
                this.editButtons[this.editButtons.length] = false;
            }
        }

        deletePerson(index) {
            this.data.splice(index, 1);
            localStorage.setItem(this.localStorageUse, JSON.stringify(this.data));
        }

        editPerson(index) {
            this.editButtons[index] = true;
        }

        savePerson(index) {
            if(!this.editUsers || !this.editUsers[index]) {
                this.editButtons[index] = false;
            } else {
                this.editButtons[index] = false;
                this.user = {
                    login: (this.editUsers[index].login == null) ? this.data[index].login : this.editUsers[index].login,
                    birthDate: (this.editUsers[index].birthDate == null) ? this.data[index].birthDate : this.editUsers[index].birthDate,
                    age: (this.editUsers[index].birthDate) ? Math.floor((+new Date() - this.editUsers[index].birthDate)/(1000 * 60 *60 * 24 * 365)) : (this.data[index].age == null) ? null : this.data[index].age
                };
                this.data[index] = this.user;
                localStorage.setItem(this.localStorageUse, JSON.stringify(this.data));
                this.editUsers[index]= {login: null, birthDate: null};
            }
        }

        cancel(index) {
            this.editButtons[index] = false;
            this.editUsers= {login: null, birthDate: null};
        }

        //Filters for list

        filterAge() {
            if(!this.filters.login.def) {
                this.filters.login = {
                    def: true,
                    descending: false,
                    increase: false
                }
            }
            if(this.filters.age.def && !this.filters.age.descending && !this.filters.age.increase) {
                this.filters.age.def = false;
                this.filters.age.descending = true;
            } else if(!this.filters.age.def && this.filters.age.descending && !this.filters.age.increase) {
                this.filters.age.descending = false;
                this.filters.age.increase = true;
            } else {
                this.filters.age.def = true;
                this.filters.age.increase = false;
            }
        }

        filterLogin() {
            if(!this.filters.age.def) {
                this.filters.age = {
                    def: true,
                    descending: false,
                    increase: false
                }
            }
            if(this.filters.login.def && !this.filters.login.descending && !this.filters.login.increase) {
                this.filters.login.def = false;
                this.filters.login.descending = true;
            } else if(!this.filters.login.def && this.filters.login.descending && !this.filters.login.increase) {
                this.filters.login.descending = false;
                this.filters.login.increase = true;
            } else {
                this.filters.login.def = true;
                this.filters.login.increase = false;
            }
        }

    }
    export class ContentComponent implements ng.IComponentOptions {
        public bindings:any;
        public controller:any;
        public template:string;

        constructor() {

            this.template = `<div>
                                <lable>
                                    <select ng-model="$ctrl.myPath" ng-options="path for path in $ctrl.paths"></select>
                                </lable>
                                <div class="animate-switch-container"
                                     ng-switch on="$ctrl.myPath">
                                  <div class="animate-switch" ng-switch-when="LocalStore"><localstorecomponent jok-value="$ctrl.typeDispData" datat-value="$ctrl.data" storageuse-value="$ctrl.localStorageUse"></localstorecomponent></div>
                                  <div class="animate-switch" ng-switch-when="API">Home Span</div>
                                  <div class="animate-switch" ng-switch-when="path to JSON">Home Span</div>
                                  <div class="animate-switch" ng-switch-default></div>
                                </div>
                                <h1>{{$ctrl.greeting}}</h1>
                                <h1>{{$ctrl.myPath}}</h1>
                                <h1>{{$ctrl.data}}</h1>
                                <h1>{{$ctrl.typeDispData}}</h1>


                                <form class="form-inline" name="userForm" ng-show="!!$ctrl.localStorageUse" ng-submit="$ctrl.add()" novalidate>

                                    <div class="form-group" ng-class="{ 'has-error' : userForm.login.$invalid && !userForm.login.$pristine }">
                                        <label>Login</label>
                                        <input type="text" name="login" class="form-control" ng-model="$ctrl.addUser.login" ng-minlength="3" ng-maxlength="8" required>
                                        <p ng-show="userForm.login.$invalid && !userForm.login.$pristine && $ctrl.addUser.login.length > 0 || userForm.login.$error.minlength || userForm.login.$error.maxlength"
                                           style="position: absolute"
                                           class="alert alert-danger">You Login is empty or short or overlong.</p>

                                    </div>

                                    <div class="form-group" ng-class="{ 'has-error' : userForm.date.$invalid && !userForm.date.$pristine }">
                                        <label>Birh date</label>
                                        <input type="date" name="date" class="form-control" ng-model="$ctrl.addUser.birthDate" placeholder="2000-11-02">
                                        <p ng-show="userForm.date.$invalid && !userForm.date.$pristine"
                                           style="position: absolute"
                                           class="alert alert-danger">Please enter a valid date.</p>
                                    </div>

                                    <button style="margin-top: 25px" type="submit" class="btn btn-primary" ng-disabled="userForm.$invalid">Add</button>

                                </form>
                                <table class="table table-striped">
                                <h1>{{$ctrl.localStorageUse}}</h1>
                                <input style="width: 350px; margin: auto" type="text" class="form-control" placeholder="search" ng-model="search"/>
                                <tr>
                                    <th>
                                        <div style="width: 51px" ng-click="$ctrl.filterLogin()" ng-class="{'dropdown': !$ctrl.filters.login.def && !$ctrl.filters.login.descending, 'dropup': $ctrl.filters.login.increase}">
                                            <button class="btn btn-default" type="button">
                                                Login
                                                <span ng-class="{'caret': !$ctrl.filters.login.def}"></span>
                                        </div>
                                    </th>
                                    <th>BirthDay</th>
                                    <th>
                                        <div style="width: 51px; float: left" ng-click="$ctrl.filterAge()" ng-class="{'dropdown': !$ctrl.filters.age.def && !$ctrl.filters.age.descending, 'dropup': $ctrl.filters.age.increase}">
                                            <button class="btn btn-default" type="button">
                                                Age
                                                <span ng-class="{'caret': !$ctrl.filters.age.def}"></span>
                                        </div>

                                        <div class="btn-group" data-toggle="buttons" style="float:right">
                                          <label class="btn btn-primary" ng-class="{'active': $ctrl.typeDispData == 'list' }">
                                            <input type="radio" ng-model="$ctrl.typeDispData" value="list"><span class="glyphicon glyphicon-list"></span>
                                          </label>
                                          <label class="btn btn-primary" ng-class="{'active': $ctrl.typeDispData == 'thumbs' }">
                                            <input type="radio" ng-model="$ctrl.typeDispData" value="thumbs"><span class="glyphicon glyphicon-th"></span>
                                          </label>
                                        </div>

                                    </th>
                                </tr>
                                <tr ng-repeat="item in $ctrl.data | filter:search track by $index">
                                <div>
                                    <td>
                                        <input type="text" ng-show="!!$ctrl.editButtons[$index]" ng-minlength="3" ng-maxlength="8" ng-model="$ctrl.editUsers[$index].login" placeholder="{{item.login}}"/>
                                        <div ng-hide="!!$ctrl.editButtons[$index]">{{item.login}}</div>
                                    </td>
                                    <td>
                                        <input type="date" ng-show="!!$ctrl.editButtons[$index]" ng-model="$ctrl.editUsers[$index].birthDate"
                                        placeholder="{{(item.birthDate == null) ? '' : item.birthDate.getFullYear()+'-'+(item.birthDate.getMonth()+1)+'-'+item.birthDate.getDate()}}"/>

                                        <div ng-hide="!!$ctrl.editButtons[$index]">{{(item.birthDate == null) ? '' : item.birthDate.getFullYear()+'-'+(item.birthDate.getMonth()+1)+'-'+item.birthDate.getDate()}}</div>
                                    </td>
                                    <td>{{item.age}}
                                        <div ng-show="!!$ctrl.editButtons[$index]" style="float: right">
                                            <button type="button" class="btn btn-success" ng-click="$ctrl.savePerson($index)">Save</button>
                                            <button type="button" class="btn btn-danger" ng-click="$ctrl.cancel($index)">Cancel</button>
                                        </div>
                                        <div ng-hide="!!$ctrl.editButtons[$index]" style="float: right">
                                            <button type="button" class="btn btn-warning" ng-click="$ctrl.editPerson($index)">Edit</button>
                                            <button type="button" class="btn btn-danger" ng-click="$ctrl.deletePerson($index)">Delete</button>
                                        </div>
                                    </td>
                                </div>
                                </tr>
                                </table>
                            </div>`;
            this.controller = ContentCtrl;
        }
    }

    class LocalStoreCtrl {
        public jokValue;
        public storageuseValue;
        public selectData;
        public datatValue;
        public storageName:string;
        public localStorageNames: Array<string>;

        constructor() {
            this.jokValue = 'thumbs';
            this.localStorageNames = [];
            if(localStorage['debug']) {
                localStorage.removeItem('debug');
            }
            if(localStorage.length !== 0) {
                for(var i=0; i <= localStorage.length-1; i++)
                    this.localStorageNames[i] = localStorage.key(i);
                this.selectData = this.localStorageNames[0];
            }
        }

        createStorage() {
            console.log('create');
            localStorage.setItem(this.storageName, JSON.stringify([]));
            for(var i=0; i <= localStorage.length-1; i++)
                this.localStorageNames[i] = localStorage.key(i);
            this.selectData = this.storageName;
            this.storageName = null;
            this.datatValue = JSON.parse(localStorage[this.selectData]);
            this.storageuseValue = this.selectData;
        }

        getStorage() {
            console.log('get');
            this.datatValue = JSON.parse(localStorage[this.selectData]);
            if(this.datatValue.length >= 1) {
                for(var i=0; i <= this.datatValue.length-1; i++)
                    this.datatValue[i].birthDate = (this.datatValue[i].birthDate == null) ? null : new Date(Date.parse(this.datatValue[i].birthDate));
            }
            this.storageuseValue = this.selectData;
        }

        removeStorage() {
            console.log('delete');
                if(this.selectData == this.storageuseValue) {
                    alert('You can\'t delet this table because '+this.selectData+' used');
                } else {
                    localStorage.removeItem(this.selectData);
                    if(localStorage.length == 0) {
                        this.localStorageNames = [];
                    } else {
                        for(var i=0; i <= localStorage.length-1; i++)
                            this.localStorageNames[i] = localStorage.key(i);
                        this.selectData = this.storageuseValue || this.localStorageNames[0];
                    }
                }
        }

    }
    export class LocalStoreComponent implements ng.IComponentOptions {
        public bindings:any;
        public controller:any;
        public template:string;

        constructor() {
            this.bindings = {
                textBinding: '@',
                jokValue: '=',
                storagenamesValue: '=',
                datatValue: '=',
                storageuseValue: '=',
                functionBinding: '&'
            };
            this.template = `<div>
                            <lable>
                                <select ng-model="$ctrl.selectData" ng-options="name for name in $ctrl.localStorageNames"></select>
                            </lable>
                            <button type="button" class="btn btn-warning" ng-click="$ctrl.getStorage()">GET</button>
                            <button type="button" class="btn btn-danger" ng-click="$ctrl.removeStorage()">Delete</button>
                            <div style="display: flex">
                                <input type="text" style="width: 300px" minlength="3" maxlength="8" class="form-control" ng-model="$ctrl.storageName"/>
                                <button type="button" class="btn btn-success" ng-click="$ctrl.createStorage()">Create</button>
                            </div>
                            </div>`;
            this.controller = LocalStoreCtrl;
        }
    }

    class ListCtrl extends ContentCtrl {
        public ContentCtrl
        constructor() {
            this.add = this.ContentCtrl.add();
            super()
        }
    }

    export class ListComponent {
        public template:string;
        public controller:any;
        constructor() {
            this.template = `<div>

                            </div> `
        }
    }

    export class ThumbsComponent extends ContentCtrl {

    }

}