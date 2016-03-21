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