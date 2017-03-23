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


.controller('DbCtrl', function($scope, ionicDatePicker) {

  var db = new PouchDB('holsettings');
  getAppSettings();

  //ionic date picker
  var setDate1 = {
        callback: function (val) {  //Mandatory
          $scope.settingData.startdate = moment().format("DD MMM YYYY");
          console.log($scope.settingData.startdate);
          console.log(new Date(val));
          },
        disabledDates: [ ],
        };

      $scope.openDatePicker1 = function(){
        ionicDatePicker.openDatePicker(setDate1);
      };

      var setDate2 = {
            callback: function (val) {  //Mandatory
              $scope.settingData.enddate = new Date(val);
            }
            };

          $scope.openDatePicker2 = function(){
            ionicDatePicker.openDatePicker(setDate2);
          };

  $scope.saveSettings = function() {

    var a = moment($scope.settingData.startdate);
    var b = moment($scope.settingData.enddate);
    var c = moment().weekdayCalc($scope.settingData.enddate,$scope.settingData.startdate,[1,2,3,4,5]);
    console.log(c);

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

.controller('HolDbCtrl', function($scope, ionicDatePicker, $ionicModal) {

  var db = new PouchDB('holidayapp');

  $scope.holidayData = {};
  $scope.selectHols = null;
  $scope.holidayArray = [];
  getAllHols();
  console.log($scope.selectHols);

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/addholiday.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeAddHol = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.openAddHol = function() {
    $scope.modal.show();
  };


  var setDate1 = {
        callback: function (val) {  //Mandatory
          $scope.holidayData.startdate = moment().format("DD MMM YYYY");
        }
        };

      $scope.openDatePicker1 = function(){
        ionicDatePicker.openDatePicker(setDate1);
      };

  var setDate2 = {
        callback: function (val) {  //Mandatory
          $scope.holidayData.enddate = moment().format("DD MMM YYYY");
          $scope.calcDays(); //calculate days taken
        }
        };

      $scope.openDatePicker2 = function(){
        ionicDatePicker.openDatePicker(setDate2);
      };

      $scope.calcDays = function(){
      $scope.holidayData.daystaken = moment().weekdayCalc($scope.holidayData.enddate,$scope.holidayData.startdate,[1,2,3,4,5]) + 1;
    };

  $scope.saveNewHol = function() {
  db.post({
    startdate: $scope.holidayData.startdate,
    enddate: $scope.holidayData.enddate,
    daystaken: $scope.holidayData.daystaken,
    approved: $scope.holidayData.approved

  }).then(function(response) {
  console.log('holiday saved');
    $scope.holidayData.startdate = "click here to add a date";
    $scope.holidayData.enddate = "Click here to add a date";
    $scope.holidayData.daystaken = 0;
    $scope.holidayData.approved = false;
    $scope.closeAddHol();

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
