(function(){
    'use strict';

    angular.module('app')
        .service('Entities', function ($http, $state, $uibModal, $rootScope){
            var vm = this;
            vm.locs = [];
            vm.entities = [];
            vm.locations = [];

  /***** Find Entities with find function *****/
            /**
             * Find an entity in the entities list by its id.
             *
             * @param entityId
             * @returns {*}
             */
            vm.find = function find(entityId) {
                return _.find(vm.entities, {_id: entityId});
            };

            /**
             * Creates an Entity in Modal
             *
             * @param entity
             * @returns {*}
             */

  /***** Create Entities with createEntity function *****/
            vm.createEntity = function createEntity(entity, locations, clients){
              entity.location = locations;
              entity.owners = clients;
                return $http.post('/entities', entity)
                    .then(function (res){
                        vm.entities.push(res.data);
                    }, function (err){
                        console.log(err);
                    });
            };

  /***** Get Entities From Database with get function *****/
            /**
             * Get entities from the database and populate the local
             * client side list of entities.
             *
             * @returns {*}
             */
            vm.get = function get() {
                return $http.get('/entities')
                    .then(function (res) {
                        vm.entities.splice(0);
                        res.data.forEach(function (entity) {
                            vm.entities.push(entity);
                        });
                        return vm.entities;
                    });
            };

  /*****  Edit Entity Information in Edit Entity State through Modal  *****/
            /**
            *
            * @param entity
            * @returns {*}
            */
            vm.edit = function edit(entity) {

               var scope = $rootScope.$new();
               scope.entity = entity;
               return $uibModal.open({
                   controller: 'EntityModalController',
                   controllerAs: 'entityModal',
                   templateUrl: 'partials/entities/entity-modal-form.html',
                   scope: scope
               }).result.then(vm.editEntity);
            };

            /**
            * Edit an Entity
            *
            * @param entity
            * @returns {*}
            */

            vm.editEntity = function editEntity(entity) {
               return $http.put('/entities/' + entity._id, entity)
                   .then(function (res) {
                       var _entity = vm.find(entity._id);
                       _.merge(_entity, entity);
                   }, function (err) {
                       console.error(err);
                   });
            };

  /***** Edit Delete and Add Location in Entity Info Page Through Modal *****/
            vm.editLocModal = function editLocModal(location) {
               var scope = $rootScope.$new();
               scope.location = location;
               return $uibModal.open({
                   controller: 'LocationModalController',
                   controllerAs: 'locationModal',
                   templateUrl: 'partials/entities/location-modal-form.html',
                   scope: scope
               }).result.then(vm.editLoc);
            };

            vm.editLoc = function editLoc(location){
              return $http.put('/locations/' + location._id, location)
                .then(function(res){
                  //pass, the object has already been updated.
                }, function(err){
                  console.error(err);
                });
            };

            /**
            * Delete a location from within an Entity
            * @param locationId
            * @returns
            **/
            vm.locationDel = function locationDel(entity, locationId){
              return $http.delete('/locations/' + locationId)
              .then(function(res){
                _.remove(entity.location, {_id: locationId});
              });
            };
            vm.addLocationToEntity = function(entity){
              vm.openLocModal().then(function(location){
                location.entity = entity._id;
                vm.addLocations(location)
                  .then(function(location){
                    entity.location.push(location);
                  });
              });
            };


            vm.openLocModal = function(){
              return $uibModal.open({
                controller: 'LocationModalController',
                controllerAs: 'locationModal',
                templateUrl: 'partials/entities/location-modal-form.html'
              }).result;
            };


            // vm.addLocModal = function addLocModal() {
            //   vm.openModal()
            //     .then(vm.addLocations);
            // };

            vm.addLocations = function addLocations(location){
              return $http.post('/locations', location)
              .then(function(res){
                return res.data;
              });

            };

  /***** Edit an Owner in Entity Info Page Through Modal *****/
          vm.addClientToEntity = function(entity){
            vm.openCliModal().then(function(client){
              client.entity = entity._id;
              vm.addClients(client)
                .then(function(client){
                  entity.owners.push(client);
                });
            });
          };

          vm.addClients = function addClients(client){
            return $http.post('/clients', client)
            .then(function(res){
            return res.data;
            });
          };

          vm.openCliModal = function addCliModal(){
            return $uibModal.open({
              controller: 'ClientModalController',
              controllerAs: 'clientModal',
              templateUrl: 'partials/entities/client-modal-form.html'
            }).result;
          };

            vm.editCliModal = function editCliModal(client) {
               var scope = $rootScope.$new();
               scope.client = client;
               return $uibModal.open({
                   controller: 'ClientModalController',
                   controllerAs: 'clientModal',
                   templateUrl: 'partials/entities/client-modal-form.html',
                   scope: scope
               }).result.then(vm.editCli);
            };

            /**
            * @param location
            * @returns
            **/
            vm.editCli = function editCli(client) {
               return $http.put('/clients/' + client._id, client)
                   .then(function (res) {
                   }, function (err) {
                       console.error(err);
                   });
            };

            vm.clientDel = function clientDel(entity, clientId){
              return $http.delete('/clients/' + clientId)
              .then(function(res){
                _.remove(entity.owners, {_id: clientId});
              });
            };




/***** Delete Entities with del function *****/
            /**
             * Delete an entity.
             *
             * @param entityId
             * @returns {*}
             */
            vm.del = function del(entityId) {
                return $http.delete('/entities/' + entityId)
                    .then(function (res) {
                        _.remove(vm.entities, {_id: entityId});
                    });
            };

        });
})();
