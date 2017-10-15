var productApp;
(function (productApp) {
    var Router = (function () {
        function Router() {
        }
        Router.prototype.initialize = function ($stateProvider, $urlRouteProvider) {
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
        };
        return Router;
    }());
    productApp.Router = Router;
})(productApp || (productApp = {}));
var productApp;
(function (productApp) {
    var Bootstraper = (function () {
        function Bootstraper(module, router) {
            this.module = module;
            this.router = router;
        }
        Bootstraper.prototype.bootstrap = function () {
            var _this = this;
            this.module.config(["RestangularProvider", "$stateProvider", "$urlRouterProvider", "$httpProvider",
                function (RestangularProvider, $stateProvider, $urlRouterProvider, $httpProvider) {
                    return _this.initializeConfig(RestangularProvider, $stateProvider, $urlRouterProvider, $httpProvider);
                }]);
        };
        Bootstraper.prototype.initializeConfig = function (RestangularProvider, $stateProvider, $urlRouterProvider, $httpProvider) {
            this.initRestangular(RestangularProvider);
            this.router.initialize($stateProvider, $urlRouterProvider);
        };
        Bootstraper.prototype.initRestangular = function (RestangularProvider) {
            RestangularProvider.setParentless(true, []);
            var list = localStorage.getItem("list");
            if (!list) {
                localStorage.setItem("list", JSON.stringify(Data.ProductList));
            }
            else {
                Data.ProductList = JSON.parse(list);
            }
        };
        return Bootstraper;
    }());
    productApp.Bootstraper = Bootstraper;
})(productApp || (productApp = {}));
var Data = (function () {
    function Data() {
    }
    Data.ProductList = [
        { "id": 1, "name": "Lifebuoy", "image": "images/lifebuoy.png", "description": "Lifebuoy soap" },
        { "id": 2, "name": "Dettol", "image": "images/dettol.jpg", "description": "Dettol soap" },
        { "id": 3, "name": "Santoor", "image": "images/santoor.jpeg", "description": "Santoor soap" }
    ];
    return Data;
}());
var productApp;
(function (productApp) {
    var Controllers;
    (function (Controllers) {
        var ProductListController = (function () {
            function ProductListController($state, $scope) {
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
                function showDetailData(product) {
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
            }
            ProductListController.$inject = ["$state", "$scope"];
            return ProductListController;
        }());
        Controllers.ProductListController = ProductListController;
    })(Controllers = productApp.Controllers || (productApp.Controllers = {}));
})(productApp || (productApp = {}));
var productApp;
(function (productApp) {
    var Controllers;
    (function (Controllers) {
        var ProductAddController = (function () {
            function ProductAddController($scope, Upload) {
                var vm = this;
                vm.upload = uploadFile;
                vm.saveProductToList = saveProductToListClicked;
                vm.updateProductToList = updateProductToListClicked;
                vm.cancel = cancel;
                function uploadFile(file) {
                    Upload.upload({
                        url: '/fileUpload',
                        data: { file: file }
                    }).then(function () {
                        console.log('Successfully uploaded');
                    }, function (resp) {
                        console.log('Error status: ' + resp.status);
                    });
                }
                ;
                if ($scope.$parent.$parent.editedItem) {
                    vm.name = $scope.$parent.$parent.editedItem.name;
                    vm.description = $scope.$parent.$parent.editedItem.description;
                    vm.image = $scope.$parent.$parent.editedItem.image;
                    vm.index = $scope.$parent.$parent.index;
                }
                function saveProductToListClicked() {
                    var entityToPost = {
                        id: Data.ProductList.length + 1,
                        name: vm.name,
                        description: vm.description,
                        image: "images/dettol.jpg"
                    };
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
                    var entityToUpdate = {
                        id: $scope.$parent.$parent.editedItem.id,
                        name: vm.name,
                        description: vm.description,
                        image: vm.image
                    };
                    Data.ProductList.push(entityToUpdate);
                    reset();
                }
            }
            ProductAddController.$inject = ["$scope", "Upload"];
            return ProductAddController;
        }());
        Controllers.ProductAddController = ProductAddController;
    })(Controllers = productApp.Controllers || (productApp.Controllers = {}));
})(productApp || (productApp = {}));
var productApp;
(function (productApp) {
    var Controllers;
    (function (Controllers) {
        var ViewProductController = (function () {
            function ViewProductController($stateParams, $scope) {
                var vm = this;
                var id = $stateParams.id;
                vm.productDetails = Data.ProductList.filter(function (product) {
                    return product.id == id;
                })[0];
            }
            ViewProductController.$inject = ["$stateParams", "$scope"];
            return ViewProductController;
        }());
        Controllers.ViewProductController = ViewProductController;
    })(Controllers = productApp.Controllers || (productApp.Controllers = {}));
})(productApp || (productApp = {}));
angular.module('productApp.Controllers', []).controller(productApp.Controllers);
var productApp;
(function (productApp) {
    var App = (function () {
        function App() {
            this.module = angular.module('productApp', ['productApp.Controllers', 'restangular', 'ui.router',
                'ngMaterial', 'ngFileUpload']);
            var router = new productApp.Router();
            var bootstrapper = new productApp.Bootstraper(this.module, router);
            bootstrapper.bootstrap();
        }
        return App;
    }());
    productApp.App = App;
    new App();
})(productApp || (productApp = {}));
//# sourceMappingURL=productApp.js.map