"use strict";

angular.module("sog")

.controller("homeCtrl", function($scope, $http, $uibModal, $log){
	console.log("inside home ctrl")
	$scope.images = [];
	var items = ["item1", "item2", "item3"];

	for(var i=0; i < 5; i ++){
		$http({
			method: "GET",
			url: "http://uifaces.com/api/v1/random"
				}).then(function(faces){
					console.log(faces.data.image_urls.epic)
				//find page-view-width and insert button at [index] page-view-width/128
				$scope.images.push(faces.data.image_urls.epic)

			}, function errorCallback(response){
				console.log(response)
		}) 
	}

  $scope.animationsEnabled = true;

  $scope.open = function (size) {

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'partials/monkey-modal.html',
      controller: 'ModalInstanceCtrl',
      size: size,
    });

    modalInstance.result.then(function () {

    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.toggleAnimation = function () {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };
})

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.
.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance) {
	$scope.login = false;
	$scope.register = false; 

	$scope.showLogin = function(){
  		$scope.login = !$scope.login;
  		$scope.register = false;
  	}	
  

  $scope.showReg = function(){
  	$scope.register = !$scope.register;
  	$scope.login = false;
  	}	
 

  $scope.cancel = function () {
  	console.log("cancel clicked")
    $uibModalInstance.dismiss('cancel');
  };
})

.controller("profileCtrl", function($scope){
	console.log("inside profile ctrl")
	$scope.title = "PROFILE!!!!!!"
})


