/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../interfaces/IContent.ts" />
module App {
    'use strict';

    class ContentCtrl implements IContent{
        public paths: Object;
        public myPath: string;
        public greeting: string;
        public aaa: (name: string) => void;
        public master: Array<Object>;
        public data: {
                login: string,
                birthDate: Date,
                age: number
        };

        constructor() {
            this.greeting = "Wellcome!";
            this.paths = ['choose path', 'LocalStore', 'API', 'path to JSON'];
            this.myPath = this.paths[0];
            this.master = [];
            this.data = {
                login: 'fff',
                birthDate: new Date(2000, 2, 22),
                age: 21
            };
            this.aaa = function(name) {
                this.greeting = "Hello " + name + "!";
            }
        }

        createStore() {
            this.master.push(this.data);
            console.log(this.master);
            localStorage.setItem('CRUD', JSON.stringify(this.master));
        }

        addPerson() {
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
                                <h1>{{$ctrl.master}}</h1>
                                <div ng-click="$ctrl.createStore()">create</div>
                                <div ng-click="$ctrl.addPerson()">add</div>
                                <div ng-repeat="item in $ctrl.master track by $index">
                                    <div>{{item.login}}</div>
                                    <div>{{item.birthDate}}</div>
                                    <div>{{item.age}}</div>
                                </div>
                                <input type="text" ng-model="name"/>
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