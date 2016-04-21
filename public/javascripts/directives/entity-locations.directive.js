(function(){
  'use strict';

  angular.module('app.ui')
  .directive('entityLocations', function(){
    return{
      restrict: 'E',
      templateUrl: 'partials/directives/entity-locations.html',
      scope: {
        entity: '=',
        editLocation: '=',
        confirmLocationDelete: '='
      }
    };
  });
})();
