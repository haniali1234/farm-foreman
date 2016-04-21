(function () {
  'use strict';

  angular.module('app')
    .controller('UsersController', function (Users, users, modal) {
      var vm = this;

      vm.users = users;
      vm.currentUser = Users.currentUser;
      vm.add = Users.add;
      vm.edit = Users.edit;
      vm.remove = Users.del;
      vm.logout = Users.logout;

     /**
       * Confirm when we want to delete a user.
       */
      vm.confirmDelete = function confirmDelete(userId) {
        modal.open('ConfirmUserDelete', 'userDelete', 'partials/users/confirm-delete-user.html')
          .then(function (res) {
            Users.del(userId);
          });
      };
      
    });
})();