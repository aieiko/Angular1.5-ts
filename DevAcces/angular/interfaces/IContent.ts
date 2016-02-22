/// <reference path="../typings/tsd.d.ts" />
module App {
    export interface IContent {
        greeting: string;
        login: (name: string) => void;
    }
}