var myApp = angular.module('myApp');

myApp.controller('EarningController', ['$scope', '$http', '$location', '$routeParams','SessionService', function($scope, $http, $location, $routeParams,SessionService){
	console.log('EarningController loaded...');

	SessionService.runInitialSetUp();

}]);