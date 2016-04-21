(function(){
    'use strict';

    angular.module('app')
        .controller('EntityController', function(entity, Entities, modal){
           var vm = this;
           vm.editEntity = Entities.edit;
           vm.editLocation = Entities.editLocModal;
           vm.editClient = Entities.editCliModal;
            vm.entity = entity;
            vm.addLocation = Entities.addLocationToEntity;
            vm.addClient = Entities.addClientToEntity;
            // vm.locations = locations;

            vm.confirmLocationDelete = function confirmLocationDelete(entity, locationId) {
              debugger;
              modal.open('ConfirmLocationDelete', 'locationDelete', 'partials/modals/confirm-delete-location.html')
                .then(function (res) {
                  Entities.locationDel(entity, locationId);
                });
            };

            vm.confirmClientDelete = function confirmClientDelete(entity, clientId) {
              debugger;
              modal.open('ConfirmClientDelete', 'clientDelete', 'partials/modals/confirm-delete-client.html')
                .then(function (res) {
                  Entities.clientDel(entity, clientId);
                });
            };

        });
})();
