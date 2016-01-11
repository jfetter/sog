"use strict";

angular.module("sog", ["ui.router", "ui.bootstrap", "ngAnimate","flow","ngStorage"])

.config(function($stateProvider, $urlRouterProvider, $locationProvider){
	$locationProvider.html5Mode({
		enabled:true,
		requireBase: false
	});

	$urlRouterProvider.otherwise("home")

	$stateProvider
		.state("home", {url: "/", templateUrl:"views/home.html", controller:"homeCtrl"})
		.state("profile", {url: "/", templateUrl:"views/profile.html", controller:"profileCtrl"})
})
