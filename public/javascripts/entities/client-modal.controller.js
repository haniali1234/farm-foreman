(function(){
'use strict';

angular.module('app')
.controller('ClientModalController', function($uibModalInstance, $scope){
  var vm = this;

  vm.client = $scope.client ? $scope.client : {};

  vm.ok = function ok (){
    debugger;
      $uibModalInstance.close(vm.client);
  };

  vm.cancel = function cancel(){
      $uibModalInstance.dismiss();
  };

});
})();
