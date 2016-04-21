(function(){
'use strict';

angular.module('app')
  .controller('AddEntityController', function(Entities, $scope){
      var vm = this;
      vm.entity = {};
      vm.add = Entities.createEntity;
      vm.locations =[{id: 'Location 1'}];
      vm.clients = [{id: 'Owner 1'}];


//Adding and removing additional forms for locations and clients

      vm.addLocations = function(){
        vm.newItemNo = vm.locations.length+1;
        vm.locations.push({'id': 'Location '+vm.newItemNo});
      };
      vm.removeLocs = function (){
        vm.lastItem = vm.locations.length-1;
        vm.locations.splice(vm.lastItem);
      };

      vm.addClients = function(){
        vm.newItemNo = vm.clients.length+1;
        vm.clients.push({'id': 'Owner '+vm.newItemNo});
      };

      vm.removeClients = function(){
        vm.lastItem = vm.clients.length-1;
        vm.clients.splice(vm.lastItem);
      };

  });

})();
