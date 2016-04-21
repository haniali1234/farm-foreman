(function () {
  'use strict';

  angular.module('app')
    .controller('AdminController', function (Users, jobs, Jobs, Admin, $scope, modal, Foremans) {
      var vm = this;

      vm.currentUser = Users.currentUser;
      vm.logout = Users.logout;
      vm.delete = Admin.del;
      vm.jobs = null;
      vm.jobs = jobs;
      vm.jobsCopy = _.clone(jobs);
      vm.put = Jobs.put;

      vm.adminFilter = vm.currentUser.admin ? {} : {foreman: vm.currentUser._id};
      
      /**
       * Confirm when we want to delete a sent foreman.
       */
      vm.confirmDelete = function confirmDelete(jobId) {
        modal.open('ConfirmForemanDelete', 'foremanDelete', 'partials/foremans/confirm-delete-sent-foreman.html')
          .then(function (res) {
            Admin.del(jobId);
          });
      };
    });
})();
