var mainModule = angular.module('mainModule', ['libModule']);
mainModule.config(['$stateProvider', function ($stateProvider){
  $stateProvider
    .state('main', {
      url: '/casino-example/index.php',
      templateUrl: "/casino-example/build/app/views/main/main.html"/*,
      controller: "MainController"*/
    });
}]);
