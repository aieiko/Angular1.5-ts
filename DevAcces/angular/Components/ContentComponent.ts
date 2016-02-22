/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../interfaces/IContent.ts" />
module App {
    'use strict';

    class ContentCtrl implements IContent{
        public greeting: string;
        public login: (name: string) => void;

        constructor() {
            this.greeting = "Wellcome!";
            this.login = function(name) {
                this.greeting = "Hello " + name + "!";
            }
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
                                <h1>{{$ctrl.greeting}}</h1>
                                <input type="text" ng-model="name"/>
                                <button ng-click="$ctrl.login(name)">Add Click</button>
                            </div>`;
            this.controller = ContentCtrl;
        }

    }
}