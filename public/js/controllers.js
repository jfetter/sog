"use strict";

angular.module("sog")

.controller("homeCtrl", function($scope, $state){
	console.log("inside home ctrl")
	$scope.title = "HOME !!!!"
})

.controller("profileCtrl", function($scope, $state){
	console.log("inside profile ctrl")
	$scope.title = "PROFILE!!!!!!"
})