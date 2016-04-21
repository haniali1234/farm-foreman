(function(){
'use strict';

angular.module('app')
.controller('LocationModalController', function($uibModalInstance, $scope){
  var vm = this;

  vm.location = $scope.location ? $scope.location : {};

  vm.ok = function ok (){
      $uibModalInstance.close(vm.location);
  };

  vm.cancel = function cancel(){
      $uibModalInstance.dismiss();
  };

});
})();
