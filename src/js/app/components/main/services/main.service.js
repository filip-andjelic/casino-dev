angular.module("mainModule").service('MainService', ['$http', '$q', function($http, $q){
    /**
     * Return main data
     * @returns {*}
     */
    this.getMainPageData = function(){
        var deferred = $q.defer();
        $http.get('/casino-example/data/categories_list.json')
            .success(function(data){
                deferred.resolve(data);
            })
            .error(function(err, status){
                deferred.reject(err);
            });
        return deferred.promise;
    };

    this.getRandomData = function(){
      var deferred = $q.defer();
      $http.get("/casino-example/data/random_icon_list.json")
        .success(function(data){
            deferred.resolve(data);
        })
        .error(function(err, status){
            deferred.reject(err);
        });
      return deferred.promise;
    };

}]);