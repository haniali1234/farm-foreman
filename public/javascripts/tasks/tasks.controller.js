(function () {
  'use strict';

  angular.module('app')
    .controller('TasksController', function (tasks, Tasks, modal) {
      var vm = this;

    	vm.tasks = tasks;
    	vm.add = Tasks.add;
     	vm.edit = Tasks.edit;
     	vm.remove = Tasks.del;
      /**
       * Confirm when we want to delete a task.
       */
      vm.confirmDelete = function confirmDelete(taskId) {
        modal.open('ConfirmTaskDelete', 'taskDelete', 'partials/tasks/confirm-delete-task.html')
          .then(function (res) {
            Tasks.del(taskId);
          });
      };
    });
})();
