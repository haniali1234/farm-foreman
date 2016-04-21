	(function (){

	'use strict';
	angular.module('app')
		.controller('ForemanViewController', function (Users) {

			var vm = this;
			vm.currentUser = Users.currentUser;
	});
}());
