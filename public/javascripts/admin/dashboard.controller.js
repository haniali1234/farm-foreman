(function () {
  angular.module('app')
    .controller('DashboardController', function ($rootScope, $state, jobs, Jobs, Admin, $scope) {
      var vm = this;
      vm.jobs = jobs;
      vm.title = $state.current.data ? $state.current.data.heading : 'dashboard';

      $rootScope.$on('$stateChangeStart', function (event, toState) {
        vm.title = toState.data ? toState.data.heading : 'dashboard';
      });

      vm.put = function (job) {
        job.approved = true;
        Jobs.put(job);
        pendingCount();
      };

      vm.count = 0;

      function pendingCount() {
        vm.count = vm.jobs.filter(function (v) {
          if (v.approved || v.deleted_at) {
            return false;
          }
          return true;
        }).length;
      }

      pendingCount();

      /**
       * Listen for changes to the jobs (like approval) and update
       * the pending count.
       */
      $scope.$watch(function () {
        return vm.jobs;
      }, function () {
        pendingCount();
      }, true);
    });
})();
