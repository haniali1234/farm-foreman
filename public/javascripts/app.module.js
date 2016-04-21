(function () {
  'use strict';

  angular.module('app', ['ui.router', 'app.ui', 'ui.bootstrap', 'ui.select', 'ngSanitize'])
    .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

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
            jobs: function (Admin) {
              return Admin.get();
            }
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
            jobs: function (Admin) {
              return Admin.get();
            }
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
            job: function (Admin, $stateParams, jobs) {
              return Admin.find($stateParams.jobId);
            }
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
            jobs: function (Admin) {
              return Admin.get();
            }
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
            tasks: function (Tasks) {
              return Tasks.get();
            },
            entities: function (Entities) {
              return Entities.get();
            }
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
            users: function (Users) {
              //RETURNS A PROMISE, CONTROLLER IS CALLED WHEN PROMISE IS RESOLVED
              return Users.get();
            }
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
            entities: function (Entities) {
              return Entities.get();
            }
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
            entity: function (Entities, $stateParams, entities) {
              return Entities.find($stateParams.entityId);
            }
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
            tasks: function (Tasks) {
              //RETURNS A PROMISE, CONTROLLER IS CALLED WHEN PROMISE IS RESOLVED
              return Tasks.get();
            }
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
            foremans: function (Foremans) {
              return Foremans.get();
            },
            tasks: function (Tasks) {
              return Tasks.get();
            },
            entities: function (Entities) {
              return Entities.get();
            }
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
            jobs: function (Admin) {
              return Admin.get();
            }
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
            job: function (Admin, $stateParams, foremans, jobs) {
              return Admin.find($stateParams.jobId);
            },
            foremans: function (Foremans) {
              return Foremans.get();
            },
            tasks: function (Tasks) {
              return Tasks.get();
            },
            entities: function (Entities) {
              return Entities.get();
            }
          },
          data: {
            requiresLogin: true,
            bodyClass: 'foreman'
          }
        });

      /**
       * Configure HTTP Interceptors
       */
      $httpProvider.interceptors.push(function ($injector) {
        return {
          request: function (config) {
            var Users = $injector.get('Users');
            if (Users.isLoggedIn()) config.headers.Authorization = 'Token ' + Users.currentUserToken;
            return config;
          }
        };
      });
    })
    .run(function ($rootScope, Users, $state, storage) {
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
    });
}());
