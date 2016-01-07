"use strict";

angular.module("sog", ["ui.router", "ui.bootstrap"])

.config(function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise("home")

	$stateProvider
		.state("home", {url: "/home", templateUrl:"views/home.html", controller:"homeCtrl"})
		.state("profile", {url: "/profile", templateUrl:"views/profile.html", controller:"profileCtrl"})
})