(function () {

  'use strict';

  angular.module('app')
    .controller('PendingJobsController', function (jobs, Jobs, modal, Admin, $scope) {
      var vm = this;
      vm.jobs = jobs;

      vm.put = function (job) {
        job.approved = true;
        Jobs.put(job);
        pendingCount();
      };

      /**
       * Confirm when we want to delete a pending job.
       */
      vm.confirmDelete = function confirmDelete(jobId) {
        modal.open('ConfirmPendingJobDelete', 'confirmDelete', 'partials/admin/confirm-delete-pending-job.html')
          .then(function (res) {
            Admin.del(jobId);
          });
      };
    });
}());