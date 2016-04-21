(function () {
  'use strict';

  angular.module('app')
    .service('Foremans', function ($http, $state) {
      var vm = this;

      /**
       * The local task list.
       *
       * @type {Array}
       */
      vm.tasks = [];
      vm.entities = [];
      vm.jobs = [];
      vm.empty = {};

      /**
       * Create a task on the server.
       *
       * @param job
       * @returns {*}
       */
      vm.createJob = function createJob(job) {
        return $http.post('/jobs', job)
          .then(function (res) {
            vm.jobs.push(res.data);
            return res.data;
          }, function (err) {
            console.error(err);
          });
      };


      vm.editJob = function editJob(job){
        return $http.put('/jobs/' + job._id, job)
            .then(function (res) {
                var _job = vm.find(job._id);
                _.merge(_job, job);
            }, function (err) {
                console.error(err);
            }).then(function () {
              $state.go('foreman-view.sent-foreman');
            });
      };



      /**
       * Find a task in the task list.
       *
       * @param userId
       * @returns {*}
       */
      vm.find = function find(taskId) {
        return _.find(vm.tasks, {_id: taskId});
      };

      // vm.findJob = function findJob(jobId) {
      //   return _.find(vm.jobs, {_id: jobId});
      // };

      /**
       * Get tasks from the database and populate the local
       * client side list of task.
       *
       * @returns {*}
       */
      vm.get = function get() {
        return $http.get('/tasks')
          .then(function (res) {
            vm.tasks.splice(0);

            res.data.forEach(function (task) {
              vm.tasks.push(task);
            });

            return vm.tasks;
          });
      };

      /**
       * Get tasks from the database and populate the local
       * client side list of task.
       *
       * @returns {*}
       */
      vm.get = function get() {
        return $http.get('/entities')
          .then(function (res) {
            vm.entities.splice(0);

            res.data.forEach(function (entity) {
              vm.entities.push(entity);
            });
            return vm.entities;
          });
      };

      // vm.getJobs = function getJobs(jobId) {
      //   return $http.get('/jobs/' + jobId)
      //     .then(function (res) {
      //       vm.entities.splice(0);
      //
      //       res.data.forEach(function (entity) {
      //         vm.entities.push(entity);
      //       });
      //       return vm.entities;
      //     });
      // };

    });
})();
