angular.module('starter.controllers', [])
	.service('Service', function () {
		this.modeShow = "hide";
		//this.objectPiece = null; 
		this.changingWhich = 1;
		this.favoritesObject;
		this.passing;
		this.language;


	})


.controller('AppCtrl', function ($scope, $ionicModal, $timeout, $ionicPopover, $rootScope, $cordovaMedia, $ionicLoading, Service) {

	// With the new view caching in Ionic, Controllers are only called
	// when they are recreated or on app start, instead of every page change.
	// To listen for when this page is active (for example, to refresh data),
	// listen for the $ionicView.enter event:
	//$scope.$on('$ionicView.enter', function(e) {
	//}); 


	$ionicPopover.fromTemplateUrl('templates/languageOptions.html', {
		scope: $scope,

	}).then(function (popover) {
		$scope.popover = popover;



	});



	$scope.menusES = [
		{
			title: 'EXHIBICIONES',
			id: 1,
			url: '#/app/exhibiciones',
			hideShow: 1
    },
		{
			title: 'AUDIOGUIAS',
			id: 2,
			url: '#/app/audioguides',
			hideShow: 0
    },
		{
			title: 'MAPA DEL MUSEO',
			id: 3,
			url: '#/app/museumMap',
			hideShow: 0
    },
		{
			title: 'CONTACTO',
			id: 4,
			url: '#/app/contact',
			hideShow: 0
    },
		{
			title: 'EVENTOS',
			id: 5,
			url: '#/app/events',
			hideShow: 0
    },
		{
			title: 'MIS FAVORITOS',
			id: 6,
			url: '#/app/myFavorites',
			hideShow: 0
    },
		{
			title: 'COMPRA DE TIQUETES',
			id: 7,
			url: '#/app/ticketSell',
			hideShow: 0
    }



  ];
	$scope.menusEN = [
		{
			title: 'EXHIBITIONS',
			id: 1,
			url: '#/app/exhibiciones'
    },
		{
			title: 'AUDIOGUIDES',
			id: 2,
			url: '#/app/audioguides'
    },
		{
			title: 'MUSEUM MAP',
			id: 3,
			url: '#/app/museumMap'
    },
		{
			title: 'CONTACT',
			id: 4,
			url: '#/app/contact'
    },
		{
			title: 'EVENTS',
			id: 5,
			url: '#/app/events'
    },
		{
			title: 'MY FAVORITES',
			id: 6,
			url: '#/app/myFavorites'
    },
		{
			title: 'BUY TICKETS',
			id: 7,
			url: '#/app/ticketSell'
    }



  ];

	$scope.langClass = "es";
	$scope.langClassBody = "es";
	Service.language = "english";
	$scope.changeLang = function (mode) {
		console.log("entre!"); 
		if (mode == 1) {
			console.log(mode);
			$scope.langClassBody = "es";
			$scope.langClass = "es";
			//$scope.language = "spanish"; 
	 		Service.language = "spanish";
 
		} else {
			console.log(mode);
			$scope.langClassBody = "en"
			$scope.langClass = "en";
			//$scope.language = "english";
			Service.language = "english";

  
		}
		console.log("service language==?> " + Service.language);
	}

	$scope.checkAnElement = function () {
		var result = document.getElementsByClassName("find");
		if (angular.element(result).hasClass('activated') == true) {
			$scope.showLeave = "ng-leave ng-leave-enter";
			$scope.showLang = "font-color-white";
			console.log("im in checkAnElement");
		}
	}

})



.controller('ExhibicionesCtrl', function ($scope) {
	$scope.exhibiciones = [
		{
			title: 'Exh1',
			id: 1
    },
		{
			title: 'Exh2',
			id: 2
    },
		{
			title: 'Exh3',
			id: 3
    },
		{
			title: 'Exh4',
			id: 4
    },
		{
			title: 'Exh5',
			id: 5
    },
		{
			title: 'Exh6',
			id: 6
    }
  ]


})



