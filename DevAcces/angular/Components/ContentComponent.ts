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

        constructor() {
            this.paths = ['choose path', 'LocalStore', 'API', 'path to JSON'];
            this.myPath = this.paths[0];
            this.data = (localStorage.length == 1) ? [] : JSON.parse(localStorage['CRUD']);
            if(localStorage.length == 1) {
                this.editButtons = false;
            } else {
                this.editButtons = [];
                for(var i=0; i <= this.data.length-1; i++){
                    this.editButtons[i] = false;
                    this.data[i].birthDate = new Date(Date.parse(this.data[i].birthDate));
                }
            }
        }

        add() {
            console.log(this.editButtons);
            this.user = {
                login: this.addUser.login,
                birthDate: this.addUser.birthDate,
                age: (this.addUser.birthDate) ? Math.floor((+new Date() - this.addUser.birthDate)/(1000 * 60 *60 * 24 * 365)) : null
            };
            this.data.push(this.user);
            localStorage.setItem('CRUD', JSON.stringify(this.data));
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
            localStorage.setItem('CRUD', JSON.stringify(this.data));
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
                localStorage.setItem('CRUD', JSON.stringify(this.data));
                this.editUsers[index]= {login: null, birthDate: null};
            }
        }

        cancel(index) {
            this.editButtons[index] = false;
            this.editUsers= {login: null, birthDate: null};
        }

    }
    export class ContentComponent implements ng.IComponentOptions {
        public bindings:any;
        public controller:any;
        public template:string;

        constructor() {
            this.bindings = {
                textBinding: '@',
                dataBinding: '<',
                functionBinding: '&'
            };
            this.template = `<div>
                                <lable>
                                    <select ng-model="$ctrl.myPath" ng-options="path for path in $ctrl.paths"></select>
                                </lable>
                                <div class="animate-switch-container"
                                     ng-switch on="$ctrl.myPath">
                                  <div class="animate-switch" ng-switch-when="LocalStore"><localstorecomponent></localstorecomponent></div>
                                  <div class="animate-switch" ng-switch-when="API">Home Span</div>
                                  <div class="animate-switch" ng-switch-when="path to JSON">Home Span</div>
                                  <div class="animate-switch" ng-switch-default></div>
                                </div>
                                <h1>{{$ctrl.greeting}}</h1>
                                <h1>{{$ctrl.myPath}}</h1>
                                <h1>{{$ctrl.data}}</h1>


                                <form class="form-inline" name="userForm" ng-submit="$ctrl.add()" novalidate>

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

                                <button type="button" class="btn btn-success" ng-click="$ctrl.createStore()">create</button>
                                <button type="button" class="btn btn-info" ng-click="$ctrl.addPerson()">add</button>
                                <table class="table table-striped">
                                <tr>
                                    <th>login</th><th>BirthDay</th><th>Age</th>
                                </tr>
                                <tr ng-repeat="item in $ctrl.data track by $index">
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

                                <button ng-click="$ctrl.login(name)">Add Click</button>
                            </div>`;
            this.controller = ContentCtrl;
        }

    }

    class LocalStoreCtrl {
        data: any;
        nameData: string;
        constructor() {
            this.data = (localStorage.length == 1)? '' :  localStorage.getItem(this.nameData)
        }
    }

    export class LocalStoreComponent implements ng.IComponentOptions {
        public bindings:any;
        public controller:any;
        public template:string;

        constructor() {
            this.bindings = {
                textBinding: '@',
                dataBinding: '<',
                functionBinding: '&'
            };
            this.template = `<div>

                             </div>`;
            this.controller = LocalStoreCtrl;
        }

    }
}