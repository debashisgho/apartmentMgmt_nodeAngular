var myApp = angular.module('myApp');

myApp.controller('LogoutController', ['$scope','$http', '$location','$rootScope', function($scope,$http, $location,$rootScope){
	console.log('LogoutController loaded...');
	
	$scope.logout = function(){
		console.log('logout called');
		$rootScope.user=null;
		$http.get('/aptmgmt/api/user/session/logout/').then(function(response){
			console.log('logout api already invoked');
			$location.url("/aptmgmt");			
		});
	}
	

}]);