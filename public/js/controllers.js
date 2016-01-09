"use strict";

angular.module("sog")

.controller("homeCtrl", function($scope, $http, $uibModal, $log, $state) {
	$state.loggedIn = false;
	if (localStorage.getItem('token') ) {
		$state.loggedIn = true;
		$state.go('profile')
	}

  $scope.images = [];

  // for(var i=0; i < 70; i ++){
  // 	$http({
  // 		method: "GET",
  // 		url: "http://uifaces.com/api/v1/random"
  // 			}).then(function(faces){
  // 				console.log(faces.data.image_urls.epic)
  // 			//find page-view-width and insert button at [index] page-view-width/128
  // 			$scope.images.push(faces.data.image_urls.epic)

  // 		}, function errorCallback(response){
  // 			console.log(response)
  // 	})
  // }

  $scope.animationsEnabled = true;

  $scope.open = function(size) {

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'partials/monkey-modal.html',
      controller: 'ModalInstanceCtrl',
      size: size,
    });

    modalInstance.result.then(function() {

    }, function() {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.toggleAnimation = function() {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };
})

// $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.
.controller('ModalInstanceCtrl', function($scope, $uibModalInstance) {
  $scope.login = false;
  $scope.register = false;

  $scope.showLogin = function() {
    $scope.login = !$scope.login;
    $scope.register = false;
  }


  $scope.showReg = function() {
    $scope.register = !$scope.register;
    $scope.login = false;
  }



  $scope.cancel = function() {
    console.log("cancel clicked")
    $uibModalInstance.dismiss('cancel');
  };
})



.controller('loginCtrl', function($rootScope, $scope, $http ,$state) {

  $scope.submitLogin = function() {

    let userData = {}
    userData.email = $scope.loginEmail
    userData.password = $scope.loginPassword
    $http.post('/user/login', userData)
      .then(function(user) {
        localStorage.setItem('token', JSON.stringify(user.data.token));
					$scope.$parent.cancel();
					$state.go('profile');
      }, function(err) {
        console.log(err);
      })
  }
})


.controller('userFormCtrl', function($rootScope, $scope, $window, $http) {

  // upload image and base64 encode
  $scope.imageStrings = [];
  $scope.processFiles = function(files) {
    angular.forEach(files, function(flowFile, i) {
      var fileReader = new FileReader();
      fileReader.onload = function(event) {
        var uri = event.target.result;
        $scope.imageStrings[i] = uri;
      };
      fileReader.readAsDataURL(flowFile.file);
    });
  };

  $scope.submit = function() {
    console.log('submiting');
    let newUser = {}

    newUser.email = $scope.email,
      newUser.password = $scope.password,
      newUser.name = $scope.name,
      newUser.address = $scope.address,
      newUser.phone = $scope.phone,
      newUser.avatar = $scope.imageStrings

    console.log(newUser);

    $http.post('/user/register', newUser, null)
      .then(function(res) {
        console.log(res);
        $scope.$parent.showLogin();
      }, function(err) {
        if (err) console.log(err);
      })

  }
})

.controller("profileCtrl", function($rootScope,$scope, $http ,$state) {
	// if not logged in , (no token) goes back to home
	if (!localStorage.getItem('token') ) {
		$state.go('home')
	}

	$scope.users;
	$scope.currentUser;

  $http({type: 'GET', url: '/user/all'})
    .then(function(res) {
    	$scope.users = res.data;
    }, function(err) {
      console.log(err);
    })

  if (localStorage.getItem('token') ) {
    var currentUserToken = JSON.parse(localStorage.getItem('token'));
    	$http.post('/user/currentUser', {userToken: currentUserToken})
      	.then(function(res) {
        	$rootScope.currentUser = res.data;
      }, function(err) {
        console.log(err);
      })
  }


	// filter function ////////////


	// Logout function ////////////
	$scope.logout = function () {
		$rootScope.currentUser = null;
		localStorage.clear();
		$state.go('home');
	}

})
