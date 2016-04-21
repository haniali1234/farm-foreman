(function () {

  'use strict';

  angular.module('app')
    .service('modal', function ($uibModal, $rootScope) {
      this.open = function open(controller, controllerAs, template, scope, size) {
        var $scope = $rootScope.$new();
        _.merge($scope, scope || {});

        return $uibModal.open({
          templateUrl: template,
          controller: controller,
          controllerAs: controllerAs,
          scope: $scope,
          size: size || 'md'
        }).result;
      };
    });
}());