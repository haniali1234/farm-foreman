(function (){

	'use strict';
	angular.module('app')
		.controller('BodyController', function ($window , Users, $rootScope, $state){
			var vm = this;
			vm.logout = Users.logout;
			vm.bodyClass = $state.current.data ? $state.current.data.bodyClass : '';

			$rootScope.$on('$stateChangeStart', function (event, toState) {
				vm.bodyClass = toState.data ? toState.data.bodyClass : '';
			});

			vm.admin = function admin() {
				var userStr = $window.localStorage.getItem('currentUser');
				var userObj = JSON.parse(userStr); //converting to an object cuz originally it was saved as string
				return userObj.admin;
			};
	});
}());
