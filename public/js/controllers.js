"use strict";

angular.module("sog")

.controller("homeCtrl", function($scope, $http){
	console.log("inside home ctrl")
	$scope.images = [];

	//request random faces to populate background grid
	// need to repeat request x times per row
	// and repeat request for every row
	// also need to appropriately size response
	for(var i=0; i < 50; i ++){
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
})

.controller("profileCtrl", function($scope){
	console.log("inside profile ctrl")
	$scope.title = "PROFILE!!!!!!"
})