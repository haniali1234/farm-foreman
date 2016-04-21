(function () {

  'use strict';

  angular.module('app')
    .controller('UserModalController', function ($uibModalInstance, $scope) {
      var vm = this;

      vm.user = $scope.user ? angular.copy($scope.user) : {};
    
      /**
       * Saving the user.
       */
      vm.ok = function ok() {
        $uibModalInstance.close(vm.user);
      };

      /**
       * Dismissing the modal, do not save user.
       */
      vm.cancel = function cancel() {
        $uibModalInstance.dismiss();
      };
    });
}());