///<reference path="Reference.ts"/>
module productApp {
    export class Router {
        initialize($stateProvider, $urlRouteProvider) {
            $urlRouteProvider.otherwise("/productList");
            $stateProvider
                .state('productList', {
                    "url": "/productList",
                    templateUrl: 'views/productList.html',
                    controller: 'ProductListController as productListVM'
                })
                .state('viewProduct', {
                    "url": "/viewProduct/:id",
                    templateUrl: 'views/viewDetails.html',
                    controller: 'ViewProductController as viewProductVM'
                });
        }
    }
}