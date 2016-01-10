"use strict";

angular.module("sog")

.directive('navBar', function() {
  return {
    templateUrl: "partials/navbar.html"
  };
})

.directive('heroEl', function() {
  return {
    templateUrl: "partials/hero.html"
  };
})

.directive('userProfile', function() {
  return {
    templateUrl: "partials/user-profile.html"
  };
})

.directive('favoriteUsers', function() {
  return {
    templateUrl: "partials/favorite-users.html"
  };
})

.directive('allUsers', function() {
  return {
    templateUrl: "partials/all-users.html"
  };
})

.directive('logIn', function(){
  return{
    templateUrl: "partials/log-in.html"
  }
})

.directive('userForm', function(){
  return{
    templateUrl: "partials/user-form.html"
  }
})

.directive('userUpdateForm',function () {
  return{
    templateUrl:"partials/user-update-form.html"
  }
})

.directive('monkeyModal', function(){
  return{
    templateUrl: "partials/monkey-modal.html"
  }
})
