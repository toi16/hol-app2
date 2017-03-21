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


.controller('DbCtrl', function($scope) {

  var db = new PouchDB('holsettings');
  getAppSettings();

  $scope.saveSettings = function() {
  db.get('appsettings').then(function(doc) { //get current settings then save with new revision
  return db.put({
    _id: 'appsettings',
    _rev: doc._rev,
    startdate: $scope.settingData.startdate,
    enddate: $scope.settingData.enddate,
    holdays: $scope.settingData.holdays,
    bankdays: $scope.settingData.bankdays,
    bankinc: $scope.settingData.bankinc,
    daysused: $scope.settingData.daysused
  });
}).then(function(response) {
  console.log('data saved');
}).catch(function (err) {
  console.log(err);
});
}

function getAppSettings() {

  db.get('appsettings').then(function (doc) {
    $scope.settingData = doc; //sets settingData to db values.
    if ($scope.settingData.bankinc = true) {
      $scope.entitle = $scope.settingData.holdays + $scope.settingData.bankdays;
    }else {
      $scope.entitle = $scope.settingData.holdays
    };

   }).catch(function (err) {
     console.log(err);
       var initSettings = {
       _id: "appsettings",
       startdate: "2017-03-01",
       enddate: "2017-12-31",
       holdays: 20,
       bankdays: 8,
       bankinc: "false",
       daysused: 0
     };

     db.put(initSettings, function callback(err, result) {
       if (!err) {
         console.log('Successfully added default settings');
       }
   });
  });
}
})

.controller('HolDbCtrl', function($scope) {

  var db = new PouchDB('holidayapp');

  $scope.holidayData = {};
  $scope.selectHols = null;
  $scope.holidayArray = [];
  getAllHols();
  console.log($scope.selectHols);

  $scope.saveNewHol = function() {
  db.post({
    startdate: $scope.holidayData.startdate,
    enddate: $scope.holidayData.enddate,
    daystaken: $scope.holidayData.daystaken,
    approved: $scope.holidayData.approved

  }).then(function(response) {
  console.log('holiday saved');
}).catch(function (err) {
  console.log(err);
});
}


  function getAllHols() {
    db.allDocs({
      include_docs: true,
      attachments: true
    }).then(function (result) {
      console.log(result.rows);
        $scope.holidayArray = result.rows;
    }).catch(function (err) {
      console.log(err);
    });
  };

})