.controller('ExhibicionCtrl', function ($scope, $stateParams, $http, $ionicSlideBoxDelegate, $cordovaSQLite, $cordovaMedia, $ionicLoading, $ionicModal, $cordovaBeacon, $ionicPlatform, $rootScope, $cordovaSocialSharing, Service) {
	console.log("servicec language is "+Service.language); 
	var _this = this;
	$ionicLoading.show({
		template: 'Cargando...'
	})
	$ionicModal.fromTemplateUrl('templates/audioGuide.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function (modal) {
		$scope.modal = modal;
	});

	$scope.openModal = function () {
		$ionicSlideBoxDelegate.slide(0);
		$scope.modal.show();
	};

	$scope.closeModal = function () {
		$scope.modal.hide();
	};

	// Cleanup the modal when we're done with it!
	$scope.$on('$destroy', function () {
		$scope.modal.remove();
	});
	// Execute action on hide modal
	$scope.$on('modal.hide', function () {
		// Execute action
	});
	// Execute action on remove modal
	$scope.$on('modal.removed', function () {
		// Execute action
	});
	$scope.$on('modal.shown', function () {
		console.log('Modal is shown!');
	});

	// Call this functions if you need to manually control the slides
	$scope.next = function () {
		$ionicSlideBoxDelegate.next();
	};

	$scope.previous = function () {
		$ionicSlideBoxDelegate.previous();
	};

	$scope.goToSlide = function (index) {
		$scope.modal.show();
		$ionicSlideBoxDelegate.slide(index);
	}

	// Called each time the slide changes
	$scope.slideChanged = function (index) {
		$scope.slideIndex = index;
	};


	$scope.params = $stateParams.exhibicionID;
	$scope.doRefresh = function () {
		if ($scope.language == "spanish") {

			$ionicLoading.show({
				template: 'Cargando...'
			})
			$http.get("https://stormy-thicket-8940.herokuapp.com/exhibitions.json")
				.then(function (response) {


					$scope.exhiBg = response.data;
				}).finally(function () {
					$ionicLoading.hide();
					$scope.$broadcast('scroll.refreshComplete');
				});

		}else{
			$ionicLoading.show({
				template: 'Cargando...'
			})
			$http.get("https://stormy-thicket-8940.herokuapp.com/search_exhibitions.json/?search="+Service.language)
				.then(function (response) { 
					$scope.exhiBgOL= response.data;
				}).finally(function () {
					$ionicLoading.hide();
					$scope.$broadcast('scroll.refreshComplete');
				});
		}

	}

	$http.get("https://stormy-thicket-8940.herokuapp.com/exhibitions.json")
		.then(function (response) {
			$scope.exhiBg = response.data;
		}).finally(function () {
			$ionicLoading.hide();
			$scope.$broadcast('scroll.refreshComplete');
		});
	
	$http.get("https://stormy-thicket-8940.herokuapp.com/search_exhibitions.json/?search="+ Service.language )
		.then(function (response) {
			$scope.exhiBgOL = response.data;
		}).finally(function () {
			$ionicLoading.hide();
			$scope.$broadcast('scroll.refreshComplete');
		});


	$scope.getAudiobyID = function (id) {
		var _this = this;
		$ionicLoading.show({
			template: 'Cargando...'
		})
		$http.get("https://stormy-thicket-8940.herokuapp.com/exhibitions/" + id + "/audioguides.json")
			.then(function (response) {

				$scope.exhiAudios = response.data;
				$scope.allAudiosChunk = chunk($scope.exhiAudios, 2);
				$scope.media = null;
			}).finally(function () {
				$ionicLoading.hide();

			});
	}

	//$scope.isFav = "ion-ios-plus-outline";
	$scope.insertPiece = function (object, id, pID) {
		if ($scope.isFav === "ion-ios-plus-outline") {
			var query = "INSERT INTO piezas (idPiece, name, url ,description,room,showcase,exhibitionID) VALUES (?,?,?,?,?,?,?)";
			$cordovaSQLite.execute(db, query, [object.id, object.name, object.file.file.url, object.description, object.room, object.showcase, id]).then(function (res) {
				console.log("INSERT ID -> " + res);
				$scope.isFav = "ion-ios-minus-outline";
			}, function (err) {
				console.error(err);
				console.log(object.file.file.url);
				console.log(object.id);
			});
			console.log("YES");
		} else {
			console.log("CANT");
			var query = "DELETE FROM piezas WHERE idPiece = ?";
			$cordovaSQLite.execute(db, query, [pID]).then(function (res) {
				$scope.isFav = "ion-ios-plus-outline";
			}, function (err) {
				console.error(err);
			});

		}



	}

	$scope.checkFavPiece = function (piece) {
		$cordovaSQLite.execute(db, "SELECT idPiece FROM piezas where idPiece=?", [piece.id]).then(function (res) {
			if (res.rows.length > 0) {
				console.log("ya existe");
				$scope.isFav = "ion-ios-minus-outline";
			} else {
				$scope.isFav = "ion-ios-plus-outline";
			}

		}, function (err) {
			console.error(err);
		});

	}

	$scope.insertAudioguides = function (object, id, aID) {


		if ($scope.isFav === "ion-ios-plus-outline") {
			var query = "INSERT INTO audioguias (idAudioguide, name, url ,description,urlAudio,text, exhibitionID) VALUES (?,?,?,?,?,?,?)";
			$cordovaSQLite.execute(db, query, [object.id, object.name, object.file.file.url, object.description, object.audio.audio.url, object.text, id]).then(function (res) {
				console.log("INSERT ID -> " + res);
				$scope.isFav = "ion-ios-minus-outline";
			}, function (err) {
				console.error(err);
				console.log(object.file.file.url);
				console.log(object.id);
			});
			console.log("YES");
		} else {
			console.log("CANT");
			var query = "DELETE FROM audioguias WHERE idAudioguide = ?";
			$cordovaSQLite.execute(db, query, [aID]).then(function (res) {
				$scope.isFav = "ion-ios-plus-outline";
			}, function (err) {
				console.error(err);
			});

		}
	}

	$scope.isFav = "ion-ios-plus-outline";
	$scope.checkFavAudioguide = function (audioguide) {
		$cordovaSQLite.execute(db, "SELECT idAudioguide FROM audioguias where idAudioguide=?", [audioguide.id]).then(function (res) {
			if (res.rows.length > 0) {
				console.log("ya existe");
				$scope.isFav = "ion-ios-minus-outline";
			} else {
				$scope.isFav = "ion-ios-plus-outline";
			}

		}, function (err) {
			console.error(err);
		});
	}

	$scope.insert = function (object, id) {
		console.log(object.description);
		var query = "INSERT INTO piezas (name, url ,description,room,showcase,exhibitionID) VALUES (?,?,?,?,?,?)";
		$cordovaSQLite.execute(db, query, [object.name, object.file.file.url, object.description, object.room, object.showcase, id]).then(function (res) {
			console.log("INSERT ID -> " + res);
		}, function (err) {
			console.error(err);
			console.log(object.file.file.url);
			console.log(object.id);
		});
	}

	function chunk(arr, size) {
		var newArr = [];
		for (var i = 0; i < arr.length; i += size) {
			newArr.push(arr.slice(i, i + size));
		}

		return newArr;
	}



	$http.get("https://stormy-thicket-8940.herokuapp.com/exhibitions/" + $scope.params + "/pieces.json")
		.then(function (response) {
			$scope.piezas = response.data;



			$scope.piecesChunkedData = chunk($scope.piezas, 3);



			// media.getDuration(media); not working yet

			// media.getCurrentPosition().then(...); not working yet
			/* $scope.responsive-height =( $(window).innerWidth);*/
		}).finally(function () {
			$ionicLoading.hide();

		});

	$http.get("https://stormy-thicket-8940.herokuapp.com/search_pieces.json?exhibition_id="+$scope.params+"&search="+Service.language)
		.then(function (response) {
			$scope.piezasOL = response.data;



			$scope.piecesChunkedDataOL = chunk($scope.piezasOL, 3); 



			// media.getDuration(media); not working yet

			// media.getCurrentPosition().then(...); not working yet
			/* $scope.responsive-height =( $(window).innerWidth);*/
		}).finally(function () {
			$ionicLoading.hide();

		});



	$scope.loadJsonAudioguides = function () {
		$ionicLoading.show({
			template: 'Cargando audios...'
		})
		$http.get("https://stormy-thicket-8940.herokuapp.com/exhibitions/" + $scope.params + "/audioguides.json")
			.then(function (response) {
				$ionicLoading.hide();

				$scope.audioguides = response.data;
				$scope.audioChunkedData = chunk($scope.audioguides, 2);
			}).finally(function () {
				$ionicLoading.hide();

			})

	}
	
	$scope.loadJsonAudioguidesOL = function () {
		$ionicLoading.show({
			template: 'Cargando audios...'
		})
		$http.get("/search_audioguides.json?exhibition_id=3&search="+Service.language)
			.then(function (response) {
				$ionicLoading.hide();

				$scope.audioguides = response.data;
				$scope.audioChunkedData = chunk($scope.audioguides, 2);
			}).finally(function () {
				$ionicLoading.hide();

			})
 
	}





	$scope.media;
	$scope.modeMedia = true;
	$scope.sourceMedia;
	$scope.currTab = 2;
	$scope.specialClassPiece = "active";
	$scope.changeTabs = function (tab) {
		$scope.currTab = tab;
		console.log(tab);
		if ($scope.currTab == 1) {
			$scope.specialClassAudioGuide = "active";
			$scope.specialClassPiece = "deactived";
			$scope.modeShow = "hide";

		} else {
			$scope.specialClassAudioGuide = "deactived";
			$scope.specialClassPiece = "active";
			$scope.modeShow = "hide";
		}
	}





	console.log("https://stormy-thicket-8940.herokuapp.com/exhibitions/" + $scope.params + "/exhibition_images.json");

	$http.get("https://stormy-thicket-8940.herokuapp.com/exhibitions/" + $scope.params + "/exhibition_images.json")
		.then(function (response) {
			$scope.exhib = response.data;
			$ionicSlideBoxDelegate.update();
		});
	
	
	$http.get("https://stormy-thicket-8940.herokuapp.com/exhibitions/"+$scope.params+"/exhibition_informations.json?search="+Service.language) 
		.then(function (response) {
			console.log(response.data); 
			$scope.specificExhiEN = response.data[0];  
			console.log($scope.specificExhiEN);          
		});
	  
	
	
	$http.get("https://stormy-thicket-8940.herokuapp.com/exhibitions/" + $scope.params + ".json")
		.then(function (response) {
			$scope.specificExhi = response.data;
		});
	 
 
	
	
	$scope.loadJsonPieces = function () {
		var _this = this;
		$ionicLoading.show({
			template: 'Cargando piezas...'
		})
		$http.get("https://stormy-thicket-8940.herokuapp.com/exhibitions/" + $scope.params + "/pieces.json")
			.then(function (response) {
				$scope.piezas = response.data;



				$scope.piecesChunkedData = chunk($scope.piezas, 3);



				// media.getDuration(media); not working yet

				// media.getCurrentPosition().then(...); not working yet
				/* $scope.responsive-height =( $(window).innerWidth);*/
			}).finally(function () {
				$ionicLoading.hide();

			});
	}


	$scope.loadJsonPiecesOL = function () {
		var _this = this;
		$ionicLoading.show({
			template: 'Cargando piezas...'
		})
		$http.get("https://stormy-thicket-8940.herokuapp.com/search_pieces.json?exhibition_id="+$scope.params+"&search="+Service.language)
			.then(function (response) { 
				$scope.piezas = response.data;



				$scope.piecesChunkedData = chunk($scope.piezas, 3);



				// media.getDuration(media); not working yet

				// media.getCurrentPosition().then(...); not working yet
				/* $scope.responsive-height =( $(window).innerWidth);*/
			}).finally(function () {
				$ionicLoading.hide();

			});
	}


	
	$scope.object = null;

	$scope.modeShow = Service.modeShow;




	$scope.changeMode = function (id) {

		console.log("entre a which one");
		$scope.object = id;

	};

	$scope.changeMode2 = function (where) {
		if (where == 1) {
			$scope.modeShow = "show";
		} else {
			$scope.modeShow = "hide";
		}


	}

	$scope.modeMediaBar = true;
	console.log("here is outside playMedia " + $scope.moodeMediaBar)
	$scope.object = Service.favoritesObject;

	/*$rootScope.$on("callPlayMedia", function (event, data) {
		console.log("src-> " + data.src);
		console.log("object-> " + data.object);
		//$scope.playMedia(data.src,data.object);    
	});*/

	$scope.playMedia = function (src, object) {
		$scope.currAudio = object;
		console.log("=>>>" + $scope.currAudio.id);
		$scope.audioName = object.name;
		$scope.audioName = name;
		console.log($scope.audioName);
		$scope.global = object.id;
		console.log(object.id);
		console.log("global id  ==> " + $scope.global);


		var mediaStatusCallback1 = function (status) {
			//alert(status);
			if (status == 4) {
				$ionicLoading.hide();
				//$scope.status1 = 4;

			} else if (status == 1) {
				$ionicLoading.show({
					template: 'Cargando...'
				});
			} else if (status == 2) {
				$ionicLoading.hide();
			}
		}

		console.log("que contiene media=> " + $scope.media);
		if ($scope.media == null) {

			console.log("object=>" + object);
			$scope.onlyShowOnAudio = "show";
			$scope.media = new Media(src, null, null, mediaStatusCallback1);
			$scope.media.play();
			$scope.oldPlay = document.getElementById(object.id);
			$scope.img = document.getElementById("img" + object.id);

			console.log($scope.oldPlay.classList);
			$scope.oldPlay.className =
				$scope.oldPlay.className.replace(/(?:^|\s)visible-button(?!\S)/g, '');
			$scope.oldPlay.className += " hidden-button";
			console.log($scope.oldPlay.classList);
			$scope.oldPause = document.getElementById("0" + object.id);
			console.log($scope.oldPause.classList);
			$scope.oldPause.className =
				$scope.oldPause.className.replace(/(?:^|\s)hidden-button(?!\S)/g, '');

			$scope.oldPause.className += " visible-button";
			$scope.img.className += " green-mode";
			console.log($scope.oldPause.classList);

			this.modeMedia = false;
			$scope.modeMediaBar = this.modeMedia;



			/*minibar*/

			$scope.playMedia2();

			console.log("entre al if!");

		} else {
			$scope.onlyShowOnAudio = "show";
			$scope.media.release();
			$scope.oldPlay.className =
				$scope.oldPlay.className.replace(/(?:^|\s)hidden-button(?!\S)/g, '');
			$scope.oldPlay.className += " visible-button";

			$scope.oldPause.className =
				$scope.oldPause.className.replace(/(?:^|\s)visible-button(?!\S)/g, '');
			$scope.oldPause.className += " hidden-button";

			$scope.img.className =
				$scope.img.className.replace(/(?:^|\s)green-mode(?!\S)/g, '');
			$scope.img = document.getElementById("img" + object.id);
			$scope.oldPlay = document.getElementById(object.id);
			$scope.oldPause = document.getElementById("0" + object.id);

			$scope.oldPlay.className =
				$scope.oldPlay.className.replace(/(?:^|\s)visible-button(?!\S)/g, '');
			$scope.oldPlay.className += " hidden-button";

			$scope.oldPause.className =
				$scope.oldPause.className.replace(/(?:^|\s)hidden-button(?!\S)/g, '');
			$scope.oldPause.className += " visible-button";
			$scope.img.className += " green-mode";
			$scope.media = new Media(src, null, null, mediaStatusCallback1);
			$scope.media.play();

			$scope.modeMediaOld = true;
			this.modeMedia = true;
			$scope.modeMediaBar == this.modeMedia;
			console.log("object=>" + object);
			$scope.playMedia2();
			console.log("entre al else!");
		}

	}

	$scope.playMedia2 = function () {


		$scope.oldPlayBar = document.getElementById("play-bar");
		$scope.oldPlayBar.className =
			$scope.oldPlayBar.className.replace(/(?:^|\s)visible-button(?!\S)/g, '');
		$scope.oldPlayBar.className += " hidden-button";

		$scope.oldPauseBar = document.getElementById("pause-bar");
		$scope.oldPauseBar.className =
			$scope.oldPauseBar.className.replace(/(?:^|\s)hidden-button(?!\S)/g, '');
		$scope.oldPauseBar.className += " visible-button";




	}

	$scope.pauseMedia = function (modo, object) {
		$scope.img.className =
			$scope.img.className.replace(/(?:^|\s)green-mode(?!\S)/g, '');
		console.log("que contiene media pause => " + $scope.media);
		if ($scope.modeMediaBar == false) {
			$scope.media.pause();
			$scope.oldPlay.className =
				$scope.oldPlay.className.replace(/(?:^|\s)hidden-button(?!\S)/g, '');
			$scope.oldPlay.className += " visible-button";

			$scope.oldPause.className =
				$scope.oldPause.className.replace(/(?:^|\s)visible-button(?!\S)/g, '');
			$scope.oldPause.className += " hidden-button";

		}
		if (modo == 1) {
			$scope.onlyShowOnAudio = "hide";
		} else {
			$scope.oldPlayBar = document.getElementById("play-bar");
			$scope.oldPauseBar = document.getElementById("pause-bar");
			$scope.oldPlayBar.className =
				$scope.oldPlayBar.className.replace(/(?:^|\s)hidden-button(?!\S)/g, '');
			$scope.oldPlayBar.className += " visible-button";

			$scope.oldPauseBar.className =
				$scope.oldPauseBar.className.replace(/(?:^|\s)visible-button(?!\S)/g, '');
			$scope.oldPauseBar.className += " hidden-button";
		}

	}




	$scope.onlyShowOnAudio = "hide";


	$scope.groups = [];
	for (var i = 0; i < 10; i++) {
		$scope.groups[i] = {
			name: i,
			items: []
		};
		for (var j = 0; j < 3; j++) {
			$scope.groups[i].items.push(i + '-' + j);
		}
	}

	/*
	 * if given group is the selected group, deselect it
	 * else, select the given group
	 */
	$scope.toggleGroup = function (group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	$scope.isGroupShown = function (group) {
		return $scope.shownGroup === group;
	};

	/*********************************************************************BEACONS********************************************/
	/*$scope.beacons = {};

		$ionicPlatform.ready(function () {

			$cordovaBeacon.requestWhenInUseAuthorization();

			$rootScope.$on("$cordovaBeacon:didRangeBeaconsInRegion", function (event, pluginResult) {
				var uniqueBeaconKey;
				for (var i = 0; i < pluginResult.beacons.length; i++) {
					uniqueBeaconKey = pluginResult.beacons[i].uuid + ":" + pluginResult.beacons[i].major + ":" + pluginResult.beacons[i].minor;
					$scope.beacons[uniqueBeaconKey] = pluginResult.beacons[i];
				}
				$scope.$apply();
			});

			$cordovaBeacon.startRangingBeaconsInRegion($cordovaBeacon.createBeaconRegion("altbeacon", "2F234454-CF6D-4A0F-ADF2-F4911BA9FFA6"));

		});
	 */


	$scope.user = {
		max: 100,
		min: 0,
		value: 50



	}




	$scope.setVolume = function (elem) {
		/*var h = parseFloat(parseInt(elem)/100);
		console.log(h);
		alert(h);
			
			
		$scope.media.setVolume(h); 
		*/
		var volumeSlider = window.plugins.volumeSlider;
		volumeSlider.createVolumeSlider(10, 350, 300, 30); // origin x, origin y, width, height
		volumeSlider.showVolumeSlider();

	}

	$scope.bluetooth = "hola";

	$scope.nextAudio = function () {

		$scope.onlyShowOnAudio = "show";


		$scope.currAudio = $scope.audioSpec;
		//alert($scope.audioSpec.name);
		var mediaStatusCallback = function (status) {
			//alert(status);
			if (status == 4) {
				$ionicLoading.hide();
				$scope.status1 = 4;

			} else if (status == 1) {
				$ionicLoading.show({
					template: 'Cargando...'
				});
			} else if (status == 2) {
				$ionicLoading.hide();
			}
		}
		$scope.media = new Media($scope.audioSpec.audio.audio.url, null, null, mediaStatusCallback);



		$scope.media.play();
		//	$timeout(function () {
		/*while ($scope.t) {
 

		}*/
		//	}, 3000)   

	}

	$scope.bluetoothEnable = function (elem) {


		if (elem.value == null || elem.value == "off") {
			document.getElementsByName("bluetooth").value = "'YES'";
			elem.value = "on";
			$scope.checked = true;
			//	$scope.bt =false;
			$scope.turn = 1;

			console.log("its on!");
			$scope.sonar = true;
			cordova.plugins.locationManager.enableBluetooth();
			$scope.beacons = {};


			$ionicPlatform.ready(function () {
				var uniqueBeaconKey;



				$rootScope.$on("$cordovaBeacon:didRangeBeaconsInRegion", function (event, pluginResult) {

					for (var i = 0; i < pluginResult.beacons.length; i++) {
						uniqueBeaconKey = i; //var key = pluginResult.beacons[0].uuid + ":" + pluginResult.beacons[0].major + ":" + pluginResult.beacons[0].minor;
						$scope.beacons[uniqueBeaconKey] = pluginResult.beacons[i];
						//$scope.bluetooth = $scope.beacons; 
						//alert(uniqueBeaconKey);
						//alert($scope.bluetooth[0].uniqueBeaconKey.major);
					}
					if ($scope.sonar == true && $scope.turn == 1) {
						//var i = 0;
						//angular.forEach($scope.beacons, function (value, key) {
						//if (i == pluginResult.beacons.length-1) {


						angular.forEach($scope.audioguides, function (value1, key1) {
							// 	alert(value1.id1 +" "+ value1.id2); 

							if (pluginResult.beacons[0].major == value1.id1 && pluginResult.beacons[0].minor == value1.id2 && (pluginResult.beacons[0].proximity == "ProximityNear" || pluginResult.beacons[0].proximity == "ProximityImmediate")) {
								//alert("close enough!");
								//alert("enseguida sonara");
								//angular.forEach($scope.audioguides, function (value1, key1) {
								$http.get("https://stormy-thicket-8940.herokuapp.com/exhibitions/" + $scope.params + "/audioguides/" + pluginResult.beacons[0].major + ".json")
									.then(function (response) {
										$scope.audioSpec = response.data;
										//alert($scope.audioSpec.audio.audio.url);
										$scope.nextAudio();
										$scope.status1 = 0;
										$scope.sonar = false;
									});

								$scope.status1 = 0;
								$scope.sonar = false;






								//});

							}
							console.log("not working properly. Bluetooth shutting down");

							//alert(value.proximity);
							//return 1;
							/* */

						});
						//}
						//i++;
						//});

					}

					if ($scope.status1 == 4) {
						$scope.sonar = true;
					}

					$scope.$apply();
				});

				$cordovaBeacon.startRangingBeaconsInRegion($cordovaBeacon.createBeaconRegion("altbeacon", $scope.audioguides[0].key));


			});



		} else {
			elem.value = "off";
			document.getElementsByName("bluetooth").value = "'NO'";
			//$scope.bt = true;
			$scope.checked = false;
			$scope.turn = 0;
			cordova.plugins.locationManager.disableBluetooth();
			console.log("its off!");
		}
	}


	//Social sharing

	$scope.exhibitionShare = function (obj) {
		$cordovaSocialSharing.share(obj.miniDescription, obj.name, null, "http://www.museodeljadeins.com/");
	}

	$scope.pieceAudioShare = function (obj) {
		$cordovaSocialSharing.share(obj.description, obj.name, obj.file.file.url, "http://www.museodeljadeins.com/");
	}

})


