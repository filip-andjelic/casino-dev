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