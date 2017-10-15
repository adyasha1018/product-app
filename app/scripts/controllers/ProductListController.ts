/// <reference path="Reference.ts" />
module productApp.Controllers {
    export class ProductListController {
        productList: Array<any>;
        viewDetails: (product: any) => void;
        editDetails: (product: any, index: any) => void;
        addProduct: () => void;
        showAddForm: boolean;
        static $inject = ["$state", "$scope"];
        constructor($state: any, $scope) {
            var vm = this;
            function init() {
                loadProductLists();
                vm.viewDetails = showDetailData;
                vm.addProduct = addProductClicked;
                vm.editDetails = editDetails;
            }
            init();
            function loadProductLists() {                
                vm.productList = JSON.parse(localStorage.getItem("list"));
            }
            function showDetailData(product: any) {
                $state.go("viewProduct", { id: product.id });
            }
            function addProductClicked() {
                $scope.showAddForm = true;
                if($scope.editedItem){
                    $scope.editedItem = null;
                } 
            }
            function editDetails(product,index) {
                $scope.showAddForm = true;
                $scope.editedItem = product;
                $scope.index=index;
          }                     
        }
    }
}