angular.module('holiday.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $localStorage) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
   $scope.loginData = $localStorage.getObject('userinfo','{}');

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);
    $localStorage.storeObject('userinfo',$scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})


.controller('SettingsCtrl', function($scope, $localStorage) {

  $scope.settingData = $localStorage.getObject('settings','{}');

  $scope.saveSettings = function() {
    console.log('Saving Settings', $scope.settingData);
    $localStorage.storeObject('settings',$scope.settingData);

  };
})

.controller('HolidayCtrl', function($scope, $localStorage) {
  $scope.holidayData = $localStorage.getObject('holidays','{}');

  $scope.saveHoliday = function() {
    console.log('Saving Holiday', $scope.holidayData);
    $localStorage.storeObject('holidays',$scope.holidayData);

  };
})
