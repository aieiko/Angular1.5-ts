/// <reference path="typings/tsd.d.ts" />
var App;
(function (App) {
    'use strict';
    angular.module('app', ['file-model']).config([
        '$compileProvider',
        function ($compileProvider) {
            $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):|blob:/);
        }
    ]).component('contentcomponent', new ContentComponent()).component('localstorecomponent', new LocalStoreComponent()).component('listcomponent', new ListComponent()).component('thumbscomponent', new ThumbsComponent());
})(App || (App = {}));
//# sourceMappingURL=app.js.map