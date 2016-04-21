(function () {
  'use strict';

  angular.module('app')
    .controller('ForemansController', function (foremans, Foremans, $scope, tasks, entities, $state) {
      var vm = this;

      vm.task = null; //populated by the ui ng-model
      vm.tasks = tasks;
      vm.location = null; //populated by the ui ng-model
      vm.locations = [];
      vm.entities = entities;
      vm.company_name = null;
      vm.foremans = foremans;

      vm.foremansCopy = _.clone(foremans);
      vm.formData = {};
      //vm.createJobs = Foremans.createJob;

      vm.createJob = function createJob(data) {
        debugger;
        Foremans.createJob(data)
          .then(function () {
            $state.go('foreman-view.sent-foreman');
          });
      };

      vm.entities.forEach(function (entity) {
        entity.location.forEach(function (loc) {
          if (_.indexOf(vm.locations, loc.city) === -1) {
            vm.locations.push(loc.city);
          }
        });
      });

      // datepicker
      $scope.today = function () {
        $scope.dt = new Date();
      };
      $scope.today();

      $scope.clear = function () {
        $scope.dt = null;
      };

      $scope.toggleMin = function () {
        $scope.minDate = $scope.minDate ? null : new Date();
      };

      $scope.toggleMin();

      $scope.maxDate = new Date(2020, 5, 22);

      $scope.open = function ($event) {
        $scope.status.opened = true;
      };

      $scope.setDate = function (year, month, day) {
        $scope.dt = new Date(year, month, day);
      };

      $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
      };
      $scope.formats = ['MM-dd-yyyy', 'yyyy/dd/MM', 'dd.MM.yyyy', 'shortDate'];
      $scope.format = $scope.formats[0];
      $scope.status = {opened: false};
      var tomorrow = new Date();
      var afterTomorrow = new Date();

      tomorrow.setDate(tomorrow.getDate() + 1);
      afterTomorrow.setDate(tomorrow.getDate() + 2);

      $scope.events = [
        {
          date: tomorrow,
          status: 'full'
        },
        {
          date: afterTomorrow,
          status: 'partially'
        }
      ];

      $scope.getDayClass = function (date, mode) {
        if (mode === 'day') {
          var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

          for (var i = 0; i < $scope.events.length; i++) {
            var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

            if (dayToCheck === currentDay) {
              return $scope.events[i].status;
            }
          }
        }
        return '';
      };
    });
})();
