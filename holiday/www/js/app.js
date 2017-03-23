angular.module('holiday', ['ionic', 'holiday.controllers', 'holiday.services', 'ionic-datepicker'])

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
//date picker config settings for whole app
.config(function (ionicDatePickerProvider) {
    var datePickerObj = {
      inputDate: new Date(),
      titleLabel: 'Select a Date',
      setLabel: 'Set',
      todayLabel: 'Today',
      closeLabel: 'Close',
      mondayFirst: false,
      weeksList: ["S", "M", "T", "W", "T", "F", "S"],
      monthsList: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
      templateType: 'popup',
      from: new Date(2012, 8, 1),
      to: new Date(2018, 8, 1),
      showTodayButton: true,
      dateFormat: 'dd-MMM-yyyy',
      closeOnSelect: false,
      disableWeekdays: [0,6]
    };
    ionicDatePickerProvider.configDatePicker(datePickerObj);
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
        templateUrl: 'templates/home.html',
        controller: 'SettingsCtrl'
      }
    }
  })

  .state('app.addholiday', {
      url: '/addholiday',
      views: {
        'mainContent': {
          templateUrl: 'templates/addholiday.html',
          controller: 'HolDbCtrl'
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
          controller: 'DbCtrl'
        }
      }
    })

    .state('app.viewholiday', {
      url: '/viewholiday',
      views: {
        'mainContent': {
          templateUrl: 'templates/viewholiday.html',
          controller: 'HolDbCtrl'
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
