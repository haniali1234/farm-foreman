(function () {

  'use strict';

  angular.module('app')
    .controller('ConfirmPendingJobDelete', function ($uibModalInstance) {
      var vm  = this;

      /**
       * Affirmatively close the dialog
       */
      vm.close = function close() {
        $uibModalInstance.close();
      };

      /**
       * Cancel the dialog
       */
      vm.dismiss = function dismiss() {
        $uibModalInstance.dismiss();
      };
    });
}());