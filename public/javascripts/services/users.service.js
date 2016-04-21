(function () {
  'use strict';

  angular.module('app')
    .service('Users', function ($http, $state, $uibModal, $rootScope, storage) {
      var vm = this;
      vm.currentUser = null;
      vm.currentUserToken = null;

      /**
       * The local user list.
       *
       * @type {Array}
       */
      vm.users = [];

      /**
       * Create a user on the server.
       *
       * @param user
       * @returns {*}
       */
      vm.createUser = function createUser(user) {
        return $http.post('/users', user)
          .then(function (res) {
            vm.users.push(res.data);
          }, function (err) {
            console.error(err);
          });
      };

      /**
       * Update the user on the server.
       *
       * @param user
       * @returns {*}
       */
      vm.editUser = function editUser(user) {
        return $http.put('/users/' + user._id, user)
          .then(function (res) {
            var _user = vm.find(user._id);
            _.merge(_user, user);
          }, function (err) {
            console.error(err);
          });
      };

      /**
       *
       * @param user
       * @returns {*}
       */
      vm.edit = function edit(user) {
        var scope = $rootScope.$new();
        scope.user = user;

        return $uibModal.open({
          controller: 'UserModalController',
          controllerAs: 'userModal',
          templateUrl: 'partials/users/form.html',
          scope: scope
        }).result.then(vm.editUser);
      };

      /**
       * Open a modal for adding a user.
       *
       * @returns {*}
       */
      vm.add = function add() {
        return $uibModal.open({
          controller: 'UserModalController',
          controllerAs: 'userModal',
          templateUrl: 'partials/users/form.html'
        }).result.then(vm.createUser);
      };

      /**
       * Find a user in the user list.
       *
       * @param userId
       * @returns {*}
       */
      vm.find = function find(userId) {
        return _.find(vm.users, {_id: userId});
      };

      /**
       * Get users from the database and populate the local
       * client side list of user.
       *
       * @returns {*}
       */
      vm.get = function get() {
        return $http.get('/users')
          .then(function (res) {
            vm.users.splice(0);

            res.data.forEach(function (user) {
              vm.users.push(user);
            });

            return vm.users;
          });
      };

      /**
       * Delete a user.
       *
       * @param userId
       * @returns {*}
       */
      vm.del = function del(userId) {
        return $http.delete('/users/' + userId)
          .then(function (res) {
            _.remove(vm.users, {_id: userId});
          });
      };

      /**
       * Login a user with the provided credentials.
       * @param creds
       * @returns {*}
       */
      vm.login = function login(creds) {
        return $http.post('/login', creds)
          .then(function (res) {
            vm.currentUser = res.data.user;
            vm.currentUserToken = res.data.token;
            $rootScope.currentUser = vm.currentUser;
            storage.set('token', res.data.token);
            storage.set('currentUser', res.data.user);
            return vm.currentUser;
          });
      };

      /**
       *
       * @returns {boolean}
       */
      vm.isLoggedIn = function isLoggedIn() {
        return !!vm.currentUser;
      };

      /**
       *
       * @param creds
       */
      vm.stayLoggedIn = function stayLoggedIn() {
        vm.currentUser = storage.get('currentUser');
        vm.currentUserToken = storage.get('token');
        $rootScope.currentUser = vm.currentUser;
      };

      /**
       * Log out a user.
       */
      vm.logout = function logout() {
        vm.currentUser = null;
        vm.currentUserToken = null;
        $rootScope.currentUser = null;
        storage.forget('currentUser');
        storage.forget('token');
        $state.go('login');
      };
    });
})();
