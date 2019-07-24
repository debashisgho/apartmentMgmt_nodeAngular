var myApp = angular.module('myApp');

myApp.controller('LoginController', ['$scope', '$http', '$location', '$routeParams', 'SessionService','$rootScope', function($scope, $http, $location, $routeParams, SessionService, $rootScope){
	console.log('LoginController loaded...');
	$http.defaults.withCredentials = true;
	SessionService.runInitialSetUp(false);
	if(!angular.isUndefined($rootScope.user) && $rootScope.user!=null ){
			//$location.url("/aptmgmt");
			console.log('user is defined.')	;
			$location.url("/aptmgmt/home");	 //if the user is already loggged in then do not allow the user to go to login page again.
		}

$scope.loginUser = function(){
		console.log("starting controller method -going to call post method");
		
		
		$http.post('/aptmgmt/api/user/login/', $scope.user).then(function(response){
			//window.location.href='/aptmgmt/login';
			console.log("finished http call");
			console.log($location);
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