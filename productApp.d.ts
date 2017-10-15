/// <reference path="node_modules/definitely-typed-jquery/jquery.d.ts" />
/// <reference path="node_modules/definitely-typed-angular/angular.d.ts" />
/// <reference path="app/scripts/Misc.d.ts" />
declare module productApp {
    class Router {
        initialize($stateProvider: any, $urlRouteProvider: any): void;
    }
}
declare module productApp {
    class Bootstraper {
        module: ng.IModule;
        router: productApp.Router;
        constructor(module: ng.IModule, router: productApp.Router);
        bootstrap(): void;
        initializeConfig(RestangularProvider: restangular.IProvider, $stateProvider: any, $urlRouterProvider: any, $httpProvider: ng.IHttpProvider): void;
        initRestangular(RestangularProvider: any): void;
    }
}
declare class Data {
    static ProductList: {
        "id": number;
        "name": string;
        "image": string;
        "description": string;
    }[];
}
declare module productApp.Controllers {
    class ProductListController {
        productList: Array<any>;
        viewDetails: (product: any) => void;
        editDetails: (product: any, index: any) => void;
        addProduct: () => void;
        showAddForm: boolean;
        static $inject: string[];
        constructor($state: any, $scope: any);
    }
}
declare module productApp.Controllers {
    class ProductAddController {
        upload: (file: any) => void;
        saveProductToList: () => void;
        filePath: string;
        cancel: () => void;
        index: any;
        static $inject: string[];
        constructor($scope: any, Upload: any);
    }
}
declare module productApp.Controllers {
    class ViewProductController {
        productDetails: any;
        static $inject: string[];
        constructor($stateParams: any, $scope: any);
    }
}
declare module productApp {
    class App {
        module: ng.IModule;
        constructor();
    }
}
