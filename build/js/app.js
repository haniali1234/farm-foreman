(function () {
  'use strict';

  angular.module('app', ['ui.router', 'app.ui', 'ui.bootstrap', 'ui.select', 'ngSanitize'])
    .config(["$stateProvider", "$urlRouterProvider", "$httpProvider", function ($stateProvider, $urlRouterProvider, $httpProvider) {

      /**
       * Default route
       */
      $urlRouterProvider.otherwise('/login');

      /**
       * Define our states
       */

      $stateProvider
        .state('login', {
          url: '/login',
          templateUrl: 'partials/login/index.html',
          controller: 'LoginController',
          controllerAs: 'loginController'
        })
        .state('admin', {
          url: '/admin',
          templateUrl: 'partials/admin/admin.html',
          controller: 'DashboardController',
          controllerAs: 'dashboardController',
          resolve: {
            jobs: ["Admin", function (Admin) {
              return Admin.get();
            }]
          },
          data: {
            requiresLogin: true,
            bodyClass: 'dashboard'
          }
        })
        .state('admin.jobs', {
          url: '/jobs',
          templateUrl: 'partials/admin/jobs-list.html',
          controller: 'AdminController',
          controllerAs: 'adminController',
          resolve: {
            jobs: ["Admin", function (Admin) {
              return Admin.get();
            }]
          },
          data: {
            requiresLogin: true,
            bodyClass: 'dashboard',
            heading: 'Jobs List'
          }
        })
        .state('admin.jobs.job-detail', {
          url: '/:jobId',
          templateUrl: 'partials/foremans/job-detail.html',
          controller: 'JobController',
          controllerAs: 'jobController',
          resolve: {
            job: ["Admin", "$stateParams", "jobs", function (Admin, $stateParams, jobs) {
              return Admin.find($stateParams.jobId);
            }]
          },
          data: {
            requiresLogin: true,
            bodyClass: 'dashboard',
            heading: 'Jobs List >> Job Details'
          }
        })
        .state('admin.pending', {
          url: '/pending',
          templateUrl: 'partials/admin/pending.html',
          controller: 'PendingJobsController',
          controllerAs: 'pendingJobs',
          resolve: {
            jobs: ["Admin", function (Admin) {
              return Admin.get();
            }]
          },
          data: {
            requiresLogin: true,
            bodyClass: 'pending',
            heading: 'Jobs Pending Approval'
          }
        })
        .state('admin.report-job', {
          url: '/report-job',
          templateUrl: 'partials/admin/report-job.html',
          controller: 'ReportJobController',
          controllerAs: 'reportJob',
          resolve: {
            tasks: ["Tasks", function (Tasks) {
              return Tasks.get();
            }],
            entities: ["Entities", function (Entities) {
              return Entities.get();
            }]
          },
          data: {
            requiresLogin: true,
            bodyClass: 'report-job',
            heading: 'Report a Job'
          }
        })
        .state('settings', {
          url: '/settings',
          templateUrl: 'partials/admin/settings.html',
          controller: 'SettingsController',
          controllerAs: 'settings',
          resolve: {},
          data: {
            requiresLogin: true,
            bodyClass: 'settings'
          }
        })
        .state('settings.users', {
          url: '/users',
          templateUrl: 'partials/users/users.html',
          controller: 'UsersController',
          controllerAs: 'usersController',
          resolve: {
            users: ["Users", function (Users) {
              //RETURNS A PROMISE, CONTROLLER IS CALLED WHEN PROMISE IS RESOLVED
              return Users.get();
            }]
          },
          data: {
            requiresLogin: true,
            bodyClass: 'settings',
            heading: 'Staff'
          }
        })
        .state('settings.entities', {
          url: '/entities',
          templateUrl: 'partials/entities/entities.html',
          controller: 'EntitiesController',
          controllerAs: 'entitiesController',
          resolve: {
            entities: ["Entities", function (Entities) {
              return Entities.get();
            }]
          },
          data: {
            requiresLogin: true,
            bodyClass: 'settings',
            heading: 'Affiliated Companies'
          }
        })
        .state('settings.entities.edit-entity', {
          url: '/:entityId',
          templateUrl: 'partials/entities/edit-entity.html',
          controller: 'EntityController',
          controllerAs: 'entityController',
          resolve: {
            entity: ["Entities", "$stateParams", "entities", function (Entities, $stateParams, entities) {
              return Entities.find($stateParams.entityId);
            }]
          },
          data: {
            requiresLogin: true,
            bodyClass: 'settings',
            heading: 'Affiliated Companies >> Company Profile'
          }
        })
        .state('settings.add-entities', {
          url: '/add-entity',
          templateUrl: 'partials/entities/add-entities.html',
          controller: 'AddEntityController',
          controllerAs: 'addEntity',
          data: {
            requiresLogin: true,
            bodyClass: 'settings',
            heading: 'Affiliated Companies >> Add a Company'
          }
        })
        .state('settings.tasks', {
          url: '/tasks',
          templateUrl: 'partials/tasks/tasks.html',
          controller: 'TasksController',
          controllerAs: 'tasksController',
          resolve: {
            tasks: ["Tasks", function (Tasks) {
              //RETURNS A PROMISE, CONTROLLER IS CALLED WHEN PROMISE IS RESOLVED
              return Tasks.get();
            }]
          },
          data: {
            requiresLogin: true,
            bodyClass: 'settings',
            heading: 'Authorized Jobs'
          }
        })
        .state('foreman-view', {
          url: '/foreman-view',
          templateUrl: 'partials/foremans/foreman-view.html',
          controller: 'ForemanViewController',
          controllerAs: 'foremanView',
          data: {
            requiresLogin: true,
            bodyClass: 'foreman'
          }
        })
        .state('foreman-view.foremans', {
          url: '/foremans',
          templateUrl: 'partials/foremans/foremans.html',
          controller: 'ForemansController',
          controllerAs: 'foremansController',
          resolve: {
            foremans: ["Foremans", function (Foremans) {
              return Foremans.get();
            }],
            tasks: ["Tasks", function (Tasks) {
              return Tasks.get();
            }],
            entities: ["Entities", function (Entities) {
              return Entities.get();
            }]
          },
          data: {
            requiresLogin: true,
            bodyClass: 'foreman',
            heading: 'Report a Job'
          }
        })
        .state('foreman-view.sent-foreman', {
          url: '/sent-foreman',
          templateUrl: 'partials/foremans/sent-foreman.html',
          controller: 'AdminController',
          controllerAs: 'adminController',
          resolve: {
            jobs: ["Admin", function (Admin) {
              return Admin.get();
            }]
          },
          data: {
            requiresLogin: true,
            bodyClass: 'foreman',
            heading: 'Jobs Reported'
          }
        })
        .state('foreman-view.sent-foreman.edit-job', {
          url: '/edit-job/:jobId',
          templateUrl: 'partials/foremans/edit-job.html',
          controller: 'EditJobController',
          controllerAs: 'editJob',
          resolve: {
            job: ["Admin", "$stateParams", "foremans", "jobs", function (Admin, $stateParams, foremans, jobs) {
              return Admin.find($stateParams.jobId);
            }],
            foremans: ["Foremans", function (Foremans) {
              return Foremans.get();
            }],
            tasks: ["Tasks", function (Tasks) {
              return Tasks.get();
            }],
            entities: ["Entities", function (Entities) {
              return Entities.get();
            }]
          },
          data: {
            requiresLogin: true,
            bodyClass: 'foreman'
          }
        });

      /**
       * Configure HTTP Interceptors
       */
      $httpProvider.interceptors.push(["$injector", function ($injector) {
        return {
          request: function (config) {
            var Users = $injector.get('Users');
            if (Users.isLoggedIn()) config.headers.Authorization = 'Token ' + Users.currentUserToken;
            return config;
          }
        };
      }]);
    }])
    .run(["$rootScope", "Users", "$state", "storage", function ($rootScope, Users, $state, storage) {
      $rootScope.$on('$stateChangeStart', function (event, toState) {
        if (toState.data && toState.data.requiresLogin) {
          if (!Users.isLoggedIn()) {
            event.preventDefault();
            $state.go('login');
          }
        }
      });

      Users.stayLoggedIn();

      if (!Users.currentUser || !Users.currentUserToken) {
        $state.go('login');
      }
    }]);
}());

(function(){

    'use strict';

    angular.module('app.ui', []);

}());
(function (){

	'use strict';
	angular.module('app')
		.controller('BodyController', ["$window", "Users", "$rootScope", "$state", function ($window , Users, $rootScope, $state){
			var vm = this;
			vm.logout = Users.logout;
			vm.bodyClass = $state.current.data ? $state.current.data.bodyClass : '';

			$rootScope.$on('$stateChangeStart', function (event, toState) {
				vm.bodyClass = toState.data ? toState.data.bodyClass : '';
			});

			vm.admin = function admin() {
				var userStr = $window.localStorage.getItem('currentUser');
				var userObj = JSON.parse(userStr); //converting to an object cuz originally it was saved as string
				return userObj.admin;
			};
	}]);
}());

(function () {
  'use strict';

  angular.module('app')
    .controller('AdminController', ["Users", "jobs", "Jobs", "Admin", "$scope", "modal", "Foremans", function (Users, jobs, Jobs, Admin, $scope, modal, Foremans) {
      var vm = this;

      vm.currentUser = Users.currentUser;
      vm.logout = Users.logout;
      vm.delete = Admin.del;
      vm.jobs = null;
      vm.jobs = jobs;
      vm.jobsCopy = _.clone(jobs);
      vm.put = Jobs.put;

      vm.adminFilter = vm.currentUser.admin ? {} : {foreman: vm.currentUser._id};
      
      /**
       * Confirm when we want to delete a sent foreman.
       */
      vm.confirmDelete = function confirmDelete(jobId) {
        modal.open('ConfirmForemanDelete', 'foremanDelete', 'partials/foremans/confirm-delete-sent-foreman.html')
          .then(function (res) {
            Admin.del(jobId);
          });
      };
    }]);
})();

(function () {

  'use strict';

  angular.module('app')
    .controller('ConfirmPendingJobDelete', ["$uibModalInstance", function ($uibModalInstance) {
      var vm  = this;

      /**
       * Affirmatively close the dialog
       */
      vm.close = function close() {
        $uibModalInstance.close();
      };

      /**
       * Cancel the dialog
       */
      vm.dismiss = function dismiss() {
        $uibModalInstance.dismiss();
      };
    }]);
}());
(function () {
  angular.module('app')
    .controller('DashboardController', ["$rootScope", "$state", "jobs", "Jobs", "Admin", "$scope", function ($rootScope, $state, jobs, Jobs, Admin, $scope) {
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
    }]);
})();

