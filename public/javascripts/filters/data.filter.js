	(function (){

	'use strict';
	angular.module('app')
        .directive('uppercased', function() {
			    return {
			        require: 'ngModel',
			        link: function($scope, element, attrs, modelCtrl) {
			            modelCtrl.$parsers.push(function(input) {
			                return input ? input.toUpperCase() : "";
			            });

			        }
			    };
			});

// 	.filter('uppercased',[ function () {
// 		debugger;
//     return function(locations, searchText) {
//     	debugger;
//         var filtered = [];
//         debugger;
//         var regex = new RegExp(".*" + searchItem + ".*", "ig");
//         angular.forEach(locations, function(location) {
//             if(regex.test(location)){
//                 filtered.push(location);
//             }
//         });
//         return filtered;
//     };
// }]);

	}());
