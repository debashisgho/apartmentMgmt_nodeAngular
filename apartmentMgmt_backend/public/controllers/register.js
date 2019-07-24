var myApp = angular.module('myApp');

myApp.controller('RegisterController', ['$scope', '$http', '$location', '$routeParams','$rootScope','SessionService', function($scope, $http, $location, $routeParams,$rootScope,SessionService){
	console.log('RegisterController loaded...');

	SessionService.runInitialSetUp(false);
	if(!(($rootScope.user =='undefined') || ($rootScope.user ==null))){
			//$location.url("/aptmgmt");
			console.log('user is defined. going to return')	;
			$location.url("/aptmgmt/home");	 //if the user is already loggged in then do not allow the user to go to login page again.
		}

	$scope.registerUser = function(){
		console.log("starting controller method -going to call post method");
		$http.post('/aptmgmt/api/user/', $scope.user).then(function(response){
			//window.location.href='/aptmgmt/login';
			console.log("finished http call");
			console.log(response.data.status+" : "+response.data.message);
			var statusCode = "F";
			
			if(response.data.status < 400)
			{
				statusCode= "S";
			}

			$scope.response = {
				"status":statusCode,
				"message":response.data.message
			};
			
		});
	}

}]);