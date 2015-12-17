// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

var mode=0; 
  
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (rem ove this to show the accessory bar above the keyboard
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



.controller('showMenuCtrl', function($scope, $ionicSideMenuDelegate,$element) {  
  $scope.showMenu = function() {
    if(mode==0){ 
      $ionicSideMenuDelegate.toggleLeft();  
      $ionicNavBarDelegate.toggleLeft(); 
      mode=1;  
 
    }else{
      $ionicSideMenuDelegate.toggleRight();
       
      mode=0;
 
    }
     
  }; 
})
                             
                              
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider 

    .state('app', {
    url: '/app',
    abstract: true,  
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  }) 

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.exhibiciones', { 
      url: '/exhibiciones',
      views: {
        'menuContent': {
          templateUrl: 'templates/exhibiciones.html',  
          controller: 'ExhibicionesCtrl'
        } 
      }
    })

  .state('app.single', {
    url: '/exhibiciones/:exhibicionID',
    views: {
      'menuContent': {
        templateUrl: 'templates/exhibicion.html',
        controller: 'ExhibicionCtrl',
        
      }
    }
 
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/exhibiciones');
})
 


 
    
