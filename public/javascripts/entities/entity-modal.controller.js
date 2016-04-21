(function(){
   'use strict';

   angular.module('app')
       .controller('EntityModalController', function ($uibModalInstance, $scope){
           var vm = this;

           vm.entity = $scope.entity ? angular.copy($scope.entity) : {};

           vm.ok = function ok (){
              
               $uibModalInstance.close(vm.entity);
           };

           vm.cancel = function cancel(){
               $uibModalInstance.dismiss();
           };

       });
})();
