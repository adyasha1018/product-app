/// <reference path="Reference.ts" />
module productApp.Controllers {
    export class ViewProductController {
        productDetails: any;
        static $inject = ["$stateParams","$scope"];
        constructor($stateParams,$scope){
            var vm=this;
            let id = $stateParams.id;
            vm.productDetails=Data.ProductList.filter(function(product){
                return product.id == id;
            })[0];
        }
    }
}