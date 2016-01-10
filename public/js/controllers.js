"use strict";

angular.module("sog")

.controller("homeCtrl", function($rootScope, $scope, $http, $uibModal, $log, $state) {
	$rootScope.loggedIn = false;
	if (localStorage.getItem('token') ) {
		$rootScope.loggedIn = true;
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
  $scope.isLoggedIn = function(){
    // $rootScope.token = {}
    if (localStorage.token){
      return true;
    }
    return false;
  }

  $scope.submitLogin = function() {

    let userData = {}
    userData.email = $scope.loginEmail
    userData.password = $scope.loginPassword
    $http.post('/user/login', userData)
      .then(function(user) {
        localStorage.setItem('token', JSON.stringify(user.data.token));
        if ($scope.$parent.cancel){
          $scope.$parent.cancel();
        }
				$state.go('profile');
      }, function(err) {
        console.log(err);
      })
  }

  // Logout function ////////////
  $scope.logout = function () {
    $rootScope.currentUser = null;
		$rootScope.email = null;
		$rootScope.name = null;
		$rootScope.address = null;
		$rootScope.phone = null;
		$rootScope.pokedOnes = null;
    localStorage.clear();
    $state.go('home');
  }

})


.controller('userFormCtrl', function($rootScope, $scope, $window, $http, $state) {

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

			if(!$scope.loggedIn){
				let newUser = {}
		    newUser.email = $scope.email,
		      newUser.password = $scope.password,
		      newUser.name = $scope.name,
		      newUser.address = $scope.address,
		      newUser.phone = $scope.phone,
		      newUser.avatar = $scope.imageStrings

		    $http.post('/user/register', newUser, null)
		      .then(function(res) {
		        console.log(res);
		        $scope.$parent.showLogin();
		      }, function(err) {
		        if (err) console.log(err);
		      })
			}else{
				let updateUser = {}
				updateUser.name = $scope.name,
				updateUser.address = $scope.address,
				updateUser.phone = $scope.phone,
				updateUser.avatar = $scope.imageStrings
				$http.put(`/user/update/${$rootScope.currentUser._id}`, updateUser, null)
		      .then(function(res) {
						var currentUserToken = JSON.parse(localStorage.getItem('token'));
						$http.post('/user/currentUser', {userToken: currentUserToken})
							.then(function(res) {
								// yep that rootscope....
								$rootScope.currentUser = res.data;
								$rootScope.email = $rootScope.currentUser.email
								$rootScope.name = $rootScope.currentUser.name
								$rootScope.address = $rootScope.currentUser.address
								$rootScope.phone = $rootScope.currentUser.phone
								$rootScope.pokedOnes = $scope.currentUser.pokes;
								$http.get(`/user/poked/${res.data._id}`)
								.then(function (res) {
									console.log('updated user');
								},function (err) {
									console.log(err);
								})
						}, function(err) {
							console.log(err);
						})



		      }, function(err) {
		        if (err) console.log(err);
		      })
			}

  }
})

.controller("profileCtrl", function($rootScope,$scope, $http ,$state, $uibModal, $log) {

	//Edit System, includes controls for modal and edit functions
	$scope.animationsEnabled = true;
  $scope.editProfile = function(size) {

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'partials/edit-modal.html',
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
	// getting current users, users's poked users, and all users to be poked
	$rootScope.users = [];
  $scope.currentUser;
	$scope.pokedOnes;
	$scope.HiddenpokedOnes=[];
  $scope.pokedIds = [];


	// if not logged in , (no token) goes back to home
	if (!localStorage.getItem('token') ) {
		$state.go('home')
	}

  $http({type: 'GET', url: '/user/all'})
    .then(function(res) {
			console.log(res,'all users route');
    	$rootScope.users = res.data;
    }, function(err) {
      console.log(err);
    })

  if (localStorage.getItem('token') ) {
    var currentUserToken = JSON.parse(localStorage.getItem('token'));
    	$http.post('/user/currentUser', {userToken: currentUserToken})
      	.then(function(res) {
					// yep that rootscope....
        	$rootScope.currentUser = res.data;
					$rootScope.email = $rootScope.currentUser.email
					$rootScope.name = $rootScope.currentUser.name
					$rootScope.address = $rootScope.currentUser.address
					$rootScope.phone = $rootScope.currentUser.phone
          $rootScope.pokedOnes = $scope.currentUser.pokes;

					$scope.currentUser.pokes.map(function (user) {
						$scope.HiddenpokedOnes.push(user._id)
					})

					// $http.get(`/user/poked/${res.data._id}`)
					// .then(function (res) {
					// 	console.log(res,'user/poked');
					// },function (err) {
					// 	console.log(err);
					// })
      }, function(err) {
        console.log(err);
      })
  }

	// filter function ////////////
	$scope.pokeUser = function(user){
		var poked = user;
		var poker = $rootScope.currentUser;
		console.log(poker, poked)
		user.hide = true;
		$http.post("/user/poke", {poker: poker._id, poked: poked._id})
		.then(function(res){
			console.log(res)


			$http.get(`/user/poked/${$rootScope.currentUser._id}`)
			.then(function (res) {
				$scope.pokedOnes = [];
				res.data.forEach(function (pokedPerson) {
					console.log('pokedPerson', pokedPerson);
				$scope.pokedOnes.push(pokedPerson)
				})
			},function (err) {
				console.log(err);
			})

		}, function(err){
			console.log(err)
		})
	}

	$scope.unPoke = function(poked){
		// removes the poked person from the hidden array
		$scope.HiddenpokedOnes.splice($scope.HiddenpokedOnes.indexOf(poked._id),1)

		var currentUserToken = JSON.parse(localStorage.getItem('token'));
		var poker = $rootScope.currentUser;
		poked.hide = true;

		$http.post("/user/unpoke", {poker: poker._id, poked: poked._id})
		.then(function(resUnpoke){
			$http({type: 'GET', url: '/user/all'})
		    .then(function(res) {
					console.log(res,'all users route');
		    	$rootScope.users = res.data;
		    }, function(err) {
		      console.log(err);
		    })
		}, function(err){
			console.log(err)
		})

	}



})
