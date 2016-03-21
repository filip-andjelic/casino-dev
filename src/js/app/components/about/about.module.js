var aboutModule = angular.module("aboutModule", ["libModule"]);
aboutModule.config(['$stateProvider', function ($stateProvider) {
    $stateProvider
        .state("about", {
            url: "/about",
            templateUrl: "@!views/about/about.html",
            controller: "AboutController"
        });
}]);