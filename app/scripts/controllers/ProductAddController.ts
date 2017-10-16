/// <reference path="Reference.ts" />
module productApp.Controllers {
    export class ProductAddController {
        upload: (file: any) => void;
        saveProductToList: () => void;
        filePath: string;
        cancel: () => void;
        index: any;
        static $inject = ["$scope", "Upload"];
        constructor($scope: any, Upload: any) {
            var vm: any = this;
            vm.upload = uploadFile;
            vm.saveProductToList = saveProductToListClicked;
            vm.updateProductToList = updateProductToListClicked;
            vm.cancel = cancel;
            function uploadFile(file) {
                // backend service call required
                Upload.upload({
                    url: '/fileUpload',
                    data: { file: file }
                }).then(function () {
                    console.log('Successfully uploaded');
                }, function (resp) {
                    console.log('Error status: ' + resp.status);
                });
            };
            if ($scope.$parent.$parent.editedItem) {
                vm.name = $scope.$parent.$parent.editedItem.name;
                vm.description = $scope.$parent.$parent.editedItem.description;
                vm.image = $scope.$parent.$parent.editedItem.image;
                vm.index = $scope.$parent.$parent.index;
            }
            function saveProductToListClicked() {
                let entityToPost = {
                    id: Data.ProductList.length + 1,
                    name: vm.name,
                    description: vm.description,
                    image: "images/dettol.jpg",
                    up:0,
                    down:0,
                    bar : ""
                }

                Data.ProductList.push(entityToPost);
                reset();
            }
            function reset() {
                localStorage.setItem("list", JSON.stringify(Data.ProductList));
                $scope.$parent.$parent.productListVM.productList = Data.ProductList;
                cancel();
            }
            function cancel() {
                $scope.$parent.$parent.showAddForm = false;
            }
            function updateProductToListClicked() {
                Data.ProductList.splice(vm.index, 1);
                let entityToUpdate = {
                    id: $scope.$parent.$parent.editedItem.id,
                    name: vm.name,
                    description: vm.description,
                    image: vm.image,
                    up:0,
                    down:0,
                    bar : ""
                }
                Data.ProductList.push(entityToUpdate);
                reset();
            }
        }
    }
}