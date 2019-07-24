var myApp = angular.module('myApp');

myApp.controller('Home_NoLogInController', ['$scope', '$http', '$location', '$routeParams','SessionService', '$rootScope', function($scope, $http, $location, $routeParams,SessionService,$rootScope){
	console.log('Home_NoLogInController loaded...');
	
	SessionService.runInitialSetUp(false);
	if(!angular.isUndefined($rootScope.user) && $rootScope.user !=null){
			//$location.url("/aptmgmt");
			console.log('user is defined. going to logged in user home page')	;
			$location.url("/aptmgmt/home");	 //if the user is already loggged in then do not allow the user to go to login page again.
		}

	/*var responsePromise = SessionService.getLogInDetails();

	responsePromise
	.then(function(data){		
		$scope.user= data;
		$rootScope.user = data;
	});*/


	
}]);