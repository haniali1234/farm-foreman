(function () {

  'use strict';

  angular.module('app')
    .controller('SettingsController', function ($rootScope, $state) {
      var vm = this;
      vm.title = $state.current.data ? $state.current.data.heading : 'Settings';

      $rootScope.$on('$stateChangeStart', function (event, toState) {
        vm.title = toState.data ? toState.data.heading : 'Settings';
      });
    });
}());