(function () {

  'use strict';

  angular.module('app')
    .controller('ConfirmForemanDelete', function ($uibModalInstance) {
      var vm  = this;

      /**
       * Affirmatively close the dialog
       */
      vm.close = function close() {
        debugger;
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