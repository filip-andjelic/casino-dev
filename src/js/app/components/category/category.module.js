var categoryModule = angular.module('categoryModule', ['libModule']);
categoryModule.config(['$stateProvider', function ($stateProvider){
    $stateProvider
		    .state('category-one', {
            url: '/casino-example/category/1',
            templateUrl: "/casino-example/build/app/views/category/card-table.html",
            controller: "CategoryController"
        })
        .state('category-two', {
            url: '/casino-example/category/2',
            templateUrl: "/casino-example/build/app/views/category/novomatic.html",
            controller: "CategoryController"
        })
        .state('category-three', {
            url: '/casino-example/category/3',
            templateUrl: "/casino-example/build/app/views/category/octavian.html",
            controller: "CategoryController"
        });
}]);