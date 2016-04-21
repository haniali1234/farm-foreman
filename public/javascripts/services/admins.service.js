(function () {
  'use strict';

  angular.module('app')
    .service('Admin', function ($http) {
      var vm = this;

      vm.jobs = [];

      /**
       * Find a single job.
       *
       * @param jobId
       */
      vm.find = function find(jobId) {
        return _.find(vm.jobs, {_id: jobId});
      };

      /**
       * Get users from the database and populate the local
       * client side list of user.
       *
       * @returns {*}
       */
      vm.get = function get() {
        return $http.get('/jobs')
          .then(function (res) {
            vm.jobs.splice(0);

            res.data.forEach(function (job) {
              vm.jobs.push(job);
            });

            return vm.jobs;
          });
      };

      /**
       * Delete a job.
       *
       * @param jobId
       * @returns {*}
       */
      vm.del = function del(jobId) {
        debugger;
        return $http.delete('/jobs/' + jobId)
          .then(function (res) {
            _.remove(vm.jobs, {_id: jobId});
          }, function (err) {
            console.error(err);
          });
      };
    });
})();
