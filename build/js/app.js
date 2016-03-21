
var libModule = angular.module("libModule", ["ui.router"]);

var angularApp = angular.module("mainApp", [
    "libModule",
    "mainModule",
    "categoryModule"
]);

angularApp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 
  function ($stateProvider, $urlRouterProvider, $locationProvider){
    // Rule that converts url to lower case
    $urlRouterProvider.rule(function($injector, $location) {
        var path = $location.path(),
            lowerCasePath = path.toLowerCase();
        // if path is not lower case then convert to lower case
        if (path != lowerCasePath) {
            $location.replace().path(lowerCasePath);
        }
    });
    // set HTML 5 urls mode
    $locationProvider.html5Mode(true).hashPrefix("!");
}]);

/* ------------------------------------------------------------------------------------------------------------ */

var aboutModule = angular.module("aboutModule", ["libModule"]);
aboutModule.config(['$stateProvider', function ($stateProvider) {
    $stateProvider
        .state("about", {
            url: "/about",
            templateUrl: "/build/app/views/about/about.html",
            controller: "AboutController"
        });
}]);

/* ------------------------------------------------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------------------------------------------------ */

var contactModule = angular.module("contactModule", ["libModule"]);
contactModule.config(['$stateProvider', function ($stateProvider){
    $stateProvider
        .state('contact', {
            url: "/contact",
            templateUrl: "/build/app/views/contact/contact.html",
            controller: "ContactController"
        });
}]);

/* ------------------------------------------------------------------------------------------------------------ */

var gameModule = angular.module('gameModule', ['libModule']);
gameModule.config(['$stateProvider', function ($stateProvider){
    $stateProvider
        .state('game', {
            url: '/game/:type/:name',
            templateUrl: "/build/app/views/game/main.html",
            controller: "GameController"
        });
}]);

/* ------------------------------------------------------------------------------------------------------------ */

var mainModule = angular.module('mainModule', ['libModule']);
mainModule.config(['$stateProvider', function ($stateProvider){
  $stateProvider
    .state('main', {
      url: '/casino-example/index.php',
      templateUrl: "/casino-example/build/app/views/main/main.html"/*,
      controller: "MainController"*/
    });
}]);


/* ------------------------------------------------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------------------------------------------------ */

angular.module("aboutModule").controller("AboutController", ["$scope", function($scope){
    console.log("AboutController");
}]);

/* ------------------------------------------------------------------------------------------------------------ */

angular.module('categoryModule').controller('CategoryController', ['$scope', 'CategoryService', 
  function($scope, CategoryService){

    $scope.games = [];
    var result = CategoryService.getCategoryData('catId');
    if(typeof result !== "undefined" && result !== null){
        result.then(function(response){
            $scope.games = response.category;
            $scope.Math = window.Math;
            /* 
             this function takes exact number of game icons
             for particular page and calculates how many slides
             is needed to be made, 12 icons per slide
            */
            $scope.gameGroup = function(index) {
            	var num = $scope.Math.ceil($scope.games[index].games.length/12);
            	var niz = [];
            	for (num; num>0; num--) niz.push(num);
            	return niz;
            };
        });
    }
    /* this function uploads new slide of games */
    $scope.prevSlide = function(item) {
    	var trigger = $(item.target);
    	var slideActive = trigger.parent().next().find('div.active');
    	var slidePrev = slideActive.prev();
    	/* if there's no previous slide, it takes last slide */
    	if(slidePrev.length===0) {
    		slidePrev = trigger.parent().next().find('div.hide:last-child');
    		slideActive.addClass('hide').removeClass('active');
    		slidePrev.removeClass('hide').addClass('active');
    	} else {
	    	slideActive.addClass('hide').removeClass('active');
	    	slidePrev.removeClass('hide').addClass('active');
	    }
    };

    /* this function uploads new slide of games */
    $scope.nextSlide = function(item) {
    	var trigger = $(item.target);
    	var slideActive = trigger.parent().prev().find('div.active');
    	var slideNext = slideActive.next();
    	/* if there's no next slide, it takes first slide */
    	if(slideNext.length===0) {
    		slideNext = trigger.parent().prev().find('div.hide:first-child');
    		slideActive.addClass('hide').removeClass('active');
    		slideNext.removeClass('hide').addClass('active');
    	} else {
	    	slideActive.addClass('hide').removeClass('active');
    		slideNext.removeClass('hide').addClass('active');
	    }
    };
}]);

/* ------------------------------------------------------------------------------------------------------------ */

angular.module("contactModule").controller("ContactController", ["$scope", function($scope){
    console.log("ContactController");
}]);

/* ------------------------------------------------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------------------------------------------------ */

angular.module("mainModule").controller("MainController", ["$scope", "MainService", "$state",  
  function($scope, MainService, $state){
 		
    $scope.categories = [];

    MainService.getMainPageData().then(function(response){
      $scope.categories = response.categories;
    });

    $scope.randomGames = [];
    if( $scope.randomGames.length === 0 ) {
      MainService.getRandomData().then(function(response){
        $scope.randomGames = response.games;
        $scope.randomIndexes = $scope.takeRandomNum(3);
        console.log($scope.randomIndexes);
      });
    }
    var indexes = [];
    /* -- this function generates random games on page -- */
    $scope.takeRandomNum = function(times){
			
      for (var i = 0; i<times; i++) {
        var random = (Math.random()*100)/10;
        var num    = Math.round(random);
        console.log(indexes.indexOf(num)); 
        if ( indexes.indexOf(num) === -1) {
          indexes.push(num);
        }
        else {
          $scope.takeRandomNum(1);
        }
      }
      return indexes;
    };
    
    /* -- this function triggers when game is clicked -- */
           /* -- and it calls iframe for game -- */
    $scope.gamePopUp = function(item) {
      var trigger = $(item.target).parents('div.wrap-content');
      var target = trigger.find('div.game-frame');
      var style = target.css('display');
      $scope.toggleGame.toggleFrame(style, target);
  	};

  	/* -- this function is called to determine whether --*/
  	    /* -- iframe should be shown or hidden -- */
  	$scope.toggleGame = {
      toggleFrame : function(style, target){
    		if(style==='none'){
          this.getUrl = $state.current.url;
        	target.css('display','block');
        }else{
          target.css('display','none');
        }
    	},
      getUrl : ""             
    };
}]);