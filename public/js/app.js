"use strict";

angular.module("sog", ["ui.router"])

.config(function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise("home")

	$stateProvider
		.state("home", {url: "/home", templateUrl:"views/home.html", controller:"homeCtrl"})

})