"use strict";

angular.module("sog", ["ui.router", "ui.bootstrap", "ngAnimate","flow","ngStorage"])

.config(function($stateProvider, $urlRouterProvider, $locationProvider){
	$locationProvider.html5Mode({
		enabled:false,
		requireBase: false
	});

	$urlRouterProvider.otherwise("home")

	$stateProvider
		.state("home", {url: "/home", templateUrl:"views/home.html", controller:"homeCtrl"})
		.state("profile", {url: "/profile", templateUrl:"views/profile.html", controller:"profileCtrl"})
})
