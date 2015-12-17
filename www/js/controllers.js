

angular.module('starter.controllers', [])



.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
    
  $scope.menus = [
      { title: 'EXHIBICION', id: 1 },
      { title: 'AUDIOGUIA', id: 2 },
      { title: 'MAPA DEL MUSEO', id: 3 },
      { title: 'CONTACTO', id: 4 },
      { title: 'EVENTOS', id: 5 },
      { title: 'MIS FAVORITOS', id: 6 },
      { title: 'COMPRA DE TIQUETES', id: 7 }
      
      
    
  ];
       // Form data for the login modal
  $scope.loginData = {};

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

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
    

 
})  


.controller('frost', function($scope, $rootScope, $compile) {
  $scope.pushFrost = function() {
    var el = angular.element(document.getElementById('myPane'));
    el.attr('frost', '');
    el = $compile(el)($scope);
    $rootScope.showOverlay = true;
  };
})

.controller('ExhibicionesCtrl', function($scope) {
  $scope.exhibiciones = [
    { title: 'Exh1', id: 1 },
    { title: 'Exh2', id: 2 }, 
    { title: 'Exh3', id: 3 },
    { title: 'Exh4', id: 4 },
    { title: 'Exh5', id: 5 }, 
    { title: 'Exh6', id: 6 }
  ] 
   

})
  

.controller('ExhibicionCtrl', function($scope, $stateParams,$http) {
  
  /*app/exhibiciones/1/tabAudioguia
  app/exhibiciones/1/tabPiezas*/
  $scope.piezas = [ 
    { title: 'piece1', id: 1 },
    { title: 'piece2', id: 2 },
    { title: 'piece3', id: 3 },
    { title: 'piece4', id: 4 },
    { title: 'piece5', id: 5 }
  ];
  function chunk(arr, size) {
    var newArr = []; 
    for (var i=0; i<arr.length; i+=size) {
      newArr.push(arr.slice(i, i+size));
    }
    return newArr;
  }

  $scope.chunkedData = chunk($scope.piezas, 3);
  
  $scope.params = $stateParams;
  $http.get("https://stormy-thicket-8940.herokuapp.com/exhibitions/"+$scope.params.exhibicionID+"/exhibition_images.json")    
    .then(function(response) {$scope.exhib = response.data;console.log($scope.exhib[0].file.file.url); $scope.index="https://stormy-thicket-8940.herokuapp.com" }); 

}) 
 
  
.controller('ExhiBgCtrl',function($scope,$http){
  $http.get("https://stormy-thicket-8940.herokuapp.com/exhibitions.json")   
    .then(function(response) {$scope.exhiBg = response.data ;}); 
/*  function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {

    // Check if the XMLHttpRequest object has a "withCredentials" property.
    // "withCredentials" only exists on XMLHTTPRequest2 objects.
    xhr.open(method, url, true);

  } else if (typeof XDomainRequest != "undefined") {

    // Otherwise, check if XDomainRequest.
    // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
    xhr = new XDomainRequest();
    xhr.open(method, url);

  } else {

    // Otherwise, CORS is not supported by the browser.
    xhr = null;

  }
  return xhr;
}

var xhr = createCORSRequest('GET', url);
if (!xhr) {
  throw new Error('CORS not supported');
}
  var url = 'https://stormy-thicket-8940.herokuapp.com/exhibitions.json';
  var xhr = createCORSRequest('GET', url);
  xhr.send(); 
  $scope.exhiBg = xhr; */
/*    $scope.exhiBg = [{"id":1,"name":"El Jade","description":"El jade elaborado en COsta rica era tallado en el area central, especialmente en las planicies del caribe central, pero tambien en la subregion guanacaste nicoya","miniDescription":"Proceso de elaboracion del jade, rutas de comercio, simblismo y uso social","item_id":null,"url":"https://stormy-thicket-8940.herokuapp.com/exhibitions/1.json","picture":'url(http://i0.wp.com/cambiopolitico.com/wp-content/uploads/2014/06/esferas07.jpg)'},{"id":2,"name":"Umbral","description":"--","miniDescription":"Escenario cultural y ecologico donde se desarrollaron las sociedades","item_id":null,"url":"https://stormy-thicket-8940.herokuapp.com/exhibitions/2.json","picture":'url(http://i0.wp.com/cambiopolitico.com/wp-content/uploads/2014/06/esferas07.jpg)'}]*/
   
  /*$scope.exhiBg = [ 
    { address: 'url(http://i0.wp.com/cambiopolitico.com/wp-content/uploads/2014/06/esferas07.jpg)',p:"Escenario cultural y ecologico donde se desarrollaron las sociedades",h1:"Umbral1", id: 1 },
    { address: 'url(http://i0.wp.com/cambiopolitico.com/wp-content/uploads/2014/06/esferas07.jpg)',p:"Escenario cultural y ecologico donde",h1:"Umbral2", id: 2 },
    { address: 'url(http://i0.wp.com/cambiopolitico.com/wp-content/uploads/2014/06/esferas07.jpg)',p:"Escenario cultural y ecologico ",h1:"Umbral3", id: 3 }

  ];
*/})