(function () {

  'use strict';

  angular.module('app')
    .controller('PendingJobsController', ["jobs", "Jobs", "modal", "Admin", "$scope", function (jobs, Jobs, modal, Admin, $scope) {
      var vm = this;
      vm.jobs = jobs;

      vm.put = function (job) {
        job.approved = true;
        Jobs.put(job);
        pendingCount();
      };

      /**
       * Confirm when we want to delete a pending job.
       */
      vm.confirmDelete = function confirmDelete(jobId) {
        modal.open('ConfirmPendingJobDelete', 'confirmDelete', 'partials/admin/confirm-delete-pending-job.html')
          .then(function (res) {
            Admin.del(jobId);
          });
      };
    }]);
}());
(function(){
  'use strict';
angular.module('app')
  .controller('ReportJobController', ["Foremans", "$scope", "tasks", "entities", "$state", function(Foremans, $scope, tasks, entities, $state){
    var vm = this;
    vm.jobObject = {};
    vm.task = null; //populated by the ui ng-model
    vm.tasks = tasks;
    vm.location = null; //populated by the ui ng-model
    vm.locations = [];
    vm.entities = entities;
    vm.company_name = null;
    vm.formData = {};


    vm.createJob = function createJob(data) {
      Foremans.createJob(data)
        .then(function () {
          $state.go('admin.jobs');
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



  }]);
})();

(function () {

  'use strict';

  angular.module('app')
    .controller('SettingsController', ["$rootScope", "$state", function ($rootScope, $state) {
      var vm = this;
      vm.title = $state.current.data ? $state.current.data.heading : 'Settings';

      $rootScope.$on('$stateChangeStart', function (event, toState) {
        vm.title = toState.data ? toState.data.heading : 'Settings';
      });
    }]);
}());

(function(){
  'use strict';

  angular.module('app')
  .directive('entityClients', function(){

    //CREATE THE DDO (Directive Definition Object)

    return{
      restrict: 'E',
      templateUrl: 'partials/directives/entity-clients.html',
      scope: {
        entity: '=',
        editClient: '=',
        confirmClientDelete: '='
      }
    };

  });
})();

(function(){
  'use strict';

  angular.module('app.ui')
  .directive('entityLocations', function(){
    return{
      restrict: 'E',
      templateUrl: 'partials/directives/entity-locations.html',
      scope: {
        entity: '=',
        editLocation: '=',
        confirmLocationDelete: '='
      }
    };
  });
})();

	(function (){

	'use strict';
	angular.module('app')
	.directive('body', function(){
      $(document).on('click','.navbar-collapse.in',function(e) {
    	if( $(e.target).is('a') ) {
        $(this).collapse('hide');
    }
});

  });
	}());

(function(){
'use strict';

angular.module('app')
  .controller('AddEntityController', ["Entities", "$scope", function(Entities, $scope){
      var vm = this;
      vm.entity = {};
      vm.add = Entities.createEntity;
      vm.locations =[{id: 'Location 1'}];
      vm.clients = [{id: 'Owner 1'}];


//Adding and removing additional forms for locations and clients

      vm.addLocations = function(){
        vm.newItemNo = vm.locations.length+1;
        vm.locations.push({'id': 'Location '+vm.newItemNo});
      };
      vm.removeLocs = function (){
        vm.lastItem = vm.locations.length-1;
        vm.locations.splice(vm.lastItem);
      };

      vm.addClients = function(){
        vm.newItemNo = vm.clients.length+1;
        vm.clients.push({'id': 'Owner '+vm.newItemNo});
      };

      vm.removeClients = function(){
        vm.lastItem = vm.clients.length-1;
        vm.clients.splice(vm.lastItem);
      };

  }]);

})();

(function(){
'use strict';

angular.module('app')
.controller('ClientModalController', ["$uibModalInstance", "$scope", function($uibModalInstance, $scope){
  var vm = this;

  vm.client = $scope.client ? $scope.client : {};

  vm.ok = function ok (){
    debugger;
      $uibModalInstance.close(vm.client);
  };

  vm.cancel = function cancel(){
      $uibModalInstance.dismiss();
  };

}]);
})();

(function () {

  'use strict';

  angular.module('app')
    .controller('ConfirmEntityDelete', ["$uibModalInstance", function ($uibModalInstance) {
      var vm  = this;

      /**
       * Affirmatively close the dialog
       */
      vm.close = function close() {
        $uibModalInstance.close();
      };

      /**
       * Cancel the dialog
       */
      vm.dismiss = function dismiss() {
        $uibModalInstance.dismiss();
      };
    }]);
}());
(function(){
    'use strict';

    angular.module('app')
        .controller('EntitiesController', ["entities", "Entities", "modal", function (entities, Entities, modal){
            var vm = this;
            vm.entity = {};
            vm.entities = entities;
            vm.add = Entities.createEntity;
            vm.edit = Entities.edit;
            vm.remove = Entities.del;
            vm.addLocations = Entities.addLocations;
        /**
       * Confirm when we want to delete a entity.
       */
      vm.confirmDelete = function confirmDelete(entityId) {
        modal.open('ConfirmEntityDelete', 'entityDelete', 'partials/entities/confirm-delete-entity.html')
          .then(function (res) {
            Entities.del(entityId);
          });
      };

        }]);
})();

(function(){
   'use strict';

   angular.module('app')
       .controller('EntityModalController', ["$uibModalInstance", "$scope", function ($uibModalInstance, $scope){
           var vm = this;

           vm.entity = $scope.entity ? angular.copy($scope.entity) : {};

           vm.ok = function ok (){
              
               $uibModalInstance.close(vm.entity);
           };

           vm.cancel = function cancel(){
               $uibModalInstance.dismiss();
           };

       }]);
})();

(function(){
    'use strict';

    angular.module('app')
        .controller('EntityController', ["entity", "Entities", "modal", function(entity, Entities, modal){
           var vm = this;
           vm.editEntity = Entities.edit;
           vm.editLocation = Entities.editLocModal;
           vm.editClient = Entities.editCliModal;
            vm.entity = entity;
            vm.addLocation = Entities.addLocationToEntity;
            vm.addClient = Entities.addClientToEntity;
            // vm.locations = locations;

            vm.confirmLocationDelete = function confirmLocationDelete(entity, locationId) {
              debugger;
              modal.open('ConfirmLocationDelete', 'locationDelete', 'partials/modals/confirm-delete-location.html')
                .then(function (res) {
                  Entities.locationDel(entity, locationId);
                });
            };

            vm.confirmClientDelete = function confirmClientDelete(entity, clientId) {
              debugger;
              modal.open('ConfirmClientDelete', 'clientDelete', 'partials/modals/confirm-delete-client.html')
                .then(function (res) {
                  Entities.clientDel(entity, clientId);
                });
            };

        }]);
})();

(function(){
'use strict';

angular.module('app')
.controller('LocationModalController', ["$uibModalInstance", "$scope", function($uibModalInstance, $scope){
  var vm = this;

  vm.location = $scope.location ? $scope.location : {};

  vm.ok = function ok (){
      $uibModalInstance.close(vm.location);
  };

  vm.cancel = function cancel(){
      $uibModalInstance.dismiss();
  };

}]);
})();

(function () {

	'use strict';

	angular.module('app.ui')

	.filter('niceDate', function() {

		return function ( timeStamp, format) {
			format = format || 'MMM Do, YYYY';
			var m = moment(timeStamp);
			return m.format(format);

		};
	});
}());


	(function (){

	'use strict';
	angular.module('app')
        .directive('uppercased', function() {
			    return {
			        require: 'ngModel',
			        link: function($scope, element, attrs, modelCtrl) {
			            modelCtrl.$parsers.push(function(input) {
			                return input ? input.toUpperCase() : "";
			            });

			        }
			    };
			});

// 	.filter('uppercased',[ function () {
// 		debugger;
//     return function(locations, searchText) {
//     	debugger;
//         var filtered = [];
//         debugger;
//         var regex = new RegExp(".*" + searchItem + ".*", "ig");
//         angular.forEach(locations, function(location) {
//             if(regex.test(location)){
//                 filtered.push(location);
//             }
//         });
//         return filtered;
//     };
// }]);

	}());

	(function (){

	'use strict';
	angular.module('app')

		.filter('propsFilter', function() {
		  return function(items, props) {
		    var out = [];
		    if (angular.isArray(items)) {
		      items.forEach(function(item) {
		        var itemMatches = false;

		        var keys = Object.keys(props);
		        for (var i = 0; i < keys.length; i++) {
		          var prop = keys[i];
		          var text = props[prop].toLowerCase();
		          if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
		            itemMatches = true;
		            break;
		          }
		        }
		       
		        if (itemMatches) {
		          out.push(item);
		        }
		      });
		    } else {
		      // Let the output be the input untouched
		      out = items;
		    }
		    return out;
		  };
		});
	}());

(function () {

  'use strict';

  angular.module('app')
    .controller('ConfirmForemanDelete', ["$uibModalInstance", function ($uibModalInstance) {
      var vm  = this;

      /**
       * Affirmatively close the dialog
       */
      vm.close = function close() {
        debugger;
        $uibModalInstance.close();
      };

      /**
       * Cancel the dialog
       */
      vm.dismiss = function dismiss() {
        $uibModalInstance.dismiss();
      };
    }]);
}());
(function(){
'use strict';

angular.module('app')
  .controller('EditJobController', ["foremans", "Foremans", "$scope", "tasks", "entities", "$state", "job", function(foremans, Foremans, $scope, tasks, entities, $state, job){
    var vm = this;
    vm.job = job;
    vm.jobObject = {};
    vm.task = null; //populated by the ui ng-model
    vm.tasks = tasks;
    vm.location = null; //populated by the ui ng-model
    vm.locations = [];
    vm.entities = entities;
    vm.company_name = null;
    vm.foremans = foremans;
    vm.update = Foremans.editJob;
    vm.foremansCopy = _.clone(foremans);

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


}]);
})();

	(function (){

	'use strict';
	angular.module('app')
		.controller('ForemanViewController', ["Users", function (Users) {

			var vm = this;
			vm.currentUser = Users.currentUser;
	}]);
}());

(function () {
  'use strict';

  angular.module('app')
    .controller('ForemansController', ["foremans", "Foremans", "$scope", "tasks", "entities", "$state", function (foremans, Foremans, $scope, tasks, entities, $state) {
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
    }]);
})();

(function () {
  'use strict';

  angular.module('app')
    .controller('JobController', ["Jobs", "$state", "job", "jobs", function (Jobs, $state, job, jobs) {
      var vm = this;
      vm.job = job;
    }]);
})();

(function () {

  'use strict';

  angular.module('app')
    .controller('SentforemanController', function () {
      var vm = this;
       

    });
}());
(function(){
    'use strict';

    angular.module('app')
        .controller('LoginController', ["Users", "$state", function (Users, $state){
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


        }]);
})();
(function () {

  'use strict';

  angular.module('app')
    .controller('ConfirmTaskDelete', ["$uibModalInstance", function ($uibModalInstance) {
      var vm  = this;

      /**
       * Affirmatively close the dialog
       */
      vm.close = function close() {
        $uibModalInstance.close();
      };

      /**
       * Cancel the dialog
       */
      vm.dismiss = function dismiss() {
        $uibModalInstance.dismiss();
      };
    }]);
}());
(function () {

  'use strict';

  angular.module('app')
    .controller('TaskModalController', ["$uibModalInstance", "$scope", function ($uibModalInstance, $scope) {
      var vm = this;

      vm.task = $scope.task ? angular.copy($scope.task) : {};

      /**
       * Saving the task.
       */
      vm.ok = function ok() {
        $uibModalInstance.close(vm.task);
      };

      /**
       * Dismissing the modal, do not save task.
       */
      vm.cancel = function cancel() {
        $uibModalInstance.dismiss();
      };
    }]);
}());
(function () {
  'use strict';

  angular.module('app')
    .controller('TasksController', ["tasks", "Tasks", "modal", function (tasks, Tasks, modal) {
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
    }]);
})();

(function () {

  'use strict';

  angular.module('app')
    .controller('ConfirmClientDelete', ["$uibModalInstance", function ($uibModalInstance) {
      var vm  = this;
      /**
       * Affirmatively close the dialog
       */
      vm.close = function close() {
        $uibModalInstance.close();
      };

      /**
       * Cancel the dialog
       */
      vm.dismiss = function dismiss() {
        $uibModalInstance.dismiss();
      };
    }]);
}());

(function () {

  'use strict';

  angular.module('app')
    .controller('ConfirmLocationDelete', ["$uibModalInstance", function ($uibModalInstance) {
      var vm  = this;
      /**
       * Affirmatively close the dialog
       */
      vm.close = function close() {
        $uibModalInstance.close();
      };

      /**
       * Cancel the dialog
       */
      vm.dismiss = function dismiss() {
        $uibModalInstance.dismiss();
      };
    }]);
}());

(function () {
  'use strict';

  angular.module('app')
    .service('Admin', ["$http", function ($http) {
      var vm = this;

      vm.jobs = [];

      /**
       * Find a single job.
       *
       * @param jobId
       */
      vm.find = function find(jobId) {
        return _.find(vm.jobs, {_id: jobId});
      };

      /**
       * Get users from the database and populate the local
       * client side list of user.
       *
       * @returns {*}
       */
      vm.get = function get() {
        return $http.get('/jobs')
          .then(function (res) {
            vm.jobs.splice(0);

            res.data.forEach(function (job) {
              vm.jobs.push(job);
            });

            return vm.jobs;
          });
      };

      /**
       * Delete a job.
       *
       * @param jobId
       * @returns {*}
       */
      vm.del = function del(jobId) {
        debugger;
        return $http.delete('/jobs/' + jobId)
          .then(function (res) {
            _.remove(vm.jobs, {_id: jobId});
          }, function (err) {
            console.error(err);
          });
      };
    }]);
})();

(function(){
    'use strict';

    angular.module('app')
        .service('Entities', ["$http", "$state", "$uibModal", "$rootScope", function ($http, $state, $uibModal, $rootScope){
            var vm = this;
            vm.locs = [];
            vm.entities = [];
            vm.locations = [];

  /***** Find Entities with find function *****/
            /**
             * Find an entity in the entities list by its id.
             *
             * @param entityId
             * @returns {*}
             */
            vm.find = function find(entityId) {
                return _.find(vm.entities, {_id: entityId});
            };

            /**
             * Creates an Entity in Modal
             *
             * @param entity
             * @returns {*}
             */

  /***** Create Entities with createEntity function *****/
            vm.createEntity = function createEntity(entity, locations, clients){
              entity.location = locations;
              entity.owners = clients;
                return $http.post('/entities', entity)
                    .then(function (res){
                        vm.entities.push(res.data);
                    }, function (err){
                        console.log(err);
                    });
            };

  /***** Get Entities From Database with get function *****/
            /**
             * Get entities from the database and populate the local
             * client side list of entities.
             *
             * @returns {*}
             */
            vm.get = function get() {
                return $http.get('/entities')
                    .then(function (res) {
                        vm.entities.splice(0);
                        res.data.forEach(function (entity) {
                            vm.entities.push(entity);
                        });
                        return vm.entities;
                    });
            };

  /*****  Edit Entity Information in Edit Entity State through Modal  *****/
            /**
            *
            * @param entity
            * @returns {*}
            */
            vm.edit = function edit(entity) {

               var scope = $rootScope.$new();
               scope.entity = entity;
               return $uibModal.open({
                   controller: 'EntityModalController',
                   controllerAs: 'entityModal',
                   templateUrl: 'partials/entities/entity-modal-form.html',
                   scope: scope
               }).result.then(vm.editEntity);
            };

            /**
            * Edit an Entity
            *
            * @param entity
            * @returns {*}
            */

            vm.editEntity = function editEntity(entity) {
               return $http.put('/entities/' + entity._id, entity)
                   .then(function (res) {
                       var _entity = vm.find(entity._id);
                       _.merge(_entity, entity);
                   }, function (err) {
                       console.error(err);
                   });
            };

  /***** Edit Delete and Add Location in Entity Info Page Through Modal *****/
            vm.editLocModal = function editLocModal(location) {
               var scope = $rootScope.$new();
               scope.location = location;
               return $uibModal.open({
                   controller: 'LocationModalController',
                   controllerAs: 'locationModal',
                   templateUrl: 'partials/entities/location-modal-form.html',
                   scope: scope
               }).result.then(vm.editLoc);
            };

            vm.editLoc = function editLoc(location){
              return $http.put('/locations/' + location._id, location)
                .then(function(res){
                  //pass, the object has already been updated.
                }, function(err){
                  console.error(err);
                });
            };

            /**
            * Delete a location from within an Entity
            * @param locationId
            * @returns
            **/
            vm.locationDel = function locationDel(entity, locationId){
              return $http.delete('/locations/' + locationId)
              .then(function(res){
                _.remove(entity.location, {_id: locationId});
              });
            };
            vm.addLocationToEntity = function(entity){
              vm.openLocModal().then(function(location){
                location.entity = entity._id;
                vm.addLocations(location)
                  .then(function(location){
                    entity.location.push(location);
                  });
              });
            };


            vm.openLocModal = function(){
              return $uibModal.open({
                controller: 'LocationModalController',
                controllerAs: 'locationModal',
                templateUrl: 'partials/entities/location-modal-form.html'
              }).result;
            };


            // vm.addLocModal = function addLocModal() {
            //   vm.openModal()
            //     .then(vm.addLocations);
            // };

            vm.addLocations = function addLocations(location){
              return $http.post('/locations', location)
              .then(function(res){
                return res.data;
              });

            };

  /***** Edit an Owner in Entity Info Page Through Modal *****/
          vm.addClientToEntity = function(entity){
            vm.openCliModal().then(function(client){
              client.entity = entity._id;
              vm.addClients(client)
                .then(function(client){
                  entity.owners.push(client);
                });
            });
          };

          vm.addClients = function addClients(client){
            return $http.post('/clients', client)
            .then(function(res){
            return res.data;
            });
          };

          vm.openCliModal = function addCliModal(){
            return $uibModal.open({
              controller: 'ClientModalController',
              controllerAs: 'clientModal',
              templateUrl: 'partials/entities/client-modal-form.html'
            }).result;
          };

            vm.editCliModal = function editCliModal(client) {
               var scope = $rootScope.$new();
               scope.client = client;
               return $uibModal.open({
                   controller: 'ClientModalController',
                   controllerAs: 'clientModal',
                   templateUrl: 'partials/entities/client-modal-form.html',
                   scope: scope
               }).result.then(vm.editCli);
            };

            /**
            * @param location
            * @returns
            **/
            vm.editCli = function editCli(client) {
               return $http.put('/clients/' + client._id, client)
                   .then(function (res) {
                   }, function (err) {
                       console.error(err);
                   });
            };

            vm.clientDel = function clientDel(entity, clientId){
              return $http.delete('/clients/' + clientId)
              .then(function(res){
                _.remove(entity.owners, {_id: clientId});
              });
            };




/***** Delete Entities with del function *****/
            /**
             * Delete an entity.
             *
             * @param entityId
             * @returns {*}
             */
            vm.del = function del(entityId) {
                return $http.delete('/entities/' + entityId)
                    .then(function (res) {
                        _.remove(vm.entities, {_id: entityId});
                    });
            };

        }]);
})();

(function () {
  'use strict';

  angular.module('app')
    .service('Foremans', ["$http", "$state", function ($http, $state) {
      var vm = this;

      /**
       * The local task list.
       *
       * @type {Array}
       */
      vm.tasks = [];
      vm.entities = [];
      vm.jobs = [];
      vm.empty = {};

      /**
       * Create a task on the server.
       *
       * @param job
       * @returns {*}
       */
      vm.createJob = function createJob(job) {
        return $http.post('/jobs', job)
          .then(function (res) {
            vm.jobs.push(res.data);
            return res.data;
          }, function (err) {
            console.error(err);
          });
      };


      vm.editJob = function editJob(job){
        return $http.put('/jobs/' + job._id, job)
            .then(function (res) {
                var _job = vm.find(job._id);
                _.merge(_job, job);
            }, function (err) {
                console.error(err);
            }).then(function () {
              $state.go('foreman-view.sent-foreman');
            });
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

      // vm.findJob = function findJob(jobId) {
      //   return _.find(vm.jobs, {_id: jobId});
      // };

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
       * Get tasks from the database and populate the local
       * client side list of task.
       *
       * @returns {*}
       */
      vm.get = function get() {
        return $http.get('/entities')
          .then(function (res) {
            vm.entities.splice(0);

            res.data.forEach(function (entity) {
              vm.entities.push(entity);
            });
            return vm.entities;
          });
      };

      // vm.getJobs = function getJobs(jobId) {
      //   return $http.get('/jobs/' + jobId)
      //     .then(function (res) {
      //       vm.entities.splice(0);
      //
      //       res.data.forEach(function (entity) {
      //         vm.entities.push(entity);
      //       });
      //       return vm.entities;
      //     });
      // };

    }]);
})();

(function () {
  'use strict';

  angular.module('app')
    .service('Jobs', ["$http", "$state", function ($http, $state) {
      var vm = this;

      vm.jobs = [];

      vm.find = function find(jobId) {
        return _.find(vm.jobs, {_id: jobId});
      };

      /**
       * Get users from the database and populate the local
       * client side list of user.
       *
       * @returns {*}
       */
      vm.get = function get() {
        return $http.get('/jobs')
          .then(function (res) {
            vm.jobs.splice(0);

            res.data.forEach(function (job) {
              vm.jobs.push(job);
            });

            return vm.jobs;
          });
      };

      /**
       * Update a project.
       *
       * @param projectCopy
       * @returns {*}
       */
      vm.put = function put(jobCopy) {
        
        var data = {
          approved: jobCopy.approved
        };

        return $http.put('/jobs/' + jobCopy._id, data)
          .then(function (res) {

            var p = vm.find(jobCopy._id);
            _.merge(p, jobCopy);
            // $state.go('jobs', {jobId: jobCopy._id});
          }, function (err) {
            //TODO: handle when we can't update a project.
          });
      };

    }]);

})();

(function(){
    'use strict';

    angular.module('app')
        .provider('storage', function(){
           var vm = this,
               prefix = '',
               delimiter = '.';


            /**
             * Set a prefix for our localStorage that will be used when
             * setting and getting keys.
             *
             * @param _prefix
             * @param _delimiter
             */
            vm.setPrefix = function setPrefix(_prefix, _delimiter) {
                if (!_prefix) return;
                prefix = _prefix;

                if (_delimiter) delimiter = _delimiter;
            };

            /**
             * Convenience method for finding our storage keys.
             *
             * @param key
             * @returns {*}
             */
            function getKey(key) {
                return prefix ? prefix + delimiter + key : key;
            }


            /**
             * The required $get method for our service provider.
             *
             * @returns {{set: Function, get: Function, forget: Function}}
             */
            vm.$get = function $get() {
                return {
                    /**
                     * Set a value into the local storage.  Simple json stringify for objects.
                     *
                     * @param key
                     * @param val
                     */
                    set: function set(key, val) {
                        localStorage.setItem(getKey(key), JSON.stringify(val));
                    },

                    /**
                     * Get a value from localStorage.  If a converter is provided the
                     * retrieved object will be passed through given function and
                     * the result of THAT function will be used.
                     *
                     * @param key
                     * @param converter
                     * @returns {*}
                     */
                    get: function get(key, converter) {
                        converter = angular.isFunction(converter) ? converter : angular.identity;
                        return converter(JSON.parse(localStorage.getItem(getKey(key))));
                    },

                    /**
                     * Remove an item from localStorage.
                     *
                     * @param key
                     */
                    forget: function forget(key) {
                        localStorage.removeItem(getKey(key));
                    }
                };
            };

        });
})();
(function () {

  'use strict';

  angular.module('app')
    .service('modal', ["$uibModal", "$rootScope", function ($uibModal, $rootScope) {
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
    }]);
}());
(function () {
  'use strict';

  angular.module('app')
    .service('Tasks', ["$http", "$state", "$uibModal", "$rootScope", function ($http, $state, $uibModal, $rootScope) {
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
    }]);
})();
(function () {
  'use strict';

  angular.module('app')
    .service('Users', ["$http", "$state", "$uibModal", "$rootScope", "storage", function ($http, $state, $uibModal, $rootScope, storage) {
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
    }]);
})();

(function () {

  'use strict';

  angular.module('app')
    .controller('ConfirmUserDelete', ["$uibModalInstance", function ($uibModalInstance) {
      var vm  = this;

      /**
       * Affirmatively close the dialog
       */
      vm.close = function close() {
        $uibModalInstance.close();
      };

      /**
       * Cancel the dialog
       */
      vm.dismiss = function dismiss() {
        $uibModalInstance.dismiss();
      };
    }]);
}());
(function () {

  'use strict';

  angular.module('app')
    .controller('UserModalController', ["$uibModalInstance", "$scope", function ($uibModalInstance, $scope) {
      var vm = this;

      vm.user = $scope.user ? angular.copy($scope.user) : {};
    
      /**
       * Saving the user.
       */
      vm.ok = function ok() {
        $uibModalInstance.close(vm.user);
      };

      /**
       * Dismissing the modal, do not save user.
       */
      vm.cancel = function cancel() {
        $uibModalInstance.dismiss();
      };
    }]);
}());
(function () {
  'use strict';

  angular.module('app')
    .controller('UsersController', ["Users", "users", "modal", function (Users, users, modal) {
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
      
    }]);
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUuanMiLCJ1aS5tb2R1bGUuanMiLCJib2R5LmNvbnRyb2xsZXIuanMiLCJhZG1pbi9hZG1pbi5jb250cm9sbGVyLmpzIiwiYWRtaW4vY29uZmlybS1kZWxldGUuY29udHJvbGxlci5qcyIsImFkbWluL2Rhc2hib2FyZC5jb250cm9sbGVyLmpzIiwiYWRtaW4vcGVuZGluZy1qb2JzLmNvbnRyb2xsZXIuanMiLCJhZG1pbi9yZXBvcnQtam9iLmNvbnRyb2xsZXIuanMiLCJhZG1pbi9zZXR0aW5ncy5jb250cm9sbGVyLmpzIiwiZGlyZWN0aXZlcy9lbnRpdHktY2xpZW50cy5kaXJlY3RpdmUuanMiLCJkaXJlY3RpdmVzL2VudGl0eS1sb2NhdGlvbnMuZGlyZWN0aXZlLmpzIiwiZGlyZWN0aXZlcy9oYW1idWdlci1jbG9zZS5jb250cm9sbGVyLmpzIiwiZW50aXRpZXMvYWRkLmVudGl0eS5jb250cm9sbGVyLmpzIiwiZW50aXRpZXMvY2xpZW50LW1vZGFsLmNvbnRyb2xsZXIuanMiLCJlbnRpdGllcy9jb25maXJtLWRlbGV0ZS1lbnRpdHktY29udHJvbGxlci5qcyIsImVudGl0aWVzL2VudGl0aWVzLmNvbnRyb2xsZXIuanMiLCJlbnRpdGllcy9lbnRpdHktbW9kYWwuY29udHJvbGxlci5qcyIsImVudGl0aWVzL2VudGl0eS5jb250cm9sbGVyLmpzIiwiZW50aXRpZXMvbG9jYXRpb24tbW9kYWwuY29udHJvbGxlci5qcyIsImZpbHRlcnMvY2FsZW5kZXIuZmlsdGVyLmpzIiwiZmlsdGVycy9kYXRhLmZpbHRlci5qcyIsImZpbHRlcnMvam9icy5maWx0ZXIuanMiLCJmb3JlbWFucy9jb25maXJtLWRlbGV0ZS5jb250cm9sbGVyLmpzIiwiZm9yZW1hbnMvZWRpdC1qb2IuY29udHJvbGxlci5qcyIsImZvcmVtYW5zL2ZvcmVtYW4tdmlldy5jb250cm9sbGVyLmpzIiwiZm9yZW1hbnMvZm9yZW1hbi5jb250cm9sbGVyLmpzIiwiZm9yZW1hbnMvam9iLmNvbnRyb2xsZXIuanMiLCJmb3JlbWFucy9zZW50LWZvcmVtYW4uY29udHJvbGxlci5qcyIsImxvZ2luL2xvZ2luLmNvbnRyb2xsZXIuanMiLCJ0YXNrcy9jb25maXJtLWRlbGV0ZS10YXNrLWNvbnRyb2xsZXIuanMiLCJ0YXNrcy90YXNrLW1vZGFsLmNvbnRyb2xsZXIuanMiLCJ0YXNrcy90YXNrcy5jb250cm9sbGVyLmpzIiwibW9kYWxzL2NvbmZpcm0tZGVsZXRlLWNsaWVudC5jb250cm9sbGVyLmpzIiwibW9kYWxzL2NvbmZpcm0tZGVsZXRlLWxvY2F0aW9uLmNvbnRyb2xsZXIuanMiLCJzZXJ2aWNlcy9hZG1pbnMuc2VydmljZS5qcyIsInNlcnZpY2VzL2VudGl0aWVzLnNlcnZpY2UuanMiLCJzZXJ2aWNlcy9mb3JlbWFucy5zZXJ2aWNlLmpzIiwic2VydmljZXMvam9icy5zZXJ2aWNlLmpzIiwic2VydmljZXMvbG9jYWxTdG9yYWdlLnNlcnZpY2UuanMiLCJzZXJ2aWNlcy9tb2RhbC5zZXJ2aWNlLmpzIiwic2VydmljZXMvdGFza3Muc2VydmljZS5qcyIsInNlcnZpY2VzL3VzZXJzLnNlcnZpY2UuanMiLCJ1c2Vycy9jb25maXJtLWRlbGV0ZS11c2VyLWNvbnRyb2xsZXIuanMiLCJ1c2Vycy91c2VyLW1vZGFsLmNvbnRyb2xsZXIuanMiLCJ1c2Vycy91c2Vycy5jb250cm9sbGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLENBQUEsWUFBQTtFQUNBOztFQUVBLFFBQUEsT0FBQSxPQUFBLENBQUEsYUFBQSxVQUFBLGdCQUFBLGFBQUE7S0FDQSxpRUFBQSxVQUFBLGdCQUFBLG9CQUFBLGVBQUE7Ozs7O01BS0EsbUJBQUEsVUFBQTs7Ozs7O01BTUE7U0FDQSxNQUFBLFNBQUE7VUFDQSxLQUFBO1VBQ0EsYUFBQTtVQUNBLFlBQUE7VUFDQSxjQUFBOztTQUVBLE1BQUEsU0FBQTtVQUNBLEtBQUE7VUFDQSxhQUFBO1VBQ0EsWUFBQTtVQUNBLGNBQUE7VUFDQSxTQUFBO1lBQ0EsZ0JBQUEsVUFBQSxPQUFBO2NBQ0EsT0FBQSxNQUFBOzs7VUFHQSxNQUFBO1lBQ0EsZUFBQTtZQUNBLFdBQUE7OztTQUdBLE1BQUEsY0FBQTtVQUNBLEtBQUE7VUFDQSxhQUFBO1VBQ0EsWUFBQTtVQUNBLGNBQUE7VUFDQSxTQUFBO1lBQ0EsZ0JBQUEsVUFBQSxPQUFBO2NBQ0EsT0FBQSxNQUFBOzs7VUFHQSxNQUFBO1lBQ0EsZUFBQTtZQUNBLFdBQUE7WUFDQSxTQUFBOzs7U0FHQSxNQUFBLHlCQUFBO1VBQ0EsS0FBQTtVQUNBLGFBQUE7VUFDQSxZQUFBO1VBQ0EsY0FBQTtVQUNBLFNBQUE7WUFDQSx1Q0FBQSxVQUFBLE9BQUEsY0FBQSxNQUFBO2NBQ0EsT0FBQSxNQUFBLEtBQUEsYUFBQTs7O1VBR0EsTUFBQTtZQUNBLGVBQUE7WUFDQSxXQUFBO1lBQ0EsU0FBQTs7O1NBR0EsTUFBQSxpQkFBQTtVQUNBLEtBQUE7VUFDQSxhQUFBO1VBQ0EsWUFBQTtVQUNBLGNBQUE7VUFDQSxTQUFBO1lBQ0EsZ0JBQUEsVUFBQSxPQUFBO2NBQ0EsT0FBQSxNQUFBOzs7VUFHQSxNQUFBO1lBQ0EsZUFBQTtZQUNBLFdBQUE7WUFDQSxTQUFBOzs7U0FHQSxNQUFBLG9CQUFBO1VBQ0EsS0FBQTtVQUNBLGFBQUE7VUFDQSxZQUFBO1VBQ0EsY0FBQTtVQUNBLFNBQUE7WUFDQSxpQkFBQSxVQUFBLE9BQUE7Y0FDQSxPQUFBLE1BQUE7O1lBRUEsdUJBQUEsVUFBQSxVQUFBO2NBQ0EsT0FBQSxTQUFBOzs7VUFHQSxNQUFBO1lBQ0EsZUFBQTtZQUNBLFdBQUE7WUFDQSxTQUFBOzs7U0FHQSxNQUFBLFlBQUE7VUFDQSxLQUFBO1VBQ0EsYUFBQTtVQUNBLFlBQUE7VUFDQSxjQUFBO1VBQ0EsU0FBQTtVQUNBLE1BQUE7WUFDQSxlQUFBO1lBQ0EsV0FBQTs7O1NBR0EsTUFBQSxrQkFBQTtVQUNBLEtBQUE7VUFDQSxhQUFBO1VBQ0EsWUFBQTtVQUNBLGNBQUE7VUFDQSxTQUFBO1lBQ0EsaUJBQUEsVUFBQSxPQUFBOztjQUVBLE9BQUEsTUFBQTs7O1VBR0EsTUFBQTtZQUNBLGVBQUE7WUFDQSxXQUFBO1lBQ0EsU0FBQTs7O1NBR0EsTUFBQSxxQkFBQTtVQUNBLEtBQUE7VUFDQSxhQUFBO1VBQ0EsWUFBQTtVQUNBLGNBQUE7VUFDQSxTQUFBO1lBQ0EsdUJBQUEsVUFBQSxVQUFBO2NBQ0EsT0FBQSxTQUFBOzs7VUFHQSxNQUFBO1lBQ0EsZUFBQTtZQUNBLFdBQUE7WUFDQSxTQUFBOzs7U0FHQSxNQUFBLGlDQUFBO1VBQ0EsS0FBQTtVQUNBLGFBQUE7VUFDQSxZQUFBO1VBQ0EsY0FBQTtVQUNBLFNBQUE7WUFDQSxpREFBQSxVQUFBLFVBQUEsY0FBQSxVQUFBO2NBQ0EsT0FBQSxTQUFBLEtBQUEsYUFBQTs7O1VBR0EsTUFBQTtZQUNBLGVBQUE7WUFDQSxXQUFBO1lBQ0EsU0FBQTs7O1NBR0EsTUFBQSx5QkFBQTtVQUNBLEtBQUE7VUFDQSxhQUFBO1VBQ0EsWUFBQTtVQUNBLGNBQUE7VUFDQSxNQUFBO1lBQ0EsZUFBQTtZQUNBLFdBQUE7WUFDQSxTQUFBOzs7U0FHQSxNQUFBLGtCQUFBO1VBQ0EsS0FBQTtVQUNBLGFBQUE7VUFDQSxZQUFBO1VBQ0EsY0FBQTtVQUNBLFNBQUE7WUFDQSxpQkFBQSxVQUFBLE9BQUE7O2NBRUEsT0FBQSxNQUFBOzs7VUFHQSxNQUFBO1lBQ0EsZUFBQTtZQUNBLFdBQUE7WUFDQSxTQUFBOzs7U0FHQSxNQUFBLGdCQUFBO1VBQ0EsS0FBQTtVQUNBLGFBQUE7VUFDQSxZQUFBO1VBQ0EsY0FBQTtVQUNBLE1BQUE7WUFDQSxlQUFBO1lBQ0EsV0FBQTs7O1NBR0EsTUFBQSx5QkFBQTtVQUNBLEtBQUE7VUFDQSxhQUFBO1VBQ0EsWUFBQTtVQUNBLGNBQUE7VUFDQSxTQUFBO1lBQ0EsdUJBQUEsVUFBQSxVQUFBO2NBQ0EsT0FBQSxTQUFBOztZQUVBLGlCQUFBLFVBQUEsT0FBQTtjQUNBLE9BQUEsTUFBQTs7WUFFQSx1QkFBQSxVQUFBLFVBQUE7Y0FDQSxPQUFBLFNBQUE7OztVQUdBLE1BQUE7WUFDQSxlQUFBO1lBQ0EsV0FBQTtZQUNBLFNBQUE7OztTQUdBLE1BQUEsNkJBQUE7VUFDQSxLQUFBO1VBQ0EsYUFBQTtVQUNBLFlBQUE7VUFDQSxjQUFBO1VBQ0EsU0FBQTtZQUNBLGdCQUFBLFVBQUEsT0FBQTtjQUNBLE9BQUEsTUFBQTs7O1VBR0EsTUFBQTtZQUNBLGVBQUE7WUFDQSxXQUFBO1lBQ0EsU0FBQTs7O1NBR0EsTUFBQSxzQ0FBQTtVQUNBLEtBQUE7VUFDQSxhQUFBO1VBQ0EsWUFBQTtVQUNBLGNBQUE7VUFDQSxTQUFBO1lBQ0EsbURBQUEsVUFBQSxPQUFBLGNBQUEsVUFBQSxNQUFBO2NBQ0EsT0FBQSxNQUFBLEtBQUEsYUFBQTs7WUFFQSx1QkFBQSxVQUFBLFVBQUE7Y0FDQSxPQUFBLFNBQUE7O1lBRUEsaUJBQUEsVUFBQSxPQUFBO2NBQ0EsT0FBQSxNQUFBOztZQUVBLHVCQUFBLFVBQUEsVUFBQTtjQUNBLE9BQUEsU0FBQTs7O1VBR0EsTUFBQTtZQUNBLGVBQUE7WUFDQSxXQUFBOzs7Ozs7O01BT0EsY0FBQSxhQUFBLG1CQUFBLFVBQUEsV0FBQTtRQUNBLE9BQUE7VUFDQSxTQUFBLFVBQUEsUUFBQTtZQUNBLElBQUEsUUFBQSxVQUFBLElBQUE7WUFDQSxJQUFBLE1BQUEsY0FBQSxPQUFBLFFBQUEsZ0JBQUEsV0FBQSxNQUFBO1lBQ0EsT0FBQTs7Ozs7S0FLQSxpREFBQSxVQUFBLFlBQUEsT0FBQSxRQUFBLFNBQUE7TUFDQSxXQUFBLElBQUEscUJBQUEsVUFBQSxPQUFBLFNBQUE7UUFDQSxJQUFBLFFBQUEsUUFBQSxRQUFBLEtBQUEsZUFBQTtVQUNBLElBQUEsQ0FBQSxNQUFBLGNBQUE7WUFDQSxNQUFBO1lBQ0EsT0FBQSxHQUFBOzs7OztNQUtBLE1BQUE7O01BRUEsSUFBQSxDQUFBLE1BQUEsZUFBQSxDQUFBLE1BQUEsa0JBQUE7UUFDQSxPQUFBLEdBQUE7Ozs7O0FDblNBLENBQUEsVUFBQTs7SUFFQTs7SUFFQSxRQUFBLE9BQUEsVUFBQTs7O0FDSkEsQ0FBQSxXQUFBOztDQUVBO0NBQ0EsUUFBQSxPQUFBO0dBQ0EsV0FBQSwrREFBQSxVQUFBLFVBQUEsT0FBQSxZQUFBLE9BQUE7R0FDQSxJQUFBLEtBQUE7R0FDQSxHQUFBLFNBQUEsTUFBQTtHQUNBLEdBQUEsWUFBQSxPQUFBLFFBQUEsT0FBQSxPQUFBLFFBQUEsS0FBQSxZQUFBOztHQUVBLFdBQUEsSUFBQSxxQkFBQSxVQUFBLE9BQUEsU0FBQTtJQUNBLEdBQUEsWUFBQSxRQUFBLE9BQUEsUUFBQSxLQUFBLFlBQUE7OztHQUdBLEdBQUEsUUFBQSxTQUFBLFFBQUE7SUFDQSxJQUFBLFVBQUEsUUFBQSxhQUFBLFFBQUE7SUFDQSxJQUFBLFVBQUEsS0FBQSxNQUFBO0lBQ0EsT0FBQSxRQUFBOzs7OztBQ2hCQSxDQUFBLFlBQUE7RUFDQTs7RUFFQSxRQUFBLE9BQUE7S0FDQSxXQUFBLHFGQUFBLFVBQUEsT0FBQSxNQUFBLE1BQUEsT0FBQSxRQUFBLE9BQUEsVUFBQTtNQUNBLElBQUEsS0FBQTs7TUFFQSxHQUFBLGNBQUEsTUFBQTtNQUNBLEdBQUEsU0FBQSxNQUFBO01BQ0EsR0FBQSxTQUFBLE1BQUE7TUFDQSxHQUFBLE9BQUE7TUFDQSxHQUFBLE9BQUE7TUFDQSxHQUFBLFdBQUEsRUFBQSxNQUFBO01BQ0EsR0FBQSxNQUFBLEtBQUE7O01BRUEsR0FBQSxjQUFBLEdBQUEsWUFBQSxRQUFBLEtBQUEsQ0FBQSxTQUFBLEdBQUEsWUFBQTs7Ozs7TUFLQSxHQUFBLGdCQUFBLFNBQUEsY0FBQSxPQUFBO1FBQ0EsTUFBQSxLQUFBLHdCQUFBLGlCQUFBO1dBQ0EsS0FBQSxVQUFBLEtBQUE7WUFDQSxNQUFBLElBQUE7Ozs7OztBQ3ZCQSxDQUFBLFlBQUE7O0VBRUE7O0VBRUEsUUFBQSxPQUFBO0tBQ0EsV0FBQSxpREFBQSxVQUFBLG1CQUFBO01BQ0EsSUFBQSxNQUFBOzs7OztNQUtBLEdBQUEsUUFBQSxTQUFBLFFBQUE7UUFDQSxrQkFBQTs7Ozs7O01BTUEsR0FBQSxVQUFBLFNBQUEsVUFBQTtRQUNBLGtCQUFBOzs7O0FDbkJBLENBQUEsWUFBQTtFQUNBLFFBQUEsT0FBQTtLQUNBLFdBQUEsbUZBQUEsVUFBQSxZQUFBLFFBQUEsTUFBQSxNQUFBLE9BQUEsUUFBQTtNQUNBLElBQUEsS0FBQTtNQUNBLEdBQUEsT0FBQTtNQUNBLEdBQUEsUUFBQSxPQUFBLFFBQUEsT0FBQSxPQUFBLFFBQUEsS0FBQSxVQUFBOztNQUVBLFdBQUEsSUFBQSxxQkFBQSxVQUFBLE9BQUEsU0FBQTtRQUNBLEdBQUEsUUFBQSxRQUFBLE9BQUEsUUFBQSxLQUFBLFVBQUE7OztNQUdBLEdBQUEsTUFBQSxVQUFBLEtBQUE7UUFDQSxJQUFBLFdBQUE7UUFDQSxLQUFBLElBQUE7UUFDQTs7O01BR0EsR0FBQSxRQUFBOztNQUVBLFNBQUEsZUFBQTtRQUNBLEdBQUEsUUFBQSxHQUFBLEtBQUEsT0FBQSxVQUFBLEdBQUE7VUFDQSxJQUFBLEVBQUEsWUFBQSxFQUFBLFlBQUE7WUFDQSxPQUFBOztVQUVBLE9BQUE7V0FDQTs7O01BR0E7Ozs7OztNQU1BLE9BQUEsT0FBQSxZQUFBO1FBQ0EsT0FBQSxHQUFBO1NBQ0EsWUFBQTtRQUNBO1NBQ0E7Ozs7QUN0Q0EsQ0FBQSxZQUFBOztFQUVBOztFQUVBLFFBQUEsT0FBQTtLQUNBLFdBQUEsc0VBQUEsVUFBQSxNQUFBLE1BQUEsT0FBQSxPQUFBLFFBQUE7TUFDQSxJQUFBLEtBQUE7TUFDQSxHQUFBLE9BQUE7O01BRUEsR0FBQSxNQUFBLFVBQUEsS0FBQTtRQUNBLElBQUEsV0FBQTtRQUNBLEtBQUEsSUFBQTtRQUNBOzs7Ozs7TUFNQSxHQUFBLGdCQUFBLFNBQUEsY0FBQSxPQUFBO1FBQ0EsTUFBQSxLQUFBLDJCQUFBLGlCQUFBO1dBQ0EsS0FBQSxVQUFBLEtBQUE7WUFDQSxNQUFBLElBQUE7Ozs7O0FDckJBLENBQUEsVUFBQTtFQUNBO0FBQ0EsUUFBQSxPQUFBO0dBQ0EsV0FBQSw2RUFBQSxTQUFBLFVBQUEsUUFBQSxPQUFBLFVBQUEsT0FBQTtJQUNBLElBQUEsS0FBQTtJQUNBLEdBQUEsWUFBQTtJQUNBLEdBQUEsT0FBQTtJQUNBLEdBQUEsUUFBQTtJQUNBLEdBQUEsV0FBQTtJQUNBLEdBQUEsWUFBQTtJQUNBLEdBQUEsV0FBQTtJQUNBLEdBQUEsZUFBQTtJQUNBLEdBQUEsV0FBQTs7O0lBR0EsR0FBQSxZQUFBLFNBQUEsVUFBQSxNQUFBO01BQ0EsU0FBQSxVQUFBO1NBQ0EsS0FBQSxZQUFBO1VBQ0EsT0FBQSxHQUFBOzs7OztJQUtBLEdBQUEsU0FBQSxRQUFBLFVBQUEsUUFBQTtNQUNBLE9BQUEsU0FBQSxRQUFBLFVBQUEsS0FBQTtRQUNBLElBQUEsRUFBQSxRQUFBLEdBQUEsV0FBQSxJQUFBLFVBQUEsQ0FBQSxHQUFBO1VBQ0EsR0FBQSxVQUFBLEtBQUEsSUFBQTs7Ozs7O0lBTUEsT0FBQSxRQUFBLFlBQUE7TUFDQSxPQUFBLEtBQUEsSUFBQTs7SUFFQSxPQUFBOztJQUVBLE9BQUEsUUFBQSxZQUFBO01BQ0EsT0FBQSxLQUFBOzs7SUFHQSxPQUFBLFlBQUEsWUFBQTtNQUNBLE9BQUEsVUFBQSxPQUFBLFVBQUEsT0FBQSxJQUFBOzs7SUFHQSxPQUFBOztJQUVBLE9BQUEsVUFBQSxJQUFBLEtBQUEsTUFBQSxHQUFBOztJQUVBLE9BQUEsT0FBQSxVQUFBLFFBQUE7TUFDQSxPQUFBLE9BQUEsU0FBQTs7O0lBR0EsT0FBQSxVQUFBLFVBQUEsTUFBQSxPQUFBLEtBQUE7TUFDQSxPQUFBLEtBQUEsSUFBQSxLQUFBLE1BQUEsT0FBQTs7O0lBR0EsT0FBQSxjQUFBO01BQ0EsWUFBQTtNQUNBLGFBQUE7O0lBRUEsT0FBQSxVQUFBLENBQUEsY0FBQSxjQUFBLGNBQUE7SUFDQSxPQUFBLFNBQUEsT0FBQSxRQUFBO0lBQ0EsT0FBQSxTQUFBLENBQUEsUUFBQTtJQUNBLElBQUEsV0FBQSxJQUFBO0lBQ0EsSUFBQSxnQkFBQSxJQUFBOztJQUVBLFNBQUEsUUFBQSxTQUFBLFlBQUE7SUFDQSxjQUFBLFFBQUEsU0FBQSxZQUFBOztJQUVBLE9BQUEsU0FBQTtNQUNBO1FBQ0EsTUFBQTtRQUNBLFFBQUE7O01BRUE7UUFDQSxNQUFBO1FBQ0EsUUFBQTs7OztJQUlBLE9BQUEsY0FBQSxVQUFBLE1BQUEsTUFBQTtNQUNBLElBQUEsU0FBQSxPQUFBO1FBQ0EsSUFBQSxhQUFBLElBQUEsS0FBQSxNQUFBLFNBQUEsR0FBQSxHQUFBLEdBQUE7O1FBRUEsS0FBQSxJQUFBLElBQUEsR0FBQSxJQUFBLE9BQUEsT0FBQSxRQUFBLEtBQUE7VUFDQSxJQUFBLGFBQUEsSUFBQSxLQUFBLE9BQUEsT0FBQSxHQUFBLE1BQUEsU0FBQSxHQUFBLEdBQUEsR0FBQTs7VUFFQSxJQUFBLGVBQUEsWUFBQTtZQUNBLE9BQUEsT0FBQSxPQUFBLEdBQUE7Ozs7TUFJQSxPQUFBOzs7Ozs7OztBQzdGQSxDQUFBLFlBQUE7O0VBRUE7O0VBRUEsUUFBQSxPQUFBO0tBQ0EsV0FBQSwrQ0FBQSxVQUFBLFlBQUEsUUFBQTtNQUNBLElBQUEsS0FBQTtNQUNBLEdBQUEsUUFBQSxPQUFBLFFBQUEsT0FBQSxPQUFBLFFBQUEsS0FBQSxVQUFBOztNQUVBLFdBQUEsSUFBQSxxQkFBQSxVQUFBLE9BQUEsU0FBQTtRQUNBLEdBQUEsUUFBQSxRQUFBLE9BQUEsUUFBQSxLQUFBLFVBQUE7Ozs7O0FDVkEsQ0FBQSxVQUFBO0VBQ0E7O0VBRUEsUUFBQSxPQUFBO0dBQ0EsVUFBQSxpQkFBQSxVQUFBOzs7O0lBSUEsTUFBQTtNQUNBLFVBQUE7TUFDQSxhQUFBO01BQ0EsT0FBQTtRQUNBLFFBQUE7UUFDQSxZQUFBO1FBQ0EscUJBQUE7Ozs7Ozs7QUNkQSxDQUFBLFVBQUE7RUFDQTs7RUFFQSxRQUFBLE9BQUE7R0FDQSxVQUFBLG1CQUFBLFVBQUE7SUFDQSxNQUFBO01BQ0EsVUFBQTtNQUNBLGFBQUE7TUFDQSxPQUFBO1FBQ0EsUUFBQTtRQUNBLGNBQUE7UUFDQSx1QkFBQTs7Ozs7O0NDWEEsQ0FBQSxXQUFBOztDQUVBO0NBQ0EsUUFBQSxPQUFBO0VBQ0EsVUFBQSxRQUFBLFVBQUE7TUFDQSxFQUFBLFVBQUEsR0FBQSxRQUFBLHNCQUFBLFNBQUEsR0FBQTtLQUNBLElBQUEsRUFBQSxFQUFBLFFBQUEsR0FBQSxPQUFBO1FBQ0EsRUFBQSxNQUFBLFNBQUE7Ozs7Ozs7QUNQQSxDQUFBLFVBQUE7QUFDQTs7QUFFQSxRQUFBLE9BQUE7R0FDQSxXQUFBLDhDQUFBLFNBQUEsVUFBQSxPQUFBO01BQ0EsSUFBQSxLQUFBO01BQ0EsR0FBQSxTQUFBO01BQ0EsR0FBQSxNQUFBLFNBQUE7TUFDQSxHQUFBLFdBQUEsQ0FBQSxDQUFBLElBQUE7TUFDQSxHQUFBLFVBQUEsQ0FBQSxDQUFBLElBQUE7Ozs7O01BS0EsR0FBQSxlQUFBLFVBQUE7UUFDQSxHQUFBLFlBQUEsR0FBQSxVQUFBLE9BQUE7UUFDQSxHQUFBLFVBQUEsS0FBQSxDQUFBLE1BQUEsWUFBQSxHQUFBOztNQUVBLEdBQUEsYUFBQSxXQUFBO1FBQ0EsR0FBQSxXQUFBLEdBQUEsVUFBQSxPQUFBO1FBQ0EsR0FBQSxVQUFBLE9BQUEsR0FBQTs7O01BR0EsR0FBQSxhQUFBLFVBQUE7UUFDQSxHQUFBLFlBQUEsR0FBQSxRQUFBLE9BQUE7UUFDQSxHQUFBLFFBQUEsS0FBQSxDQUFBLE1BQUEsU0FBQSxHQUFBOzs7TUFHQSxHQUFBLGdCQUFBLFVBQUE7UUFDQSxHQUFBLFdBQUEsR0FBQSxRQUFBLE9BQUE7UUFDQSxHQUFBLFFBQUEsT0FBQSxHQUFBOzs7Ozs7O0FDOUJBLENBQUEsVUFBQTtBQUNBOztBQUVBLFFBQUEsT0FBQTtDQUNBLFdBQUEseURBQUEsU0FBQSxtQkFBQSxPQUFBO0VBQ0EsSUFBQSxLQUFBOztFQUVBLEdBQUEsU0FBQSxPQUFBLFNBQUEsT0FBQSxTQUFBOztFQUVBLEdBQUEsS0FBQSxTQUFBLEtBQUE7SUFDQTtNQUNBLGtCQUFBLE1BQUEsR0FBQTs7O0VBR0EsR0FBQSxTQUFBLFNBQUEsUUFBQTtNQUNBLGtCQUFBOzs7Ozs7QUNmQSxDQUFBLFlBQUE7O0VBRUE7O0VBRUEsUUFBQSxPQUFBO0tBQ0EsV0FBQSw2Q0FBQSxVQUFBLG1CQUFBO01BQ0EsSUFBQSxNQUFBOzs7OztNQUtBLEdBQUEsUUFBQSxTQUFBLFFBQUE7UUFDQSxrQkFBQTs7Ozs7O01BTUEsR0FBQSxVQUFBLFNBQUEsVUFBQTtRQUNBLGtCQUFBOzs7O0FDbkJBLENBQUEsVUFBQTtJQUNBOztJQUVBLFFBQUEsT0FBQTtTQUNBLFdBQUEsd0RBQUEsVUFBQSxVQUFBLFVBQUEsTUFBQTtZQUNBLElBQUEsS0FBQTtZQUNBLEdBQUEsU0FBQTtZQUNBLEdBQUEsV0FBQTtZQUNBLEdBQUEsTUFBQSxTQUFBO1lBQ0EsR0FBQSxPQUFBLFNBQUE7WUFDQSxHQUFBLFNBQUEsU0FBQTtZQUNBLEdBQUEsZUFBQSxTQUFBOzs7O01BSUEsR0FBQSxnQkFBQSxTQUFBLGNBQUEsVUFBQTtRQUNBLE1BQUEsS0FBQSx1QkFBQSxnQkFBQTtXQUNBLEtBQUEsVUFBQSxLQUFBO1lBQ0EsU0FBQSxJQUFBOzs7Ozs7O0FDbEJBLENBQUEsVUFBQTtHQUNBOztHQUVBLFFBQUEsT0FBQTtRQUNBLFdBQUEseURBQUEsVUFBQSxtQkFBQSxPQUFBO1dBQ0EsSUFBQSxLQUFBOztXQUVBLEdBQUEsU0FBQSxPQUFBLFNBQUEsUUFBQSxLQUFBLE9BQUEsVUFBQTs7V0FFQSxHQUFBLEtBQUEsU0FBQSxLQUFBOztlQUVBLGtCQUFBLE1BQUEsR0FBQTs7O1dBR0EsR0FBQSxTQUFBLFNBQUEsUUFBQTtlQUNBLGtCQUFBOzs7Ozs7QUNmQSxDQUFBLFVBQUE7SUFDQTs7SUFFQSxRQUFBLE9BQUE7U0FDQSxXQUFBLG9EQUFBLFNBQUEsUUFBQSxVQUFBLE1BQUE7V0FDQSxJQUFBLEtBQUE7V0FDQSxHQUFBLGFBQUEsU0FBQTtXQUNBLEdBQUEsZUFBQSxTQUFBO1dBQ0EsR0FBQSxhQUFBLFNBQUE7WUFDQSxHQUFBLFNBQUE7WUFDQSxHQUFBLGNBQUEsU0FBQTtZQUNBLEdBQUEsWUFBQSxTQUFBOzs7WUFHQSxHQUFBLHdCQUFBLFNBQUEsc0JBQUEsUUFBQSxZQUFBO2NBQ0E7Y0FDQSxNQUFBLEtBQUEseUJBQUEsa0JBQUE7aUJBQ0EsS0FBQSxVQUFBLEtBQUE7a0JBQ0EsU0FBQSxZQUFBLFFBQUE7Ozs7WUFJQSxHQUFBLHNCQUFBLFNBQUEsb0JBQUEsUUFBQSxVQUFBO2NBQ0E7Y0FDQSxNQUFBLEtBQUEsdUJBQUEsZ0JBQUE7aUJBQ0EsS0FBQSxVQUFBLEtBQUE7a0JBQ0EsU0FBQSxVQUFBLFFBQUE7Ozs7Ozs7QUMxQkEsQ0FBQSxVQUFBO0FBQ0E7O0FBRUEsUUFBQSxPQUFBO0NBQ0EsV0FBQSwyREFBQSxTQUFBLG1CQUFBLE9BQUE7RUFDQSxJQUFBLEtBQUE7O0VBRUEsR0FBQSxXQUFBLE9BQUEsV0FBQSxPQUFBLFdBQUE7O0VBRUEsR0FBQSxLQUFBLFNBQUEsS0FBQTtNQUNBLGtCQUFBLE1BQUEsR0FBQTs7O0VBR0EsR0FBQSxTQUFBLFNBQUEsUUFBQTtNQUNBLGtCQUFBOzs7Ozs7QUNkQSxDQUFBLFlBQUE7O0NBRUE7O0NBRUEsUUFBQSxPQUFBOztFQUVBLE9BQUEsWUFBQSxXQUFBOztFQUVBLE9BQUEsV0FBQSxXQUFBLFFBQUE7R0FDQSxTQUFBLFVBQUE7R0FDQSxJQUFBLElBQUEsT0FBQTtHQUNBLE9BQUEsRUFBQSxPQUFBOzs7Ozs7O0NDWEEsQ0FBQSxXQUFBOztDQUVBO0NBQ0EsUUFBQSxPQUFBO1NBQ0EsVUFBQSxjQUFBLFdBQUE7T0FDQSxPQUFBO1dBQ0EsU0FBQTtXQUNBLE1BQUEsU0FBQSxRQUFBLFNBQUEsT0FBQSxXQUFBO2VBQ0EsVUFBQSxTQUFBLEtBQUEsU0FBQSxPQUFBO21CQUNBLE9BQUEsUUFBQSxNQUFBLGdCQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NDVEEsQ0FBQSxXQUFBOztDQUVBO0NBQ0EsUUFBQSxPQUFBOztHQUVBLE9BQUEsZUFBQSxXQUFBO0lBQ0EsT0FBQSxTQUFBLE9BQUEsT0FBQTtNQUNBLElBQUEsTUFBQTtNQUNBLElBQUEsUUFBQSxRQUFBLFFBQUE7UUFDQSxNQUFBLFFBQUEsU0FBQSxNQUFBO1VBQ0EsSUFBQSxjQUFBOztVQUVBLElBQUEsT0FBQSxPQUFBLEtBQUE7VUFDQSxLQUFBLElBQUEsSUFBQSxHQUFBLElBQUEsS0FBQSxRQUFBLEtBQUE7WUFDQSxJQUFBLE9BQUEsS0FBQTtZQUNBLElBQUEsT0FBQSxNQUFBLE1BQUE7WUFDQSxJQUFBLEtBQUEsTUFBQSxXQUFBLGNBQUEsUUFBQSxVQUFBLENBQUEsR0FBQTtjQUNBLGNBQUE7Y0FDQTs7OztVQUlBLElBQUEsYUFBQTtZQUNBLElBQUEsS0FBQTs7O2FBR0E7O1FBRUEsTUFBQTs7TUFFQSxPQUFBOzs7OztBQzlCQSxDQUFBLFlBQUE7O0VBRUE7O0VBRUEsUUFBQSxPQUFBO0tBQ0EsV0FBQSw4Q0FBQSxVQUFBLG1CQUFBO01BQ0EsSUFBQSxNQUFBOzs7OztNQUtBLEdBQUEsUUFBQSxTQUFBLFFBQUE7UUFDQTtRQUNBLGtCQUFBOzs7Ozs7TUFNQSxHQUFBLFVBQUEsU0FBQSxVQUFBO1FBQ0Esa0JBQUE7Ozs7QUNwQkEsQ0FBQSxVQUFBO0FBQ0E7O0FBRUEsUUFBQSxPQUFBO0dBQ0EsV0FBQSw4RkFBQSxTQUFBLFVBQUEsVUFBQSxRQUFBLE9BQUEsVUFBQSxRQUFBLElBQUE7SUFDQSxJQUFBLEtBQUE7SUFDQSxHQUFBLE1BQUE7SUFDQSxHQUFBLFlBQUE7SUFDQSxHQUFBLE9BQUE7SUFDQSxHQUFBLFFBQUE7SUFDQSxHQUFBLFdBQUE7SUFDQSxHQUFBLFlBQUE7SUFDQSxHQUFBLFdBQUE7SUFDQSxHQUFBLGVBQUE7SUFDQSxHQUFBLFdBQUE7SUFDQSxHQUFBLFNBQUEsU0FBQTtJQUNBLEdBQUEsZUFBQSxFQUFBLE1BQUE7O0lBRUEsR0FBQSxTQUFBLFFBQUEsVUFBQSxRQUFBO01BQ0EsT0FBQSxTQUFBLFFBQUEsVUFBQSxLQUFBO1FBQ0EsSUFBQSxFQUFBLFFBQUEsR0FBQSxXQUFBLElBQUEsVUFBQSxDQUFBLEdBQUE7VUFDQSxHQUFBLFVBQUEsS0FBQSxJQUFBOzs7Ozs7SUFNQSxPQUFBLFFBQUEsWUFBQTtNQUNBLE9BQUEsS0FBQSxJQUFBOztJQUVBLE9BQUE7O0lBRUEsT0FBQSxRQUFBLFlBQUE7TUFDQSxPQUFBLEtBQUE7OztJQUdBLE9BQUEsWUFBQSxZQUFBO01BQ0EsT0FBQSxVQUFBLE9BQUEsVUFBQSxPQUFBLElBQUE7OztJQUdBLE9BQUE7O0lBRUEsT0FBQSxVQUFBLElBQUEsS0FBQSxNQUFBLEdBQUE7O0lBRUEsT0FBQSxPQUFBLFVBQUEsUUFBQTtNQUNBLE9BQUEsT0FBQSxTQUFBOzs7SUFHQSxPQUFBLFVBQUEsVUFBQSxNQUFBLE9BQUEsS0FBQTtNQUNBLE9BQUEsS0FBQSxJQUFBLEtBQUEsTUFBQSxPQUFBOzs7SUFHQSxPQUFBLGNBQUE7TUFDQSxZQUFBO01BQ0EsYUFBQTs7SUFFQSxPQUFBLFVBQUEsQ0FBQSxjQUFBLGNBQUEsY0FBQTtJQUNBLE9BQUEsU0FBQSxPQUFBLFFBQUE7SUFDQSxPQUFBLFNBQUEsQ0FBQSxRQUFBO0lBQ0EsSUFBQSxXQUFBLElBQUE7SUFDQSxJQUFBLGdCQUFBLElBQUE7O0lBRUEsU0FBQSxRQUFBLFNBQUEsWUFBQTtJQUNBLGNBQUEsUUFBQSxTQUFBLFlBQUE7O0lBRUEsT0FBQSxTQUFBO01BQ0E7UUFDQSxNQUFBO1FBQ0EsUUFBQTs7TUFFQTtRQUNBLE1BQUE7UUFDQSxRQUFBOzs7O0lBSUEsT0FBQSxjQUFBLFVBQUEsTUFBQSxNQUFBO01BQ0EsSUFBQSxTQUFBLE9BQUE7UUFDQSxJQUFBLGFBQUEsSUFBQSxLQUFBLE1BQUEsU0FBQSxHQUFBLEdBQUEsR0FBQTs7UUFFQSxLQUFBLElBQUEsSUFBQSxHQUFBLElBQUEsT0FBQSxPQUFBLFFBQUEsS0FBQTtVQUNBLElBQUEsYUFBQSxJQUFBLEtBQUEsT0FBQSxPQUFBLEdBQUEsTUFBQSxTQUFBLEdBQUEsR0FBQSxHQUFBOztVQUVBLElBQUEsZUFBQSxZQUFBO1lBQ0EsT0FBQSxPQUFBLE9BQUEsR0FBQTs7OztNQUlBLE9BQUE7Ozs7Ozs7Q0N4RkEsQ0FBQSxXQUFBOztDQUVBO0NBQ0EsUUFBQSxPQUFBO0dBQ0EsV0FBQSxtQ0FBQSxVQUFBLE9BQUE7O0dBRUEsSUFBQSxLQUFBO0dBQ0EsR0FBQSxjQUFBLE1BQUE7Ozs7QUNQQSxDQUFBLFlBQUE7RUFDQTs7RUFFQSxRQUFBLE9BQUE7S0FDQSxXQUFBLHdGQUFBLFVBQUEsVUFBQSxVQUFBLFFBQUEsT0FBQSxVQUFBLFFBQUE7TUFDQSxJQUFBLEtBQUE7O01BRUEsR0FBQSxPQUFBO01BQ0EsR0FBQSxRQUFBO01BQ0EsR0FBQSxXQUFBO01BQ0EsR0FBQSxZQUFBO01BQ0EsR0FBQSxXQUFBO01BQ0EsR0FBQSxlQUFBO01BQ0EsR0FBQSxXQUFBOztNQUVBLEdBQUEsZUFBQSxFQUFBLE1BQUE7TUFDQSxHQUFBLFdBQUE7OztNQUdBLEdBQUEsWUFBQSxTQUFBLFVBQUEsTUFBQTtRQUNBO1FBQ0EsU0FBQSxVQUFBO1dBQ0EsS0FBQSxZQUFBO1lBQ0EsT0FBQSxHQUFBOzs7O01BSUEsR0FBQSxTQUFBLFFBQUEsVUFBQSxRQUFBO1FBQ0EsT0FBQSxTQUFBLFFBQUEsVUFBQSxLQUFBO1VBQ0EsSUFBQSxFQUFBLFFBQUEsR0FBQSxXQUFBLElBQUEsVUFBQSxDQUFBLEdBQUE7WUFDQSxHQUFBLFVBQUEsS0FBQSxJQUFBOzs7Ozs7TUFNQSxPQUFBLFFBQUEsWUFBQTtRQUNBLE9BQUEsS0FBQSxJQUFBOztNQUVBLE9BQUE7O01BRUEsT0FBQSxRQUFBLFlBQUE7UUFDQSxPQUFBLEtBQUE7OztNQUdBLE9BQUEsWUFBQSxZQUFBO1FBQ0EsT0FBQSxVQUFBLE9BQUEsVUFBQSxPQUFBLElBQUE7OztNQUdBLE9BQUE7O01BRUEsT0FBQSxVQUFBLElBQUEsS0FBQSxNQUFBLEdBQUE7O01BRUEsT0FBQSxPQUFBLFVBQUEsUUFBQTtRQUNBLE9BQUEsT0FBQSxTQUFBOzs7TUFHQSxPQUFBLFVBQUEsVUFBQSxNQUFBLE9BQUEsS0FBQTtRQUNBLE9BQUEsS0FBQSxJQUFBLEtBQUEsTUFBQSxPQUFBOzs7TUFHQSxPQUFBLGNBQUE7UUFDQSxZQUFBO1FBQ0EsYUFBQTs7TUFFQSxPQUFBLFVBQUEsQ0FBQSxjQUFBLGNBQUEsY0FBQTtNQUNBLE9BQUEsU0FBQSxPQUFBLFFBQUE7TUFDQSxPQUFBLFNBQUEsQ0FBQSxRQUFBO01BQ0EsSUFBQSxXQUFBLElBQUE7TUFDQSxJQUFBLGdCQUFBLElBQUE7O01BRUEsU0FBQSxRQUFBLFNBQUEsWUFBQTtNQUNBLGNBQUEsUUFBQSxTQUFBLFlBQUE7O01BRUEsT0FBQSxTQUFBO1FBQ0E7VUFDQSxNQUFBO1VBQ0EsUUFBQTs7UUFFQTtVQUNBLE1BQUE7VUFDQSxRQUFBOzs7O01BSUEsT0FBQSxjQUFBLFVBQUEsTUFBQSxNQUFBO1FBQ0EsSUFBQSxTQUFBLE9BQUE7VUFDQSxJQUFBLGFBQUEsSUFBQSxLQUFBLE1BQUEsU0FBQSxHQUFBLEdBQUEsR0FBQTs7VUFFQSxLQUFBLElBQUEsSUFBQSxHQUFBLElBQUEsT0FBQSxPQUFBLFFBQUEsS0FBQTtZQUNBLElBQUEsYUFBQSxJQUFBLEtBQUEsT0FBQSxPQUFBLEdBQUEsTUFBQSxTQUFBLEdBQUEsR0FBQSxHQUFBOztZQUVBLElBQUEsZUFBQSxZQUFBO2NBQ0EsT0FBQSxPQUFBLE9BQUEsR0FBQTs7OztRQUlBLE9BQUE7Ozs7O0FDakdBLENBQUEsWUFBQTtFQUNBOztFQUVBLFFBQUEsT0FBQTtLQUNBLFdBQUEsbURBQUEsVUFBQSxNQUFBLFFBQUEsS0FBQSxNQUFBO01BQ0EsSUFBQSxLQUFBO01BQ0EsR0FBQSxNQUFBOzs7O0FDTkEsQ0FBQSxZQUFBOztFQUVBOztFQUVBLFFBQUEsT0FBQTtLQUNBLFdBQUEseUJBQUEsWUFBQTtNQUNBLElBQUEsS0FBQTs7Ozs7QUNOQSxDQUFBLFVBQUE7SUFDQTs7SUFFQSxRQUFBLE9BQUE7U0FDQSxXQUFBLHVDQUFBLFVBQUEsT0FBQSxPQUFBO1lBQ0EsSUFBQSxLQUFBO1lBQ0EsR0FBQSxRQUFBO1lBQ0EsR0FBQSxRQUFBLFNBQUEsTUFBQSxNQUFBO2dCQUNBLE1BQUEsTUFBQTtxQkFDQSxLQUFBLFNBQUEsS0FBQTs7Ozs7d0JBS0EsSUFBQSxLQUFBLE9BQUE7NEJBQ0EsT0FBQSxHQUFBOzs0QkFFQTs0QkFDQSxPQUFBLEdBQUE7Ozs7Z0JBSUEsU0FBQSxJQUFBO29CQUNBLEdBQUEsY0FBQTs7Ozs7OztBQ3ZCQSxDQUFBLFlBQUE7O0VBRUE7O0VBRUEsUUFBQSxPQUFBO0tBQ0EsV0FBQSwyQ0FBQSxVQUFBLG1CQUFBO01BQ0EsSUFBQSxNQUFBOzs7OztNQUtBLEdBQUEsUUFBQSxTQUFBLFFBQUE7UUFDQSxrQkFBQTs7Ozs7O01BTUEsR0FBQSxVQUFBLFNBQUEsVUFBQTtRQUNBLGtCQUFBOzs7O0FDbkJBLENBQUEsWUFBQTs7RUFFQTs7RUFFQSxRQUFBLE9BQUE7S0FDQSxXQUFBLHVEQUFBLFVBQUEsbUJBQUEsUUFBQTtNQUNBLElBQUEsS0FBQTs7TUFFQSxHQUFBLE9BQUEsT0FBQSxPQUFBLFFBQUEsS0FBQSxPQUFBLFFBQUE7Ozs7O01BS0EsR0FBQSxLQUFBLFNBQUEsS0FBQTtRQUNBLGtCQUFBLE1BQUEsR0FBQTs7Ozs7O01BTUEsR0FBQSxTQUFBLFNBQUEsU0FBQTtRQUNBLGtCQUFBOzs7O0FDckJBLENBQUEsWUFBQTtFQUNBOztFQUVBLFFBQUEsT0FBQTtLQUNBLFdBQUEsK0NBQUEsVUFBQSxPQUFBLE9BQUEsT0FBQTtNQUNBLElBQUEsS0FBQTs7S0FFQSxHQUFBLFFBQUE7S0FDQSxHQUFBLE1BQUEsTUFBQTtNQUNBLEdBQUEsT0FBQSxNQUFBO01BQ0EsR0FBQSxTQUFBLE1BQUE7Ozs7TUFJQSxHQUFBLGdCQUFBLFNBQUEsY0FBQSxRQUFBO1FBQ0EsTUFBQSxLQUFBLHFCQUFBLGNBQUE7V0FDQSxLQUFBLFVBQUEsS0FBQTtZQUNBLE1BQUEsSUFBQTs7Ozs7O0FDakJBLENBQUEsWUFBQTs7RUFFQTs7RUFFQSxRQUFBLE9BQUE7S0FDQSxXQUFBLDZDQUFBLFVBQUEsbUJBQUE7TUFDQSxJQUFBLE1BQUE7Ozs7TUFJQSxHQUFBLFFBQUEsU0FBQSxRQUFBO1FBQ0Esa0JBQUE7Ozs7OztNQU1BLEdBQUEsVUFBQSxTQUFBLFVBQUE7UUFDQSxrQkFBQTs7Ozs7QUNsQkEsQ0FBQSxZQUFBOztFQUVBOztFQUVBLFFBQUEsT0FBQTtLQUNBLFdBQUEsK0NBQUEsVUFBQSxtQkFBQTtNQUNBLElBQUEsTUFBQTs7OztNQUlBLEdBQUEsUUFBQSxTQUFBLFFBQUE7UUFDQSxrQkFBQTs7Ozs7O01BTUEsR0FBQSxVQUFBLFNBQUEsVUFBQTtRQUNBLGtCQUFBOzs7OztBQ2xCQSxDQUFBLFlBQUE7RUFDQTs7RUFFQSxRQUFBLE9BQUE7S0FDQSxRQUFBLG1CQUFBLFVBQUEsT0FBQTtNQUNBLElBQUEsS0FBQTs7TUFFQSxHQUFBLE9BQUE7Ozs7Ozs7TUFPQSxHQUFBLE9BQUEsU0FBQSxLQUFBLE9BQUE7UUFDQSxPQUFBLEVBQUEsS0FBQSxHQUFBLE1BQUEsQ0FBQSxLQUFBOzs7Ozs7Ozs7TUFTQSxHQUFBLE1BQUEsU0FBQSxNQUFBO1FBQ0EsT0FBQSxNQUFBLElBQUE7V0FDQSxLQUFBLFVBQUEsS0FBQTtZQUNBLEdBQUEsS0FBQSxPQUFBOztZQUVBLElBQUEsS0FBQSxRQUFBLFVBQUEsS0FBQTtjQUNBLEdBQUEsS0FBQSxLQUFBOzs7WUFHQSxPQUFBLEdBQUE7Ozs7Ozs7Ozs7TUFVQSxHQUFBLE1BQUEsU0FBQSxJQUFBLE9BQUE7UUFDQTtRQUNBLE9BQUEsTUFBQSxPQUFBLFdBQUE7V0FDQSxLQUFBLFVBQUEsS0FBQTtZQUNBLEVBQUEsT0FBQSxHQUFBLE1BQUEsQ0FBQSxLQUFBO2FBQ0EsVUFBQSxLQUFBO1lBQ0EsUUFBQSxNQUFBOzs7Ozs7QUNqREEsQ0FBQSxVQUFBO0lBQ0E7O0lBRUEsUUFBQSxPQUFBO1NBQ0EsUUFBQSwyREFBQSxVQUFBLE9BQUEsUUFBQSxXQUFBLFdBQUE7WUFDQSxJQUFBLEtBQUE7WUFDQSxHQUFBLE9BQUE7WUFDQSxHQUFBLFdBQUE7WUFDQSxHQUFBLFlBQUE7Ozs7Ozs7OztZQVNBLEdBQUEsT0FBQSxTQUFBLEtBQUEsVUFBQTtnQkFDQSxPQUFBLEVBQUEsS0FBQSxHQUFBLFVBQUEsQ0FBQSxLQUFBOzs7Ozs7Ozs7OztZQVdBLEdBQUEsZUFBQSxTQUFBLGFBQUEsUUFBQSxXQUFBLFFBQUE7Y0FDQSxPQUFBLFdBQUE7Y0FDQSxPQUFBLFNBQUE7Z0JBQ0EsT0FBQSxNQUFBLEtBQUEsYUFBQTtxQkFDQSxLQUFBLFVBQUEsSUFBQTt3QkFDQSxHQUFBLFNBQUEsS0FBQSxJQUFBO3VCQUNBLFVBQUEsSUFBQTt3QkFDQSxRQUFBLElBQUE7Ozs7Ozs7Ozs7O1lBV0EsR0FBQSxNQUFBLFNBQUEsTUFBQTtnQkFDQSxPQUFBLE1BQUEsSUFBQTtxQkFDQSxLQUFBLFVBQUEsS0FBQTt3QkFDQSxHQUFBLFNBQUEsT0FBQTt3QkFDQSxJQUFBLEtBQUEsUUFBQSxVQUFBLFFBQUE7NEJBQ0EsR0FBQSxTQUFBLEtBQUE7O3dCQUVBLE9BQUEsR0FBQTs7Ozs7Ozs7OztZQVVBLEdBQUEsT0FBQSxTQUFBLEtBQUEsUUFBQTs7ZUFFQSxJQUFBLFFBQUEsV0FBQTtlQUNBLE1BQUEsU0FBQTtlQUNBLE9BQUEsVUFBQSxLQUFBO21CQUNBLFlBQUE7bUJBQ0EsY0FBQTttQkFDQSxhQUFBO21CQUNBLE9BQUE7a0JBQ0EsT0FBQSxLQUFBLEdBQUE7Ozs7Ozs7Ozs7WUFVQSxHQUFBLGFBQUEsU0FBQSxXQUFBLFFBQUE7ZUFDQSxPQUFBLE1BQUEsSUFBQSxlQUFBLE9BQUEsS0FBQTtvQkFDQSxLQUFBLFVBQUEsS0FBQTt1QkFDQSxJQUFBLFVBQUEsR0FBQSxLQUFBLE9BQUE7dUJBQ0EsRUFBQSxNQUFBLFNBQUE7c0JBQ0EsVUFBQSxLQUFBO3VCQUNBLFFBQUEsTUFBQTs7Ozs7WUFLQSxHQUFBLGVBQUEsU0FBQSxhQUFBLFVBQUE7ZUFDQSxJQUFBLFFBQUEsV0FBQTtlQUNBLE1BQUEsV0FBQTtlQUNBLE9BQUEsVUFBQSxLQUFBO21CQUNBLFlBQUE7bUJBQ0EsY0FBQTttQkFDQSxhQUFBO21CQUNBLE9BQUE7a0JBQ0EsT0FBQSxLQUFBLEdBQUE7OztZQUdBLEdBQUEsVUFBQSxTQUFBLFFBQUEsU0FBQTtjQUNBLE9BQUEsTUFBQSxJQUFBLGdCQUFBLFNBQUEsS0FBQTtpQkFDQSxLQUFBLFNBQUEsSUFBQTs7bUJBRUEsU0FBQSxJQUFBO2tCQUNBLFFBQUEsTUFBQTs7Ozs7Ozs7O1lBU0EsR0FBQSxjQUFBLFNBQUEsWUFBQSxRQUFBLFdBQUE7Y0FDQSxPQUFBLE1BQUEsT0FBQSxnQkFBQTtlQUNBLEtBQUEsU0FBQSxJQUFBO2dCQUNBLEVBQUEsT0FBQSxPQUFBLFVBQUEsQ0FBQSxLQUFBOzs7WUFHQSxHQUFBLHNCQUFBLFNBQUEsT0FBQTtjQUNBLEdBQUEsZUFBQSxLQUFBLFNBQUEsU0FBQTtnQkFDQSxTQUFBLFNBQUEsT0FBQTtnQkFDQSxHQUFBLGFBQUE7bUJBQ0EsS0FBQSxTQUFBLFNBQUE7b0JBQ0EsT0FBQSxTQUFBLEtBQUE7Ozs7OztZQU1BLEdBQUEsZUFBQSxVQUFBO2NBQ0EsT0FBQSxVQUFBLEtBQUE7Z0JBQ0EsWUFBQTtnQkFDQSxjQUFBO2dCQUNBLGFBQUE7aUJBQ0E7Ozs7Ozs7OztZQVNBLEdBQUEsZUFBQSxTQUFBLGFBQUEsU0FBQTtjQUNBLE9BQUEsTUFBQSxLQUFBLGNBQUE7ZUFDQSxLQUFBLFNBQUEsSUFBQTtnQkFDQSxPQUFBLElBQUE7Ozs7OztVQU1BLEdBQUEsb0JBQUEsU0FBQSxPQUFBO1lBQ0EsR0FBQSxlQUFBLEtBQUEsU0FBQSxPQUFBO2NBQ0EsT0FBQSxTQUFBLE9BQUE7Y0FDQSxHQUFBLFdBQUE7aUJBQ0EsS0FBQSxTQUFBLE9BQUE7a0JBQ0EsT0FBQSxPQUFBLEtBQUE7Ozs7O1VBS0EsR0FBQSxhQUFBLFNBQUEsV0FBQSxPQUFBO1lBQ0EsT0FBQSxNQUFBLEtBQUEsWUFBQTthQUNBLEtBQUEsU0FBQSxJQUFBO1lBQ0EsT0FBQSxJQUFBOzs7O1VBSUEsR0FBQSxlQUFBLFNBQUEsYUFBQTtZQUNBLE9BQUEsVUFBQSxLQUFBO2NBQ0EsWUFBQTtjQUNBLGNBQUE7Y0FDQSxhQUFBO2VBQ0E7OztZQUdBLEdBQUEsZUFBQSxTQUFBLGFBQUEsUUFBQTtlQUNBLElBQUEsUUFBQSxXQUFBO2VBQ0EsTUFBQSxTQUFBO2VBQ0EsT0FBQSxVQUFBLEtBQUE7bUJBQ0EsWUFBQTttQkFDQSxjQUFBO21CQUNBLGFBQUE7bUJBQ0EsT0FBQTtrQkFDQSxPQUFBLEtBQUEsR0FBQTs7Ozs7OztZQU9BLEdBQUEsVUFBQSxTQUFBLFFBQUEsUUFBQTtlQUNBLE9BQUEsTUFBQSxJQUFBLGNBQUEsT0FBQSxLQUFBO29CQUNBLEtBQUEsVUFBQSxLQUFBO3NCQUNBLFVBQUEsS0FBQTt1QkFDQSxRQUFBLE1BQUE7Ozs7WUFJQSxHQUFBLFlBQUEsU0FBQSxVQUFBLFFBQUEsU0FBQTtjQUNBLE9BQUEsTUFBQSxPQUFBLGNBQUE7ZUFDQSxLQUFBLFNBQUEsSUFBQTtnQkFDQSxFQUFBLE9BQUEsT0FBQSxRQUFBLENBQUEsS0FBQTs7Ozs7Ozs7Ozs7Ozs7WUFjQSxHQUFBLE1BQUEsU0FBQSxJQUFBLFVBQUE7Z0JBQ0EsT0FBQSxNQUFBLE9BQUEsZUFBQTtxQkFDQSxLQUFBLFVBQUEsS0FBQTt3QkFDQSxFQUFBLE9BQUEsR0FBQSxVQUFBLENBQUEsS0FBQTs7Ozs7OztBQ25PQSxDQUFBLFlBQUE7RUFDQTs7RUFFQSxRQUFBLE9BQUE7S0FDQSxRQUFBLGdDQUFBLFVBQUEsT0FBQSxRQUFBO01BQ0EsSUFBQSxLQUFBOzs7Ozs7O01BT0EsR0FBQSxRQUFBO01BQ0EsR0FBQSxXQUFBO01BQ0EsR0FBQSxPQUFBO01BQ0EsR0FBQSxRQUFBOzs7Ozs7OztNQVFBLEdBQUEsWUFBQSxTQUFBLFVBQUEsS0FBQTtRQUNBLE9BQUEsTUFBQSxLQUFBLFNBQUE7V0FDQSxLQUFBLFVBQUEsS0FBQTtZQUNBLEdBQUEsS0FBQSxLQUFBLElBQUE7WUFDQSxPQUFBLElBQUE7YUFDQSxVQUFBLEtBQUE7WUFDQSxRQUFBLE1BQUE7Ozs7O01BS0EsR0FBQSxVQUFBLFNBQUEsUUFBQSxJQUFBO1FBQ0EsT0FBQSxNQUFBLElBQUEsV0FBQSxJQUFBLEtBQUE7YUFDQSxLQUFBLFVBQUEsS0FBQTtnQkFDQSxJQUFBLE9BQUEsR0FBQSxLQUFBLElBQUE7Z0JBQ0EsRUFBQSxNQUFBLE1BQUE7ZUFDQSxVQUFBLEtBQUE7Z0JBQ0EsUUFBQSxNQUFBO2VBQ0EsS0FBQSxZQUFBO2NBQ0EsT0FBQSxHQUFBOzs7Ozs7Ozs7Ozs7TUFZQSxHQUFBLE9BQUEsU0FBQSxLQUFBLFFBQUE7UUFDQSxPQUFBLEVBQUEsS0FBQSxHQUFBLE9BQUEsQ0FBQSxLQUFBOzs7Ozs7Ozs7Ozs7O01BYUEsR0FBQSxNQUFBLFNBQUEsTUFBQTtRQUNBLE9BQUEsTUFBQSxJQUFBO1dBQ0EsS0FBQSxVQUFBLEtBQUE7WUFDQSxHQUFBLE1BQUEsT0FBQTs7WUFFQSxJQUFBLEtBQUEsUUFBQSxVQUFBLE1BQUE7Y0FDQSxHQUFBLE1BQUEsS0FBQTs7O1lBR0EsT0FBQSxHQUFBOzs7Ozs7Ozs7O01BVUEsR0FBQSxNQUFBLFNBQUEsTUFBQTtRQUNBLE9BQUEsTUFBQSxJQUFBO1dBQ0EsS0FBQSxVQUFBLEtBQUE7WUFDQSxHQUFBLFNBQUEsT0FBQTs7WUFFQSxJQUFBLEtBQUEsUUFBQSxVQUFBLFFBQUE7Y0FDQSxHQUFBLFNBQUEsS0FBQTs7WUFFQSxPQUFBLEdBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvRkEsQ0FBQSxZQUFBO0VBQ0E7O0VBRUEsUUFBQSxPQUFBO0tBQ0EsUUFBQSw0QkFBQSxVQUFBLE9BQUEsUUFBQTtNQUNBLElBQUEsS0FBQTs7TUFFQSxHQUFBLE9BQUE7O01BRUEsR0FBQSxPQUFBLFNBQUEsS0FBQSxPQUFBO1FBQ0EsT0FBQSxFQUFBLEtBQUEsR0FBQSxNQUFBLENBQUEsS0FBQTs7Ozs7Ozs7O01BU0EsR0FBQSxNQUFBLFNBQUEsTUFBQTtRQUNBLE9BQUEsTUFBQSxJQUFBO1dBQ0EsS0FBQSxVQUFBLEtBQUE7WUFDQSxHQUFBLEtBQUEsT0FBQTs7WUFFQSxJQUFBLEtBQUEsUUFBQSxVQUFBLEtBQUE7Y0FDQSxHQUFBLEtBQUEsS0FBQTs7O1lBR0EsT0FBQSxHQUFBOzs7Ozs7Ozs7O01BVUEsR0FBQSxNQUFBLFNBQUEsSUFBQSxTQUFBOztRQUVBLElBQUEsT0FBQTtVQUNBLFVBQUEsUUFBQTs7O1FBR0EsT0FBQSxNQUFBLElBQUEsV0FBQSxRQUFBLEtBQUE7V0FDQSxLQUFBLFVBQUEsS0FBQTs7WUFFQSxJQUFBLElBQUEsR0FBQSxLQUFBLFFBQUE7WUFDQSxFQUFBLE1BQUEsR0FBQTs7YUFFQSxVQUFBLEtBQUE7Ozs7Ozs7OztBQ2xEQSxDQUFBLFVBQUE7SUFDQTs7SUFFQSxRQUFBLE9BQUE7U0FDQSxTQUFBLFdBQUEsVUFBQTtXQUNBLElBQUEsS0FBQTtlQUNBLFNBQUE7ZUFDQSxZQUFBOzs7Ozs7Ozs7O1lBVUEsR0FBQSxZQUFBLFNBQUEsVUFBQSxTQUFBLFlBQUE7Z0JBQ0EsSUFBQSxDQUFBLFNBQUE7Z0JBQ0EsU0FBQTs7Z0JBRUEsSUFBQSxZQUFBLFlBQUE7Ozs7Ozs7OztZQVNBLFNBQUEsT0FBQSxLQUFBO2dCQUNBLE9BQUEsU0FBQSxTQUFBLFlBQUEsTUFBQTs7Ozs7Ozs7O1lBU0EsR0FBQSxPQUFBLFNBQUEsT0FBQTtnQkFDQSxPQUFBOzs7Ozs7O29CQU9BLEtBQUEsU0FBQSxJQUFBLEtBQUEsS0FBQTt3QkFDQSxhQUFBLFFBQUEsT0FBQSxNQUFBLEtBQUEsVUFBQTs7Ozs7Ozs7Ozs7O29CQVlBLEtBQUEsU0FBQSxJQUFBLEtBQUEsV0FBQTt3QkFDQSxZQUFBLFFBQUEsV0FBQSxhQUFBLFlBQUEsUUFBQTt3QkFDQSxPQUFBLFVBQUEsS0FBQSxNQUFBLGFBQUEsUUFBQSxPQUFBOzs7Ozs7OztvQkFRQSxRQUFBLFNBQUEsT0FBQSxLQUFBO3dCQUNBLGFBQUEsV0FBQSxPQUFBOzs7Ozs7O0FDeEVBLENBQUEsWUFBQTs7RUFFQTs7RUFFQSxRQUFBLE9BQUE7S0FDQSxRQUFBLHFDQUFBLFVBQUEsV0FBQSxZQUFBO01BQ0EsS0FBQSxPQUFBLFNBQUEsS0FBQSxZQUFBLGNBQUEsVUFBQSxPQUFBLE1BQUE7UUFDQSxJQUFBLFNBQUEsV0FBQTtRQUNBLEVBQUEsTUFBQSxRQUFBLFNBQUE7O1FBRUEsT0FBQSxVQUFBLEtBQUE7VUFDQSxhQUFBO1VBQ0EsWUFBQTtVQUNBLGNBQUE7VUFDQSxPQUFBO1VBQ0EsTUFBQSxRQUFBO1dBQ0E7Ozs7QUNoQkEsQ0FBQSxZQUFBO0VBQ0E7O0VBRUEsUUFBQSxPQUFBO0tBQ0EsUUFBQSx3REFBQSxVQUFBLE9BQUEsUUFBQSxXQUFBLFlBQUE7TUFDQSxJQUFBLEtBQUE7Ozs7Ozs7TUFPQSxHQUFBLFFBQUE7Ozs7Ozs7O01BUUEsR0FBQSxhQUFBLFNBQUEsV0FBQSxNQUFBO1FBQ0EsT0FBQSxNQUFBLEtBQUEsVUFBQTtXQUNBLEtBQUEsVUFBQSxLQUFBO1lBQ0EsR0FBQSxNQUFBLEtBQUEsSUFBQTthQUNBLFVBQUEsS0FBQTtZQUNBLFFBQUEsTUFBQTs7Ozs7Ozs7OztNQVVBLEdBQUEsV0FBQSxTQUFBLFNBQUEsTUFBQTtRQUNBLE9BQUEsTUFBQSxJQUFBLFlBQUEsS0FBQSxLQUFBO1dBQ0EsS0FBQSxVQUFBLEtBQUE7WUFDQSxJQUFBLFFBQUEsR0FBQSxLQUFBLEtBQUE7WUFDQSxFQUFBLE1BQUEsT0FBQTthQUNBLFVBQUEsS0FBQTtZQUNBLFFBQUEsTUFBQTs7Ozs7Ozs7O01BU0EsR0FBQSxNQUFBLFNBQUEsTUFBQTtRQUNBLE9BQUEsVUFBQSxLQUFBO1VBQ0EsWUFBQTtVQUNBLGNBQUE7VUFDQSxhQUFBO1dBQ0EsT0FBQSxLQUFBLEdBQUE7OztNQUdBLEdBQUEsT0FBQSxTQUFBLEtBQUEsTUFBQTtRQUNBLElBQUEsUUFBQSxXQUFBO1FBQ0EsTUFBQSxPQUFBOztRQUVBLE9BQUEsVUFBQSxLQUFBO1VBQ0EsWUFBQTtVQUNBLGNBQUE7VUFDQSxhQUFBO1VBQ0EsT0FBQTtXQUNBLE9BQUEsS0FBQSxHQUFBOzs7Ozs7Ozs7TUFTQSxHQUFBLE9BQUEsU0FBQSxLQUFBLFFBQUE7UUFDQSxPQUFBLEVBQUEsS0FBQSxHQUFBLE9BQUEsQ0FBQSxLQUFBOzs7Ozs7Ozs7TUFTQSxHQUFBLE1BQUEsU0FBQSxNQUFBO1FBQ0EsT0FBQSxNQUFBLElBQUE7V0FDQSxLQUFBLFVBQUEsS0FBQTtZQUNBLEdBQUEsTUFBQSxPQUFBOztZQUVBLElBQUEsS0FBQSxRQUFBLFVBQUEsTUFBQTtjQUNBLEdBQUEsTUFBQSxLQUFBOzs7WUFHQSxPQUFBLEdBQUE7Ozs7Ozs7Ozs7TUFVQSxHQUFBLE1BQUEsU0FBQSxJQUFBLFVBQUE7UUFDQSxJQUFBLE9BQUE7VUFDQSxPQUFBLFNBQUE7VUFDQSxNQUFBLFNBQUEsS0FBQTs7O1FBR0EsT0FBQSxNQUFBLElBQUEsWUFBQSxTQUFBLEtBQUE7V0FDQSxLQUFBLFVBQUEsS0FBQTs7WUFFQSxJQUFBLElBQUEsR0FBQSxLQUFBLFNBQUE7WUFDQSxFQUFBLE1BQUEsR0FBQTtZQUNBLE9BQUEsR0FBQSxlQUFBLENBQUEsUUFBQSxTQUFBO2FBQ0EsVUFBQSxLQUFBOzs7Ozs7Ozs7O01BVUEsR0FBQSxNQUFBLFNBQUEsSUFBQSxRQUFBO1FBQ0EsT0FBQSxNQUFBLE9BQUEsWUFBQTtXQUNBLEtBQUEsVUFBQSxLQUFBO1lBQ0EsRUFBQSxPQUFBLEdBQUEsT0FBQSxDQUFBLEtBQUE7Ozs7O0FDbElBLENBQUEsWUFBQTtFQUNBOztFQUVBLFFBQUEsT0FBQTtLQUNBLFFBQUEsbUVBQUEsVUFBQSxPQUFBLFFBQUEsV0FBQSxZQUFBLFNBQUE7TUFDQSxJQUFBLEtBQUE7TUFDQSxHQUFBLGNBQUE7TUFDQSxHQUFBLG1CQUFBOzs7Ozs7O01BT0EsR0FBQSxRQUFBOzs7Ozs7OztNQVFBLEdBQUEsYUFBQSxTQUFBLFdBQUEsTUFBQTtRQUNBLE9BQUEsTUFBQSxLQUFBLFVBQUE7V0FDQSxLQUFBLFVBQUEsS0FBQTtZQUNBLEdBQUEsTUFBQSxLQUFBLElBQUE7YUFDQSxVQUFBLEtBQUE7WUFDQSxRQUFBLE1BQUE7Ozs7Ozs7Ozs7TUFVQSxHQUFBLFdBQUEsU0FBQSxTQUFBLE1BQUE7UUFDQSxPQUFBLE1BQUEsSUFBQSxZQUFBLEtBQUEsS0FBQTtXQUNBLEtBQUEsVUFBQSxLQUFBO1lBQ0EsSUFBQSxRQUFBLEdBQUEsS0FBQSxLQUFBO1lBQ0EsRUFBQSxNQUFBLE9BQUE7YUFDQSxVQUFBLEtBQUE7WUFDQSxRQUFBLE1BQUE7Ozs7Ozs7OztNQVNBLEdBQUEsT0FBQSxTQUFBLEtBQUEsTUFBQTtRQUNBLElBQUEsUUFBQSxXQUFBO1FBQ0EsTUFBQSxPQUFBOztRQUVBLE9BQUEsVUFBQSxLQUFBO1VBQ0EsWUFBQTtVQUNBLGNBQUE7VUFDQSxhQUFBO1VBQ0EsT0FBQTtXQUNBLE9BQUEsS0FBQSxHQUFBOzs7Ozs7OztNQVFBLEdBQUEsTUFBQSxTQUFBLE1BQUE7UUFDQSxPQUFBLFVBQUEsS0FBQTtVQUNBLFlBQUE7VUFDQSxjQUFBO1VBQ0EsYUFBQTtXQUNBLE9BQUEsS0FBQSxHQUFBOzs7Ozs7Ozs7TUFTQSxHQUFBLE9BQUEsU0FBQSxLQUFBLFFBQUE7UUFDQSxPQUFBLEVBQUEsS0FBQSxHQUFBLE9BQUEsQ0FBQSxLQUFBOzs7Ozs7Ozs7TUFTQSxHQUFBLE1BQUEsU0FBQSxNQUFBO1FBQ0EsT0FBQSxNQUFBLElBQUE7V0FDQSxLQUFBLFVBQUEsS0FBQTtZQUNBLEdBQUEsTUFBQSxPQUFBOztZQUVBLElBQUEsS0FBQSxRQUFBLFVBQUEsTUFBQTtjQUNBLEdBQUEsTUFBQSxLQUFBOzs7WUFHQSxPQUFBLEdBQUE7Ozs7Ozs7Ozs7TUFVQSxHQUFBLE1BQUEsU0FBQSxJQUFBLFFBQUE7UUFDQSxPQUFBLE1BQUEsT0FBQSxZQUFBO1dBQ0EsS0FBQSxVQUFBLEtBQUE7WUFDQSxFQUFBLE9BQUEsR0FBQSxPQUFBLENBQUEsS0FBQTs7Ozs7Ozs7O01BU0EsR0FBQSxRQUFBLFNBQUEsTUFBQSxPQUFBO1FBQ0EsT0FBQSxNQUFBLEtBQUEsVUFBQTtXQUNBLEtBQUEsVUFBQSxLQUFBO1lBQ0EsR0FBQSxjQUFBLElBQUEsS0FBQTtZQUNBLEdBQUEsbUJBQUEsSUFBQSxLQUFBO1lBQ0EsV0FBQSxjQUFBLEdBQUE7WUFDQSxRQUFBLElBQUEsU0FBQSxJQUFBLEtBQUE7WUFDQSxRQUFBLElBQUEsZUFBQSxJQUFBLEtBQUE7WUFDQSxPQUFBLEdBQUE7Ozs7Ozs7O01BUUEsR0FBQSxhQUFBLFNBQUEsYUFBQTtRQUNBLE9BQUEsQ0FBQSxDQUFBLEdBQUE7Ozs7Ozs7TUFPQSxHQUFBLGVBQUEsU0FBQSxlQUFBO1FBQ0EsR0FBQSxjQUFBLFFBQUEsSUFBQTtRQUNBLEdBQUEsbUJBQUEsUUFBQSxJQUFBO1FBQ0EsV0FBQSxjQUFBLEdBQUE7Ozs7OztNQU1BLEdBQUEsU0FBQSxTQUFBLFNBQUE7UUFDQSxHQUFBLGNBQUE7UUFDQSxHQUFBLG1CQUFBO1FBQ0EsV0FBQSxjQUFBO1FBQ0EsUUFBQSxPQUFBO1FBQ0EsUUFBQSxPQUFBO1FBQ0EsT0FBQSxHQUFBOzs7OztBQ25LQSxDQUFBLFlBQUE7O0VBRUE7O0VBRUEsUUFBQSxPQUFBO0tBQ0EsV0FBQSwyQ0FBQSxVQUFBLG1CQUFBO01BQ0EsSUFBQSxNQUFBOzs7OztNQUtBLEdBQUEsUUFBQSxTQUFBLFFBQUE7UUFDQSxrQkFBQTs7Ozs7O01BTUEsR0FBQSxVQUFBLFNBQUEsVUFBQTtRQUNBLGtCQUFBOzs7O0FDbkJBLENBQUEsWUFBQTs7RUFFQTs7RUFFQSxRQUFBLE9BQUE7S0FDQSxXQUFBLHVEQUFBLFVBQUEsbUJBQUEsUUFBQTtNQUNBLElBQUEsS0FBQTs7TUFFQSxHQUFBLE9BQUEsT0FBQSxPQUFBLFFBQUEsS0FBQSxPQUFBLFFBQUE7Ozs7O01BS0EsR0FBQSxLQUFBLFNBQUEsS0FBQTtRQUNBLGtCQUFBLE1BQUEsR0FBQTs7Ozs7O01BTUEsR0FBQSxTQUFBLFNBQUEsU0FBQTtRQUNBLGtCQUFBOzs7O0FDckJBLENBQUEsWUFBQTtFQUNBOztFQUVBLFFBQUEsT0FBQTtLQUNBLFdBQUEsK0NBQUEsVUFBQSxPQUFBLE9BQUEsT0FBQTtNQUNBLElBQUEsS0FBQTs7TUFFQSxHQUFBLFFBQUE7TUFDQSxHQUFBLGNBQUEsTUFBQTtNQUNBLEdBQUEsTUFBQSxNQUFBO01BQ0EsR0FBQSxPQUFBLE1BQUE7TUFDQSxHQUFBLFNBQUEsTUFBQTtNQUNBLEdBQUEsU0FBQSxNQUFBOzs7OztNQUtBLEdBQUEsZ0JBQUEsU0FBQSxjQUFBLFFBQUE7UUFDQSxNQUFBLEtBQUEscUJBQUEsY0FBQTtXQUNBLEtBQUEsVUFBQSxLQUFBO1lBQ0EsTUFBQSxJQUFBOzs7OztLQUtBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiAoKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnYXBwJywgWyd1aS5yb3V0ZXInLCAnYXBwLnVpJywgJ3VpLmJvb3RzdHJhcCcsICd1aS5zZWxlY3QnLCAnbmdTYW5pdGl6ZSddKVxuICAgIC5jb25maWcoZnVuY3Rpb24gKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIsICRodHRwUHJvdmlkZXIpIHtcblxuICAgICAgLyoqXG4gICAgICAgKiBEZWZhdWx0IHJvdXRlXG4gICAgICAgKi9cbiAgICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy9sb2dpbicpO1xuXG4gICAgICAvKipcbiAgICAgICAqIERlZmluZSBvdXIgc3RhdGVzXG4gICAgICAgKi9cblxuICAgICAgJHN0YXRlUHJvdmlkZXJcbiAgICAgICAgLnN0YXRlKCdsb2dpbicsIHtcbiAgICAgICAgICB1cmw6ICcvbG9naW4nLFxuICAgICAgICAgIHRlbXBsYXRlVXJsOiAncGFydGlhbHMvbG9naW4vaW5kZXguaHRtbCcsXG4gICAgICAgICAgY29udHJvbGxlcjogJ0xvZ2luQ29udHJvbGxlcicsXG4gICAgICAgICAgY29udHJvbGxlckFzOiAnbG9naW5Db250cm9sbGVyJ1xuICAgICAgICB9KVxuICAgICAgICAuc3RhdGUoJ2FkbWluJywge1xuICAgICAgICAgIHVybDogJy9hZG1pbicsXG4gICAgICAgICAgdGVtcGxhdGVVcmw6ICdwYXJ0aWFscy9hZG1pbi9hZG1pbi5odG1sJyxcbiAgICAgICAgICBjb250cm9sbGVyOiAnRGFzaGJvYXJkQ29udHJvbGxlcicsXG4gICAgICAgICAgY29udHJvbGxlckFzOiAnZGFzaGJvYXJkQ29udHJvbGxlcicsXG4gICAgICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgICAgam9iczogZnVuY3Rpb24gKEFkbWluKSB7XG4gICAgICAgICAgICAgIHJldHVybiBBZG1pbi5nZXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIHJlcXVpcmVzTG9naW46IHRydWUsXG4gICAgICAgICAgICBib2R5Q2xhc3M6ICdkYXNoYm9hcmQnXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuc3RhdGUoJ2FkbWluLmpvYnMnLCB7XG4gICAgICAgICAgdXJsOiAnL2pvYnMnLFxuICAgICAgICAgIHRlbXBsYXRlVXJsOiAncGFydGlhbHMvYWRtaW4vam9icy1saXN0Lmh0bWwnLFxuICAgICAgICAgIGNvbnRyb2xsZXI6ICdBZG1pbkNvbnRyb2xsZXInLFxuICAgICAgICAgIGNvbnRyb2xsZXJBczogJ2FkbWluQ29udHJvbGxlcicsXG4gICAgICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgICAgam9iczogZnVuY3Rpb24gKEFkbWluKSB7XG4gICAgICAgICAgICAgIHJldHVybiBBZG1pbi5nZXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIHJlcXVpcmVzTG9naW46IHRydWUsXG4gICAgICAgICAgICBib2R5Q2xhc3M6ICdkYXNoYm9hcmQnLFxuICAgICAgICAgICAgaGVhZGluZzogJ0pvYnMgTGlzdCdcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5zdGF0ZSgnYWRtaW4uam9icy5qb2ItZGV0YWlsJywge1xuICAgICAgICAgIHVybDogJy86am9iSWQnLFxuICAgICAgICAgIHRlbXBsYXRlVXJsOiAncGFydGlhbHMvZm9yZW1hbnMvam9iLWRldGFpbC5odG1sJyxcbiAgICAgICAgICBjb250cm9sbGVyOiAnSm9iQ29udHJvbGxlcicsXG4gICAgICAgICAgY29udHJvbGxlckFzOiAnam9iQ29udHJvbGxlcicsXG4gICAgICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgICAgam9iOiBmdW5jdGlvbiAoQWRtaW4sICRzdGF0ZVBhcmFtcywgam9icykge1xuICAgICAgICAgICAgICByZXR1cm4gQWRtaW4uZmluZCgkc3RhdGVQYXJhbXMuam9iSWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgcmVxdWlyZXNMb2dpbjogdHJ1ZSxcbiAgICAgICAgICAgIGJvZHlDbGFzczogJ2Rhc2hib2FyZCcsXG4gICAgICAgICAgICBoZWFkaW5nOiAnSm9icyBMaXN0ID4+IEpvYiBEZXRhaWxzJ1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLnN0YXRlKCdhZG1pbi5wZW5kaW5nJywge1xuICAgICAgICAgIHVybDogJy9wZW5kaW5nJyxcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3BhcnRpYWxzL2FkbWluL3BlbmRpbmcuaHRtbCcsXG4gICAgICAgICAgY29udHJvbGxlcjogJ1BlbmRpbmdKb2JzQ29udHJvbGxlcicsXG4gICAgICAgICAgY29udHJvbGxlckFzOiAncGVuZGluZ0pvYnMnLFxuICAgICAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgICAgIGpvYnM6IGZ1bmN0aW9uIChBZG1pbikge1xuICAgICAgICAgICAgICByZXR1cm4gQWRtaW4uZ2V0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICByZXF1aXJlc0xvZ2luOiB0cnVlLFxuICAgICAgICAgICAgYm9keUNsYXNzOiAncGVuZGluZycsXG4gICAgICAgICAgICBoZWFkaW5nOiAnSm9icyBQZW5kaW5nIEFwcHJvdmFsJ1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLnN0YXRlKCdhZG1pbi5yZXBvcnQtam9iJywge1xuICAgICAgICAgIHVybDogJy9yZXBvcnQtam9iJyxcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3BhcnRpYWxzL2FkbWluL3JlcG9ydC1qb2IuaHRtbCcsXG4gICAgICAgICAgY29udHJvbGxlcjogJ1JlcG9ydEpvYkNvbnRyb2xsZXInLFxuICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3JlcG9ydEpvYicsXG4gICAgICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgICAgdGFza3M6IGZ1bmN0aW9uIChUYXNrcykge1xuICAgICAgICAgICAgICByZXR1cm4gVGFza3MuZ2V0KCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW50aXRpZXM6IGZ1bmN0aW9uIChFbnRpdGllcykge1xuICAgICAgICAgICAgICByZXR1cm4gRW50aXRpZXMuZ2V0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICByZXF1aXJlc0xvZ2luOiB0cnVlLFxuICAgICAgICAgICAgYm9keUNsYXNzOiAncmVwb3J0LWpvYicsXG4gICAgICAgICAgICBoZWFkaW5nOiAnUmVwb3J0IGEgSm9iJ1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLnN0YXRlKCdzZXR0aW5ncycsIHtcbiAgICAgICAgICB1cmw6ICcvc2V0dGluZ3MnLFxuICAgICAgICAgIHRlbXBsYXRlVXJsOiAncGFydGlhbHMvYWRtaW4vc2V0dGluZ3MuaHRtbCcsXG4gICAgICAgICAgY29udHJvbGxlcjogJ1NldHRpbmdzQ29udHJvbGxlcicsXG4gICAgICAgICAgY29udHJvbGxlckFzOiAnc2V0dGluZ3MnLFxuICAgICAgICAgIHJlc29sdmU6IHt9LFxuICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIHJlcXVpcmVzTG9naW46IHRydWUsXG4gICAgICAgICAgICBib2R5Q2xhc3M6ICdzZXR0aW5ncydcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5zdGF0ZSgnc2V0dGluZ3MudXNlcnMnLCB7XG4gICAgICAgICAgdXJsOiAnL3VzZXJzJyxcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3BhcnRpYWxzL3VzZXJzL3VzZXJzLmh0bWwnLFxuICAgICAgICAgIGNvbnRyb2xsZXI6ICdVc2Vyc0NvbnRyb2xsZXInLFxuICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3VzZXJzQ29udHJvbGxlcicsXG4gICAgICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgICAgdXNlcnM6IGZ1bmN0aW9uIChVc2Vycykge1xuICAgICAgICAgICAgICAvL1JFVFVSTlMgQSBQUk9NSVNFLCBDT05UUk9MTEVSIElTIENBTExFRCBXSEVOIFBST01JU0UgSVMgUkVTT0xWRURcbiAgICAgICAgICAgICAgcmV0dXJuIFVzZXJzLmdldCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgcmVxdWlyZXNMb2dpbjogdHJ1ZSxcbiAgICAgICAgICAgIGJvZHlDbGFzczogJ3NldHRpbmdzJyxcbiAgICAgICAgICAgIGhlYWRpbmc6ICdTdGFmZidcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5zdGF0ZSgnc2V0dGluZ3MuZW50aXRpZXMnLCB7XG4gICAgICAgICAgdXJsOiAnL2VudGl0aWVzJyxcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3BhcnRpYWxzL2VudGl0aWVzL2VudGl0aWVzLmh0bWwnLFxuICAgICAgICAgIGNvbnRyb2xsZXI6ICdFbnRpdGllc0NvbnRyb2xsZXInLFxuICAgICAgICAgIGNvbnRyb2xsZXJBczogJ2VudGl0aWVzQ29udHJvbGxlcicsXG4gICAgICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgICAgZW50aXRpZXM6IGZ1bmN0aW9uIChFbnRpdGllcykge1xuICAgICAgICAgICAgICByZXR1cm4gRW50aXRpZXMuZ2V0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICByZXF1aXJlc0xvZ2luOiB0cnVlLFxuICAgICAgICAgICAgYm9keUNsYXNzOiAnc2V0dGluZ3MnLFxuICAgICAgICAgICAgaGVhZGluZzogJ0FmZmlsaWF0ZWQgQ29tcGFuaWVzJ1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLnN0YXRlKCdzZXR0aW5ncy5lbnRpdGllcy5lZGl0LWVudGl0eScsIHtcbiAgICAgICAgICB1cmw6ICcvOmVudGl0eUlkJyxcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3BhcnRpYWxzL2VudGl0aWVzL2VkaXQtZW50aXR5Lmh0bWwnLFxuICAgICAgICAgIGNvbnRyb2xsZXI6ICdFbnRpdHlDb250cm9sbGVyJyxcbiAgICAgICAgICBjb250cm9sbGVyQXM6ICdlbnRpdHlDb250cm9sbGVyJyxcbiAgICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICBlbnRpdHk6IGZ1bmN0aW9uIChFbnRpdGllcywgJHN0YXRlUGFyYW1zLCBlbnRpdGllcykge1xuICAgICAgICAgICAgICByZXR1cm4gRW50aXRpZXMuZmluZCgkc3RhdGVQYXJhbXMuZW50aXR5SWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgcmVxdWlyZXNMb2dpbjogdHJ1ZSxcbiAgICAgICAgICAgIGJvZHlDbGFzczogJ3NldHRpbmdzJyxcbiAgICAgICAgICAgIGhlYWRpbmc6ICdBZmZpbGlhdGVkIENvbXBhbmllcyA+PiBDb21wYW55IFByb2ZpbGUnXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuc3RhdGUoJ3NldHRpbmdzLmFkZC1lbnRpdGllcycsIHtcbiAgICAgICAgICB1cmw6ICcvYWRkLWVudGl0eScsXG4gICAgICAgICAgdGVtcGxhdGVVcmw6ICdwYXJ0aWFscy9lbnRpdGllcy9hZGQtZW50aXRpZXMuaHRtbCcsXG4gICAgICAgICAgY29udHJvbGxlcjogJ0FkZEVudGl0eUNvbnRyb2xsZXInLFxuICAgICAgICAgIGNvbnRyb2xsZXJBczogJ2FkZEVudGl0eScsXG4gICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgcmVxdWlyZXNMb2dpbjogdHJ1ZSxcbiAgICAgICAgICAgIGJvZHlDbGFzczogJ3NldHRpbmdzJyxcbiAgICAgICAgICAgIGhlYWRpbmc6ICdBZmZpbGlhdGVkIENvbXBhbmllcyA+PiBBZGQgYSBDb21wYW55J1xuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLnN0YXRlKCdzZXR0aW5ncy50YXNrcycsIHtcbiAgICAgICAgICB1cmw6ICcvdGFza3MnLFxuICAgICAgICAgIHRlbXBsYXRlVXJsOiAncGFydGlhbHMvdGFza3MvdGFza3MuaHRtbCcsXG4gICAgICAgICAgY29udHJvbGxlcjogJ1Rhc2tzQ29udHJvbGxlcicsXG4gICAgICAgICAgY29udHJvbGxlckFzOiAndGFza3NDb250cm9sbGVyJyxcbiAgICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICB0YXNrczogZnVuY3Rpb24gKFRhc2tzKSB7XG4gICAgICAgICAgICAgIC8vUkVUVVJOUyBBIFBST01JU0UsIENPTlRST0xMRVIgSVMgQ0FMTEVEIFdIRU4gUFJPTUlTRSBJUyBSRVNPTFZFRFxuICAgICAgICAgICAgICByZXR1cm4gVGFza3MuZ2V0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICByZXF1aXJlc0xvZ2luOiB0cnVlLFxuICAgICAgICAgICAgYm9keUNsYXNzOiAnc2V0dGluZ3MnLFxuICAgICAgICAgICAgaGVhZGluZzogJ0F1dGhvcml6ZWQgSm9icydcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5zdGF0ZSgnZm9yZW1hbi12aWV3Jywge1xuICAgICAgICAgIHVybDogJy9mb3JlbWFuLXZpZXcnLFxuICAgICAgICAgIHRlbXBsYXRlVXJsOiAncGFydGlhbHMvZm9yZW1hbnMvZm9yZW1hbi12aWV3Lmh0bWwnLFxuICAgICAgICAgIGNvbnRyb2xsZXI6ICdGb3JlbWFuVmlld0NvbnRyb2xsZXInLFxuICAgICAgICAgIGNvbnRyb2xsZXJBczogJ2ZvcmVtYW5WaWV3JyxcbiAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICByZXF1aXJlc0xvZ2luOiB0cnVlLFxuICAgICAgICAgICAgYm9keUNsYXNzOiAnZm9yZW1hbidcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5zdGF0ZSgnZm9yZW1hbi12aWV3LmZvcmVtYW5zJywge1xuICAgICAgICAgIHVybDogJy9mb3JlbWFucycsXG4gICAgICAgICAgdGVtcGxhdGVVcmw6ICdwYXJ0aWFscy9mb3JlbWFucy9mb3JlbWFucy5odG1sJyxcbiAgICAgICAgICBjb250cm9sbGVyOiAnRm9yZW1hbnNDb250cm9sbGVyJyxcbiAgICAgICAgICBjb250cm9sbGVyQXM6ICdmb3JlbWFuc0NvbnRyb2xsZXInLFxuICAgICAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgICAgIGZvcmVtYW5zOiBmdW5jdGlvbiAoRm9yZW1hbnMpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIEZvcmVtYW5zLmdldCgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRhc2tzOiBmdW5jdGlvbiAoVGFza3MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIFRhc2tzLmdldCgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVudGl0aWVzOiBmdW5jdGlvbiAoRW50aXRpZXMpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIEVudGl0aWVzLmdldCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgcmVxdWlyZXNMb2dpbjogdHJ1ZSxcbiAgICAgICAgICAgIGJvZHlDbGFzczogJ2ZvcmVtYW4nLFxuICAgICAgICAgICAgaGVhZGluZzogJ1JlcG9ydCBhIEpvYidcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5zdGF0ZSgnZm9yZW1hbi12aWV3LnNlbnQtZm9yZW1hbicsIHtcbiAgICAgICAgICB1cmw6ICcvc2VudC1mb3JlbWFuJyxcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3BhcnRpYWxzL2ZvcmVtYW5zL3NlbnQtZm9yZW1hbi5odG1sJyxcbiAgICAgICAgICBjb250cm9sbGVyOiAnQWRtaW5Db250cm9sbGVyJyxcbiAgICAgICAgICBjb250cm9sbGVyQXM6ICdhZG1pbkNvbnRyb2xsZXInLFxuICAgICAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgICAgIGpvYnM6IGZ1bmN0aW9uIChBZG1pbikge1xuICAgICAgICAgICAgICByZXR1cm4gQWRtaW4uZ2V0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICByZXF1aXJlc0xvZ2luOiB0cnVlLFxuICAgICAgICAgICAgYm9keUNsYXNzOiAnZm9yZW1hbicsXG4gICAgICAgICAgICBoZWFkaW5nOiAnSm9icyBSZXBvcnRlZCdcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC5zdGF0ZSgnZm9yZW1hbi12aWV3LnNlbnQtZm9yZW1hbi5lZGl0LWpvYicsIHtcbiAgICAgICAgICB1cmw6ICcvZWRpdC1qb2IvOmpvYklkJyxcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3BhcnRpYWxzL2ZvcmVtYW5zL2VkaXQtam9iLmh0bWwnLFxuICAgICAgICAgIGNvbnRyb2xsZXI6ICdFZGl0Sm9iQ29udHJvbGxlcicsXG4gICAgICAgICAgY29udHJvbGxlckFzOiAnZWRpdEpvYicsXG4gICAgICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgICAgam9iOiBmdW5jdGlvbiAoQWRtaW4sICRzdGF0ZVBhcmFtcywgZm9yZW1hbnMsIGpvYnMpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIEFkbWluLmZpbmQoJHN0YXRlUGFyYW1zLmpvYklkKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmb3JlbWFuczogZnVuY3Rpb24gKEZvcmVtYW5zKSB7XG4gICAgICAgICAgICAgIHJldHVybiBGb3JlbWFucy5nZXQoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0YXNrczogZnVuY3Rpb24gKFRhc2tzKSB7XG4gICAgICAgICAgICAgIHJldHVybiBUYXNrcy5nZXQoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbnRpdGllczogZnVuY3Rpb24gKEVudGl0aWVzKSB7XG4gICAgICAgICAgICAgIHJldHVybiBFbnRpdGllcy5nZXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIHJlcXVpcmVzTG9naW46IHRydWUsXG4gICAgICAgICAgICBib2R5Q2xhc3M6ICdmb3JlbWFuJ1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgIC8qKlxuICAgICAgICogQ29uZmlndXJlIEhUVFAgSW50ZXJjZXB0b3JzXG4gICAgICAgKi9cbiAgICAgICRodHRwUHJvdmlkZXIuaW50ZXJjZXB0b3JzLnB1c2goZnVuY3Rpb24gKCRpbmplY3Rvcikge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHJlcXVlc3Q6IGZ1bmN0aW9uIChjb25maWcpIHtcbiAgICAgICAgICAgIHZhciBVc2VycyA9ICRpbmplY3Rvci5nZXQoJ1VzZXJzJyk7XG4gICAgICAgICAgICBpZiAoVXNlcnMuaXNMb2dnZWRJbigpKSBjb25maWcuaGVhZGVycy5BdXRob3JpemF0aW9uID0gJ1Rva2VuICcgKyBVc2Vycy5jdXJyZW50VXNlclRva2VuO1xuICAgICAgICAgICAgcmV0dXJuIGNvbmZpZztcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICB9KVxuICAgIC5ydW4oZnVuY3Rpb24gKCRyb290U2NvcGUsIFVzZXJzLCAkc3RhdGUsIHN0b3JhZ2UpIHtcbiAgICAgICRyb290U2NvcGUuJG9uKCckc3RhdGVDaGFuZ2VTdGFydCcsIGZ1bmN0aW9uIChldmVudCwgdG9TdGF0ZSkge1xuICAgICAgICBpZiAodG9TdGF0ZS5kYXRhICYmIHRvU3RhdGUuZGF0YS5yZXF1aXJlc0xvZ2luKSB7XG4gICAgICAgICAgaWYgKCFVc2Vycy5pc0xvZ2dlZEluKCkpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAkc3RhdGUuZ28oJ2xvZ2luJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgVXNlcnMuc3RheUxvZ2dlZEluKCk7XG5cbiAgICAgIGlmICghVXNlcnMuY3VycmVudFVzZXIgfHwgIVVzZXJzLmN1cnJlbnRVc2VyVG9rZW4pIHtcbiAgICAgICAgJHN0YXRlLmdvKCdsb2dpbicpO1xuICAgICAgfVxuICAgIH0pO1xufSgpKTtcbiIsIihmdW5jdGlvbigpe1xuXG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC51aScsIFtdKTtcblxufSgpKTsiLCIoZnVuY3Rpb24gKCl7XG5cblx0J3VzZSBzdHJpY3QnO1xuXHRhbmd1bGFyLm1vZHVsZSgnYXBwJylcblx0XHQuY29udHJvbGxlcignQm9keUNvbnRyb2xsZXInLCBmdW5jdGlvbiAoJHdpbmRvdyAsIFVzZXJzLCAkcm9vdFNjb3BlLCAkc3RhdGUpe1xuXHRcdFx0dmFyIHZtID0gdGhpcztcblx0XHRcdHZtLmxvZ291dCA9IFVzZXJzLmxvZ291dDtcblx0XHRcdHZtLmJvZHlDbGFzcyA9ICRzdGF0ZS5jdXJyZW50LmRhdGEgPyAkc3RhdGUuY3VycmVudC5kYXRhLmJvZHlDbGFzcyA6ICcnO1xuXG5cdFx0XHQkcm9vdFNjb3BlLiRvbignJHN0YXRlQ2hhbmdlU3RhcnQnLCBmdW5jdGlvbiAoZXZlbnQsIHRvU3RhdGUpIHtcblx0XHRcdFx0dm0uYm9keUNsYXNzID0gdG9TdGF0ZS5kYXRhID8gdG9TdGF0ZS5kYXRhLmJvZHlDbGFzcyA6ICcnO1xuXHRcdFx0fSk7XG5cblx0XHRcdHZtLmFkbWluID0gZnVuY3Rpb24gYWRtaW4oKSB7XG5cdFx0XHRcdHZhciB1c2VyU3RyID0gJHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnY3VycmVudFVzZXInKTtcblx0XHRcdFx0dmFyIHVzZXJPYmogPSBKU09OLnBhcnNlKHVzZXJTdHIpOyAvL2NvbnZlcnRpbmcgdG8gYW4gb2JqZWN0IGN1eiBvcmlnaW5hbGx5IGl0IHdhcyBzYXZlZCBhcyBzdHJpbmdcblx0XHRcdFx0cmV0dXJuIHVzZXJPYmouYWRtaW47XG5cdFx0XHR9O1xuXHR9KTtcbn0oKSk7XG4iLCIoZnVuY3Rpb24gKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG4gICAgLmNvbnRyb2xsZXIoJ0FkbWluQ29udHJvbGxlcicsIGZ1bmN0aW9uIChVc2Vycywgam9icywgSm9icywgQWRtaW4sICRzY29wZSwgbW9kYWwsIEZvcmVtYW5zKSB7XG4gICAgICB2YXIgdm0gPSB0aGlzO1xuXG4gICAgICB2bS5jdXJyZW50VXNlciA9IFVzZXJzLmN1cnJlbnRVc2VyO1xuICAgICAgdm0ubG9nb3V0ID0gVXNlcnMubG9nb3V0O1xuICAgICAgdm0uZGVsZXRlID0gQWRtaW4uZGVsO1xuICAgICAgdm0uam9icyA9IG51bGw7XG4gICAgICB2bS5qb2JzID0gam9icztcbiAgICAgIHZtLmpvYnNDb3B5ID0gXy5jbG9uZShqb2JzKTtcbiAgICAgIHZtLnB1dCA9IEpvYnMucHV0O1xuXG4gICAgICB2bS5hZG1pbkZpbHRlciA9IHZtLmN1cnJlbnRVc2VyLmFkbWluID8ge30gOiB7Zm9yZW1hbjogdm0uY3VycmVudFVzZXIuX2lkfTtcbiAgICAgIFxuICAgICAgLyoqXG4gICAgICAgKiBDb25maXJtIHdoZW4gd2Ugd2FudCB0byBkZWxldGUgYSBzZW50IGZvcmVtYW4uXG4gICAgICAgKi9cbiAgICAgIHZtLmNvbmZpcm1EZWxldGUgPSBmdW5jdGlvbiBjb25maXJtRGVsZXRlKGpvYklkKSB7XG4gICAgICAgIG1vZGFsLm9wZW4oJ0NvbmZpcm1Gb3JlbWFuRGVsZXRlJywgJ2ZvcmVtYW5EZWxldGUnLCAncGFydGlhbHMvZm9yZW1hbnMvY29uZmlybS1kZWxldGUtc2VudC1mb3JlbWFuLmh0bWwnKVxuICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgIEFkbWluLmRlbChqb2JJZCk7XG4gICAgICAgICAgfSk7XG4gICAgICB9O1xuICAgIH0pO1xufSkoKTtcbiIsIihmdW5jdGlvbiAoKSB7XG5cbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuICAgIC5jb250cm9sbGVyKCdDb25maXJtUGVuZGluZ0pvYkRlbGV0ZScsIGZ1bmN0aW9uICgkdWliTW9kYWxJbnN0YW5jZSkge1xuICAgICAgdmFyIHZtICA9IHRoaXM7XG5cbiAgICAgIC8qKlxuICAgICAgICogQWZmaXJtYXRpdmVseSBjbG9zZSB0aGUgZGlhbG9nXG4gICAgICAgKi9cbiAgICAgIHZtLmNsb3NlID0gZnVuY3Rpb24gY2xvc2UoKSB7XG4gICAgICAgICR1aWJNb2RhbEluc3RhbmNlLmNsb3NlKCk7XG4gICAgICB9O1xuXG4gICAgICAvKipcbiAgICAgICAqIENhbmNlbCB0aGUgZGlhbG9nXG4gICAgICAgKi9cbiAgICAgIHZtLmRpc21pc3MgPSBmdW5jdGlvbiBkaXNtaXNzKCkge1xuICAgICAgICAkdWliTW9kYWxJbnN0YW5jZS5kaXNtaXNzKCk7XG4gICAgICB9O1xuICAgIH0pO1xufSgpKTsiLCIoZnVuY3Rpb24gKCkge1xuICBhbmd1bGFyLm1vZHVsZSgnYXBwJylcbiAgICAuY29udHJvbGxlcignRGFzaGJvYXJkQ29udHJvbGxlcicsIGZ1bmN0aW9uICgkcm9vdFNjb3BlLCAkc3RhdGUsIGpvYnMsIEpvYnMsIEFkbWluLCAkc2NvcGUpIHtcbiAgICAgIHZhciB2bSA9IHRoaXM7XG4gICAgICB2bS5qb2JzID0gam9icztcbiAgICAgIHZtLnRpdGxlID0gJHN0YXRlLmN1cnJlbnQuZGF0YSA/ICRzdGF0ZS5jdXJyZW50LmRhdGEuaGVhZGluZyA6ICdkYXNoYm9hcmQnO1xuXG4gICAgICAkcm9vdFNjb3BlLiRvbignJHN0YXRlQ2hhbmdlU3RhcnQnLCBmdW5jdGlvbiAoZXZlbnQsIHRvU3RhdGUpIHtcbiAgICAgICAgdm0udGl0bGUgPSB0b1N0YXRlLmRhdGEgPyB0b1N0YXRlLmRhdGEuaGVhZGluZyA6ICdkYXNoYm9hcmQnO1xuICAgICAgfSk7XG5cbiAgICAgIHZtLnB1dCA9IGZ1bmN0aW9uIChqb2IpIHtcbiAgICAgICAgam9iLmFwcHJvdmVkID0gdHJ1ZTtcbiAgICAgICAgSm9icy5wdXQoam9iKTtcbiAgICAgICAgcGVuZGluZ0NvdW50KCk7XG4gICAgICB9O1xuXG4gICAgICB2bS5jb3VudCA9IDA7XG5cbiAgICAgIGZ1bmN0aW9uIHBlbmRpbmdDb3VudCgpIHtcbiAgICAgICAgdm0uY291bnQgPSB2bS5qb2JzLmZpbHRlcihmdW5jdGlvbiAodikge1xuICAgICAgICAgIGlmICh2LmFwcHJvdmVkIHx8IHYuZGVsZXRlZF9hdCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSkubGVuZ3RoO1xuICAgICAgfVxuXG4gICAgICBwZW5kaW5nQ291bnQoKTtcblxuICAgICAgLyoqXG4gICAgICAgKiBMaXN0ZW4gZm9yIGNoYW5nZXMgdG8gdGhlIGpvYnMgKGxpa2UgYXBwcm92YWwpIGFuZCB1cGRhdGVcbiAgICAgICAqIHRoZSBwZW5kaW5nIGNvdW50LlxuICAgICAgICovXG4gICAgICAkc2NvcGUuJHdhdGNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHZtLmpvYnM7XG4gICAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHBlbmRpbmdDb3VudCgpO1xuICAgICAgfSwgdHJ1ZSk7XG4gICAgfSk7XG59KSgpO1xuIiwiKGZ1bmN0aW9uICgpIHtcblxuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG4gICAgLmNvbnRyb2xsZXIoJ1BlbmRpbmdKb2JzQ29udHJvbGxlcicsIGZ1bmN0aW9uIChqb2JzLCBKb2JzLCBtb2RhbCwgQWRtaW4sICRzY29wZSkge1xuICAgICAgdmFyIHZtID0gdGhpcztcbiAgICAgIHZtLmpvYnMgPSBqb2JzO1xuXG4gICAgICB2bS5wdXQgPSBmdW5jdGlvbiAoam9iKSB7XG4gICAgICAgIGpvYi5hcHByb3ZlZCA9IHRydWU7XG4gICAgICAgIEpvYnMucHV0KGpvYik7XG4gICAgICAgIHBlbmRpbmdDb3VudCgpO1xuICAgICAgfTtcblxuICAgICAgLyoqXG4gICAgICAgKiBDb25maXJtIHdoZW4gd2Ugd2FudCB0byBkZWxldGUgYSBwZW5kaW5nIGpvYi5cbiAgICAgICAqL1xuICAgICAgdm0uY29uZmlybURlbGV0ZSA9IGZ1bmN0aW9uIGNvbmZpcm1EZWxldGUoam9iSWQpIHtcbiAgICAgICAgbW9kYWwub3BlbignQ29uZmlybVBlbmRpbmdKb2JEZWxldGUnLCAnY29uZmlybURlbGV0ZScsICdwYXJ0aWFscy9hZG1pbi9jb25maXJtLWRlbGV0ZS1wZW5kaW5nLWpvYi5odG1sJylcbiAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICBBZG1pbi5kZWwoam9iSWQpO1xuICAgICAgICAgIH0pO1xuICAgICAgfTtcbiAgICB9KTtcbn0oKSk7IiwiKGZ1bmN0aW9uKCl7XG4gICd1c2Ugc3RyaWN0JztcbmFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuICAuY29udHJvbGxlcignUmVwb3J0Sm9iQ29udHJvbGxlcicsIGZ1bmN0aW9uKEZvcmVtYW5zLCAkc2NvcGUsIHRhc2tzLCBlbnRpdGllcywgJHN0YXRlKXtcbiAgICB2YXIgdm0gPSB0aGlzO1xuICAgIHZtLmpvYk9iamVjdCA9IHt9O1xuICAgIHZtLnRhc2sgPSBudWxsOyAvL3BvcHVsYXRlZCBieSB0aGUgdWkgbmctbW9kZWxcbiAgICB2bS50YXNrcyA9IHRhc2tzO1xuICAgIHZtLmxvY2F0aW9uID0gbnVsbDsgLy9wb3B1bGF0ZWQgYnkgdGhlIHVpIG5nLW1vZGVsXG4gICAgdm0ubG9jYXRpb25zID0gW107XG4gICAgdm0uZW50aXRpZXMgPSBlbnRpdGllcztcbiAgICB2bS5jb21wYW55X25hbWUgPSBudWxsO1xuICAgIHZtLmZvcm1EYXRhID0ge307XG5cblxuICAgIHZtLmNyZWF0ZUpvYiA9IGZ1bmN0aW9uIGNyZWF0ZUpvYihkYXRhKSB7XG4gICAgICBGb3JlbWFucy5jcmVhdGVKb2IoZGF0YSlcbiAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICRzdGF0ZS5nbygnYWRtaW4uam9icycpO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG5cbiAgICB2bS5lbnRpdGllcy5mb3JFYWNoKGZ1bmN0aW9uIChlbnRpdHkpIHtcbiAgICAgIGVudGl0eS5sb2NhdGlvbi5mb3JFYWNoKGZ1bmN0aW9uIChsb2MpIHtcbiAgICAgICAgaWYgKF8uaW5kZXhPZih2bS5sb2NhdGlvbnMsIGxvYy5jaXR5KSA9PT0gLTEpIHtcbiAgICAgICAgICB2bS5sb2NhdGlvbnMucHVzaChsb2MuY2l0eSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgLy8gZGF0ZXBpY2tlclxuICAgICRzY29wZS50b2RheSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICRzY29wZS5kdCA9IG5ldyBEYXRlKCk7XG4gICAgfTtcbiAgICAkc2NvcGUudG9kYXkoKTtcblxuICAgICRzY29wZS5jbGVhciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICRzY29wZS5kdCA9IG51bGw7XG4gICAgfTtcblxuICAgICRzY29wZS50b2dnbGVNaW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAkc2NvcGUubWluRGF0ZSA9ICRzY29wZS5taW5EYXRlID8gbnVsbCA6IG5ldyBEYXRlKCk7XG4gICAgfTtcblxuICAgICRzY29wZS50b2dnbGVNaW4oKTtcblxuICAgICRzY29wZS5tYXhEYXRlID0gbmV3IERhdGUoMjAyMCwgNSwgMjIpO1xuXG4gICAgJHNjb3BlLm9wZW4gPSBmdW5jdGlvbiAoJGV2ZW50KSB7XG4gICAgICAkc2NvcGUuc3RhdHVzLm9wZW5lZCA9IHRydWU7XG4gICAgfTtcblxuICAgICRzY29wZS5zZXREYXRlID0gZnVuY3Rpb24gKHllYXIsIG1vbnRoLCBkYXkpIHtcbiAgICAgICRzY29wZS5kdCA9IG5ldyBEYXRlKHllYXIsIG1vbnRoLCBkYXkpO1xuICAgIH07XG5cbiAgICAkc2NvcGUuZGF0ZU9wdGlvbnMgPSB7XG4gICAgICBmb3JtYXRZZWFyOiAneXknLFxuICAgICAgc3RhcnRpbmdEYXk6IDFcbiAgICB9O1xuICAgICRzY29wZS5mb3JtYXRzID0gWydNTS1kZC15eXl5JywgJ3l5eXkvZGQvTU0nLCAnZGQuTU0ueXl5eScsICdzaG9ydERhdGUnXTtcbiAgICAkc2NvcGUuZm9ybWF0ID0gJHNjb3BlLmZvcm1hdHNbMF07XG4gICAgJHNjb3BlLnN0YXR1cyA9IHtvcGVuZWQ6IGZhbHNlfTtcbiAgICB2YXIgdG9tb3Jyb3cgPSBuZXcgRGF0ZSgpO1xuICAgIHZhciBhZnRlclRvbW9ycm93ID0gbmV3IERhdGUoKTtcblxuICAgIHRvbW9ycm93LnNldERhdGUodG9tb3Jyb3cuZ2V0RGF0ZSgpICsgMSk7XG4gICAgYWZ0ZXJUb21vcnJvdy5zZXREYXRlKHRvbW9ycm93LmdldERhdGUoKSArIDIpO1xuXG4gICAgJHNjb3BlLmV2ZW50cyA9IFtcbiAgICAgIHtcbiAgICAgICAgZGF0ZTogdG9tb3Jyb3csXG4gICAgICAgIHN0YXR1czogJ2Z1bGwnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBkYXRlOiBhZnRlclRvbW9ycm93LFxuICAgICAgICBzdGF0dXM6ICdwYXJ0aWFsbHknXG4gICAgICB9XG4gICAgXTtcblxuICAgICRzY29wZS5nZXREYXlDbGFzcyA9IGZ1bmN0aW9uIChkYXRlLCBtb2RlKSB7XG4gICAgICBpZiAobW9kZSA9PT0gJ2RheScpIHtcbiAgICAgICAgdmFyIGRheVRvQ2hlY2sgPSBuZXcgRGF0ZShkYXRlKS5zZXRIb3VycygwLCAwLCAwLCAwKTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8ICRzY29wZS5ldmVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB2YXIgY3VycmVudERheSA9IG5ldyBEYXRlKCRzY29wZS5ldmVudHNbaV0uZGF0ZSkuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG5cbiAgICAgICAgICBpZiAoZGF5VG9DaGVjayA9PT0gY3VycmVudERheSkge1xuICAgICAgICAgICAgcmV0dXJuICRzY29wZS5ldmVudHNbaV0uc3RhdHVzO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuICcnO1xuICAgIH07XG5cblxuXG4gIH0pO1xufSkoKTtcbiIsIihmdW5jdGlvbiAoKSB7XG5cbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuICAgIC5jb250cm9sbGVyKCdTZXR0aW5nc0NvbnRyb2xsZXInLCBmdW5jdGlvbiAoJHJvb3RTY29wZSwgJHN0YXRlKSB7XG4gICAgICB2YXIgdm0gPSB0aGlzO1xuICAgICAgdm0udGl0bGUgPSAkc3RhdGUuY3VycmVudC5kYXRhID8gJHN0YXRlLmN1cnJlbnQuZGF0YS5oZWFkaW5nIDogJ1NldHRpbmdzJztcblxuICAgICAgJHJvb3RTY29wZS4kb24oJyRzdGF0ZUNoYW5nZVN0YXJ0JywgZnVuY3Rpb24gKGV2ZW50LCB0b1N0YXRlKSB7XG4gICAgICAgIHZtLnRpdGxlID0gdG9TdGF0ZS5kYXRhID8gdG9TdGF0ZS5kYXRhLmhlYWRpbmcgOiAnU2V0dGluZ3MnO1xuICAgICAgfSk7XG4gICAgfSk7XG59KCkpOyIsIihmdW5jdGlvbigpe1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG4gIC5kaXJlY3RpdmUoJ2VudGl0eUNsaWVudHMnLCBmdW5jdGlvbigpe1xuXG4gICAgLy9DUkVBVEUgVEhFIERETyAoRGlyZWN0aXZlIERlZmluaXRpb24gT2JqZWN0KVxuXG4gICAgcmV0dXJue1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHRlbXBsYXRlVXJsOiAncGFydGlhbHMvZGlyZWN0aXZlcy9lbnRpdHktY2xpZW50cy5odG1sJyxcbiAgICAgIHNjb3BlOiB7XG4gICAgICAgIGVudGl0eTogJz0nLFxuICAgICAgICBlZGl0Q2xpZW50OiAnPScsXG4gICAgICAgIGNvbmZpcm1DbGllbnREZWxldGU6ICc9J1xuICAgICAgfVxuICAgIH07XG5cbiAgfSk7XG59KSgpO1xuIiwiKGZ1bmN0aW9uKCl7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnYXBwLnVpJylcbiAgLmRpcmVjdGl2ZSgnZW50aXR5TG9jYXRpb25zJywgZnVuY3Rpb24oKXtcbiAgICByZXR1cm57XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgdGVtcGxhdGVVcmw6ICdwYXJ0aWFscy9kaXJlY3RpdmVzL2VudGl0eS1sb2NhdGlvbnMuaHRtbCcsXG4gICAgICBzY29wZToge1xuICAgICAgICBlbnRpdHk6ICc9JyxcbiAgICAgICAgZWRpdExvY2F0aW9uOiAnPScsXG4gICAgICAgIGNvbmZpcm1Mb2NhdGlvbkRlbGV0ZTogJz0nXG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59KSgpO1xuIiwiXHQoZnVuY3Rpb24gKCl7XG5cblx0J3VzZSBzdHJpY3QnO1xuXHRhbmd1bGFyLm1vZHVsZSgnYXBwJylcblx0LmRpcmVjdGl2ZSgnYm9keScsIGZ1bmN0aW9uKCl7XG4gICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCcubmF2YmFyLWNvbGxhcHNlLmluJyxmdW5jdGlvbihlKSB7XG4gICAgXHRpZiggJChlLnRhcmdldCkuaXMoJ2EnKSApIHtcbiAgICAgICAgJCh0aGlzKS5jb2xsYXBzZSgnaGlkZScpO1xuICAgIH1cbn0pO1xuXG4gIH0pO1xuXHR9KCkpO1xuIiwiKGZ1bmN0aW9uKCl7XG4ndXNlIHN0cmljdCc7XG5cbmFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuICAuY29udHJvbGxlcignQWRkRW50aXR5Q29udHJvbGxlcicsIGZ1bmN0aW9uKEVudGl0aWVzLCAkc2NvcGUpe1xuICAgICAgdmFyIHZtID0gdGhpcztcbiAgICAgIHZtLmVudGl0eSA9IHt9O1xuICAgICAgdm0uYWRkID0gRW50aXRpZXMuY3JlYXRlRW50aXR5O1xuICAgICAgdm0ubG9jYXRpb25zID1be2lkOiAnTG9jYXRpb24gMSd9XTtcbiAgICAgIHZtLmNsaWVudHMgPSBbe2lkOiAnT3duZXIgMSd9XTtcblxuXG4vL0FkZGluZyBhbmQgcmVtb3ZpbmcgYWRkaXRpb25hbCBmb3JtcyBmb3IgbG9jYXRpb25zIGFuZCBjbGllbnRzXG5cbiAgICAgIHZtLmFkZExvY2F0aW9ucyA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIHZtLm5ld0l0ZW1ObyA9IHZtLmxvY2F0aW9ucy5sZW5ndGgrMTtcbiAgICAgICAgdm0ubG9jYXRpb25zLnB1c2goeydpZCc6ICdMb2NhdGlvbiAnK3ZtLm5ld0l0ZW1Ob30pO1xuICAgICAgfTtcbiAgICAgIHZtLnJlbW92ZUxvY3MgPSBmdW5jdGlvbiAoKXtcbiAgICAgICAgdm0ubGFzdEl0ZW0gPSB2bS5sb2NhdGlvbnMubGVuZ3RoLTE7XG4gICAgICAgIHZtLmxvY2F0aW9ucy5zcGxpY2Uodm0ubGFzdEl0ZW0pO1xuICAgICAgfTtcblxuICAgICAgdm0uYWRkQ2xpZW50cyA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIHZtLm5ld0l0ZW1ObyA9IHZtLmNsaWVudHMubGVuZ3RoKzE7XG4gICAgICAgIHZtLmNsaWVudHMucHVzaCh7J2lkJzogJ093bmVyICcrdm0ubmV3SXRlbU5vfSk7XG4gICAgICB9O1xuXG4gICAgICB2bS5yZW1vdmVDbGllbnRzID0gZnVuY3Rpb24oKXtcbiAgICAgICAgdm0ubGFzdEl0ZW0gPSB2bS5jbGllbnRzLmxlbmd0aC0xO1xuICAgICAgICB2bS5jbGllbnRzLnNwbGljZSh2bS5sYXN0SXRlbSk7XG4gICAgICB9O1xuXG4gIH0pO1xuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCl7XG4ndXNlIHN0cmljdCc7XG5cbmFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuLmNvbnRyb2xsZXIoJ0NsaWVudE1vZGFsQ29udHJvbGxlcicsIGZ1bmN0aW9uKCR1aWJNb2RhbEluc3RhbmNlLCAkc2NvcGUpe1xuICB2YXIgdm0gPSB0aGlzO1xuXG4gIHZtLmNsaWVudCA9ICRzY29wZS5jbGllbnQgPyAkc2NvcGUuY2xpZW50IDoge307XG5cbiAgdm0ub2sgPSBmdW5jdGlvbiBvayAoKXtcbiAgICBkZWJ1Z2dlcjtcbiAgICAgICR1aWJNb2RhbEluc3RhbmNlLmNsb3NlKHZtLmNsaWVudCk7XG4gIH07XG5cbiAgdm0uY2FuY2VsID0gZnVuY3Rpb24gY2FuY2VsKCl7XG4gICAgICAkdWliTW9kYWxJbnN0YW5jZS5kaXNtaXNzKCk7XG4gIH07XG5cbn0pO1xufSkoKTtcbiIsIihmdW5jdGlvbiAoKSB7XG5cbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuICAgIC5jb250cm9sbGVyKCdDb25maXJtRW50aXR5RGVsZXRlJywgZnVuY3Rpb24gKCR1aWJNb2RhbEluc3RhbmNlKSB7XG4gICAgICB2YXIgdm0gID0gdGhpcztcblxuICAgICAgLyoqXG4gICAgICAgKiBBZmZpcm1hdGl2ZWx5IGNsb3NlIHRoZSBkaWFsb2dcbiAgICAgICAqL1xuICAgICAgdm0uY2xvc2UgPSBmdW5jdGlvbiBjbG9zZSgpIHtcbiAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2UuY2xvc2UoKTtcbiAgICAgIH07XG5cbiAgICAgIC8qKlxuICAgICAgICogQ2FuY2VsIHRoZSBkaWFsb2dcbiAgICAgICAqL1xuICAgICAgdm0uZGlzbWlzcyA9IGZ1bmN0aW9uIGRpc21pc3MoKSB7XG4gICAgICAgICR1aWJNb2RhbEluc3RhbmNlLmRpc21pc3MoKTtcbiAgICAgIH07XG4gICAgfSk7XG59KCkpOyIsIihmdW5jdGlvbigpe1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuICAgICAgICAuY29udHJvbGxlcignRW50aXRpZXNDb250cm9sbGVyJywgZnVuY3Rpb24gKGVudGl0aWVzLCBFbnRpdGllcywgbW9kYWwpe1xuICAgICAgICAgICAgdmFyIHZtID0gdGhpcztcbiAgICAgICAgICAgIHZtLmVudGl0eSA9IHt9O1xuICAgICAgICAgICAgdm0uZW50aXRpZXMgPSBlbnRpdGllcztcbiAgICAgICAgICAgIHZtLmFkZCA9IEVudGl0aWVzLmNyZWF0ZUVudGl0eTtcbiAgICAgICAgICAgIHZtLmVkaXQgPSBFbnRpdGllcy5lZGl0O1xuICAgICAgICAgICAgdm0ucmVtb3ZlID0gRW50aXRpZXMuZGVsO1xuICAgICAgICAgICAgdm0uYWRkTG9jYXRpb25zID0gRW50aXRpZXMuYWRkTG9jYXRpb25zO1xuICAgICAgICAvKipcbiAgICAgICAqIENvbmZpcm0gd2hlbiB3ZSB3YW50IHRvIGRlbGV0ZSBhIGVudGl0eS5cbiAgICAgICAqL1xuICAgICAgdm0uY29uZmlybURlbGV0ZSA9IGZ1bmN0aW9uIGNvbmZpcm1EZWxldGUoZW50aXR5SWQpIHtcbiAgICAgICAgbW9kYWwub3BlbignQ29uZmlybUVudGl0eURlbGV0ZScsICdlbnRpdHlEZWxldGUnLCAncGFydGlhbHMvZW50aXRpZXMvY29uZmlybS1kZWxldGUtZW50aXR5Lmh0bWwnKVxuICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgIEVudGl0aWVzLmRlbChlbnRpdHlJZCk7XG4gICAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICAgIH0pO1xufSkoKTtcbiIsIihmdW5jdGlvbigpe1xuICAgJ3VzZSBzdHJpY3QnO1xuXG4gICBhbmd1bGFyLm1vZHVsZSgnYXBwJylcbiAgICAgICAuY29udHJvbGxlcignRW50aXR5TW9kYWxDb250cm9sbGVyJywgZnVuY3Rpb24gKCR1aWJNb2RhbEluc3RhbmNlLCAkc2NvcGUpe1xuICAgICAgICAgICB2YXIgdm0gPSB0aGlzO1xuXG4gICAgICAgICAgIHZtLmVudGl0eSA9ICRzY29wZS5lbnRpdHkgPyBhbmd1bGFyLmNvcHkoJHNjb3BlLmVudGl0eSkgOiB7fTtcblxuICAgICAgICAgICB2bS5vayA9IGZ1bmN0aW9uIG9rICgpe1xuICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICR1aWJNb2RhbEluc3RhbmNlLmNsb3NlKHZtLmVudGl0eSk7XG4gICAgICAgICAgIH07XG5cbiAgICAgICAgICAgdm0uY2FuY2VsID0gZnVuY3Rpb24gY2FuY2VsKCl7XG4gICAgICAgICAgICAgICAkdWliTW9kYWxJbnN0YW5jZS5kaXNtaXNzKCk7XG4gICAgICAgICAgIH07XG5cbiAgICAgICB9KTtcbn0pKCk7XG4iLCIoZnVuY3Rpb24oKXtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwJylcbiAgICAgICAgLmNvbnRyb2xsZXIoJ0VudGl0eUNvbnRyb2xsZXInLCBmdW5jdGlvbihlbnRpdHksIEVudGl0aWVzLCBtb2RhbCl7XG4gICAgICAgICAgIHZhciB2bSA9IHRoaXM7XG4gICAgICAgICAgIHZtLmVkaXRFbnRpdHkgPSBFbnRpdGllcy5lZGl0O1xuICAgICAgICAgICB2bS5lZGl0TG9jYXRpb24gPSBFbnRpdGllcy5lZGl0TG9jTW9kYWw7XG4gICAgICAgICAgIHZtLmVkaXRDbGllbnQgPSBFbnRpdGllcy5lZGl0Q2xpTW9kYWw7XG4gICAgICAgICAgICB2bS5lbnRpdHkgPSBlbnRpdHk7XG4gICAgICAgICAgICB2bS5hZGRMb2NhdGlvbiA9IEVudGl0aWVzLmFkZExvY2F0aW9uVG9FbnRpdHk7XG4gICAgICAgICAgICB2bS5hZGRDbGllbnQgPSBFbnRpdGllcy5hZGRDbGllbnRUb0VudGl0eTtcbiAgICAgICAgICAgIC8vIHZtLmxvY2F0aW9ucyA9IGxvY2F0aW9ucztcblxuICAgICAgICAgICAgdm0uY29uZmlybUxvY2F0aW9uRGVsZXRlID0gZnVuY3Rpb24gY29uZmlybUxvY2F0aW9uRGVsZXRlKGVudGl0eSwgbG9jYXRpb25JZCkge1xuICAgICAgICAgICAgICBkZWJ1Z2dlcjtcbiAgICAgICAgICAgICAgbW9kYWwub3BlbignQ29uZmlybUxvY2F0aW9uRGVsZXRlJywgJ2xvY2F0aW9uRGVsZXRlJywgJ3BhcnRpYWxzL21vZGFscy9jb25maXJtLWRlbGV0ZS1sb2NhdGlvbi5odG1sJylcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICAgICAgICBFbnRpdGllcy5sb2NhdGlvbkRlbChlbnRpdHksIGxvY2F0aW9uSWQpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdm0uY29uZmlybUNsaWVudERlbGV0ZSA9IGZ1bmN0aW9uIGNvbmZpcm1DbGllbnREZWxldGUoZW50aXR5LCBjbGllbnRJZCkge1xuICAgICAgICAgICAgICBkZWJ1Z2dlcjtcbiAgICAgICAgICAgICAgbW9kYWwub3BlbignQ29uZmlybUNsaWVudERlbGV0ZScsICdjbGllbnREZWxldGUnLCAncGFydGlhbHMvbW9kYWxzL2NvbmZpcm0tZGVsZXRlLWNsaWVudC5odG1sJylcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICAgICAgICBFbnRpdGllcy5jbGllbnREZWwoZW50aXR5LCBjbGllbnRJZCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgIH0pO1xufSkoKTtcbiIsIihmdW5jdGlvbigpe1xuJ3VzZSBzdHJpY3QnO1xuXG5hbmd1bGFyLm1vZHVsZSgnYXBwJylcbi5jb250cm9sbGVyKCdMb2NhdGlvbk1vZGFsQ29udHJvbGxlcicsIGZ1bmN0aW9uKCR1aWJNb2RhbEluc3RhbmNlLCAkc2NvcGUpe1xuICB2YXIgdm0gPSB0aGlzO1xuXG4gIHZtLmxvY2F0aW9uID0gJHNjb3BlLmxvY2F0aW9uID8gJHNjb3BlLmxvY2F0aW9uIDoge307XG5cbiAgdm0ub2sgPSBmdW5jdGlvbiBvayAoKXtcbiAgICAgICR1aWJNb2RhbEluc3RhbmNlLmNsb3NlKHZtLmxvY2F0aW9uKTtcbiAgfTtcblxuICB2bS5jYW5jZWwgPSBmdW5jdGlvbiBjYW5jZWwoKXtcbiAgICAgICR1aWJNb2RhbEluc3RhbmNlLmRpc21pc3MoKTtcbiAgfTtcblxufSk7XG59KSgpO1xuIiwiKGZ1bmN0aW9uICgpIHtcblxuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhci5tb2R1bGUoJ2FwcC51aScpXG5cblx0LmZpbHRlcignbmljZURhdGUnLCBmdW5jdGlvbigpIHtcblxuXHRcdHJldHVybiBmdW5jdGlvbiAoIHRpbWVTdGFtcCwgZm9ybWF0KSB7XG5cdFx0XHRmb3JtYXQgPSBmb3JtYXQgfHwgJ01NTSBEbywgWVlZWSc7XG5cdFx0XHR2YXIgbSA9IG1vbWVudCh0aW1lU3RhbXApO1xuXHRcdFx0cmV0dXJuIG0uZm9ybWF0KGZvcm1hdCk7XG5cblx0XHR9O1xuXHR9KTtcbn0oKSk7XG5cbiIsIlx0KGZ1bmN0aW9uICgpe1xuXG5cdCd1c2Ugc3RyaWN0Jztcblx0YW5ndWxhci5tb2R1bGUoJ2FwcCcpXG4gICAgICAgIC5kaXJlY3RpdmUoJ3VwcGVyY2FzZWQnLCBmdW5jdGlvbigpIHtcblx0XHRcdCAgICByZXR1cm4ge1xuXHRcdFx0ICAgICAgICByZXF1aXJlOiAnbmdNb2RlbCcsXG5cdFx0XHQgICAgICAgIGxpbms6IGZ1bmN0aW9uKCRzY29wZSwgZWxlbWVudCwgYXR0cnMsIG1vZGVsQ3RybCkge1xuXHRcdFx0ICAgICAgICAgICAgbW9kZWxDdHJsLiRwYXJzZXJzLnB1c2goZnVuY3Rpb24oaW5wdXQpIHtcblx0XHRcdCAgICAgICAgICAgICAgICByZXR1cm4gaW5wdXQgPyBpbnB1dC50b1VwcGVyQ2FzZSgpIDogXCJcIjtcblx0XHRcdCAgICAgICAgICAgIH0pO1xuXG5cdFx0XHQgICAgICAgIH1cblx0XHRcdCAgICB9O1xuXHRcdFx0fSk7XG5cbi8vIFx0LmZpbHRlcigndXBwZXJjYXNlZCcsWyBmdW5jdGlvbiAoKSB7XG4vLyBcdFx0ZGVidWdnZXI7XG4vLyAgICAgcmV0dXJuIGZ1bmN0aW9uKGxvY2F0aW9ucywgc2VhcmNoVGV4dCkge1xuLy8gICAgIFx0ZGVidWdnZXI7XG4vLyAgICAgICAgIHZhciBmaWx0ZXJlZCA9IFtdO1xuLy8gICAgICAgICBkZWJ1Z2dlcjtcbi8vICAgICAgICAgdmFyIHJlZ2V4ID0gbmV3IFJlZ0V4cChcIi4qXCIgKyBzZWFyY2hJdGVtICsgXCIuKlwiLCBcImlnXCIpO1xuLy8gICAgICAgICBhbmd1bGFyLmZvckVhY2gobG9jYXRpb25zLCBmdW5jdGlvbihsb2NhdGlvbikge1xuLy8gICAgICAgICAgICAgaWYocmVnZXgudGVzdChsb2NhdGlvbikpe1xuLy8gICAgICAgICAgICAgICAgIGZpbHRlcmVkLnB1c2gobG9jYXRpb24pO1xuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICB9KTtcbi8vICAgICAgICAgcmV0dXJuIGZpbHRlcmVkO1xuLy8gICAgIH07XG4vLyB9XSk7XG5cblx0fSgpKTtcbiIsIlx0KGZ1bmN0aW9uICgpe1xuXG5cdCd1c2Ugc3RyaWN0Jztcblx0YW5ndWxhci5tb2R1bGUoJ2FwcCcpXG5cblx0XHQuZmlsdGVyKCdwcm9wc0ZpbHRlcicsIGZ1bmN0aW9uKCkge1xuXHRcdCAgcmV0dXJuIGZ1bmN0aW9uKGl0ZW1zLCBwcm9wcykge1xuXHRcdCAgICB2YXIgb3V0ID0gW107XG5cdFx0ICAgIGlmIChhbmd1bGFyLmlzQXJyYXkoaXRlbXMpKSB7XG5cdFx0ICAgICAgaXRlbXMuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XG5cdFx0ICAgICAgICB2YXIgaXRlbU1hdGNoZXMgPSBmYWxzZTtcblxuXHRcdCAgICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhwcm9wcyk7XG5cdFx0ICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcblx0XHQgICAgICAgICAgdmFyIHByb3AgPSBrZXlzW2ldO1xuXHRcdCAgICAgICAgICB2YXIgdGV4dCA9IHByb3BzW3Byb3BdLnRvTG93ZXJDYXNlKCk7XG5cdFx0ICAgICAgICAgIGlmIChpdGVtW3Byb3BdLnRvU3RyaW5nKCkudG9Mb3dlckNhc2UoKS5pbmRleE9mKHRleHQpICE9PSAtMSkge1xuXHRcdCAgICAgICAgICAgIGl0ZW1NYXRjaGVzID0gdHJ1ZTtcblx0XHQgICAgICAgICAgICBicmVhaztcblx0XHQgICAgICAgICAgfVxuXHRcdCAgICAgICAgfVxuXHRcdCAgICAgICBcblx0XHQgICAgICAgIGlmIChpdGVtTWF0Y2hlcykge1xuXHRcdCAgICAgICAgICBvdXQucHVzaChpdGVtKTtcblx0XHQgICAgICAgIH1cblx0XHQgICAgICB9KTtcblx0XHQgICAgfSBlbHNlIHtcblx0XHQgICAgICAvLyBMZXQgdGhlIG91dHB1dCBiZSB0aGUgaW5wdXQgdW50b3VjaGVkXG5cdFx0ICAgICAgb3V0ID0gaXRlbXM7XG5cdFx0ICAgIH1cblx0XHQgICAgcmV0dXJuIG91dDtcblx0XHQgIH07XG5cdFx0fSk7XG5cdH0oKSk7XG4iLCIoZnVuY3Rpb24gKCkge1xuXG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnYXBwJylcbiAgICAuY29udHJvbGxlcignQ29uZmlybUZvcmVtYW5EZWxldGUnLCBmdW5jdGlvbiAoJHVpYk1vZGFsSW5zdGFuY2UpIHtcbiAgICAgIHZhciB2bSAgPSB0aGlzO1xuXG4gICAgICAvKipcbiAgICAgICAqIEFmZmlybWF0aXZlbHkgY2xvc2UgdGhlIGRpYWxvZ1xuICAgICAgICovXG4gICAgICB2bS5jbG9zZSA9IGZ1bmN0aW9uIGNsb3NlKCkge1xuICAgICAgICBkZWJ1Z2dlcjtcbiAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2UuY2xvc2UoKTtcbiAgICAgIH07XG5cbiAgICAgIC8qKlxuICAgICAgICogQ2FuY2VsIHRoZSBkaWFsb2dcbiAgICAgICAqL1xuICAgICAgdm0uZGlzbWlzcyA9IGZ1bmN0aW9uIGRpc21pc3MoKSB7XG4gICAgICAgICR1aWJNb2RhbEluc3RhbmNlLmRpc21pc3MoKTtcbiAgICAgIH07XG4gICAgfSk7XG59KCkpOyIsIihmdW5jdGlvbigpe1xuJ3VzZSBzdHJpY3QnO1xuXG5hbmd1bGFyLm1vZHVsZSgnYXBwJylcbiAgLmNvbnRyb2xsZXIoJ0VkaXRKb2JDb250cm9sbGVyJywgZnVuY3Rpb24oZm9yZW1hbnMsIEZvcmVtYW5zLCAkc2NvcGUsIHRhc2tzLCBlbnRpdGllcywgJHN0YXRlLCBqb2Ipe1xuICAgIHZhciB2bSA9IHRoaXM7XG4gICAgdm0uam9iID0gam9iO1xuICAgIHZtLmpvYk9iamVjdCA9IHt9O1xuICAgIHZtLnRhc2sgPSBudWxsOyAvL3BvcHVsYXRlZCBieSB0aGUgdWkgbmctbW9kZWxcbiAgICB2bS50YXNrcyA9IHRhc2tzO1xuICAgIHZtLmxvY2F0aW9uID0gbnVsbDsgLy9wb3B1bGF0ZWQgYnkgdGhlIHVpIG5nLW1vZGVsXG4gICAgdm0ubG9jYXRpb25zID0gW107XG4gICAgdm0uZW50aXRpZXMgPSBlbnRpdGllcztcbiAgICB2bS5jb21wYW55X25hbWUgPSBudWxsO1xuICAgIHZtLmZvcmVtYW5zID0gZm9yZW1hbnM7XG4gICAgdm0udXBkYXRlID0gRm9yZW1hbnMuZWRpdEpvYjtcbiAgICB2bS5mb3JlbWFuc0NvcHkgPSBfLmNsb25lKGZvcmVtYW5zKTtcblxuICAgIHZtLmVudGl0aWVzLmZvckVhY2goZnVuY3Rpb24gKGVudGl0eSkge1xuICAgICAgZW50aXR5LmxvY2F0aW9uLmZvckVhY2goZnVuY3Rpb24gKGxvYykge1xuICAgICAgICBpZiAoXy5pbmRleE9mKHZtLmxvY2F0aW9ucywgbG9jLmNpdHkpID09PSAtMSkge1xuICAgICAgICAgIHZtLmxvY2F0aW9ucy5wdXNoKGxvYy5jaXR5KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvLyBkYXRlcGlja2VyXG4gICAgJHNjb3BlLnRvZGF5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgJHNjb3BlLmR0ID0gbmV3IERhdGUoKTtcbiAgICB9O1xuICAgICRzY29wZS50b2RheSgpO1xuXG4gICAgJHNjb3BlLmNsZWFyID0gZnVuY3Rpb24gKCkge1xuICAgICAgJHNjb3BlLmR0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgJHNjb3BlLnRvZ2dsZU1pbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICRzY29wZS5taW5EYXRlID0gJHNjb3BlLm1pbkRhdGUgPyBudWxsIDogbmV3IERhdGUoKTtcbiAgICB9O1xuXG4gICAgJHNjb3BlLnRvZ2dsZU1pbigpO1xuXG4gICAgJHNjb3BlLm1heERhdGUgPSBuZXcgRGF0ZSgyMDIwLCA1LCAyMik7XG5cbiAgICAkc2NvcGUub3BlbiA9IGZ1bmN0aW9uICgkZXZlbnQpIHtcbiAgICAgICRzY29wZS5zdGF0dXMub3BlbmVkID0gdHJ1ZTtcbiAgICB9O1xuXG4gICAgJHNjb3BlLnNldERhdGUgPSBmdW5jdGlvbiAoeWVhciwgbW9udGgsIGRheSkge1xuICAgICAgJHNjb3BlLmR0ID0gbmV3IERhdGUoeWVhciwgbW9udGgsIGRheSk7XG4gICAgfTtcblxuICAgICRzY29wZS5kYXRlT3B0aW9ucyA9IHtcbiAgICAgIGZvcm1hdFllYXI6ICd5eScsXG4gICAgICBzdGFydGluZ0RheTogMVxuICAgIH07XG4gICAgJHNjb3BlLmZvcm1hdHMgPSBbJ01NLWRkLXl5eXknLCAneXl5eS9kZC9NTScsICdkZC5NTS55eXl5JywgJ3Nob3J0RGF0ZSddO1xuICAgICRzY29wZS5mb3JtYXQgPSAkc2NvcGUuZm9ybWF0c1swXTtcbiAgICAkc2NvcGUuc3RhdHVzID0ge29wZW5lZDogZmFsc2V9O1xuICAgIHZhciB0b21vcnJvdyA9IG5ldyBEYXRlKCk7XG4gICAgdmFyIGFmdGVyVG9tb3Jyb3cgPSBuZXcgRGF0ZSgpO1xuXG4gICAgdG9tb3Jyb3cuc2V0RGF0ZSh0b21vcnJvdy5nZXREYXRlKCkgKyAxKTtcbiAgICBhZnRlclRvbW9ycm93LnNldERhdGUodG9tb3Jyb3cuZ2V0RGF0ZSgpICsgMik7XG5cbiAgICAkc2NvcGUuZXZlbnRzID0gW1xuICAgICAge1xuICAgICAgICBkYXRlOiB0b21vcnJvdyxcbiAgICAgICAgc3RhdHVzOiAnZnVsbCdcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGRhdGU6IGFmdGVyVG9tb3Jyb3csXG4gICAgICAgIHN0YXR1czogJ3BhcnRpYWxseSdcbiAgICAgIH1cbiAgICBdO1xuXG4gICAgJHNjb3BlLmdldERheUNsYXNzID0gZnVuY3Rpb24gKGRhdGUsIG1vZGUpIHtcbiAgICAgIGlmIChtb2RlID09PSAnZGF5Jykge1xuICAgICAgICB2YXIgZGF5VG9DaGVjayA9IG5ldyBEYXRlKGRhdGUpLnNldEhvdXJzKDAsIDAsIDAsIDApO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgJHNjb3BlLmV2ZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHZhciBjdXJyZW50RGF5ID0gbmV3IERhdGUoJHNjb3BlLmV2ZW50c1tpXS5kYXRlKS5zZXRIb3VycygwLCAwLCAwLCAwKTtcblxuICAgICAgICAgIGlmIChkYXlUb0NoZWNrID09PSBjdXJyZW50RGF5KSB7XG4gICAgICAgICAgICByZXR1cm4gJHNjb3BlLmV2ZW50c1tpXS5zdGF0dXM7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gJyc7XG4gICAgfTtcblxuXG59KTtcbn0pKCk7XG4iLCJcdChmdW5jdGlvbiAoKXtcblxuXHQndXNlIHN0cmljdCc7XG5cdGFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuXHRcdC5jb250cm9sbGVyKCdGb3JlbWFuVmlld0NvbnRyb2xsZXInLCBmdW5jdGlvbiAoVXNlcnMpIHtcblxuXHRcdFx0dmFyIHZtID0gdGhpcztcblx0XHRcdHZtLmN1cnJlbnRVc2VyID0gVXNlcnMuY3VycmVudFVzZXI7XG5cdH0pO1xufSgpKTtcbiIsIihmdW5jdGlvbiAoKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnYXBwJylcbiAgICAuY29udHJvbGxlcignRm9yZW1hbnNDb250cm9sbGVyJywgZnVuY3Rpb24gKGZvcmVtYW5zLCBGb3JlbWFucywgJHNjb3BlLCB0YXNrcywgZW50aXRpZXMsICRzdGF0ZSkge1xuICAgICAgdmFyIHZtID0gdGhpcztcblxuICAgICAgdm0udGFzayA9IG51bGw7IC8vcG9wdWxhdGVkIGJ5IHRoZSB1aSBuZy1tb2RlbFxuICAgICAgdm0udGFza3MgPSB0YXNrcztcbiAgICAgIHZtLmxvY2F0aW9uID0gbnVsbDsgLy9wb3B1bGF0ZWQgYnkgdGhlIHVpIG5nLW1vZGVsXG4gICAgICB2bS5sb2NhdGlvbnMgPSBbXTtcbiAgICAgIHZtLmVudGl0aWVzID0gZW50aXRpZXM7XG4gICAgICB2bS5jb21wYW55X25hbWUgPSBudWxsO1xuICAgICAgdm0uZm9yZW1hbnMgPSBmb3JlbWFucztcblxuICAgICAgdm0uZm9yZW1hbnNDb3B5ID0gXy5jbG9uZShmb3JlbWFucyk7XG4gICAgICB2bS5mb3JtRGF0YSA9IHt9O1xuICAgICAgLy92bS5jcmVhdGVKb2JzID0gRm9yZW1hbnMuY3JlYXRlSm9iO1xuXG4gICAgICB2bS5jcmVhdGVKb2IgPSBmdW5jdGlvbiBjcmVhdGVKb2IoZGF0YSkge1xuICAgICAgICBkZWJ1Z2dlcjtcbiAgICAgICAgRm9yZW1hbnMuY3JlYXRlSm9iKGRhdGEpXG4gICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJHN0YXRlLmdvKCdmb3JlbWFuLXZpZXcuc2VudC1mb3JlbWFuJyk7XG4gICAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICB2bS5lbnRpdGllcy5mb3JFYWNoKGZ1bmN0aW9uIChlbnRpdHkpIHtcbiAgICAgICAgZW50aXR5LmxvY2F0aW9uLmZvckVhY2goZnVuY3Rpb24gKGxvYykge1xuICAgICAgICAgIGlmIChfLmluZGV4T2Yodm0ubG9jYXRpb25zLCBsb2MuY2l0eSkgPT09IC0xKSB7XG4gICAgICAgICAgICB2bS5sb2NhdGlvbnMucHVzaChsb2MuY2l0eSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyBkYXRlcGlja2VyXG4gICAgICAkc2NvcGUudG9kYXkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICRzY29wZS5kdCA9IG5ldyBEYXRlKCk7XG4gICAgICB9O1xuICAgICAgJHNjb3BlLnRvZGF5KCk7XG5cbiAgICAgICRzY29wZS5jbGVhciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJHNjb3BlLmR0ID0gbnVsbDtcbiAgICAgIH07XG5cbiAgICAgICRzY29wZS50b2dnbGVNaW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICRzY29wZS5taW5EYXRlID0gJHNjb3BlLm1pbkRhdGUgPyBudWxsIDogbmV3IERhdGUoKTtcbiAgICAgIH07XG5cbiAgICAgICRzY29wZS50b2dnbGVNaW4oKTtcblxuICAgICAgJHNjb3BlLm1heERhdGUgPSBuZXcgRGF0ZSgyMDIwLCA1LCAyMik7XG5cbiAgICAgICRzY29wZS5vcGVuID0gZnVuY3Rpb24gKCRldmVudCkge1xuICAgICAgICAkc2NvcGUuc3RhdHVzLm9wZW5lZCA9IHRydWU7XG4gICAgICB9O1xuXG4gICAgICAkc2NvcGUuc2V0RGF0ZSA9IGZ1bmN0aW9uICh5ZWFyLCBtb250aCwgZGF5KSB7XG4gICAgICAgICRzY29wZS5kdCA9IG5ldyBEYXRlKHllYXIsIG1vbnRoLCBkYXkpO1xuICAgICAgfTtcblxuICAgICAgJHNjb3BlLmRhdGVPcHRpb25zID0ge1xuICAgICAgICBmb3JtYXRZZWFyOiAneXknLFxuICAgICAgICBzdGFydGluZ0RheTogMVxuICAgICAgfTtcbiAgICAgICRzY29wZS5mb3JtYXRzID0gWydNTS1kZC15eXl5JywgJ3l5eXkvZGQvTU0nLCAnZGQuTU0ueXl5eScsICdzaG9ydERhdGUnXTtcbiAgICAgICRzY29wZS5mb3JtYXQgPSAkc2NvcGUuZm9ybWF0c1swXTtcbiAgICAgICRzY29wZS5zdGF0dXMgPSB7b3BlbmVkOiBmYWxzZX07XG4gICAgICB2YXIgdG9tb3Jyb3cgPSBuZXcgRGF0ZSgpO1xuICAgICAgdmFyIGFmdGVyVG9tb3Jyb3cgPSBuZXcgRGF0ZSgpO1xuXG4gICAgICB0b21vcnJvdy5zZXREYXRlKHRvbW9ycm93LmdldERhdGUoKSArIDEpO1xuICAgICAgYWZ0ZXJUb21vcnJvdy5zZXREYXRlKHRvbW9ycm93LmdldERhdGUoKSArIDIpO1xuXG4gICAgICAkc2NvcGUuZXZlbnRzID0gW1xuICAgICAgICB7XG4gICAgICAgICAgZGF0ZTogdG9tb3Jyb3csXG4gICAgICAgICAgc3RhdHVzOiAnZnVsbCdcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGRhdGU6IGFmdGVyVG9tb3Jyb3csXG4gICAgICAgICAgc3RhdHVzOiAncGFydGlhbGx5J1xuICAgICAgICB9XG4gICAgICBdO1xuXG4gICAgICAkc2NvcGUuZ2V0RGF5Q2xhc3MgPSBmdW5jdGlvbiAoZGF0ZSwgbW9kZSkge1xuICAgICAgICBpZiAobW9kZSA9PT0gJ2RheScpIHtcbiAgICAgICAgICB2YXIgZGF5VG9DaGVjayA9IG5ldyBEYXRlKGRhdGUpLnNldEhvdXJzKDAsIDAsIDAsIDApO1xuXG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAkc2NvcGUuZXZlbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgY3VycmVudERheSA9IG5ldyBEYXRlKCRzY29wZS5ldmVudHNbaV0uZGF0ZSkuc2V0SG91cnMoMCwgMCwgMCwgMCk7XG5cbiAgICAgICAgICAgIGlmIChkYXlUb0NoZWNrID09PSBjdXJyZW50RGF5KSB7XG4gICAgICAgICAgICAgIHJldHVybiAkc2NvcGUuZXZlbnRzW2ldLnN0YXR1cztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICcnO1xuICAgICAgfTtcbiAgICB9KTtcbn0pKCk7XG4iLCIoZnVuY3Rpb24gKCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG4gICAgLmNvbnRyb2xsZXIoJ0pvYkNvbnRyb2xsZXInLCBmdW5jdGlvbiAoSm9icywgJHN0YXRlLCBqb2IsIGpvYnMpIHtcbiAgICAgIHZhciB2bSA9IHRoaXM7XG4gICAgICB2bS5qb2IgPSBqb2I7XG4gICAgfSk7XG59KSgpO1xuIiwiKGZ1bmN0aW9uICgpIHtcblxuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG4gICAgLmNvbnRyb2xsZXIoJ1NlbnRmb3JlbWFuQ29udHJvbGxlcicsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciB2bSA9IHRoaXM7XG4gICAgICAgXG5cbiAgICB9KTtcbn0oKSk7IiwiKGZ1bmN0aW9uKCl7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG4gICAgICAgIC5jb250cm9sbGVyKCdMb2dpbkNvbnRyb2xsZXInLCBmdW5jdGlvbiAoVXNlcnMsICRzdGF0ZSl7XG4gICAgICAgICAgICB2YXIgdm0gPSB0aGlzO1xuICAgICAgICAgICAgdm0uY3JlZHMgPSB7fTtcbiAgICAgICAgICAgIHZtLmxvZ2luID0gZnVuY3Rpb24gbG9naW4oY3JlZHMpe1xuICAgICAgICAgICAgICAgIFVzZXJzLmxvZ2luKGNyZWRzKVxuICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbih1c2VyKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8qdGhpcyBwb2ludHMgdG8gdGhlIG5leHQgc3RhdGUsIHRoaXMgaXMgd2hlcmVcbiAgICAgICAgICAgICAgICAgICAgICAgIHlvdSBjYW4gY3JlYXRlIGFuIGlmIHN0YXRlbWVudCB0byBmaWd1cmUgb3V0IGlmIHVzZXIgbG9nZ2luZyBpbiBpc1xuICAgICAgICAgICAgICAgICAgICAgICAgYWRtaW4gb3IgdXNlci4gIE9yIG1heWJlIHVzZSBhIHNlcnZpY2UgaW4gbG9naW4gc2VydmljZT8/XG4gICAgICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoIHVzZXIuYWRtaW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ2FkbWluLmpvYnMnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHN0YXRlLmdvKFwiZm9yZW1hbi12aWV3XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24oZXJyKXtcbiAgICAgICAgICAgICAgICAgICAgdm0ubG9naW5GYWlsZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcblxuXG4gICAgICAgIH0pO1xufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xuXG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnYXBwJylcbiAgICAuY29udHJvbGxlcignQ29uZmlybVRhc2tEZWxldGUnLCBmdW5jdGlvbiAoJHVpYk1vZGFsSW5zdGFuY2UpIHtcbiAgICAgIHZhciB2bSAgPSB0aGlzO1xuXG4gICAgICAvKipcbiAgICAgICAqIEFmZmlybWF0aXZlbHkgY2xvc2UgdGhlIGRpYWxvZ1xuICAgICAgICovXG4gICAgICB2bS5jbG9zZSA9IGZ1bmN0aW9uIGNsb3NlKCkge1xuICAgICAgICAkdWliTW9kYWxJbnN0YW5jZS5jbG9zZSgpO1xuICAgICAgfTtcblxuICAgICAgLyoqXG4gICAgICAgKiBDYW5jZWwgdGhlIGRpYWxvZ1xuICAgICAgICovXG4gICAgICB2bS5kaXNtaXNzID0gZnVuY3Rpb24gZGlzbWlzcygpIHtcbiAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2UuZGlzbWlzcygpO1xuICAgICAgfTtcbiAgICB9KTtcbn0oKSk7IiwiKGZ1bmN0aW9uICgpIHtcblxuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG4gICAgLmNvbnRyb2xsZXIoJ1Rhc2tNb2RhbENvbnRyb2xsZXInLCBmdW5jdGlvbiAoJHVpYk1vZGFsSW5zdGFuY2UsICRzY29wZSkge1xuICAgICAgdmFyIHZtID0gdGhpcztcblxuICAgICAgdm0udGFzayA9ICRzY29wZS50YXNrID8gYW5ndWxhci5jb3B5KCRzY29wZS50YXNrKSA6IHt9O1xuXG4gICAgICAvKipcbiAgICAgICAqIFNhdmluZyB0aGUgdGFzay5cbiAgICAgICAqL1xuICAgICAgdm0ub2sgPSBmdW5jdGlvbiBvaygpIHtcbiAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2UuY2xvc2Uodm0udGFzayk7XG4gICAgICB9O1xuXG4gICAgICAvKipcbiAgICAgICAqIERpc21pc3NpbmcgdGhlIG1vZGFsLCBkbyBub3Qgc2F2ZSB0YXNrLlxuICAgICAgICovXG4gICAgICB2bS5jYW5jZWwgPSBmdW5jdGlvbiBjYW5jZWwoKSB7XG4gICAgICAgICR1aWJNb2RhbEluc3RhbmNlLmRpc21pc3MoKTtcbiAgICAgIH07XG4gICAgfSk7XG59KCkpOyIsIihmdW5jdGlvbiAoKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnYXBwJylcbiAgICAuY29udHJvbGxlcignVGFza3NDb250cm9sbGVyJywgZnVuY3Rpb24gKHRhc2tzLCBUYXNrcywgbW9kYWwpIHtcbiAgICAgIHZhciB2bSA9IHRoaXM7XG5cbiAgICBcdHZtLnRhc2tzID0gdGFza3M7XG4gICAgXHR2bS5hZGQgPSBUYXNrcy5hZGQ7XG4gICAgIFx0dm0uZWRpdCA9IFRhc2tzLmVkaXQ7XG4gICAgIFx0dm0ucmVtb3ZlID0gVGFza3MuZGVsO1xuICAgICAgLyoqXG4gICAgICAgKiBDb25maXJtIHdoZW4gd2Ugd2FudCB0byBkZWxldGUgYSB0YXNrLlxuICAgICAgICovXG4gICAgICB2bS5jb25maXJtRGVsZXRlID0gZnVuY3Rpb24gY29uZmlybURlbGV0ZSh0YXNrSWQpIHtcbiAgICAgICAgbW9kYWwub3BlbignQ29uZmlybVRhc2tEZWxldGUnLCAndGFza0RlbGV0ZScsICdwYXJ0aWFscy90YXNrcy9jb25maXJtLWRlbGV0ZS10YXNrLmh0bWwnKVxuICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgIFRhc2tzLmRlbCh0YXNrSWQpO1xuICAgICAgICAgIH0pO1xuICAgICAgfTtcbiAgICB9KTtcbn0pKCk7XG4iLCIoZnVuY3Rpb24gKCkge1xuXG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnYXBwJylcbiAgICAuY29udHJvbGxlcignQ29uZmlybUNsaWVudERlbGV0ZScsIGZ1bmN0aW9uICgkdWliTW9kYWxJbnN0YW5jZSkge1xuICAgICAgdmFyIHZtICA9IHRoaXM7XG4gICAgICAvKipcbiAgICAgICAqIEFmZmlybWF0aXZlbHkgY2xvc2UgdGhlIGRpYWxvZ1xuICAgICAgICovXG4gICAgICB2bS5jbG9zZSA9IGZ1bmN0aW9uIGNsb3NlKCkge1xuICAgICAgICAkdWliTW9kYWxJbnN0YW5jZS5jbG9zZSgpO1xuICAgICAgfTtcblxuICAgICAgLyoqXG4gICAgICAgKiBDYW5jZWwgdGhlIGRpYWxvZ1xuICAgICAgICovXG4gICAgICB2bS5kaXNtaXNzID0gZnVuY3Rpb24gZGlzbWlzcygpIHtcbiAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2UuZGlzbWlzcygpO1xuICAgICAgfTtcbiAgICB9KTtcbn0oKSk7XG4iLCIoZnVuY3Rpb24gKCkge1xuXG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnYXBwJylcbiAgICAuY29udHJvbGxlcignQ29uZmlybUxvY2F0aW9uRGVsZXRlJywgZnVuY3Rpb24gKCR1aWJNb2RhbEluc3RhbmNlKSB7XG4gICAgICB2YXIgdm0gID0gdGhpcztcbiAgICAgIC8qKlxuICAgICAgICogQWZmaXJtYXRpdmVseSBjbG9zZSB0aGUgZGlhbG9nXG4gICAgICAgKi9cbiAgICAgIHZtLmNsb3NlID0gZnVuY3Rpb24gY2xvc2UoKSB7XG4gICAgICAgICR1aWJNb2RhbEluc3RhbmNlLmNsb3NlKCk7XG4gICAgICB9O1xuXG4gICAgICAvKipcbiAgICAgICAqIENhbmNlbCB0aGUgZGlhbG9nXG4gICAgICAgKi9cbiAgICAgIHZtLmRpc21pc3MgPSBmdW5jdGlvbiBkaXNtaXNzKCkge1xuICAgICAgICAkdWliTW9kYWxJbnN0YW5jZS5kaXNtaXNzKCk7XG4gICAgICB9O1xuICAgIH0pO1xufSgpKTtcbiIsIihmdW5jdGlvbiAoKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnYXBwJylcbiAgICAuc2VydmljZSgnQWRtaW4nLCBmdW5jdGlvbiAoJGh0dHApIHtcbiAgICAgIHZhciB2bSA9IHRoaXM7XG5cbiAgICAgIHZtLmpvYnMgPSBbXTtcblxuICAgICAgLyoqXG4gICAgICAgKiBGaW5kIGEgc2luZ2xlIGpvYi5cbiAgICAgICAqXG4gICAgICAgKiBAcGFyYW0gam9iSWRcbiAgICAgICAqL1xuICAgICAgdm0uZmluZCA9IGZ1bmN0aW9uIGZpbmQoam9iSWQpIHtcbiAgICAgICAgcmV0dXJuIF8uZmluZCh2bS5qb2JzLCB7X2lkOiBqb2JJZH0pO1xuICAgICAgfTtcblxuICAgICAgLyoqXG4gICAgICAgKiBHZXQgdXNlcnMgZnJvbSB0aGUgZGF0YWJhc2UgYW5kIHBvcHVsYXRlIHRoZSBsb2NhbFxuICAgICAgICogY2xpZW50IHNpZGUgbGlzdCBvZiB1c2VyLlxuICAgICAgICpcbiAgICAgICAqIEByZXR1cm5zIHsqfVxuICAgICAgICovXG4gICAgICB2bS5nZXQgPSBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgIHJldHVybiAkaHR0cC5nZXQoJy9qb2JzJylcbiAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICB2bS5qb2JzLnNwbGljZSgwKTtcblxuICAgICAgICAgICAgcmVzLmRhdGEuZm9yRWFjaChmdW5jdGlvbiAoam9iKSB7XG4gICAgICAgICAgICAgIHZtLmpvYnMucHVzaChqb2IpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiB2bS5qb2JzO1xuICAgICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgLyoqXG4gICAgICAgKiBEZWxldGUgYSBqb2IuXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIGpvYklkXG4gICAgICAgKiBAcmV0dXJucyB7Kn1cbiAgICAgICAqL1xuICAgICAgdm0uZGVsID0gZnVuY3Rpb24gZGVsKGpvYklkKSB7XG4gICAgICAgIGRlYnVnZ2VyO1xuICAgICAgICByZXR1cm4gJGh0dHAuZGVsZXRlKCcvam9icy8nICsgam9iSWQpXG4gICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgXy5yZW1vdmUodm0uam9icywge19pZDogam9iSWR9KTtcbiAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgfSk7XG4gICAgICB9O1xuICAgIH0pO1xufSkoKTtcbiIsIihmdW5jdGlvbigpe1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuICAgICAgICAuc2VydmljZSgnRW50aXRpZXMnLCBmdW5jdGlvbiAoJGh0dHAsICRzdGF0ZSwgJHVpYk1vZGFsLCAkcm9vdFNjb3BlKXtcbiAgICAgICAgICAgIHZhciB2bSA9IHRoaXM7XG4gICAgICAgICAgICB2bS5sb2NzID0gW107XG4gICAgICAgICAgICB2bS5lbnRpdGllcyA9IFtdO1xuICAgICAgICAgICAgdm0ubG9jYXRpb25zID0gW107XG5cbiAgLyoqKioqIEZpbmQgRW50aXRpZXMgd2l0aCBmaW5kIGZ1bmN0aW9uICoqKioqL1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBGaW5kIGFuIGVudGl0eSBpbiB0aGUgZW50aXRpZXMgbGlzdCBieSBpdHMgaWQuXG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICogQHBhcmFtIGVudGl0eUlkXG4gICAgICAgICAgICAgKiBAcmV0dXJucyB7Kn1cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdm0uZmluZCA9IGZ1bmN0aW9uIGZpbmQoZW50aXR5SWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXy5maW5kKHZtLmVudGl0aWVzLCB7X2lkOiBlbnRpdHlJZH0pO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBDcmVhdGVzIGFuIEVudGl0eSBpbiBNb2RhbFxuICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAqIEBwYXJhbSBlbnRpdHlcbiAgICAgICAgICAgICAqIEByZXR1cm5zIHsqfVxuICAgICAgICAgICAgICovXG5cbiAgLyoqKioqIENyZWF0ZSBFbnRpdGllcyB3aXRoIGNyZWF0ZUVudGl0eSBmdW5jdGlvbiAqKioqKi9cbiAgICAgICAgICAgIHZtLmNyZWF0ZUVudGl0eSA9IGZ1bmN0aW9uIGNyZWF0ZUVudGl0eShlbnRpdHksIGxvY2F0aW9ucywgY2xpZW50cyl7XG4gICAgICAgICAgICAgIGVudGl0eS5sb2NhdGlvbiA9IGxvY2F0aW9ucztcbiAgICAgICAgICAgICAgZW50aXR5Lm93bmVycyA9IGNsaWVudHM7XG4gICAgICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoJy9lbnRpdGllcycsIGVudGl0eSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcyl7XG4gICAgICAgICAgICAgICAgICAgICAgICB2bS5lbnRpdGllcy5wdXNoKHJlcy5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycil7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG5cbiAgLyoqKioqIEdldCBFbnRpdGllcyBGcm9tIERhdGFiYXNlIHdpdGggZ2V0IGZ1bmN0aW9uICoqKioqL1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBHZXQgZW50aXRpZXMgZnJvbSB0aGUgZGF0YWJhc2UgYW5kIHBvcHVsYXRlIHRoZSBsb2NhbFxuICAgICAgICAgICAgICogY2xpZW50IHNpZGUgbGlzdCBvZiBlbnRpdGllcy5cbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBAcmV0dXJucyB7Kn1cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdm0uZ2V0ID0gZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAkaHR0cC5nZXQoJy9lbnRpdGllcycpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZtLmVudGl0aWVzLnNwbGljZSgwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5kYXRhLmZvckVhY2goZnVuY3Rpb24gKGVudGl0eSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZtLmVudGl0aWVzLnB1c2goZW50aXR5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZtLmVudGl0aWVzO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG5cbiAgLyoqKioqICBFZGl0IEVudGl0eSBJbmZvcm1hdGlvbiBpbiBFZGl0IEVudGl0eSBTdGF0ZSB0aHJvdWdoIE1vZGFsICAqKioqKi9cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgKlxuICAgICAgICAgICAgKiBAcGFyYW0gZW50aXR5XG4gICAgICAgICAgICAqIEByZXR1cm5zIHsqfVxuICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHZtLmVkaXQgPSBmdW5jdGlvbiBlZGl0KGVudGl0eSkge1xuXG4gICAgICAgICAgICAgICB2YXIgc2NvcGUgPSAkcm9vdFNjb3BlLiRuZXcoKTtcbiAgICAgICAgICAgICAgIHNjb3BlLmVudGl0eSA9IGVudGl0eTtcbiAgICAgICAgICAgICAgIHJldHVybiAkdWliTW9kYWwub3Blbih7XG4gICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0VudGl0eU1vZGFsQ29udHJvbGxlcicsXG4gICAgICAgICAgICAgICAgICAgY29udHJvbGxlckFzOiAnZW50aXR5TW9kYWwnLFxuICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAncGFydGlhbHMvZW50aXRpZXMvZW50aXR5LW1vZGFsLWZvcm0uaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgc2NvcGU6IHNjb3BlXG4gICAgICAgICAgICAgICB9KS5yZXN1bHQudGhlbih2bS5lZGl0RW50aXR5KTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgKiBFZGl0IGFuIEVudGl0eVxuICAgICAgICAgICAgKlxuICAgICAgICAgICAgKiBAcGFyYW0gZW50aXR5XG4gICAgICAgICAgICAqIEByZXR1cm5zIHsqfVxuICAgICAgICAgICAgKi9cblxuICAgICAgICAgICAgdm0uZWRpdEVudGl0eSA9IGZ1bmN0aW9uIGVkaXRFbnRpdHkoZW50aXR5KSB7XG4gICAgICAgICAgICAgICByZXR1cm4gJGh0dHAucHV0KCcvZW50aXRpZXMvJyArIGVudGl0eS5faWQsIGVudGl0eSlcbiAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgIHZhciBfZW50aXR5ID0gdm0uZmluZChlbnRpdHkuX2lkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgXy5tZXJnZShfZW50aXR5LCBlbnRpdHkpO1xuICAgICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcblxuICAvKioqKiogRWRpdCBEZWxldGUgYW5kIEFkZCBMb2NhdGlvbiBpbiBFbnRpdHkgSW5mbyBQYWdlIFRocm91Z2ggTW9kYWwgKioqKiovXG4gICAgICAgICAgICB2bS5lZGl0TG9jTW9kYWwgPSBmdW5jdGlvbiBlZGl0TG9jTW9kYWwobG9jYXRpb24pIHtcbiAgICAgICAgICAgICAgIHZhciBzY29wZSA9ICRyb290U2NvcGUuJG5ldygpO1xuICAgICAgICAgICAgICAgc2NvcGUubG9jYXRpb24gPSBsb2NhdGlvbjtcbiAgICAgICAgICAgICAgIHJldHVybiAkdWliTW9kYWwub3Blbih7XG4gICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0xvY2F0aW9uTW9kYWxDb250cm9sbGVyJyxcbiAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyQXM6ICdsb2NhdGlvbk1vZGFsJyxcbiAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3BhcnRpYWxzL2VudGl0aWVzL2xvY2F0aW9uLW1vZGFsLWZvcm0uaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgc2NvcGU6IHNjb3BlXG4gICAgICAgICAgICAgICB9KS5yZXN1bHQudGhlbih2bS5lZGl0TG9jKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHZtLmVkaXRMb2MgPSBmdW5jdGlvbiBlZGl0TG9jKGxvY2F0aW9uKXtcbiAgICAgICAgICAgICAgcmV0dXJuICRodHRwLnB1dCgnL2xvY2F0aW9ucy8nICsgbG9jYXRpb24uX2lkLCBsb2NhdGlvbilcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXMpe1xuICAgICAgICAgICAgICAgICAgLy9wYXNzLCB0aGUgb2JqZWN0IGhhcyBhbHJlYWR5IGJlZW4gdXBkYXRlZC5cbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIpe1xuICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAqIERlbGV0ZSBhIGxvY2F0aW9uIGZyb20gd2l0aGluIGFuIEVudGl0eVxuICAgICAgICAgICAgKiBAcGFyYW0gbG9jYXRpb25JZFxuICAgICAgICAgICAgKiBAcmV0dXJuc1xuICAgICAgICAgICAgKiovXG4gICAgICAgICAgICB2bS5sb2NhdGlvbkRlbCA9IGZ1bmN0aW9uIGxvY2F0aW9uRGVsKGVudGl0eSwgbG9jYXRpb25JZCl7XG4gICAgICAgICAgICAgIHJldHVybiAkaHR0cC5kZWxldGUoJy9sb2NhdGlvbnMvJyArIGxvY2F0aW9uSWQpXG4gICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlcyl7XG4gICAgICAgICAgICAgICAgXy5yZW1vdmUoZW50aXR5LmxvY2F0aW9uLCB7X2lkOiBsb2NhdGlvbklkfSk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHZtLmFkZExvY2F0aW9uVG9FbnRpdHkgPSBmdW5jdGlvbihlbnRpdHkpe1xuICAgICAgICAgICAgICB2bS5vcGVuTG9jTW9kYWwoKS50aGVuKGZ1bmN0aW9uKGxvY2F0aW9uKXtcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5lbnRpdHkgPSBlbnRpdHkuX2lkO1xuICAgICAgICAgICAgICAgIHZtLmFkZExvY2F0aW9ucyhsb2NhdGlvbilcbiAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKGxvY2F0aW9uKXtcbiAgICAgICAgICAgICAgICAgICAgZW50aXR5LmxvY2F0aW9uLnB1c2gobG9jYXRpb24pO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcblxuXG4gICAgICAgICAgICB2bS5vcGVuTG9jTW9kYWwgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICByZXR1cm4gJHVpYk1vZGFsLm9wZW4oe1xuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdMb2NhdGlvbk1vZGFsQ29udHJvbGxlcicsXG4gICAgICAgICAgICAgICAgY29udHJvbGxlckFzOiAnbG9jYXRpb25Nb2RhbCcsXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdwYXJ0aWFscy9lbnRpdGllcy9sb2NhdGlvbi1tb2RhbC1mb3JtLmh0bWwnXG4gICAgICAgICAgICAgIH0pLnJlc3VsdDtcbiAgICAgICAgICAgIH07XG5cblxuICAgICAgICAgICAgLy8gdm0uYWRkTG9jTW9kYWwgPSBmdW5jdGlvbiBhZGRMb2NNb2RhbCgpIHtcbiAgICAgICAgICAgIC8vICAgdm0ub3Blbk1vZGFsKClcbiAgICAgICAgICAgIC8vICAgICAudGhlbih2bS5hZGRMb2NhdGlvbnMpO1xuICAgICAgICAgICAgLy8gfTtcblxuICAgICAgICAgICAgdm0uYWRkTG9jYXRpb25zID0gZnVuY3Rpb24gYWRkTG9jYXRpb25zKGxvY2F0aW9uKXtcbiAgICAgICAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoJy9sb2NhdGlvbnMnLCBsb2NhdGlvbilcbiAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLmRhdGE7XG4gICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9O1xuXG4gIC8qKioqKiBFZGl0IGFuIE93bmVyIGluIEVudGl0eSBJbmZvIFBhZ2UgVGhyb3VnaCBNb2RhbCAqKioqKi9cbiAgICAgICAgICB2bS5hZGRDbGllbnRUb0VudGl0eSA9IGZ1bmN0aW9uKGVudGl0eSl7XG4gICAgICAgICAgICB2bS5vcGVuQ2xpTW9kYWwoKS50aGVuKGZ1bmN0aW9uKGNsaWVudCl7XG4gICAgICAgICAgICAgIGNsaWVudC5lbnRpdHkgPSBlbnRpdHkuX2lkO1xuICAgICAgICAgICAgICB2bS5hZGRDbGllbnRzKGNsaWVudClcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihjbGllbnQpe1xuICAgICAgICAgICAgICAgICAgZW50aXR5Lm93bmVycy5wdXNoKGNsaWVudCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgdm0uYWRkQ2xpZW50cyA9IGZ1bmN0aW9uIGFkZENsaWVudHMoY2xpZW50KXtcbiAgICAgICAgICAgIHJldHVybiAkaHR0cC5wb3N0KCcvY2xpZW50cycsIGNsaWVudClcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlcyl7XG4gICAgICAgICAgICByZXR1cm4gcmVzLmRhdGE7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgdm0ub3BlbkNsaU1vZGFsID0gZnVuY3Rpb24gYWRkQ2xpTW9kYWwoKXtcbiAgICAgICAgICAgIHJldHVybiAkdWliTW9kYWwub3Blbih7XG4gICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdDbGllbnRNb2RhbENvbnRyb2xsZXInLFxuICAgICAgICAgICAgICBjb250cm9sbGVyQXM6ICdjbGllbnRNb2RhbCcsXG4gICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAncGFydGlhbHMvZW50aXRpZXMvY2xpZW50LW1vZGFsLWZvcm0uaHRtbCdcbiAgICAgICAgICAgIH0pLnJlc3VsdDtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB2bS5lZGl0Q2xpTW9kYWwgPSBmdW5jdGlvbiBlZGl0Q2xpTW9kYWwoY2xpZW50KSB7XG4gICAgICAgICAgICAgICB2YXIgc2NvcGUgPSAkcm9vdFNjb3BlLiRuZXcoKTtcbiAgICAgICAgICAgICAgIHNjb3BlLmNsaWVudCA9IGNsaWVudDtcbiAgICAgICAgICAgICAgIHJldHVybiAkdWliTW9kYWwub3Blbih7XG4gICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ0NsaWVudE1vZGFsQ29udHJvbGxlcicsXG4gICAgICAgICAgICAgICAgICAgY29udHJvbGxlckFzOiAnY2xpZW50TW9kYWwnLFxuICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAncGFydGlhbHMvZW50aXRpZXMvY2xpZW50LW1vZGFsLWZvcm0uaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgc2NvcGU6IHNjb3BlXG4gICAgICAgICAgICAgICB9KS5yZXN1bHQudGhlbih2bS5lZGl0Q2xpKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgKiBAcGFyYW0gbG9jYXRpb25cbiAgICAgICAgICAgICogQHJldHVybnNcbiAgICAgICAgICAgICoqL1xuICAgICAgICAgICAgdm0uZWRpdENsaSA9IGZ1bmN0aW9uIGVkaXRDbGkoY2xpZW50KSB7XG4gICAgICAgICAgICAgICByZXR1cm4gJGh0dHAucHV0KCcvY2xpZW50cy8nICsgY2xpZW50Ll9pZCwgY2xpZW50KVxuICAgICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHZtLmNsaWVudERlbCA9IGZ1bmN0aW9uIGNsaWVudERlbChlbnRpdHksIGNsaWVudElkKXtcbiAgICAgICAgICAgICAgcmV0dXJuICRodHRwLmRlbGV0ZSgnL2NsaWVudHMvJyArIGNsaWVudElkKVxuICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXMpe1xuICAgICAgICAgICAgICAgIF8ucmVtb3ZlKGVudGl0eS5vd25lcnMsIHtfaWQ6IGNsaWVudElkfSk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcblxuXG5cblxuLyoqKioqIERlbGV0ZSBFbnRpdGllcyB3aXRoIGRlbCBmdW5jdGlvbiAqKioqKi9cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogRGVsZXRlIGFuIGVudGl0eS5cbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBAcGFyYW0gZW50aXR5SWRcbiAgICAgICAgICAgICAqIEByZXR1cm5zIHsqfVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB2bS5kZWwgPSBmdW5jdGlvbiBkZWwoZW50aXR5SWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJGh0dHAuZGVsZXRlKCcvZW50aXRpZXMvJyArIGVudGl0eUlkKVxuICAgICAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfLnJlbW92ZSh2bS5lbnRpdGllcywge19pZDogZW50aXR5SWR9KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgIH0pO1xufSkoKTtcbiIsIihmdW5jdGlvbiAoKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnYXBwJylcbiAgICAuc2VydmljZSgnRm9yZW1hbnMnLCBmdW5jdGlvbiAoJGh0dHAsICRzdGF0ZSkge1xuICAgICAgdmFyIHZtID0gdGhpcztcblxuICAgICAgLyoqXG4gICAgICAgKiBUaGUgbG9jYWwgdGFzayBsaXN0LlxuICAgICAgICpcbiAgICAgICAqIEB0eXBlIHtBcnJheX1cbiAgICAgICAqL1xuICAgICAgdm0udGFza3MgPSBbXTtcbiAgICAgIHZtLmVudGl0aWVzID0gW107XG4gICAgICB2bS5qb2JzID0gW107XG4gICAgICB2bS5lbXB0eSA9IHt9O1xuXG4gICAgICAvKipcbiAgICAgICAqIENyZWF0ZSBhIHRhc2sgb24gdGhlIHNlcnZlci5cbiAgICAgICAqXG4gICAgICAgKiBAcGFyYW0gam9iXG4gICAgICAgKiBAcmV0dXJucyB7Kn1cbiAgICAgICAqL1xuICAgICAgdm0uY3JlYXRlSm9iID0gZnVuY3Rpb24gY3JlYXRlSm9iKGpvYikge1xuICAgICAgICByZXR1cm4gJGh0dHAucG9zdCgnL2pvYnMnLCBqb2IpXG4gICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgdm0uam9icy5wdXNoKHJlcy5kYXRhKTtcbiAgICAgICAgICAgIHJldHVybiByZXMuZGF0YTtcbiAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgfSk7XG4gICAgICB9O1xuXG5cbiAgICAgIHZtLmVkaXRKb2IgPSBmdW5jdGlvbiBlZGl0Sm9iKGpvYil7XG4gICAgICAgIHJldHVybiAkaHR0cC5wdXQoJy9qb2JzLycgKyBqb2IuX2lkLCBqb2IpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICAgICAgdmFyIF9qb2IgPSB2bS5maW5kKGpvYi5faWQpO1xuICAgICAgICAgICAgICAgIF8ubWVyZ2UoX2pvYiwgam9iKTtcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgICB9KS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgJHN0YXRlLmdvKCdmb3JlbWFuLXZpZXcuc2VudC1mb3JlbWFuJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgIH07XG5cblxuXG4gICAgICAvKipcbiAgICAgICAqIEZpbmQgYSB0YXNrIGluIHRoZSB0YXNrIGxpc3QuXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIHVzZXJJZFxuICAgICAgICogQHJldHVybnMgeyp9XG4gICAgICAgKi9cbiAgICAgIHZtLmZpbmQgPSBmdW5jdGlvbiBmaW5kKHRhc2tJZCkge1xuICAgICAgICByZXR1cm4gXy5maW5kKHZtLnRhc2tzLCB7X2lkOiB0YXNrSWR9KTtcbiAgICAgIH07XG5cbiAgICAgIC8vIHZtLmZpbmRKb2IgPSBmdW5jdGlvbiBmaW5kSm9iKGpvYklkKSB7XG4gICAgICAvLyAgIHJldHVybiBfLmZpbmQodm0uam9icywge19pZDogam9iSWR9KTtcbiAgICAgIC8vIH07XG5cbiAgICAgIC8qKlxuICAgICAgICogR2V0IHRhc2tzIGZyb20gdGhlIGRhdGFiYXNlIGFuZCBwb3B1bGF0ZSB0aGUgbG9jYWxcbiAgICAgICAqIGNsaWVudCBzaWRlIGxpc3Qgb2YgdGFzay5cbiAgICAgICAqXG4gICAgICAgKiBAcmV0dXJucyB7Kn1cbiAgICAgICAqL1xuICAgICAgdm0uZ2V0ID0gZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCcvdGFza3MnKVxuICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgIHZtLnRhc2tzLnNwbGljZSgwKTtcblxuICAgICAgICAgICAgcmVzLmRhdGEuZm9yRWFjaChmdW5jdGlvbiAodGFzaykge1xuICAgICAgICAgICAgICB2bS50YXNrcy5wdXNoKHRhc2spO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiB2bS50YXNrcztcbiAgICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgIC8qKlxuICAgICAgICogR2V0IHRhc2tzIGZyb20gdGhlIGRhdGFiYXNlIGFuZCBwb3B1bGF0ZSB0aGUgbG9jYWxcbiAgICAgICAqIGNsaWVudCBzaWRlIGxpc3Qgb2YgdGFzay5cbiAgICAgICAqXG4gICAgICAgKiBAcmV0dXJucyB7Kn1cbiAgICAgICAqL1xuICAgICAgdm0uZ2V0ID0gZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCcvZW50aXRpZXMnKVxuICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgIHZtLmVudGl0aWVzLnNwbGljZSgwKTtcblxuICAgICAgICAgICAgcmVzLmRhdGEuZm9yRWFjaChmdW5jdGlvbiAoZW50aXR5KSB7XG4gICAgICAgICAgICAgIHZtLmVudGl0aWVzLnB1c2goZW50aXR5KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHZtLmVudGl0aWVzO1xuICAgICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgLy8gdm0uZ2V0Sm9icyA9IGZ1bmN0aW9uIGdldEpvYnMoam9iSWQpIHtcbiAgICAgIC8vICAgcmV0dXJuICRodHRwLmdldCgnL2pvYnMvJyArIGpvYklkKVxuICAgICAgLy8gICAgIC50aGVuKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgIC8vICAgICAgIHZtLmVudGl0aWVzLnNwbGljZSgwKTtcbiAgICAgIC8vXG4gICAgICAvLyAgICAgICByZXMuZGF0YS5mb3JFYWNoKGZ1bmN0aW9uIChlbnRpdHkpIHtcbiAgICAgIC8vICAgICAgICAgdm0uZW50aXRpZXMucHVzaChlbnRpdHkpO1xuICAgICAgLy8gICAgICAgfSk7XG4gICAgICAvLyAgICAgICByZXR1cm4gdm0uZW50aXRpZXM7XG4gICAgICAvLyAgICAgfSk7XG4gICAgICAvLyB9O1xuXG4gICAgfSk7XG59KSgpO1xuIiwiKGZ1bmN0aW9uICgpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuICAgIC5zZXJ2aWNlKCdKb2JzJywgZnVuY3Rpb24gKCRodHRwLCAkc3RhdGUpIHtcbiAgICAgIHZhciB2bSA9IHRoaXM7XG5cbiAgICAgIHZtLmpvYnMgPSBbXTtcblxuICAgICAgdm0uZmluZCA9IGZ1bmN0aW9uIGZpbmQoam9iSWQpIHtcbiAgICAgICAgcmV0dXJuIF8uZmluZCh2bS5qb2JzLCB7X2lkOiBqb2JJZH0pO1xuICAgICAgfTtcblxuICAgICAgLyoqXG4gICAgICAgKiBHZXQgdXNlcnMgZnJvbSB0aGUgZGF0YWJhc2UgYW5kIHBvcHVsYXRlIHRoZSBsb2NhbFxuICAgICAgICogY2xpZW50IHNpZGUgbGlzdCBvZiB1c2VyLlxuICAgICAgICpcbiAgICAgICAqIEByZXR1cm5zIHsqfVxuICAgICAgICovXG4gICAgICB2bS5nZXQgPSBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgIHJldHVybiAkaHR0cC5nZXQoJy9qb2JzJylcbiAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICB2bS5qb2JzLnNwbGljZSgwKTtcblxuICAgICAgICAgICAgcmVzLmRhdGEuZm9yRWFjaChmdW5jdGlvbiAoam9iKSB7XG4gICAgICAgICAgICAgIHZtLmpvYnMucHVzaChqb2IpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybiB2bS5qb2JzO1xuICAgICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgLyoqXG4gICAgICAgKiBVcGRhdGUgYSBwcm9qZWN0LlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSBwcm9qZWN0Q29weVxuICAgICAgICogQHJldHVybnMgeyp9XG4gICAgICAgKi9cbiAgICAgIHZtLnB1dCA9IGZ1bmN0aW9uIHB1dChqb2JDb3B5KSB7XG4gICAgICAgIFxuICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICBhcHByb3ZlZDogam9iQ29weS5hcHByb3ZlZFxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiAkaHR0cC5wdXQoJy9qb2JzLycgKyBqb2JDb3B5Ll9pZCwgZGF0YSlcbiAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7XG5cbiAgICAgICAgICAgIHZhciBwID0gdm0uZmluZChqb2JDb3B5Ll9pZCk7XG4gICAgICAgICAgICBfLm1lcmdlKHAsIGpvYkNvcHkpO1xuICAgICAgICAgICAgLy8gJHN0YXRlLmdvKCdqb2JzJywge2pvYklkOiBqb2JDb3B5Ll9pZH0pO1xuICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIC8vVE9ETzogaGFuZGxlIHdoZW4gd2UgY2FuJ3QgdXBkYXRlIGEgcHJvamVjdC5cbiAgICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICB9KTtcblxufSkoKTtcbiIsIihmdW5jdGlvbigpe1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuICAgICAgICAucHJvdmlkZXIoJ3N0b3JhZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICB2YXIgdm0gPSB0aGlzLFxuICAgICAgICAgICAgICAgcHJlZml4ID0gJycsXG4gICAgICAgICAgICAgICBkZWxpbWl0ZXIgPSAnLic7XG5cblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBTZXQgYSBwcmVmaXggZm9yIG91ciBsb2NhbFN0b3JhZ2UgdGhhdCB3aWxsIGJlIHVzZWQgd2hlblxuICAgICAgICAgICAgICogc2V0dGluZyBhbmQgZ2V0dGluZyBrZXlzLlxuICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAqIEBwYXJhbSBfcHJlZml4XG4gICAgICAgICAgICAgKiBAcGFyYW0gX2RlbGltaXRlclxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB2bS5zZXRQcmVmaXggPSBmdW5jdGlvbiBzZXRQcmVmaXgoX3ByZWZpeCwgX2RlbGltaXRlcikge1xuICAgICAgICAgICAgICAgIGlmICghX3ByZWZpeCkgcmV0dXJuO1xuICAgICAgICAgICAgICAgIHByZWZpeCA9IF9wcmVmaXg7XG5cbiAgICAgICAgICAgICAgICBpZiAoX2RlbGltaXRlcikgZGVsaW1pdGVyID0gX2RlbGltaXRlcjtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQ29udmVuaWVuY2UgbWV0aG9kIGZvciBmaW5kaW5nIG91ciBzdG9yYWdlIGtleXMuXG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICogQHBhcmFtIGtleVxuICAgICAgICAgICAgICogQHJldHVybnMgeyp9XG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldEtleShrZXkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJlZml4ID8gcHJlZml4ICsgZGVsaW1pdGVyICsga2V5IDoga2V5O1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogVGhlIHJlcXVpcmVkICRnZXQgbWV0aG9kIGZvciBvdXIgc2VydmljZSBwcm92aWRlci5cbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBAcmV0dXJucyB7e3NldDogRnVuY3Rpb24sIGdldDogRnVuY3Rpb24sIGZvcmdldDogRnVuY3Rpb259fVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB2bS4kZ2V0ID0gZnVuY3Rpb24gJGdldCgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICogU2V0IGEgdmFsdWUgaW50byB0aGUgbG9jYWwgc3RvcmFnZS4gIFNpbXBsZSBqc29uIHN0cmluZ2lmeSBmb3Igb2JqZWN0cy5cbiAgICAgICAgICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAgICAgICAgICogQHBhcmFtIGtleVxuICAgICAgICAgICAgICAgICAgICAgKiBAcGFyYW0gdmFsXG4gICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uIHNldChrZXksIHZhbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oZ2V0S2V5KGtleSksIEpTT04uc3RyaW5naWZ5KHZhbCkpO1xuICAgICAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAgICAgKiBHZXQgYSB2YWx1ZSBmcm9tIGxvY2FsU3RvcmFnZS4gIElmIGEgY29udmVydGVyIGlzIHByb3ZpZGVkIHRoZVxuICAgICAgICAgICAgICAgICAgICAgKiByZXRyaWV2ZWQgb2JqZWN0IHdpbGwgYmUgcGFzc2VkIHRocm91Z2ggZ2l2ZW4gZnVuY3Rpb24gYW5kXG4gICAgICAgICAgICAgICAgICAgICAqIHRoZSByZXN1bHQgb2YgVEhBVCBmdW5jdGlvbiB3aWxsIGJlIHVzZWQuXG4gICAgICAgICAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgICAgICAgICAqIEBwYXJhbSBrZXlcbiAgICAgICAgICAgICAgICAgICAgICogQHBhcmFtIGNvbnZlcnRlclxuICAgICAgICAgICAgICAgICAgICAgKiBAcmV0dXJucyB7Kn1cbiAgICAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24gZ2V0KGtleSwgY29udmVydGVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb252ZXJ0ZXIgPSBhbmd1bGFyLmlzRnVuY3Rpb24oY29udmVydGVyKSA/IGNvbnZlcnRlciA6IGFuZ3VsYXIuaWRlbnRpdHk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29udmVydGVyKEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oZ2V0S2V5KGtleSkpKSk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICAgICAqIFJlbW92ZSBhbiBpdGVtIGZyb20gbG9jYWxTdG9yYWdlLlxuICAgICAgICAgICAgICAgICAgICAgKlxuICAgICAgICAgICAgICAgICAgICAgKiBAcGFyYW0ga2V5XG4gICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICBmb3JnZXQ6IGZ1bmN0aW9uIGZvcmdldChrZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKGdldEtleShrZXkpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgIH0pO1xufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xuXG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnYXBwJylcbiAgICAuc2VydmljZSgnbW9kYWwnLCBmdW5jdGlvbiAoJHVpYk1vZGFsLCAkcm9vdFNjb3BlKSB7XG4gICAgICB0aGlzLm9wZW4gPSBmdW5jdGlvbiBvcGVuKGNvbnRyb2xsZXIsIGNvbnRyb2xsZXJBcywgdGVtcGxhdGUsIHNjb3BlLCBzaXplKSB7XG4gICAgICAgIHZhciAkc2NvcGUgPSAkcm9vdFNjb3BlLiRuZXcoKTtcbiAgICAgICAgXy5tZXJnZSgkc2NvcGUsIHNjb3BlIHx8IHt9KTtcblxuICAgICAgICByZXR1cm4gJHVpYk1vZGFsLm9wZW4oe1xuICAgICAgICAgIHRlbXBsYXRlVXJsOiB0ZW1wbGF0ZSxcbiAgICAgICAgICBjb250cm9sbGVyOiBjb250cm9sbGVyLFxuICAgICAgICAgIGNvbnRyb2xsZXJBczogY29udHJvbGxlckFzLFxuICAgICAgICAgIHNjb3BlOiAkc2NvcGUsXG4gICAgICAgICAgc2l6ZTogc2l6ZSB8fCAnbWQnXG4gICAgICAgIH0pLnJlc3VsdDtcbiAgICAgIH07XG4gICAgfSk7XG59KCkpOyIsIihmdW5jdGlvbiAoKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnYXBwJylcbiAgICAuc2VydmljZSgnVGFza3MnLCBmdW5jdGlvbiAoJGh0dHAsICRzdGF0ZSwgJHVpYk1vZGFsLCAkcm9vdFNjb3BlKSB7XG4gICAgICB2YXIgdm0gPSB0aGlzO1xuXG4gICAgICAvKipcbiAgICAgICAqIFRoZSBsb2NhbCB0YXNrIGxpc3QuXG4gICAgICAgKlxuICAgICAgICogQHR5cGUge0FycmF5fVxuICAgICAgICovXG4gICAgICB2bS50YXNrcyA9IFtdO1xuXG4gICAgICAvKipcbiAgICAgICAqIENyZWF0ZSBhIHRhc2sgb24gdGhlIHNlcnZlci5cbiAgICAgICAqXG4gICAgICAgKiBAcGFyYW0gdGFza1xuICAgICAgICogQHJldHVybnMgeyp9XG4gICAgICAgKi9cbiAgICAgIHZtLmNyZWF0ZVRhc2sgPSBmdW5jdGlvbiBjcmVhdGVUYXNrKHRhc2spIHtcbiAgICAgICAgcmV0dXJuICRodHRwLnBvc3QoJy90YXNrcycsIHRhc2spXG4gICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgdm0udGFza3MucHVzaChyZXMuZGF0YSk7XG4gICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgLyoqXG4gICAgICAgKiBVcGRhdGUgdGhlIHRhc2sgb24gdGhlIHNlcnZlci5cbiAgICAgICAqXG4gICAgICAgKiBAcGFyYW0gdGFza1xuICAgICAgICogQHJldHVybnMgeyp9XG4gICAgICAgKi9cbiAgICAgIHZtLmVkaXRUYXNrID0gZnVuY3Rpb24gZWRpdFRhc2sodGFzaykge1xuICAgICAgICByZXR1cm4gJGh0dHAucHV0KCcvdGFza3MvJyArIHRhc2suX2lkLCB0YXNrKVxuICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgIHZhciBfdGFzayA9IHZtLmZpbmQodGFzay5faWQpO1xuICAgICAgICAgICAgXy5tZXJnZShfdGFzaywgdGFzayk7XG4gICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgLyoqXG4gICAgICAgKiBPcGVuIGEgbW9kYWwgZm9yIGFkZGluZyBhIHRhc2suXG4gICAgICAgKlxuICAgICAgICogQHJldHVybnMgeyp9XG4gICAgICAgKi9cbiAgICAgIHZtLmFkZCA9IGZ1bmN0aW9uIGFkZCgpIHtcbiAgICAgICAgcmV0dXJuICR1aWJNb2RhbC5vcGVuKHtcbiAgICAgICAgICBjb250cm9sbGVyOiAnVGFza01vZGFsQ29udHJvbGxlcicsXG4gICAgICAgICAgY29udHJvbGxlckFzOiAndGFza01vZGFsJyxcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3BhcnRpYWxzL3Rhc2tzL3Rhc2stZm9ybS5odG1sJ1xuICAgICAgICB9KS5yZXN1bHQudGhlbih2bS5jcmVhdGVUYXNrKTtcbiAgICAgIH07XG5cbiAgICAgIHZtLmVkaXQgPSBmdW5jdGlvbiBlZGl0KHRhc2spIHtcbiAgICAgICAgdmFyIHNjb3BlID0gJHJvb3RTY29wZS4kbmV3KCk7XG4gICAgICAgIHNjb3BlLnRhc2sgPSB0YXNrO1xuXG4gICAgICAgIHJldHVybiAkdWliTW9kYWwub3Blbih7XG4gICAgICAgICAgY29udHJvbGxlcjogJ1Rhc2tNb2RhbENvbnRyb2xsZXInLFxuICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3Rhc2tNb2RhbCcsXG4gICAgICAgICAgdGVtcGxhdGVVcmw6ICdwYXJ0aWFscy90YXNrcy90YXNrLWZvcm0uaHRtbCcsXG4gICAgICAgICAgc2NvcGU6IHNjb3BlXG4gICAgICAgIH0pLnJlc3VsdC50aGVuKHZtLmVkaXRUYXNrKTtcbiAgICAgIH07XG5cbiAgICAgIC8qKlxuICAgICAgICogRmluZCBhIHRhc2sgaW4gdGhlIHRhc2sgbGlzdC5cbiAgICAgICAqXG4gICAgICAgKiBAcGFyYW0gdXNlcklkXG4gICAgICAgKiBAcmV0dXJucyB7Kn1cbiAgICAgICAqL1xuICAgICAgdm0uZmluZCA9IGZ1bmN0aW9uIGZpbmQodGFza0lkKSB7XG4gICAgICAgIHJldHVybiBfLmZpbmQodm0udGFza3MsIHtfaWQ6IHRhc2tJZH0pO1xuICAgICAgfTtcblxuICAgICAgLyoqXG4gICAgICAgKiBHZXQgdGFza3MgZnJvbSB0aGUgZGF0YWJhc2UgYW5kIHBvcHVsYXRlIHRoZSBsb2NhbFxuICAgICAgICogY2xpZW50IHNpZGUgbGlzdCBvZiB0YXNrLlxuICAgICAgICpcbiAgICAgICAqIEByZXR1cm5zIHsqfVxuICAgICAgICovXG4gICAgICB2bS5nZXQgPSBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgIHJldHVybiAkaHR0cC5nZXQoJy90YXNrcycpXG4gICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgdm0udGFza3Muc3BsaWNlKDApO1xuXG4gICAgICAgICAgICByZXMuZGF0YS5mb3JFYWNoKGZ1bmN0aW9uICh0YXNrKSB7XG4gICAgICAgICAgICAgIHZtLnRhc2tzLnB1c2godGFzayk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIHZtLnRhc2tzO1xuICAgICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgLyoqXG4gICAgICAgKiBVcGRhdGUgYSBwcm9qZWN0LlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSBwcm9qZWN0Q29weVxuICAgICAgICogQHJldHVybnMgeyp9XG4gICAgICAgKi9cbiAgICAgIHZtLnB1dCA9IGZ1bmN0aW9uIHB1dCh0YXNrQ29weSkge1xuICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICB0aXRsZTogdGFza0NvcHkudGl0bGUsXG4gICAgICAgICAgdGFzazogdGFza0NvcHkudGFzay5faWRcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gJGh0dHAucHV0KCcvdGFza3MvJyArIHRhc2tDb3B5Ll9pZCwgZGF0YSlcbiAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIHAgPSB2bS5maW5kKHRhc2tDb3B5Ll9pZCk7XG4gICAgICAgICAgICBfLm1lcmdlKHAsIHRhc2tDb3B5KTtcbiAgICAgICAgICAgICRzdGF0ZS5nbygndGFza3MudGFza3MnLCB7dGFza0lkOiB0YXNrQ29weS5faWR9KTtcbiAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAvL1RPRE86IGhhbmRsZSB3aGVuIHdlIGNhbid0IHVwZGF0ZSBhIHByb2plY3QuXG4gICAgICAgICAgfSk7XG4gICAgICB9O1xuICAgICAgLyoqXG4gICAgICAgKiBEZWxldGUgYSB0YXNrLlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB0YXNrSWRcbiAgICAgICAqIEByZXR1cm5zIHsqfVxuICAgICAgICovXG4gICAgICB2bS5kZWwgPSBmdW5jdGlvbiBkZWwodGFza0lkKSB7XG4gICAgICAgIHJldHVybiAkaHR0cC5kZWxldGUoJy90YXNrcy8nICsgdGFza0lkKVxuICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgIF8ucmVtb3ZlKHZtLnRhc2tzLCB7X2lkOiB0YXNrSWR9KTtcbiAgICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgfSk7XG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBhbmd1bGFyLm1vZHVsZSgnYXBwJylcbiAgICAuc2VydmljZSgnVXNlcnMnLCBmdW5jdGlvbiAoJGh0dHAsICRzdGF0ZSwgJHVpYk1vZGFsLCAkcm9vdFNjb3BlLCBzdG9yYWdlKSB7XG4gICAgICB2YXIgdm0gPSB0aGlzO1xuICAgICAgdm0uY3VycmVudFVzZXIgPSBudWxsO1xuICAgICAgdm0uY3VycmVudFVzZXJUb2tlbiA9IG51bGw7XG5cbiAgICAgIC8qKlxuICAgICAgICogVGhlIGxvY2FsIHVzZXIgbGlzdC5cbiAgICAgICAqXG4gICAgICAgKiBAdHlwZSB7QXJyYXl9XG4gICAgICAgKi9cbiAgICAgIHZtLnVzZXJzID0gW107XG5cbiAgICAgIC8qKlxuICAgICAgICogQ3JlYXRlIGEgdXNlciBvbiB0aGUgc2VydmVyLlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB1c2VyXG4gICAgICAgKiBAcmV0dXJucyB7Kn1cbiAgICAgICAqL1xuICAgICAgdm0uY3JlYXRlVXNlciA9IGZ1bmN0aW9uIGNyZWF0ZVVzZXIodXNlcikge1xuICAgICAgICByZXR1cm4gJGh0dHAucG9zdCgnL3VzZXJzJywgdXNlcilcbiAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICB2bS51c2Vycy5wdXNoKHJlcy5kYXRhKTtcbiAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICAvKipcbiAgICAgICAqIFVwZGF0ZSB0aGUgdXNlciBvbiB0aGUgc2VydmVyLlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB1c2VyXG4gICAgICAgKiBAcmV0dXJucyB7Kn1cbiAgICAgICAqL1xuICAgICAgdm0uZWRpdFVzZXIgPSBmdW5jdGlvbiBlZGl0VXNlcih1c2VyKSB7XG4gICAgICAgIHJldHVybiAkaHR0cC5wdXQoJy91c2Vycy8nICsgdXNlci5faWQsIHVzZXIpXG4gICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgdmFyIF91c2VyID0gdm0uZmluZCh1c2VyLl9pZCk7XG4gICAgICAgICAgICBfLm1lcmdlKF91c2VyLCB1c2VyKTtcbiAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICAvKipcbiAgICAgICAqXG4gICAgICAgKiBAcGFyYW0gdXNlclxuICAgICAgICogQHJldHVybnMgeyp9XG4gICAgICAgKi9cbiAgICAgIHZtLmVkaXQgPSBmdW5jdGlvbiBlZGl0KHVzZXIpIHtcbiAgICAgICAgdmFyIHNjb3BlID0gJHJvb3RTY29wZS4kbmV3KCk7XG4gICAgICAgIHNjb3BlLnVzZXIgPSB1c2VyO1xuXG4gICAgICAgIHJldHVybiAkdWliTW9kYWwub3Blbih7XG4gICAgICAgICAgY29udHJvbGxlcjogJ1VzZXJNb2RhbENvbnRyb2xsZXInLFxuICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3VzZXJNb2RhbCcsXG4gICAgICAgICAgdGVtcGxhdGVVcmw6ICdwYXJ0aWFscy91c2Vycy9mb3JtLmh0bWwnLFxuICAgICAgICAgIHNjb3BlOiBzY29wZVxuICAgICAgICB9KS5yZXN1bHQudGhlbih2bS5lZGl0VXNlcik7XG4gICAgICB9O1xuXG4gICAgICAvKipcbiAgICAgICAqIE9wZW4gYSBtb2RhbCBmb3IgYWRkaW5nIGEgdXNlci5cbiAgICAgICAqXG4gICAgICAgKiBAcmV0dXJucyB7Kn1cbiAgICAgICAqL1xuICAgICAgdm0uYWRkID0gZnVuY3Rpb24gYWRkKCkge1xuICAgICAgICByZXR1cm4gJHVpYk1vZGFsLm9wZW4oe1xuICAgICAgICAgIGNvbnRyb2xsZXI6ICdVc2VyTW9kYWxDb250cm9sbGVyJyxcbiAgICAgICAgICBjb250cm9sbGVyQXM6ICd1c2VyTW9kYWwnLFxuICAgICAgICAgIHRlbXBsYXRlVXJsOiAncGFydGlhbHMvdXNlcnMvZm9ybS5odG1sJ1xuICAgICAgICB9KS5yZXN1bHQudGhlbih2bS5jcmVhdGVVc2VyKTtcbiAgICAgIH07XG5cbiAgICAgIC8qKlxuICAgICAgICogRmluZCBhIHVzZXIgaW4gdGhlIHVzZXIgbGlzdC5cbiAgICAgICAqXG4gICAgICAgKiBAcGFyYW0gdXNlcklkXG4gICAgICAgKiBAcmV0dXJucyB7Kn1cbiAgICAgICAqL1xuICAgICAgdm0uZmluZCA9IGZ1bmN0aW9uIGZpbmQodXNlcklkKSB7XG4gICAgICAgIHJldHVybiBfLmZpbmQodm0udXNlcnMsIHtfaWQ6IHVzZXJJZH0pO1xuICAgICAgfTtcblxuICAgICAgLyoqXG4gICAgICAgKiBHZXQgdXNlcnMgZnJvbSB0aGUgZGF0YWJhc2UgYW5kIHBvcHVsYXRlIHRoZSBsb2NhbFxuICAgICAgICogY2xpZW50IHNpZGUgbGlzdCBvZiB1c2VyLlxuICAgICAgICpcbiAgICAgICAqIEByZXR1cm5zIHsqfVxuICAgICAgICovXG4gICAgICB2bS5nZXQgPSBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgIHJldHVybiAkaHR0cC5nZXQoJy91c2VycycpXG4gICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgdm0udXNlcnMuc3BsaWNlKDApO1xuXG4gICAgICAgICAgICByZXMuZGF0YS5mb3JFYWNoKGZ1bmN0aW9uICh1c2VyKSB7XG4gICAgICAgICAgICAgIHZtLnVzZXJzLnB1c2godXNlcik7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmV0dXJuIHZtLnVzZXJzO1xuICAgICAgICAgIH0pO1xuICAgICAgfTtcblxuICAgICAgLyoqXG4gICAgICAgKiBEZWxldGUgYSB1c2VyLlxuICAgICAgICpcbiAgICAgICAqIEBwYXJhbSB1c2VySWRcbiAgICAgICAqIEByZXR1cm5zIHsqfVxuICAgICAgICovXG4gICAgICB2bS5kZWwgPSBmdW5jdGlvbiBkZWwodXNlcklkKSB7XG4gICAgICAgIHJldHVybiAkaHR0cC5kZWxldGUoJy91c2Vycy8nICsgdXNlcklkKVxuICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgIF8ucmVtb3ZlKHZtLnVzZXJzLCB7X2lkOiB1c2VySWR9KTtcbiAgICAgICAgICB9KTtcbiAgICAgIH07XG5cbiAgICAgIC8qKlxuICAgICAgICogTG9naW4gYSB1c2VyIHdpdGggdGhlIHByb3ZpZGVkIGNyZWRlbnRpYWxzLlxuICAgICAgICogQHBhcmFtIGNyZWRzXG4gICAgICAgKiBAcmV0dXJucyB7Kn1cbiAgICAgICAqL1xuICAgICAgdm0ubG9naW4gPSBmdW5jdGlvbiBsb2dpbihjcmVkcykge1xuICAgICAgICByZXR1cm4gJGh0dHAucG9zdCgnL2xvZ2luJywgY3JlZHMpXG4gICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgdm0uY3VycmVudFVzZXIgPSByZXMuZGF0YS51c2VyO1xuICAgICAgICAgICAgdm0uY3VycmVudFVzZXJUb2tlbiA9IHJlcy5kYXRhLnRva2VuO1xuICAgICAgICAgICAgJHJvb3RTY29wZS5jdXJyZW50VXNlciA9IHZtLmN1cnJlbnRVc2VyO1xuICAgICAgICAgICAgc3RvcmFnZS5zZXQoJ3Rva2VuJywgcmVzLmRhdGEudG9rZW4pO1xuICAgICAgICAgICAgc3RvcmFnZS5zZXQoJ2N1cnJlbnRVc2VyJywgcmVzLmRhdGEudXNlcik7XG4gICAgICAgICAgICByZXR1cm4gdm0uY3VycmVudFVzZXI7XG4gICAgICAgICAgfSk7XG4gICAgICB9O1xuXG4gICAgICAvKipcbiAgICAgICAqXG4gICAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgICAqL1xuICAgICAgdm0uaXNMb2dnZWRJbiA9IGZ1bmN0aW9uIGlzTG9nZ2VkSW4oKSB7XG4gICAgICAgIHJldHVybiAhIXZtLmN1cnJlbnRVc2VyO1xuICAgICAgfTtcblxuICAgICAgLyoqXG4gICAgICAgKlxuICAgICAgICogQHBhcmFtIGNyZWRzXG4gICAgICAgKi9cbiAgICAgIHZtLnN0YXlMb2dnZWRJbiA9IGZ1bmN0aW9uIHN0YXlMb2dnZWRJbigpIHtcbiAgICAgICAgdm0uY3VycmVudFVzZXIgPSBzdG9yYWdlLmdldCgnY3VycmVudFVzZXInKTtcbiAgICAgICAgdm0uY3VycmVudFVzZXJUb2tlbiA9IHN0b3JhZ2UuZ2V0KCd0b2tlbicpO1xuICAgICAgICAkcm9vdFNjb3BlLmN1cnJlbnRVc2VyID0gdm0uY3VycmVudFVzZXI7XG4gICAgICB9O1xuXG4gICAgICAvKipcbiAgICAgICAqIExvZyBvdXQgYSB1c2VyLlxuICAgICAgICovXG4gICAgICB2bS5sb2dvdXQgPSBmdW5jdGlvbiBsb2dvdXQoKSB7XG4gICAgICAgIHZtLmN1cnJlbnRVc2VyID0gbnVsbDtcbiAgICAgICAgdm0uY3VycmVudFVzZXJUb2tlbiA9IG51bGw7XG4gICAgICAgICRyb290U2NvcGUuY3VycmVudFVzZXIgPSBudWxsO1xuICAgICAgICBzdG9yYWdlLmZvcmdldCgnY3VycmVudFVzZXInKTtcbiAgICAgICAgc3RvcmFnZS5mb3JnZXQoJ3Rva2VuJyk7XG4gICAgICAgICRzdGF0ZS5nbygnbG9naW4nKTtcbiAgICAgIH07XG4gICAgfSk7XG59KSgpO1xuIiwiKGZ1bmN0aW9uICgpIHtcblxuICAndXNlIHN0cmljdCc7XG5cbiAgYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG4gICAgLmNvbnRyb2xsZXIoJ0NvbmZpcm1Vc2VyRGVsZXRlJywgZnVuY3Rpb24gKCR1aWJNb2RhbEluc3RhbmNlKSB7XG4gICAgICB2YXIgdm0gID0gdGhpcztcblxuICAgICAgLyoqXG4gICAgICAgKiBBZmZpcm1hdGl2ZWx5IGNsb3NlIHRoZSBkaWFsb2dcbiAgICAgICAqL1xuICAgICAgdm0uY2xvc2UgPSBmdW5jdGlvbiBjbG9zZSgpIHtcbiAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2UuY2xvc2UoKTtcbiAgICAgIH07XG5cbiAgICAgIC8qKlxuICAgICAgICogQ2FuY2VsIHRoZSBkaWFsb2dcbiAgICAgICAqL1xuICAgICAgdm0uZGlzbWlzcyA9IGZ1bmN0aW9uIGRpc21pc3MoKSB7XG4gICAgICAgICR1aWJNb2RhbEluc3RhbmNlLmRpc21pc3MoKTtcbiAgICAgIH07XG4gICAgfSk7XG59KCkpOyIsIihmdW5jdGlvbiAoKSB7XG5cbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuICAgIC5jb250cm9sbGVyKCdVc2VyTW9kYWxDb250cm9sbGVyJywgZnVuY3Rpb24gKCR1aWJNb2RhbEluc3RhbmNlLCAkc2NvcGUpIHtcbiAgICAgIHZhciB2bSA9IHRoaXM7XG5cbiAgICAgIHZtLnVzZXIgPSAkc2NvcGUudXNlciA/IGFuZ3VsYXIuY29weSgkc2NvcGUudXNlcikgOiB7fTtcbiAgICBcbiAgICAgIC8qKlxuICAgICAgICogU2F2aW5nIHRoZSB1c2VyLlxuICAgICAgICovXG4gICAgICB2bS5vayA9IGZ1bmN0aW9uIG9rKCkge1xuICAgICAgICAkdWliTW9kYWxJbnN0YW5jZS5jbG9zZSh2bS51c2VyKTtcbiAgICAgIH07XG5cbiAgICAgIC8qKlxuICAgICAgICogRGlzbWlzc2luZyB0aGUgbW9kYWwsIGRvIG5vdCBzYXZlIHVzZXIuXG4gICAgICAgKi9cbiAgICAgIHZtLmNhbmNlbCA9IGZ1bmN0aW9uIGNhbmNlbCgpIHtcbiAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2UuZGlzbWlzcygpO1xuICAgICAgfTtcbiAgICB9KTtcbn0oKSk7IiwiKGZ1bmN0aW9uICgpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuICAgIC5jb250cm9sbGVyKCdVc2Vyc0NvbnRyb2xsZXInLCBmdW5jdGlvbiAoVXNlcnMsIHVzZXJzLCBtb2RhbCkge1xuICAgICAgdmFyIHZtID0gdGhpcztcblxuICAgICAgdm0udXNlcnMgPSB1c2VycztcbiAgICAgIHZtLmN1cnJlbnRVc2VyID0gVXNlcnMuY3VycmVudFVzZXI7XG4gICAgICB2bS5hZGQgPSBVc2Vycy5hZGQ7XG4gICAgICB2bS5lZGl0ID0gVXNlcnMuZWRpdDtcbiAgICAgIHZtLnJlbW92ZSA9IFVzZXJzLmRlbDtcbiAgICAgIHZtLmxvZ291dCA9IFVzZXJzLmxvZ291dDtcblxuICAgICAvKipcbiAgICAgICAqIENvbmZpcm0gd2hlbiB3ZSB3YW50IHRvIGRlbGV0ZSBhIHVzZXIuXG4gICAgICAgKi9cbiAgICAgIHZtLmNvbmZpcm1EZWxldGUgPSBmdW5jdGlvbiBjb25maXJtRGVsZXRlKHVzZXJJZCkge1xuICAgICAgICBtb2RhbC5vcGVuKCdDb25maXJtVXNlckRlbGV0ZScsICd1c2VyRGVsZXRlJywgJ3BhcnRpYWxzL3VzZXJzL2NvbmZpcm0tZGVsZXRlLXVzZXIuaHRtbCcpXG4gICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlcykge1xuICAgICAgICAgICAgVXNlcnMuZGVsKHVzZXJJZCk7XG4gICAgICAgICAgfSk7XG4gICAgICB9O1xuICAgICAgXG4gICAgfSk7XG59KSgpOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
