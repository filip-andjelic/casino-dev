angular.module('gameModule').controller('GameController', ['$scope', '$state', '$stateParams', 'GameService', function($scope, $state, $stateParams, GameService){

    $scope.game = {};
	console.log($stateParams);
    var result = GameService.getGameData($stateParams.type, $stateParams.name.toLocaleLowerCase());
    if(typeof result !== "undefined" && result !== null){
        result.then(function(response){
            $scope.game = response.game;
        });
    }

}]);