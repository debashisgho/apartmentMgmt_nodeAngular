var myApp = angular.module('myApp');
	
myApp.controller('MyProfileController', ['$scope','$rootScope', '$http', '$location', '$routeParams','SessionService', function($scope, $rootScope, $http, $location, $routeParams,SessionService){
	console.log('MyProfileController loaded...');

	SessionService.runInitialSetUp();
	

	$scope.viewProfile = function(){
		console.log('view profile called');
		$http.get('/aptmgmt/api/user/currentUser').then(function(response){			
			console.log(response.data[0]);
			$scope.user = response.data[0];
		});
	};

	$scope.updateProfile = function(){
		
		$scope.myProfile.$setPristine();//the form is submitted, so reset to pristine
		console.log("controller updateProfile started");
		console.log($scope.user);
		$http.put('/aptmgmt/api/user/currentUser', $scope.user).then(function(response){
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

			//call the view profile method to refresh the profile data from backend
			$scope.viewProfile();
			
		});


	};
	
}]);