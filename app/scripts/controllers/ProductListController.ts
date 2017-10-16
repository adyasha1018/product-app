/// <reference path="Reference.ts" />
module productApp.Controllers {
    export class ProductListController {
        productList: Array<any>;
        viewDetails: (product: any) => void;
        upvote: (product: any, index: any) => void;
        downvote: (product: any, index: any) => void;
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
                vm.upvote = upvoteClicked;
                vm.downvote = downvoteClicked;
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
                if ($scope.editedItem) {
                    $scope.editedItem = null;
                }
            }
            function editDetails(product, index) {
                $scope.showAddForm = true;
                $scope.editedItem = product;
                $scope.index = index;
            }
            function upvoteClicked(product: any, index: any) {
                let pr = Data.ProductList.filter(function (prd) {
                    return prd.id === product.id
                })[0]
                pr.up = pr.up + 1;
                localStorage.setItem("list", JSON.stringify(Data.ProductList));
                vm.productList = JSON.parse(localStorage.getItem("list"));
                relation(pr);
            }
            function downvoteClicked(product: any, index: any) {
                let pr = Data.ProductList.filter(function (prd) {
                    return prd.id === product.id
                })[0]
                pr.down = pr.down - 1;
                localStorage.setItem("list", JSON.stringify(Data.ProductList));
                vm.productList = JSON.parse(localStorage.getItem("list"));
                relation(pr);
            }
            function relation(product: any) {
                let total = product.up + (-1 * product.down)
                let percentage = (product.up / total) * 100
                if (percentage >= 87.5) {
                    product.bar = "####"
                }
                else if (percentage < 87.5 && percentage >= 62.5) {
                    product.bar = "###"
                }
                else if (percentage < 62.5 && percentage >= 37.5) {
                    product.bar = "##"
                }
                else {
                    product.bar = "#"
                }
                localStorage.setItem("list", JSON.stringify(Data.ProductList));
                vm.productList = JSON.parse(localStorage.getItem("list"));
            }

        }
    }
}