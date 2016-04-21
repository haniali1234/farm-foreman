	(function (){

	'use strict';
	angular.module('app')
	.directive('body', function(){
      $(document).on('click','.navbar-collapse.in',function(e) {
    	if( $(e.target).is('a') ) {
        $(this).collapse('hide');
    }
});

  });
	}());
