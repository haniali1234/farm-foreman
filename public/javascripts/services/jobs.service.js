(function () {
  'use strict';

  angular.module('app')
    .service('Jobs', function ($http, $state) {
      var vm = this;

      vm.jobs = [];

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
       * Update a project.
       *
       * @param projectCopy
       * @returns {*}
       */
      vm.put = function put(jobCopy) {
        
        var data = {
          approved: jobCopy.approved
        };

        return $http.put('/jobs/' + jobCopy._id, data)
          .then(function (res) {

            var p = vm.find(jobCopy._id);
            _.merge(p, jobCopy);
            // $state.go('jobs', {jobId: jobCopy._id});
          }, function (err) {
            //TODO: handle when we can't update a project.
          });
      };

    });

})();
