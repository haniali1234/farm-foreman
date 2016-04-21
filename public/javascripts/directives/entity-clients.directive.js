(function(){
  'use strict';

  angular.module('app')
  .directive('entityClients', function(){

    //CREATE THE DDO (Directive Definition Object)

    return{
      restrict: 'E',
      templateUrl: 'partials/directives/entity-clients.html',
      scope: {
        entity: '=',
        editClient: '=',
        confirmClientDelete: '='
      }
    };

  });
})();
