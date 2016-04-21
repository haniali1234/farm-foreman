(function () {
  'use strict';

  angular.module('app')
    .service('Tasks', function ($http, $state, $uibModal, $rootScope) {
      var vm = this;

      /**
       * The local task list.
       *
       * @type {Array}
       */
      vm.tasks = [];

      /**
       * Create a task on the server.
       *
       * @param task
       * @returns {*}
       */
      vm.createTask = function createTask(task) {
        return $http.post('/tasks', task)
          .then(function (res) {
            vm.tasks.push(res.data);
          }, function (err) {
            console.error(err);
          });
      };

      /**
       * Update the task on the server.
       *
       * @param task
       * @returns {*}
       */
      vm.editTask = function editTask(task) {
        return $http.put('/tasks/' + task._id, task)
          .then(function (res) {
            var _task = vm.find(task._id);
            _.merge(_task, task);
          }, function (err) {
            console.error(err);
          });
      };

      /**
       * Open a modal for adding a task.
       *
       * @returns {*}
       */
      vm.add = function add() {
        return $uibModal.open({
          controller: 'TaskModalController',
          controllerAs: 'taskModal',
          templateUrl: 'partials/tasks/task-form.html'
        }).result.then(vm.createTask);
      };

      vm.edit = function edit(task) {
        var scope = $rootScope.$new();
        scope.task = task;

        return $uibModal.open({
          controller: 'TaskModalController',
          controllerAs: 'taskModal',
          templateUrl: 'partials/tasks/task-form.html',
          scope: scope
        }).result.then(vm.editTask);
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
       * Update a project.
       *
       * @param projectCopy
       * @returns {*}
       */
      vm.put = function put(taskCopy) {
        var data = {
          title: taskCopy.title,
          task: taskCopy.task._id
        };

        return $http.put('/tasks/' + taskCopy._id, data)
          .then(function (res) {
           
            var p = vm.find(taskCopy._id);
            _.merge(p, taskCopy);
            $state.go('tasks.tasks', {taskId: taskCopy._id});
          }, function (err) {
            //TODO: handle when we can't update a project.
          });
      };
      /**
       * Delete a task.
       *
       * @param taskId
       * @returns {*}
       */
      vm.del = function del(taskId) {
        return $http.delete('/tasks/' + taskId)
          .then(function (res) {
            _.remove(vm.tasks, {_id: taskId});
          });
      };
    });
})();