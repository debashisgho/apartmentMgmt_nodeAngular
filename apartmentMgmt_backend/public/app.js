var myApp = angular.module('myApp',['ui.bootstrap','ngRoute']);
//var myApp = angular.module('myApp',['ngRoute','ngMaterial']);

myApp.config(function($routeProvider,$locationProvider){
	$routeProvider
	.when('/aptmgmt', {
		controller:'Home_NoLogInController',
		templateUrl: '/views/home_NoLogIn.html'
	})
	.when('/aptmgmt/home', { //this route is used by logged in user. it is automatically redicted after log in
		controller:'Home_LoggedInController',
		templateUrl: '/views/home_LoggedIn.html'
	})
	.when('/aptmgmt/login', {
		controller:'LoginController',
		templateUrl: '/views/login.html'
	})
	.when('/aptmgmt/logout', {
		controller:'LogoutController'
	})
	.when('/aptmgmt/register', {
		controller:'RegisterController',
		templateUrl: '/views/register.html'
	})
	.when('/aptmgmt/myProfile', {
		controller:'MyProfileController',
		templateUrl: '/views/profile.html'
	})

	.when('/aptmgmt/masterdata/building/add', {
		controller:'buildingDataController',
		templateUrl: '/views/masterdata/building/buildingAdd.html'
	})

	.when('/aptmgmt/masterdata/building/:id', {
		controller:'buildingDataController',
		templateUrl: '/views/masterdata/building/buildingSingle.html'
	})

	.when('/aptmgmt/masterdata/building', {
		controller:'buildingDataController',
		templateUrl: '/views/masterdata/building/building.html'
	})

	.when('/aptmgmt/masterdata/user', {
		controller:'MasterDataController',
		templateUrl: '/views/user/user.html'
	})
	.when('/aptmgmt/masterdata/building/:_buildingId/tower/rooms',{
		controller:'RoomDataController',
		templateUrl:'/views/masterdata/room/room.html'
	})
	.when('/aptmgmt/masterdata/building/:_buildingId/tower/rooms/add',{
		controller:'RoomDataController',
		templateUrl:'/views/masterdata/room/roomAdd.html'
	})
	.when('/aptmgmt/masterdata/building/tower/room/:_roomId',{
		controller:'RoomDataController',
		templateUrl:'/views/masterdata/room/roomSingle.html'
	})
	.when('/aptmgmt/masterdata', {
		controller:'MasterDataController',
		templateUrl: '/views/masterdata/masterdata.html'
	})

	.when('/aptmgmt/earning', {
		controller:'EarningController',
		templateUrl: '/views/earning.html'
	})

	
	$locationProvider.html5Mode(true);

});