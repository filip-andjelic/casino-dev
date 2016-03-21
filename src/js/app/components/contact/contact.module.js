var contactModule = angular.module("contactModule", ["libModule"]);
contactModule.config(['$stateProvider', function ($stateProvider){
    $stateProvider
        .state('contact', {
            url: "/contact",
            templateUrl: "@!views/contact/contact.html",
            controller: "ContactController"
        });
}]);