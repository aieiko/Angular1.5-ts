/// <reference path="../typings/tsd.d.ts" />
module App {
    export interface IContent {
        greeting: string;
        aaa: (name: string) => void;
        data: {
            login: string,
            birthDate: Date,
            age: number
        }

    }
}