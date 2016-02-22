/// <reference path="typings/tsd.d.ts" />
module App {
    'use strict';

    angular.module('app', [])
        .component('contentcomponent', new ContentComponent())
        .component('localstorecomponent', new LocalStoreComponent());
}