// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

var mode = 0;
var db = null;

angular.module('starter', ['ionic', 'ngCordova', 'starter.controllers', 'ngCordovaBeacon','ionicLazyLoad']) 

.run(function ($ionicPlatform, $cordovaSQLite) {
	$ionicPlatform.ready(function () { 
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


		if (window.cordova && window.SQLitePlugin) {
			db = $cordovaSQLite.openDB("my.db", 1);
			//$cordovaSQLite.execute(db, "DROP TABLE IF EXISTS audioguias"); 
			//$cordovaSQLite.execute(db, "DROP TABLE IF EXISTS piezas"); 
			$cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS piezas (id integer primary key, idPiece integer, name text, url text,description text,room text,showcase text,exhibitionID integer)");
			$cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS audioguias (id integer primary key, idAudioguide integer, name text , url text,description text,text text,urlAudio text, exhibitionID integer)");
		} else {

			db = window.openDatabase('my', '1.0', 'my.db', 100 * 1024 * 1024);
			//$cordovaSQLite.execute(db, "DROP TABLE IF EXISTS audioguias"); 
			//$cordovaSQLite.execute(db, "DROP TABLE IF EXISTS piezas"); 
			$cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS piezas (id integer primary key, idPiece integer,  name text ,url text,description text,room text,showcase text,exhibitionID integer)");
			$cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS audioguias (id integer primary key, idAudioguide integer, name text , url text,description text,text text,urlAudio text, exhibitionID integer)");

		}

	});


})

 
/*.factory ('dataLang',function(){   
    var lang = 'es';
   
    var cambiarLang = function(mode){ 
        console.log(mode+"cambiado exitosamente"); 
        lang = mode;
    }   
     
    var obtenerLang = function(){
        return lang;  
    }
    return {lang : 'es'}; 
})
 */
/* 
.controller('langCtrl',function($scope,dataLang){
  console.log(dataLang);   
  $scope.langClass  = dataLang;
})
*/


.controller('showMenuCtrl', function ($scope, $ionicSideMenuDelegate, $element) {
	$scope.showMenu = function () {
		if (mode == 0) {
			$ionicSideMenuDelegate.toggleLeft();
			$ionicNavBarDelegate.toggleLeft();
			mode = 1;

		} else {
			$ionicSideMenuDelegate.toggleRight();

			mode = 0;

		}

	};
})


.config(function ($stateProvider, $urlRouterProvider) {
	$stateProvider

		.state('app', {
		url: '/app',
		abstract: true,
		templateUrl: 'templates/menu.html'
			/*, 
			    controller: "menuCtrl"*/
	})

	/*  .state('app.search', {
	    url: '/search',
	    views: { 
	      'menuContent': { 
	        templateUrl: 'templates/search.html'   
	      } 
	    }
	  })  */

	.state('app.myFavorites', { 
			url: '/myFavorites',
			views: {
				'menuContent': {
					templateUrl: 'templates/myFavorites.html',
					controller: 'myFavoritesCtrl'
				},
				'header': {
					templateUrl: 'templates/headerExhibition.html'

				} 
			}
		})
		.state('app.audioguides', {
			url: '/audioguides', 
			views: {
				'menuContent': {
					templateUrl: 'templates/audioguides.html',
					controller: 'ExhibicionCtrl'
				},
				'header': {
					templateUrl: 'templates/headerExhibition.html'

				}
			}
		})
		.state('app.exhibiciones', {
			url: '/exhibiciones',
			views: {
				'menuContent': {
					templateUrl: 'templates/exhibiciones.html',
					controller: 'ExhibicionCtrl'
				},
				'header': {
					templateUrl: 'templates/headerExhibition.html'

				}
			}
		})
	.state('app.ticketSell', {
			url: '/ticketSell',
			views: {
				'menuContent': {
					templateUrl: 'templates/ticketSell.html',
					controller: 'ticketSellCtrl' 
				},
				'header': {
					templateUrl: 'templates/headerExhibition.html'

				}
			}
		})
	.state('app.ticket', {
			url: '/ticketCode',
			views: { 
				'menuContent': {
					templateUrl: 'templates/ticketCode.html',
					controller: 'ticketSellCtrl'  
				},
				'header': {
					templateUrl: 'templates/headerExhibition.html'

				}
			}
		})
	.state('app.events', {
		url: '/events',
		views: {
			'menuContent': {
				templateUrl: 'templates/events.html',
				controller: 'EventsCtrl'

			},
			'header': {
				templateUrl: 'templates/headerExhibition.html'
			}
		}

	})
    .state('app.museumMap', {
		url: '/museumMap',
		views: {
			'menuContent': {
				templateUrl: 'templates/museumMap.html',
				controller: 'MuseumMapCtrl'

			},
			'header': {
				templateUrl: 'templates/headerExhibition.html'
			}
		}

	})
    .state('app.contact', {
		url: '/contact',
		views: {
			'menuContent': {
				templateUrl: 'templates/contact.html',
				controller: 'ContactCtrl'

			},
			'header': {
				templateUrl: 'templates/headerExhibition.html'
			}
		}

	}) 


	.state('app.exhibicion', {
		url: '/exhibiciones/:exhibicionID',
		views: {
			'menuContent': {
				templateUrl: 'templates/exhibicion.html',
				controller: 'ExhibicionCtrl'

			},
			'header': {
				templateUrl: 'templates/headerExhibition.html'
			}
		}

	
	});
	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/app/exhibiciones');
})