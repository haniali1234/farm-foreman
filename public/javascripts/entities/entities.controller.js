(function(){
    'use strict';

    angular.module('app')
        .controller('EntitiesController', function (entities, Entities, modal){
            var vm = this;
            vm.entity = {};
            vm.entities = entities;
            vm.add = Entities.createEntity;
            vm.edit = Entities.edit;
            vm.remove = Entities.del;
            vm.addLocations = Entities.addLocations;
        /**
       * Confirm when we want to delete a entity.
       */
      vm.confirmDelete = function confirmDelete(entityId) {
        modal.open('ConfirmEntityDelete', 'entityDelete', 'partials/entities/confirm-delete-entity.html')
          .then(function (res) {
            Entities.del(entityId);
          });
      };

        });
})();
