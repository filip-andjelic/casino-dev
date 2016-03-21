angular.module("gameModule").service("GameService", ["$http", "$q", function($http, $q){

    this.getGameData = function(gameType, gameName){
        try{
            if(typeof gameName !== "undefined" && gameName !== "" && gameName !== null){
                var deferred = $q.defer();
                $http.get("/casino-example/data/" + gameName + "_game.json")
                    .success(function(data){
                        deferred.resolve(data);
                    })
                    .error(function(err, status){
                        deferred.reject(err);
                    });
                return deferred.promise;
            }
            return null;
        }
        catch(exc){
            console.log(exc);
        }
    };

}]);