angular.module('holiday', ['ionic', 'holiday.controllers', 'holiday.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/sidebar.html',
    controller: 'AppCtrl'
  })

  .state('app.home', {
    url: '/home',
    views: {
      'mainContent': {
        templateUrl: 'templates/home.html'
      }
    }
  })

  .state('app.addholiday', {
      url: '/addholiday',
      views: {
        'mainContent': {
          templateUrl: 'templates/addholiday.html'
        }
      }
    })
    .state('app.editholiday', {
      url: '/editholiday',
      views: {
        'mainContent': {
          templateUrl: 'templates/editholiday.html',
          controller: ''
        }
      }
    })

    .state('app.settings', {
      url: '/settings',
      views: {
        'mainContent': {
          templateUrl: 'templates/settings.html',
          controller: ''
        }
      }
    })

    .state('app.viewholiday', {
      url: '/viewholiday',
      views: {
        'mainContent': {
          templateUrl: 'templates/viewholiday.html',
          controller: ''
        }
      }
    })

  .state('app.removeholiday', {
    url: '/removeholiday',
    views: {
      'mainContent': {
        templateUrl: 'templates/removeholiday.html',
        controller: ''
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('app/home');
});