.controller('audioguidesCtrl', function ($scope) {
	$scope.groups = [];
	for (var i = 0; i < 10; i++) {
		$scope.groups[i] = {
			name: i,
			items: []
		};
		for (var j = 0; j < 3; j++) {
			$scope.groups[i].items.push(i + '-' + j);
		}
	}

	/*
	 * if given group is the selected group, deselect it
	 * else, select the given group
	 */
	$scope.toggleGroup = function (group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	$scope.isGroupShown = function (group) {
		return $scope.shownGroup === group;
	};

})

.controller('myFavoritesCtrl', function ($scope, $cordovaSQLite, Service, $rootScope, $ionicLoading) {

	/*$scope.playMedia = function (src, object) {
		console.log("entre play media my fav");
		$scope.$emit("callPlayMedia", {
			src: src,
			object: object
		}); 
	}*/

	$scope.media = null;

	$scope.playMedia = function (src, object) {

		$scope.audioName = object.name;
		$scope.audioName = name;
		console.log($scope.audioName);
		$scope.global = object.id;
		console.log(object.id);
		console.log("global id  ==> " + $scope.global);


		var mediaStatusCallback1 = function (status) {
			//alert(status);
			if (status == 4) {
				$ionicLoading.hide();
				//$scope.status1 = 4;

			} else if (status == 1) {
				$ionicLoading.show({
					template: 'Cargando...'
				});
			} else if (status == 2) {
				$ionicLoading.hide();
			}
		}

		console.log("que contiene media=> " + $scope.media);
		if ($scope.media == null) {

			console.log("object=>" + object);
			$scope.onlyShowOnAudio = "show";
			$scope.media = new Media(src, null, null, mediaStatusCallback1);
			$scope.media.play();
			$scope.oldPlay = document.getElementById(object.exhibitionID);
			$scope.img = document.getElementById("img" + object.exhibitionID);

			console.log($scope.oldPlay.classList);
			$scope.oldPlay.className =
				$scope.oldPlay.className.replace(/(?:^|\s)visible-button(?!\S)/g, '');
			$scope.oldPlay.className += " hidden-button";
			console.log($scope.oldPlay.classList);
			$scope.oldPause = document.getElementById("0" + object.exhibitionID);
			console.log($scope.oldPause.classList);
			$scope.oldPause.className =
				$scope.oldPause.className.replace(/(?:^|\s)hidden-button(?!\S)/g, '');

			$scope.oldPause.className += " visible-button";
			$scope.img.className += " green-mode";
			console.log($scope.oldPause.classList);

			this.modeMedia = false;
			$scope.modeMediaBar = this.modeMedia;



			/*minibar*/



			console.log("entre al if!");

		} else {
			$scope.onlyShowOnAudio = "show";
			$scope.media.release();
			$scope.oldPlay.className =
				$scope.oldPlay.className.replace(/(?:^|\s)hidden-button(?!\S)/g, '');
			$scope.oldPlay.className += " visible-button";

			$scope.oldPause.className =
				$scope.oldPause.className.replace(/(?:^|\s)visible-button(?!\S)/g, '');
			$scope.oldPause.className += " hidden-button";

			$scope.img.className =
				$scope.img.className.replace(/(?:^|\s)green-mode(?!\S)/g, '');
			$scope.img = document.getElementById("img" + object.exhibitionID);
			$scope.oldPlay = document.getElementById(object.exhibitionID);
			$scope.oldPause = document.getElementById("0" + object.exhibitionID);

			$scope.oldPlay.className =
				$scope.oldPlay.className.replace(/(?:^|\s)visible-button(?!\S)/g, '');
			$scope.oldPlay.className += " hidden-button";

			$scope.oldPause.className =
				$scope.oldPause.className.replace(/(?:^|\s)hidden-button(?!\S)/g, '');
			$scope.oldPause.className += " visible-button";
			$scope.img.className += " green-mode";
			$scope.media = new Media(src, null, null, mediaStatusCallback1);
			$scope.media.play();

			$scope.modeMediaOld = true;
			this.modeMedia = true;
			$scope.modeMediaBar == this.modeMedia;
			console.log("object=>" + object);

			console.log("entre al else!");
		}

	}


	$scope.pauseMedia = function (modo, object) {
		$scope.img.className =
			$scope.img.className.replace(/(?:^|\s)green-mode(?!\S)/g, '');
		console.log("que contiene media pause => " + $scope.media);
		if ($scope.modeMediaBar == false) {
			$scope.media.pause();
			$scope.oldPlay.className =
				$scope.oldPlay.className.replace(/(?:^|\s)hidden-button(?!\S)/g, '');
			$scope.oldPlay.className += " visible-button";

			$scope.oldPause.className =
				$scope.oldPause.className.replace(/(?:^|\s)visible-button(?!\S)/g, '');
			$scope.oldPause.className += " hidden-button";

		}
		if (modo == 1) {
			$scope.onlyShowOnAudio = "hide";
		} else {
			$scope.oldPlayBar = document.getElementById("play-bar");
			$scope.oldPauseBar = document.getElementById("pause-bar");
			$scope.oldPlayBar.className =
				$scope.oldPlayBar.className.replace(/(?:^|\s)hidden-button(?!\S)/g, '');
			$scope.oldPlayBar.className += " visible-button";

			$scope.oldPauseBar.className =
				$scope.oldPauseBar.className.replace(/(?:^|\s)visible-button(?!\S)/g, '');
			$scope.oldPauseBar.className += " hidden-button";
		}

	}

	$scope.favoritesPieces = [];
	/*    $scope.passingObject = function(object){
	        Service.objectPiece = object ;
	    }*/
	$scope.sendObject = function (object) {
		Service.favoritesObject = object;
	}


	/*$scope.changeWhichOne = function(){
	    Service.changingWhich = 0;
	}
	  
	$scope.changeModeShowFunc=function(){
	    Service.modeShow = 'show';     
	}*/

	Service.modeShow = $scope.changeModeShow;

	function chunk(arr, size) {
		var newArr = [];
		for (var i = 0; i < arr.length; i += size) {
			newArr.push(arr.slice(i, i + size));
		}
		return newArr;
	}

	$scope.selectPieces = function () {
		$scope.favoritesPieces = [];
		var query = "SELECT name,url,description,room,showcase,exhibitionID FROM piezas";
		$cordovaSQLite.execute(db, query).then(function (res) {
			if (res.rows.length > 0) {
				var agregar = [];
				for (var i = 0; i < res.rows.length; i++) {
					agregar.push({
						url: res.rows.item(i)
					});
					console.log(res.rows.item(i)); 
					console.log(agregar);
					console.log("SELECTED -> " + res.rows.item(i).exhibitionID + "\n");
				}
				$scope.favoritesPieces = agregar;
				$scope.col = $scope.groups[1].size;
				$scope.groups[1].items = chunk($scope.favoritesPieces, 3);

			} else {
				console.log("No results found");
			}
		}, function (err) {
			console.error(err);
		});
	}

	$scope.selectAudioguides = function () {
		$scope.favoritesAudioguides = [];
		var query = "SELECT name, url, description, text, urlAudio, exhibitionID FROM audioguias";
		$cordovaSQLite.execute(db, query).then(function (res) {
			if (res.rows.length > 0) {
				var agregar = [];
				for (var i = 0; i < res.rows.length; i++) {
					agregar.push({
						url: res.rows.item(i)
					});

				}
				$scope.favoritesAudioguides = agregar;
				$scope.col = $scope.groups[0].size;
				$scope.groups[0].items = chunk($scope.favoritesAudioguides, 2);
				console.log($scope.groups[0].items);
			} else {
				console.log("No results found");
			}
		}, function (err) {
			console.error(err);
		});
	}
	$scope.isAudio = function (obj) {
		if (obj.name === "AUDIOGUIAS") {
			return true;
		}
		return false;

	}

	$scope.groups = [{
		name: 'AUDIOGUIAS',
		function: "selectAudioguides()",
		items: [],
		size: 'col-50'

    }, {
		name: 'PIEZAS',
		function: "selectPieces()",
		items: [],
		size: 'col-33'

    }, {
		name: 'FOTOGRAFIAS',
		function: "selectPictures()",
		items: [],
		size: 'col-33'

     }];
	$scope.toggleGroup = function (group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	$scope.isGroupShown = function (group) {
		return $scope.shownGroup === group;
	};

	/*new*/
	/*	$scope.isAudioguide = function(name){
			if (name =="AUDIOGUIDES"){
				angular.getElementById("DOM").html("<button class='button ion-ios-play stable audio-play-position-size visible-button' id='{{audio.id}}' ng-class='a' ng-model='global' ng-click='playMedia({{'audio.audio.audio.url'}},{{audio}});checkFavAudioguide({{audio}});'></button><button class='button ion-ios-pause stable audio-play-position-size hidden-button' id='0{{audio.id}}' ng-class='b' ng-click='pauseMedia(1,{{audio}})'></button>" );

			}
		}*/

})


.controller("ticketSellCtrl", function ($scope, $http, Service) {
	$scope.months = 12;
	$scope.days = 31;
	$scope.years = 100;
	$scope.time = "";
	$scope.currentDate = new Date();
	$scope.N1 = 0;
	$scope.N2 = 0;
	$scope.N3 = 0;
	$scope.N4 = 0;
	$scope.getNumbers = function (x) {
		return new Array(x);
	}

	$scope.onOff = "hide";
	$scope.onOffp = "show";

	$scope.changeDate = function () {

		$scope.onOff = "show";
		$scope.onOffp = "hide";

	}

	$scope.listo = function () {
		$scope.onOff = "hide";
		$scope.onOffp = "show";

	}

	$scope.increaseN1 = function () {
		$scope.N1 = $scope.N1 + 1;
	}

	$scope.decreaseN1 = function () {
		if ($scope.N1 != 0) {
			$scope.N1 = $scope.N1 - 1;
		}

	}

	$scope.increaseN2 = function () {
		$scope.N2 = $scope.N2 + 1;
	}

	$scope.decreaseN2 = function () {
		if ($scope.N2 != 0) {
			$scope.N2 = $scope.N2 - 1;
		}

	}
	$scope.increaseN3 = function () {
		$scope.N3 = $scope.N3 + 1;
	}

	$scope.decreaseN3 = function () {
		if ($scope.N3 != 0) {
			$scope.N3 = $scope.N3 - 1;
		}

	}
	$scope.increaseN4 = function () {
		$scope.N4 = $scope.N4 + 1;
	}

	$scope.decreaseN4 = function () {
		if ($scope.N4 != 0) {
			$scope.N4 = $scope.N4 - 1;
		}

	}

	$scope.postTicket = function () {
		var ticket = {


			ticket: {
				"adult": $scope.N1,
				"child": $scope.N2,
				"student": $scope.N3,
				"elder": $scope.N4,
				"date": $scope.fecha
			}





		};

		/*		var req = {
					method: 'POST',
					url: "https://stormy-thicket-8940.herokuapp.com/tickets",
					headers: {
						'Content-Type': undefined
					},
					data: JSON.stringify({
						ticket: {
							"adult": '1',
							"child": '0',
							"student": '2',
							"elder": '1',
							"date": '2016-01-21'
						}
					}), 
					dataType: "json",
					contentType: "application/json" 

				}

				$http(req).then(function (response) {
					console.log("entre!!!!!!!!:)")
					console.log(response.data);
					Service.passing = response.data;
 
				}, function (err) {
					console.log(err); 
				});*/

		//console.log($scope.ticket.adult);


		$scope.passing = ticket;

		$http.post("https://stormy-thicket-8940.herokuapp.com/tickets", angular.toJson(ticket)).then(function (response) {
			console.log("entre!!!!!!!!:)");
			console.log(response.data);
			$scope.passing = response.data;
			var hello = JsBarcode("#barcode", $scope.passing.id.toString(), {
				displayValue: true
			});
		}, function (err) {
			console.log(err);

		});
	}


})



/*.controller("ticketCodeCtrl", function ($scope, Service) {
		$scope.hello = JsBarcode("#barcode", Service.passing.id, {
			displayValue: true 
		}); 



		//JsBarcode($('#barcode').attr('id'),"9780199532179",{format:"EAN",displayValue:true,fontSize:20});
	})*/
.controller('EventsCtrl', function ($scope, $http, $cordovaCalendar) {
	$http.get("https://stormy-thicket-8940.herokuapp.com/events.json")
		.then(function (response) {
			$scope.allEvents = response.data;
		}).finally(function () {

			$scope.$broadcast('scroll.refreshComplete');
		});
	$scope.createEvent = function (event) {
		//YYYY-MM-DD
		var date = event.date;
		var dateArray = date.split("-")
		var year = parseInt(dateArray[0]);
		var month = parseInt(dateArray[1]) - 1;
		var day = parseInt(dateArray[2]);

		$cordovaCalendar.createEvent({
			title: event.name,
			location: 'Museo del Jade',
			notes: event.description,
			startDate: new Date(year, month, day, 0, 0, 0, 0, 0),
			endDate: new Date(year, month, day, 23, 0, 0, 0, 0)
		}).then(function (result) {
			alert("Evento agregado al calendario.");
		}, function (err) {
			console.error("There was an error: " + err);
		});

	}



})

.controller('ContactCtrl', function ($scope, $http, $ionicSlideBoxDelegate, $ionicLoading) {
	$http.get("https://stormy-thicket-8940.herokuapp.com/exhibitions.json")
		.then(function (response) {
			$scope.exhib = response.data;
			$ionicSlideBoxDelegate.update();
			var myLatlng = new google.maps.LatLng(9.9331001, -84.0726809);

			var mapOptions = {
				center: myLatlng,
				zoom: 16,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};

			var map = new google.maps.Map(document.getElementById("map"), mapOptions);

			var marker = new google.maps.Marker({
				position: myLatlng,
				title: "Museo del Jade"
			});
			marker.setMap(map);



			$scope.map = map;
		});

})



.controller('MuseumMapCtrl', function ($scope, $http) {
	$scope.tab1 = "active";
	$scope.changeTabs = function (tab) {
		$scope.currTab = tab;
		console.log(tab);
		if ($scope.currTab == 1) {
			$scope.tab1 = "active";
			$scope.tab2 = "deactived";
			$scope.tab3 = "deactived";
			$scope.tab4 = "deactived";
			$scope.tab5 = "deactived";
			$scope.modeShow = "hide";

		} else if ($scope.currTab == 2) {
			$scope.tab1 = "deactived";
			$scope.tab2 = "active";
			$scope.tab3 = "deactived";
			$scope.tab4 = "deactived";
			$scope.tab5 = "deactived";
			$scope.modeShow = "hide";

		} else if ($scope.currTab == 3) {
			$scope.tab1 = "deactived";
			$scope.tab2 = "deactived";
			$scope.tab3 = "active";
			$scope.tab4 = "deactived";
			$scope.tab5 = "deactived";
			$scope.modeShow = "hide";

		} else if ($scope.currTab == 4) {
			$scope.tab1 = "deactived";
			$scope.tab2 = "deactived";
			$scope.tab3 = "deactived";
			$scope.tab4 = "active";
			$scope.tab5 = "deactived";
			$scope.modeShow = "hide";

		} else {
			$scope.tab1 = "deactived";
			$scope.tab2 = "deactived";
			$scope.tab3 = "deactived";
			$scope.tab4 = "deactived";
			$scope.tab5 = "active";
			$scope.modeShow = "hide";
		}
	}

	$scope.changeTabs(1);
})

/*.directive('stateLoadingIndicator', function ($scope,$rootScope,$ionicLoading) {
	return {
		restrict: 'A',
		template:$scope.ver,
		replace: false,
		link: function (scope, elem, attrs) { 
			$scope.ver = true;
			
			elem.unbind('load', function() {
                $ionicLoading.show({
							template: 'Cargando...'
						})
            }); 
		}
	};
	
	$scope.showHide= function(){
		if ($scope.ver == true){
			return 
	
		}else{ 
			$ionicLoading.hide(); 
		}
	}
});*/
/*

.directive('stateLoadingIndicator', function ($rootScope, $ionicLoading) {
	return {
		restrict: 'A',
		template: $ionicLoading.show({
			template: 'Cargando...',


		})

	};

});
*/


/*.directive('stateLoadingIndicator', function($scope,$ionicLoading) {
    return {
        restrict: 'A',
        link: function($scope, element, attrs) {
		//	$scope.ver = true;
            element.bind('load', function() {
				$scope.ver = false; 
                alert('image is loaded');
            });
        }
    };
	$scope.showHide= function(){
		if ($scope.ver == true){
			return $ionicLoading.show({
							template: 'Cargando...'
						})
	
		}else{
			$ionicLoading.hide(); 
		}
	}
	
});*/