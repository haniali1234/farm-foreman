(function () {

  'use strict';

  angular.module('app')
    .controller('TaskModalController', function ($uibModalInstance, $scope) {
      var vm = this;

      vm.task = $scope.task ? angular.copy($scope.task) : {};

      /**
       * Saving the task.
       */
      vm.ok = function ok() {
        $uibModalInstance.close(vm.task);
      };

      /**
       * Dismissing the modal, do not save task.
       */
      vm.cancel = function cancel() {
        $uibModalInstance.dismiss();
      };
    });
}());