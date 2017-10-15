///<reference path="Reference.ts"/>
module productApp {
    export class Bootstraper {
        constructor(public module: ng.IModule, public router: productApp.Router) {
        }
        bootstrap() {
            this.module.config(["RestangularProvider", "$stateProvider", "$urlRouterProvider", "$httpProvider",
                (RestangularProvider: restangular.IProvider, $stateProvider: any, $urlRouterProvider: any, $httpProvider: any) =>
                    this.initializeConfig(RestangularProvider, $stateProvider, $urlRouterProvider, $httpProvider)]);
        }
        initializeConfig(RestangularProvider: restangular.IProvider, $stateProvider: any, $urlRouterProvider: any, $httpProvider: ng.IHttpProvider) {
            this.initRestangular(RestangularProvider);
            this.router.initialize($stateProvider, $urlRouterProvider);
        }
        initRestangular(RestangularProvider: any) {
            RestangularProvider.setParentless(true, []);
            let list = localStorage.getItem("list")
            if (!list) {
                localStorage.setItem("list", JSON.stringify(Data.ProductList));
                }
                else{
                Data.ProductList  = JSON.parse(list);
            }         
                } 
    

}}