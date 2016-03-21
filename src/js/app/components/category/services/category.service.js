angular.module('categoryModule').service('CategoryService', ['$http', '$q', function($http, $q){
    this.getCategoryData = function(categoryName){
        try{
            if(typeof categoryName !== "undefined" && categoryName !== ''){
                var deferred = $q.defer();
                $http.get('/casino-example/data/main.json')
                    .success(function(data){
                        deferred.resolve(data);
                    })
                    .error(function(err, status){
                        deferred.reject(err);
                    });
                return deferred.promise;
            }
            return [];
        }
        catch(exc){
            console.log(exc);
        }
    };
}]);