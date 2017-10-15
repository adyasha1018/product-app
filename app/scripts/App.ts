///<reference path="Reference.ts"/>
module productApp {
    export class App {
        module: ng.IModule;
        constructor() {
            this.module = angular.module('productApp',['productApp.Controllers','restangular','ui.router',
            'ngMaterial','ngFileUpload']);
            let router = new productApp.Router();
            let bootstrapper = new productApp.Bootstraper(this.module,router);
            bootstrapper.bootstrap();
        }
    }
    new App();
}