var gameModule = angular.module('gameModule', ['libModule']);
gameModule.config(['$stateProvider', function ($stateProvider){
    $stateProvider
        .state('game', {
            url: '/game/:type/:name',
            templateUrl: "@!views/game/main.html",
            controller: "GameController"
        });
}]);