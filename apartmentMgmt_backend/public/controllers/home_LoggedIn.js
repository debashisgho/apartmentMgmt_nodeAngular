var myApp = angular.module('myApp');

myApp.controller('Home_LoggedInController', ['$scope', '$http', '$location', '$routeParams','SessionService', '$rootScope', function($scope, $http, $location, $routeParams,SessionService,$rootScope){
	console.log('Home_Controller loaded...');
	
	SessionService.runInitialSetUp();
	
}]);