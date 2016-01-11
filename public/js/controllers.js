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
  $scope.errors = false;

  $scope.showError = function(err){
  	$scope.errors = true;
    $scope.errorMessages = err;
  }

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
        $scope.$parent.errors = false;
				$state.go('profile');
      }, function(err) {
        console.log(err);

        // display error message on modal
        if ($scope.$parent.showError)
        	$scope.$parent.showError("Could not find account. Check credentials and try Again");
      	else
      		alert("Could not find account. Check credentials and try Again");
      })
  }

  // Logout function ////////////
  $rootScope.logout = function () {

    $rootScope.currentUser = null;
		$rootScope.email = null;
		$rootScope.name = null;
		$rootScope.address = null;
		$rootScope.phone = null;
		$rootScope.pokedOnes = null;
		$scope.loginEmail = null;
	  $scope.loginPassword = null;
    localStorage.clear();
    $state.go('home');
  }

})


.controller('userFormCtrl', function($rootScope, $scope, $window, $http, $state) {

	if ($scope.password != $scope.password2){
		console.log("passwords do not match")
		angry={'background-color':'red'}
	}

	$scope.fileGrabbed = false;

  // upload image and base64 encode
  $scope.imageStrings = [];
  $scope.processFiles = function(files) {
		$scope.fileGrabbed = true;
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

  	// insert a blank avatar if the user does not upload an image
  	if(!$scope.fileGrabbed){
  			console.log("No file grabbed!")
  			// var dummyImage = [];
  			// dummyImage.push("images/evil_monkey.png")
  			$scope.imageStrings = "data:image/png;base64,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"
  		}


		// creating a new user via register
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
		        $scope.$parent.errors = false;
		        $scope.$parent.showLogin();
		      }, function(err) {
		        if (err) console.log(err);
		    			if ($scope.$parent.showError)
		    				err = err.statusText;
		    				if (err ="Payload Too Large"){
		    					err = "image exceeds max file size"
		    					$scope.fileGrabbed = false;
		    				}
        			$scope.$parent.showError(err.statusText);
		      })
				// update function for admin
			}else if ($rootScope.isAdmin){
				let updateUser = {}
				updateUser._id = $rootScope.editUserId
				updateUser.name = $scope.name,
				updateUser.address = $scope.address,
				updateUser.password = $scope.password,
				updateUser.phone = $scope.phone,
				updateUser.avatar = $scope.imageStrings
				console.log(updateUser, 'user info being sent to update');
				$http.put(`/user/update/${$rootScope.editUserId}`, updateUser, null)
					.then(function(res) {
						console.log('res from updating user', res.data);
						$http.get('/user/all/')
						.then(function (res) {
							$rootScope.users = res.data;
						},function (err) {

							if ($scope.$parent.showError)
        			$scope.$parent.showError(err.statusText);
							if(err) console.log(err);
						})
					}, function(err) {
						if (err) console.log(err);
					})
			// update self via user edit profile
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
									if ($scope.$parent.showError)
        					$scope.$parent.showError(err.statusText);
									console.log(err);
								})
						}, function(err) {
							  if ($scope.$parent.showError)
        				$scope.$parent.showError(err.statusText);
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

	$scope.editUser = function (user) {
		$rootScope.editUserId = user._id;
		$rootScope.email = user.email;
		$rootScope.name = user.name;
		$rootScope.address = user.address;
		$rootScope.phone = user.phone;

		$scope.editProfile();
	}

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
		$rootScope.loggedIn = true;
		$rootScope.isAdmin = false;
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

					$rootScope.isAdmin = checkAdmin($rootScope.currentUser);

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
					res.data = res.data.filter(function (person) {
						return person._id === poked._id;
					})
					$rootScope.users = $rootScope.users.concat(res.data[0]);
					console.log(res.data);
		    }, function(err) {
		      console.log(err);
		    })
		}, function(err){
		console.log(err)
		})
	}


	//delete user function
	$scope.deleteUser = function (user) {
		$http.delete(`user/delete/${user._id}`)
		.then(function (res) {
			$http.get('/user/all/')
			.then(function (res) {
				$rootScope.users = res.data;
			},function (err) {
				if(err) console.log(err);
			})
		})
	}


	// check if admin
	function checkAdmin(currentUser) {
		console.log('checking admin', currentUser);
		if(currentUser.admin){
			return true
		}else{
			return false
		}
	}



})
