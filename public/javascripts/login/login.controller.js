(function(){
    'use strict';

    angular.module('app')
        .controller('LoginController', function (Users, $state){
            var vm = this;
            vm.creds = {};
            vm.login = function login(creds){
                Users.login(creds)
                    .then(function(user){
                        /*this points to the next state, this is where
                        you can create an if statement to figure out if user logging in is
                        admin or user.  Or maybe use a service in login service??
                        */
                        if( user.admin) {
                            $state.go('admin.jobs');
                        }
                        else{
                            $state.go("foreman-view");
                        }
                        
                    },
                function(err){
                    vm.loginFailed = true;
                });
            };


        });
})();