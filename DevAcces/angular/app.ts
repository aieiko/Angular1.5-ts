/// <reference path="typings/tsd.d.ts" />
module App {
    'use strict';

    angular.module('app', ['file-model'])
        .config( [
            '$compileProvider',
            function( $compileProvider ) {
                $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):|blob:/);
            }
        ])
        .component('contentcomponent', new ContentComponent())
        .component('localstorecomponent', new LocalStoreComponent())
        .component('listcomponent', new ListComponent())
        .component('thumbscomponent', new ThumbsComponent());
}