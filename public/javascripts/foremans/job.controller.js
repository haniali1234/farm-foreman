(function () {
  'use strict';

  angular.module('app')
    .controller('JobController', function (Jobs, $state, job, jobs) {
      var vm = this;
      vm.job = job;
    });
})();
